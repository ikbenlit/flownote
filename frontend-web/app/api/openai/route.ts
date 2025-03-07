import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Ongeldige berichten array' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    })

    return NextResponse.json(completion.choices[0].message)
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het verwerken van het verzoek' },
      { status: 500 }
    )
  }
} 