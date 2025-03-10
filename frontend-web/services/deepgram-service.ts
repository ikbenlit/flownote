type DeepgramCallbacks = {
  onTranscript: (text: string, isFinal: boolean) => void
  onError?: (error: Error) => void
}

export class DeepgramService {
  private ws: WebSocket | null = null
  private callbacks: DeepgramCallbacks
  private apiKey: string

  constructor(apiKey: string, callbacks: DeepgramCallbacks) {
    this.apiKey = apiKey
    this.callbacks = callbacks
  }

  connect(sampleRate: number = 48000): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(
          `wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=${sampleRate}`,
          ['token', this.apiKey]
        )

        this.ws.onopen = () => {
          // Configure Deepgram
          this.ws?.send(JSON.stringify({
            type: 'Configure',
            features: {
              model: 'nova-2',
              language: 'nl',
              smart_format: true,
              interim_results: true
            }
          }))
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            if (data.type === 'Results') {
              const transcript = data.channel?.alternatives?.[0]?.transcript || ''
              if (transcript.trim()) {
                this.callbacks.onTranscript(transcript, data.is_final)
              }
            }
          } catch (err) {
            console.error('Fout bij verwerken transcript:', err)
            this.callbacks.onError?.(err instanceof Error ? err : new Error('Transcript verwerking mislukt'))
          }
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          this.callbacks.onError?.(new Error('WebSocket verbinding mislukt'))
          reject(error)
        }

      } catch (error) {
        console.error('Connection error:', error)
        reject(error)
      }
    })
  }

  sendAudio(audioData: Int16Array): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(audioData.buffer)
    }
  }

  async disconnect(): Promise<void> {
    console.log('DeepgramService.disconnect aangeroepen')
    
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is open, sending CloseStream')
      this.ws.send(JSON.stringify({ type: 'CloseStream' }))
      this.ws.close()
      console.log('WebSocket closed')
    } else if (this.ws) {
      console.log(`WebSocket in status: ${this.ws.readyState}, closing...`)
      try {
        this.ws.close()
      } catch (err) {
        console.error('Error closing WebSocket:', err)
      }
    }
    
    this.ws = null
    console.log('DeepgramService.disconnect voltooid')
  }
} 