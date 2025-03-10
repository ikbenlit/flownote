export class AudioService {
  private audioContext: AudioContext | null = null
  private sourceNode: MediaStreamAudioSourceNode | null = null
  private processorNode: ScriptProcessorNode | null = null
  private analyserNode: AnalyserNode | null = null
  private stream: MediaStream | null = null
  private onVolumeChange: ((volume: number) => void) | null = null
  private animationFrame: number | null = null
  private isRecording = false

  constructor(onVolumeChange?: (volume: number) => void) {
    this.onVolumeChange = onVolumeChange || null
  }

  async start(sampleRate: number = 48000): Promise<void> {
    try {
      // 1. Get microphone stream
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate,
          channelCount: 1
        }
      })

      // 2. Setup audio context and nodes
      this.audioContext = new AudioContext({ sampleRate })
      this.sourceNode = this.audioContext.createMediaStreamSource(this.stream)
      this.processorNode = this.audioContext.createScriptProcessor(4096, 1, 1)
      this.analyserNode = this.audioContext.createAnalyser()

      // 3. Configure analyser
      this.analyserNode.fftSize = 256
      this.analyserNode.smoothingTimeConstant = 0.3

      // 4. Connect nodes
      this.sourceNode.connect(this.analyserNode)
      this.analyserNode.connect(this.processorNode)
      this.processorNode.connect(this.audioContext.destination)

      // 5. Start volume monitoring
      this.isRecording = true
      this.updateVolume()

    } catch (error) {
      await this.stop()
      throw error
    }
  }

  async stop(): Promise<void> {
    console.log('AudioService.stop aangeroepen')
    this.isRecording = false

    // Stop animation frame
    if (this.animationFrame) {
      console.log('Stopping animation frame')
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }

    // Stop media stream
    if (this.stream) {
      console.log('Stopping media tracks')
      this.stream.getTracks().forEach(track => track.stop())
      this.stream = null
    }

    // Disconnect and cleanup nodes
    if (this.analyserNode) {
      console.log('Disconnecting analyser node')
      this.analyserNode.disconnect()
      this.analyserNode = null
    }
    if (this.processorNode) {
      console.log('Disconnecting processor node')
      this.processorNode.disconnect()
      this.processorNode = null
    }
    if (this.sourceNode) {
      console.log('Disconnecting source node')
      this.sourceNode.disconnect()
      this.sourceNode = null
    }

    // Close audio context
    if (this.audioContext) {
      console.log('Closing audio context')
      await this.audioContext.close()
      this.audioContext = null
    }
    
    console.log('AudioService.stop voltooid')
  }

  onAudioProcess(callback: (audioData: Int16Array) => void): void {
    if (!this.processorNode) return

    this.processorNode.onaudioprocess = (e) => {
      if (!this.isRecording) return

      const inputData = e.inputBuffer.getChannelData(0)
      const samples = new Int16Array(inputData.length)
      
      for (let i = 0; i < inputData.length; i++) {
        const s = Math.max(-1, Math.min(1, inputData[i]))
        samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
      }

      callback(samples)
    }
  }

  private updateVolume = () => {
    if (!this.analyserNode || !this.isRecording) return

    const dataArray = new Uint8Array(this.analyserNode.frequencyBinCount)
    this.analyserNode.getByteFrequencyData(dataArray)

    // Calculate average volume (0-100)
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length
    const normalizedVolume = Math.min(100, (average / 128) * 100)
    
    this.onVolumeChange?.(normalizedVolume)

    // Request next frame
    this.animationFrame = requestAnimationFrame(this.updateVolume)
  }
} 