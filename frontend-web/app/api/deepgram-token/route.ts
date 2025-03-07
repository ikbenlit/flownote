import { NextResponse } from 'next/server'
import { createClient } from '@deepgram/sdk'

export async function GET() {
  try {
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY

    if (!deepgramApiKey) {
      return NextResponse.json(
        { error: 'Deepgram API key is niet geconfigureerd' },
        { status: 500 }
      )
    }

    const deepgram = createClient(deepgramApiKey)
    const { key: token } = await deepgram.keys.create({
      comment: 'Temporary key for browser transcription',
      scopes: ['usage:write'],
      timeToLive: 60, // Token is 60 seconden geldig
    })

    return NextResponse.json({ token })
  } catch (error) {
    console.error('Error generating Deepgram token:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het genereren van het token' },
      { status: 500 }
    )
  }
} 