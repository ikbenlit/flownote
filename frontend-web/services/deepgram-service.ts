type DeepgramCallbacks = {
  onLiveTranscript: (text: string) => void; // Voor tussentijdse updates
  onFinalTranscript: (text: string) => void; // Voor definitieve tekst
  onError?: (error: Error) => void; // Optionele error callback
};

export class DeepgramService {
  private ws: WebSocket | null = null;
  private callbacks: DeepgramCallbacks;
  private apiKey: string;
  private isConnected: boolean = false;

  constructor(apiKey: string, callbacks: DeepgramCallbacks) {
    if (!apiKey) throw new Error('Deepgram API key is vereist');
    this.apiKey = apiKey;
    this.callbacks = callbacks;
  }

  connect(sampleRate: number = 48000): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        console.warn('Deepgram is al verbonden, negeer nieuwe connect-aanroep');
        resolve();
        return;
      }

      try {
        this.ws = new WebSocket(
          `wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=${sampleRate}&language=nl&model=nova-2&smart_format=true&interim_results=true&punctuate=true`,
          ['token', this.apiKey]
        );

        this.ws.onopen = () => {
          console.log('Deepgram WebSocket verbinding geopend');
          this.isConnected = true;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === 'Results' && data.channel?.alternatives?.[0]?.transcript) {
              const transcript = data.channel.alternatives[0].transcript.trim();
              if (!transcript) return; // Skip lege transcripties

              console.log('Transcript ontvangen:', {
                transcript,
                isFinal: data.is_final,
                confidence: data.channel.alternatives[0].confidence,
              });

              if (data.is_final) {
                this.callbacks.onFinalTranscript(transcript);
              } else {
                this.callbacks.onLiveTranscript(transcript);
              }
            }
          } catch (err) {
            const error = err instanceof Error ? err : new Error('Fout bij verwerken transcript');
            console.error('Fout bij verwerken Deepgram bericht:', error);
            this.callbacks.onError?.(error);
          }
        };

        this.ws.onerror = (event) => {
          const error = new Error('Deepgram WebSocket verbinding mislukt');
          console.error('WebSocket error:', event);
          this.callbacks.onError?.(error);
          this.isConnected = false;
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('Deepgram WebSocket verbinding gesloten');
          this.isConnected = false;
        };
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Verbinding met Deepgram mislukt');
        console.error('Fout bij opzetten Deepgram verbinding:', err);
        this.callbacks.onError?.(err);
        reject(err);
      }
    });
  }

  sendAudio(audioData: Int16Array): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket niet open, audio niet verzonden');
      return;
    }
    try {
      this.ws.send(audioData.buffer);
    } catch (err) {
      console.error('Fout bij verzenden audio:', err);
      this.callbacks.onError?.(err instanceof Error ? err : new Error('Audio verzenden mislukt'));
    }
  }

  async disconnect(): Promise<void> {
    if (!this.ws) {
      console.log('Geen WebSocket om te sluiten');
      return;
    }

    try {
      if (this.ws.readyState === WebSocket.OPEN) {
        console.log('Deepgram WebSocket wordt gesloten');
        this.ws.send(JSON.stringify({ type: 'CloseStream' }));
        this.ws.close();
      } else {
        console.log(`WebSocket reeds in status: ${this.ws.readyState}, geen actie nodig`);
      }
    } catch (err) {
      console.error('Fout bij sluiten WebSocket:', err);
    } finally {
      this.ws = null;
      this.isConnected = false;
      console.log('DeepgramService disconnect voltooid');
    }
  }

  isActive(): boolean {
    return this.isConnected && this.ws?.readyState === WebSocket.OPEN;
  }
}