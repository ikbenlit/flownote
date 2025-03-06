import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';

interface AudioRecorderProps {
  onTranscriptionComplete: (text: string) => void;
  onTranscriptionUpdate?: (text: string) => void;
}

/**
 * Component for recording audio and getting transcriptions
 * Features:
 * - Transcription via WebSocket (only showing final results, not interim)
 * - Manual stop control
 * - Automatic stop after 15 seconds of no speech detection
 * - Clear status indicators
 * - Real-time volume meter
 */
export const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onTranscriptionComplete, 
  onTranscriptionUpdate 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'recording' | 'processing'>('idle');
  const [volume, setVolume] = useState<number>(0);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [timeSinceLastSpeech, setTimeSinceLastSpeech] = useState<number>(0);
  const isRecordingRef = useRef(false);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const processorNode = useRef<ScriptProcessorNode | null>(null);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastSoundTime = useRef<number>(Date.now());
  const lastSpeechTime = useRef<number>(Date.now()); // Track when speech was last detected
  const silenceCheckInterval = useRef<NodeJS.Timeout | null>(null);
  const volumeUpdateInterval = useRef<number | null>(null);
  const animationFrame = useRef<number | null>(null);
  const socket = useRef<WebSocket | null>(null);
  const transcriptParts = useRef<string[]>([]);
  const noSpeechTimeout = 15000; // 15 seconds of no speech detection

  // Cleanup function
  useEffect(() => {
    return () => {
      if (silenceTimer.current) {
        clearTimeout(silenceTimer.current);
      }
      if (silenceCheckInterval.current) {
        clearInterval(silenceCheckInterval.current);
      }
      if (volumeUpdateInterval.current) {
        clearInterval(volumeUpdateInterval.current);
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  /**
   * Updates the volume meter using requestAnimationFrame
   */
  const updateVolumeMeter = () => {
    if (!analyser.current || !isRecordingRef.current) {
      setVolume(0);
      return;
    }

    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    analyser.current.getFloatTimeDomainData(dataArray);

    // Calculate RMS value
    let sumSquares = 0;
    for (const amplitude of dataArray) {
      sumSquares += amplitude * amplitude;
    }
    const rms = Math.sqrt(sumSquares / dataArray.length);
    
    // Convert to percentage (0-100)
    const normalizedVolume = Math.min(100, Math.max(0, rms * 80 * 100));
    
    // Check for silence (threshold 2% for better sensitivity)
    if (normalizedVolume > 2) {
      lastSoundTime.current = Date.now();
      console.log('Sound detected, level:', normalizedVolume.toFixed(1) + '%');
    } else {
      const silenceDuration = (Date.now() - lastSoundTime.current) / 1000;
      console.log('Silence detected, duration:', silenceDuration.toFixed(1) + 's');
    }

    // Smooth volume transitions
    setVolume(prev => {
      const delta = normalizedVolume - prev;
      const newVolume = prev + delta * 0.5;
      console.log('Volume update:', prev.toFixed(1), '->', newVolume.toFixed(1));
      return newVolume;
    });
    animationFrame.current = requestAnimationFrame(updateVolumeMeter);
  };

  const startRecording = async () => {
    try {
      console.log('Starting recording...');
      
      // Initialize WebSocket connection first
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsHost = process.env.NODE_ENV === 'production' 
        ? window.location.host
        : 'localhost:3000';
      const wsUrl = `${wsProtocol}//${wsHost}`;
      console.log('Attempting WebSocket connection to:', wsUrl);
      console.log('Current environment:', process.env.NODE_ENV);
      console.log('Window location:', {
        protocol: window.location.protocol,
        host: window.location.host,
        hostname: window.location.hostname,
        pathname: window.location.pathname
      });
      
      socket.current = new WebSocket(wsUrl);
      
      socket.current.onopen = () => {
        console.log('WebSocket connection established successfully');
      };

      socket.current.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
        try {
          const data = JSON.parse(event.data);
          if (data.transcript !== undefined) { // Check if this is a transcript message
            console.log('Received transcript:', data.transcript, 'is_final:', data.is_final, 'speech_detected:', data.speech_detected);
            
            // Update the last speech time only when speech is actually detected
            if (data.speech_detected) {
              console.log('Speech detected, updating lastSpeechTime');
              lastSpeechTime.current = Date.now();
            }
            
            // Only update UI and store the transcript if it's final and not empty
            if (data.is_final && data.transcript.trim()) {
              console.log('Storing final transcript:', data.transcript);
              
              // Check if this is a new sentence or a continuation
              const lastTranscript = transcriptParts.current.length > 0 ? 
                transcriptParts.current[transcriptParts.current.length - 1] : '';
                
              // Add to our transcript parts array if:
              // 1. It's the first transcript, or
              // 2. It contains new information (not just a repetition)
              if (transcriptParts.current.length === 0 || 
                  !data.transcript.trim().startsWith(lastTranscript.trim())) {
                transcriptParts.current.push(data.transcript);
              } else {
                // Replace the last transcript with this one since it's a more complete version
                transcriptParts.current[transcriptParts.current.length - 1] = data.transcript;
              }
              
              setCurrentTranscript(data.transcript);
              onTranscriptionUpdate?.(data.transcript);
            } else if (!data.is_final && data.transcript.trim()) {
              // For partial transcripts with content, update the UI but don't store them
              setCurrentTranscript(data.transcript);
              onTranscriptionUpdate?.(data.transcript);
            }
          }
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
        }
      };

      socket.current.onerror = (error) => {
        console.error('WebSocket connection error:', error);
        console.error('WebSocket readyState:', socket.current?.readyState);
        // Log additional connection details
        console.error('Connection details:', {
          url: wsUrl,
          readyState: socket.current?.readyState,
          protocol: socket.current?.protocol,
          extensions: socket.current?.extensions,
          bufferedAmount: socket.current?.bufferedAmount
        });
      };

      socket.current.onclose = (event) => {
        console.log('WebSocket connection closed:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
      };

      // Wait for WebSocket to be ready with more detailed error handling
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          const error = new Error('WebSocket connection timeout');
          console.error('Connection timeout details:', {
            url: wsUrl,
            readyState: socket.current?.readyState,
            protocol: socket.current?.protocol
          });
          reject(error);
        }, 5000);

        if (socket.current) {
          socket.current.onopen = () => {
            console.log('WebSocket connected successfully within timeout');
            clearTimeout(timeout);
            resolve();
          };
          
          socket.current.onerror = (error) => {
            console.error('WebSocket error during connection setup:', error);
            clearTimeout(timeout);
            reject(new Error('WebSocket connection failed'));
          };
        }
      });
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
          channelCount: 1
        } 
      });
      
      // Set up audio context and nodes
      audioContext.current = new AudioContext({
        sampleRate: 48000,
        latencyHint: 'interactive'
      });
      
      // Create and configure nodes
      const source = audioContext.current.createMediaStreamSource(stream);
      gainNode.current = audioContext.current.createGain();
      analyser.current = audioContext.current.createAnalyser();
      
      // Create ScriptProcessorNode for raw audio data
      processorNode.current = audioContext.current.createScriptProcessor(4096, 1, 1);
      
      // Configure analyser
      analyser.current.fftSize = 1024;
      analyser.current.smoothingTimeConstant = 0.1;
      
      // Set recording state before connecting nodes
      transcriptParts.current = [];
      isRecordingRef.current = true;
      setIsRecording(true);
      setStatus('recording');
      lastSoundTime.current = Date.now();
      lastSpeechTime.current = Date.now(); // Initialize last speech time
      
      // Start no-speech detection interval
      silenceCheckInterval.current = setInterval(() => {
        const noSpeechDuration = Date.now() - lastSpeechTime.current;
        const silenceDuration = Date.now() - lastSoundTime.current;
        
        // Update the time since last speech for UI display
        setTimeSinceLastSpeech(Math.floor(noSpeechDuration / 1000));
        
        console.log(`No speech for ${(noSpeechDuration/1000).toFixed(1)}s, silence for ${(silenceDuration/1000).toFixed(1)}s`);
        
        // Stop recording if no speech detected for the specified timeout
        if (noSpeechDuration >= noSpeechTimeout) {
          console.log(`Stopping due to ${noSpeechTimeout/1000}s of no speech detection`);
          stopRecording();
        }
      }, 1000);
      
      // Connect nodes
      source.connect(gainNode.current);
      gainNode.current.connect(analyser.current);
      gainNode.current.connect(processorNode.current);
      processorNode.current.connect(audioContext.current.destination);
      gainNode.current.gain.value = 1.0;
      
      console.log('Audio context state:', audioContext.current.state);
      console.log('Sample rate:', audioContext.current.sampleRate);

      // Handle audio processing
      processorNode.current.onaudioprocess = (e) => {
        console.log('Audio process called, isRecording:', isRecordingRef.current, 
                    'socket ready:', socket.current?.readyState === WebSocket.OPEN);
        
        if (!isRecordingRef.current || !socket.current || socket.current.readyState !== WebSocket.OPEN) {
          console.log('Skipping audio processing:', 
                     !isRecordingRef.current ? 'not recording' : 
                     !socket.current ? 'no socket' : 
                     'socket not ready');
          return;
        }

        const inputData = e.inputBuffer.getChannelData(0);
        console.log('Processing audio data, length:', inputData.length, 
                   'non-zero samples:', inputData.filter(x => x !== 0).length);
        
        // Convert Float32Array to Int16Array for Deepgram
        const samples = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          // Normalize and convert to 16-bit PCM
          const s = Math.max(-1, Math.min(1, inputData[i]));
          samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        
        try {
          socket.current.send(samples.buffer);
          console.log('Sent audio chunk, size:', samples.buffer.byteLength, 'bytes',
                     'non-zero samples:', samples.filter(x => x !== 0).length);
        } catch (error) {
          console.error('Error sending audio chunk:', error);
          if (error instanceof Error) {
            console.error('Error details:', error.message);
          }
        }
      };
      
      // Start volume meter
      updateVolumeMeter();
      
      console.log('Recording started successfully');
    } catch (error) {
      console.error('Error in startRecording:', error);
      setStatus('idle');
      isRecordingRef.current = false;
      setIsRecording(false);
      setIsProcessing(false);
      if (error instanceof Error) {
        alert(`Could not start recording: ${error.message}`);
      } else {
        alert('Could not start recording. Please check permissions.');
      }
    }
  };

  const stopRecording = () => {
    console.log('Stopping recording...');
    if (!isRecordingRef.current) return;  // Only check isRecordingRef

    // Clear the silence check interval
    if (silenceCheckInterval.current) {
      clearInterval(silenceCheckInterval.current);
      silenceCheckInterval.current = null;
    }

    isRecordingRef.current = false;
    setIsRecording(false);
    setIsProcessing(true);
    
    if (socket.current?.readyState === WebSocket.OPEN) {
      console.log('Sending stop signal');
      socket.current.send(JSON.stringify({ type: 'stop' }));
    }

    // Cleanup
    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
    }
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    if (audioContext.current) {
      if (processorNode.current) {
        processorNode.current.disconnect();
      }
      if (gainNode.current) {
        gainNode.current.disconnect();
      }
      if (analyser.current) {
        analyser.current.disconnect();
      }
    }

    // Get the final transcript - just use the most recent one
    // or combine uniquely if there are multiple segments
    let finalTranscript = '';
    
    if (transcriptParts.current.length > 0) {
      // Use a smarter approach to combine transcript parts
      // This prevents duplication while preserving all unique content
      const segments = new Set();
      
      for (const part of transcriptParts.current) {
        // Skip empty parts
        if (!part.trim()) continue;
        
        // Add this segment if it's not already included
        if (!segments.has(part)) {
          segments.add(part);
        }
      }
      
      finalTranscript = Array.from(segments).join(' ');
    }
    
    console.log('Final transcript:', finalTranscript);
    onTranscriptionComplete(finalTranscript);
    transcriptParts.current = [];

    setVolume(0);
    setTimeSinceLastSpeech(0);
    setStatus('idle');
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-6 rounded-full text-2xl ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-green-500 hover:bg-green-600'
        } text-white transition-colors`}
        disabled={isProcessing}
      >
        {isRecording ? <FaStop /> : <FaMicrophone />}
      </button>
      
      {/* Volume Meter */}
      {isRecording && (
        <div className="flex flex-col items-center gap-1 w-full max-w-md">
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner relative">
            <div 
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all"
              style={{
                width: `${volume}%`,
                transition: 'width 15ms linear'
              }}
            />
            {/* Volume level markers */}
            <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-full w-px bg-gray-400 opacity-30"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full text-xs text-gray-500 px-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      )}
      
      {/* Status and Transcript */}
      <div className="flex flex-col items-center w-full max-w-lg">
        <div className="text-sm font-medium mb-2">
          {status === 'idle' && 'Klik om de opname te starten'}
          {status === 'recording' && (
            <span className="text-red-500 animate-pulse">Opname loopt...</span>
          )}
          {status === 'processing' && (
            <span className="text-yellow-500">Processing...</span>
          )}
        </div>

        {/* Real-time transcript */}
        {isRecording && currentTranscript && (
          <div className="w-full p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-sm text-gray-700">{currentTranscript}</p>
          </div>
        )}

        {/* Recording tips and speech detection status */}
        {isRecording && (
          <div className="mt-2 text-xs text-gray-500 flex flex-col items-center">
            <p>Auto-stop after 15s of no speech</p>
            {timeSinceLastSpeech > 0 && (
              <p className={`mt-1 ${timeSinceLastSpeech > 10 ? 'text-orange-500' : ''}`}>
                {timeSinceLastSpeech > 0 
                  ? `No speech detected for ${timeSinceLastSpeech}s` 
                  : 'Speech detected'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 