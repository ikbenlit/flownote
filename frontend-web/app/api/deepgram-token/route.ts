import { NextResponse } from 'next/server'
import { createClient } from '@deepgram/sdk'

export async function GET() {
  try {
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY

    if (!deepgramApiKey) {
      console.error('Deepgram API key ontbreekt in omgevingsvariabelen')
      return NextResponse.json(
        { error: 'Deepgram API key is niet geconfigureerd' },
        { status: 500 }
      )
    }

    try {
      const deepgram = createClient(deepgramApiKey)
      const { key: token } = await deepgram.keys.create({
        comment: 'Temporary key for browser transcription',
        scopes: ['usage:write'],
        timeToLive: 60, // Token is 60 seconden geldig
      })

      if (!token) {
        throw new Error('Geen token ontvangen van Deepgram API')
      }

      return NextResponse.json({ token })
    } catch (deepgramError) {
      console.error('Deepgram API error:', deepgramError)
      
      // Controleer op specifieke API fouten
      if (deepgramError instanceof Error) {
        // Controleer op rate limiting of authenticatie fouten
        if (deepgramError.message.includes('rate limit') || deepgramError.message.includes('429')) {
          return NextResponse.json(
            { error: 'Deepgram API rate limit bereikt. Probeer het later opnieuw.' },
            { status: 429 }
          )
        } else if (deepgramError.message.includes('authentication') || deepgramError.message.includes('401')) {
          return NextResponse.json(
            { error: 'Authenticatie bij Deepgram API mislukt. Controleer de API sleutel.' },
            { status: 401 }
          )
        }
      }
      
      // Algemene fout
      return NextResponse.json(
        { error: 'Er is een fout opgetreden bij het genereren van het token' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Onverwachte fout bij token generatie:', error)
    return NextResponse.json(
      { error: 'Er is een onverwachte fout opgetreden' },
      { status: 500 }
    )
  }
} 