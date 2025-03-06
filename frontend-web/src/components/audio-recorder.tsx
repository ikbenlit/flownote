import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';

interface AudioRecorderProps {
  onTranscriptionComplete: (text: string) => void;
  onTranscriptionUpdate?: (text: string) => void;
}

/**
 * Component for recording audio and getting transcriptions
 * Features:
 * - Real-time transcription via Deepgram WebSocket API
 * - Manual stop control
 * - Automatic stop after 15 seconds of no speech detection
 * - Clear status indicators with silence timer
 * - Real-time volume meter visualization
 */
export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onTranscriptionComplete,
  onTranscriptionUpdate
}) => {
  // UI States
  const [status, setStatus] = useState<'idle' | 'recording' | 'processing'>('idle');
  const [volume, setVolume] = useState<number>(0);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [timeSinceLastSpeech, setTimeSinceLastSpeech] = useState<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  
  // Refs for handling audio and WebSocket
  const isRecordingRef = useRef(false);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const processorNode = useRef<ScriptProcessorNode | null>(null);
  const socket = useRef<WebSocket | null>(null);
  
  // Refs for speech detection and transcription
  const lastSpeechTime = useRef<number>(Date.now());
  const silenceCheckInterval = useRef<NodeJS.Timeout | null>(null);
  const transcriptParts = useRef<string[]>([]);
  
  // Constants
  const noSpeechTimeout = 15000; // 15 seconds of no speech detection
  const sampleRate = 48000;
  const processorBufferSize = 4096;

  const updateVolumeMeter = () => {
    if (!analyser.current || !isRecordingRef.current) return;

    const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
    analyser.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const normalizedVolume = Math.max(0, Math.min(100, (average / 128) * 100));
    setVolume(normalizedVolume);

    if (isRecordingRef.current) {
      requestAnimationFrame(updateVolumeMeter);
    }
  };

  const stopRecording = async () => {
    if (!isRecordingRef.current) return;

    isRecordingRef.current = false;
    setIsRecording(false);
    setStatus('processing');

    // Stop all audio processing
    if (processorNode.current) {
      processorNode.current.disconnect();
      processorNode.current = null;
    }

    if (gainNode.current) {
      gainNode.current.disconnect();
      gainNode.current = null;
    }

    if (analyser.current) {
      analyser.current.disconnect();
      analyser.current = null;
    }

    if (audioContext.current) {
      await audioContext.current.close();
      audioContext.current = null;
    }

    // Close WebSocket connection
    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }

    // Clear intervals
    if (silenceCheckInterval.current) {
      clearInterval(silenceCheckInterval.current);
      silenceCheckInterval.current = null;
    }

    // Combine all transcript parts and call completion handler
    const finalTranscript = transcriptParts.current.join(' ').trim();
    if (finalTranscript) {
      onTranscriptionComplete(finalTranscript);
    }

    setStatus('idle');
    setVolume(0);
    setCurrentTranscript('');
    setTimeSinceLastSpeech(0);
  };

  const startRecording = async () => {
    try {
      // Get temporary Deepgram API key
      const response = await fetch('/api/deepgram-token');
      if (!response.ok) {
        throw new Error('Failed to get Deepgram token');
      }
      const { key } = await response.json();

      // Initialize WebSocket connection to Deepgram
      socket.current = new WebSocket(`wss://api.deepgram.com/v1/listen?token=${key}`);

      socket.current.onopen = () => {
        console.log('Connected to Deepgram');
        socket.current?.send(JSON.stringify({
          type: 'Configure',
          model: 'nova-2',
          language: 'nl',
          smart_format: true,
          interim_results: true,
          endpointing: 500,
        }));
      };

      socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'Results') {
          const transcript = data.channel?.alternatives?.[0]?.transcript || '';
          const isFinal = !data.speech_final;
          
          if (transcript.trim()) {
            lastSpeechTime.current = Date.now();
            
            if (isFinal) {
              transcriptParts.current.push(transcript);
              setCurrentTranscript(transcript);
              onTranscriptionUpdate?.(transcript);
            } else {
              setCurrentTranscript(transcript);
              onTranscriptionUpdate?.(transcript);
            }
          }
        }
      };

      socket.current.onerror = (error) => {
        console.error('Deepgram WebSocket error:', error);
        stopRecording();
      };

      // Set up audio context and nodes
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate,
          channelCount: 1
        }
      });

      audioContext.current = new AudioContext({
        sampleRate,
        latencyHint: 'interactive'
      });

      const source = audioContext.current.createMediaStreamSource(stream);
      gainNode.current = audioContext.current.createGain();
      analyser.current = audioContext.current.createAnalyser();
      processorNode.current = audioContext.current.createScriptProcessor(processorBufferSize, 1, 1);

      analyser.current.fftSize = 1024;
      analyser.current.smoothingTimeConstant = 0.1;

      // Reset state
      transcriptParts.current = [];
      isRecordingRef.current = true;
      setIsRecording(true);
      setStatus('recording');
      lastSpeechTime.current = Date.now();
      setTimeSinceLastSpeech(0);

      // Start no-speech detection interval
      silenceCheckInterval.current = setInterval(() => {
        const noSpeechDuration = Date.now() - lastSpeechTime.current;
        setTimeSinceLastSpeech(Math.floor(noSpeechDuration / 1000));

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

      // Handle audio processing
      processorNode.current.onaudioprocess = (e) => {
        if (!isRecordingRef.current || !socket.current || socket.current.readyState !== WebSocket.OPEN) {
          return;
        }

        const inputData = e.inputBuffer.getChannelData(0);
        const samples = new Int16Array(inputData.length);
        
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        socket.current.send(samples.buffer);
      };

      // Start volume meter
      updateVolumeMeter();

    } catch (error) {
      console.error('Failed to start recording:', error);
      stopRecording();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-16 h-16">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-full h-full rounded-full flex items-center justify-center text-white transition-colors ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={status === 'processing'}
        >
          {isRecording ? <FaStop size={24} /> : <FaMicrophone size={24} />}
        </button>
        {volume > 0 && (
          <div
            className="absolute bottom-0 left-0 w-full bg-blue-200 rounded-full transition-all duration-100"
            style={{ height: `${Math.min(100, volume)}%`, opacity: 0.5 }}
          />
        )}
      </div>
      <div className="text-sm text-gray-500">
        {status === 'recording' && `Opname loopt${timeSinceLastSpeech > 0 ? ` (${timeSinceLastSpeech}s stil)` : ''}`}
        {status === 'processing' && 'Verwerken...'}
      </div>
      {currentTranscript && (
        <div className="max-w-md text-sm text-gray-700 italic">
          {currentTranscript}
        </div>
      )}
    </div>
  );
}; 