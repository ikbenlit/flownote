import { NextResponse } from 'next/server'
import { createClient } from '@deepgram/sdk'

export async function GET() {
  try {
    const apiKey = process.env.DEEPGRAM_API_KEY

    if (!apiKey) {
      console.error('Deepgram API key ontbreekt')
      return NextResponse.json(
        { error: 'Deepgram API key configuratie ontbreekt' },
        { status: 500 }
      )
    }

    const deepgram = createClient(apiKey)

    try {
      const { result } = await deepgram.keys.create({
        scopes: ['member'],
        expiresIn: 60,
        comment: 'Tijdelijke key voor live transcriptie'
      })

      if (!result || !result.key) {
        throw new Error('Geen key ontvangen van Deepgram API')
      }

      return NextResponse.json({ token: result.key })
    } catch (apiError: any) {
      console.error('Deepgram API fout:', apiError)
      return NextResponse.json(
        { error: `Er is een fout opgetreden bij het genereren van het token: ${apiError.message}` },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Onverwachte fout:', error)
    return NextResponse.json(
      { error: `Er is een onverwachte fout opgetreden: ${error.message}` },
      { status: 500 }
    )
  }
} 