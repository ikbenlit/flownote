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

    // SDK versie informatie ophalen
    const sdkVersion = require('@deepgram/sdk/package.json').version
    
    // Probeer de client te creëren zonder een token aan te maken
    try {
      const deepgram = createClient(apiKey)
      
      return NextResponse.json({
        status: 'success',
        message: 'Deepgram client succesvol geïnitialiseerd',
        sdk_version: sdkVersion,
        api_key_length: apiKey.length,
        api_key_prefix: apiKey.substring(0, 5) + '...'
      })
    } catch (clientError: any) {
      console.error('Deepgram client initialisatie fout:', clientError)
      return NextResponse.json(
        { 
          error: 'Client initialisatie fout', 
          message: clientError.message,
          sdk_version: sdkVersion
        },
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