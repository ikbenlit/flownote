import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Genereer tekst op basis van een prompt en teksttype
 */
export async function POST(request: Request) {
  try {
    const { prompt, textType, existingText } = await request.json()

    // Valideer verplichte velden
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is verplicht' },
        { status: 400 }
      )
    }

    if (!textType) {
      return NextResponse.json(
        { error: 'Teksttype is verplicht' },
        { status: 400 }
      )
    }

    // Valideer teksttype
    const validTextTypes = ['blog', 'email', 'report', 'social', 'task']
    if (!validTextTypes.includes(textType.toLowerCase())) {
      return NextResponse.json(
        {
          error: 'Ongeldig teksttype',
          validTypes: validTextTypes
        },
        { status: 400 }
      )
    }

    // Genereer de systeemprompt op basis van het teksttype
    const systemPrompt = getSystemPromptForTextType(textType)
    let userPrompt = prompt
    
    // Als er bestaande tekst is, voeg deze toe aan de prompt
    if (existingText) {
      userPrompt = `${prompt}\n\nBestaande tekst om mee te werken:\n${existingText}`
    }

    // Genereer tekst met OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const generatedText = response.choices[0]?.message?.content || ''
    return NextResponse.json({ generatedText })
  } catch (error) {
    console.error('OpenAI tekstgeneratie fout:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het genereren van tekst' },
      { status: 500 }
    )
  }
}

/**
 * Krijg de juiste systeemprompt op basis van teksttype
 */
function getSystemPromptForTextType(textType: string): string {
  switch (textType.toLowerCase()) {
    case 'blog':
      return 'Je bent een professionele blogger. Schrijf een boeiende blog post in het Nederlands met een duidelijke structuur, inclusief inleiding, hoofdpunten en conclusie. Gebruik een conversationele toon en zorg voor een goede leesbaarheid.'
    case 'email':
      return 'Je bent een professionele communicatiespecialist. Schrijf een duidelijke en effectieve e-mail in het Nederlands met een passende aanhef, kernboodschap en afsluiting. Pas de toon aan op basis van de context.'
    case 'report':
      return 'Je bent een analist. Schrijf een gestructureerd verslag in het Nederlands met een duidelijke indeling, objectieve toon en feitelijke presentatie. Zorg voor een professionele en formele schrijfstijl.'
    case 'social':
      return 'Je bent een social media expert. Schrijf een pakkende social media post in het Nederlands die aandacht trekt en engagement stimuleert. Houd de tekst kort, krachtig en relevant voor het platform.'
    case 'task':
      return 'Je bent een projectmanager. Schrijf een duidelijke taakbeschrijving in het Nederlands met concrete actiepunten, verantwoordelijkheden en deadlines. Zorg voor een heldere en beknopte formulering.'
    default:
      return 'Je bent een professionele tekstschrijver. Schrijf een heldere en gestructureerde tekst in het Nederlands die past bij het gevraagde doel. Zorg voor een logische opbouw en duidelijke boodschap.'
  }
} 