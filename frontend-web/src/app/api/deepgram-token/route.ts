import { NextResponse } from 'next/server';

export async function GET() {
  const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
  
  if (!DEEPGRAM_API_KEY) {
    console.error('DEEPGRAM_API_KEY is not configured in environment variables');
    return NextResponse.json(
      { error: 'Deepgram API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Genereer een tijdelijke key die 1 uur geldig is
    const response = await fetch('https://api.deepgram.com/v1/projects/keys', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'temporary-key',
        scopes: ['usage:write'],
        time_to_live_in_seconds: 3600, // 1 uur
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Deepgram API error:', errorData);
      throw new Error(`Failed to generate Deepgram key: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.key) {
      console.error('Unexpected Deepgram API response:', data);
      throw new Error('Invalid response from Deepgram API');
    }

    return NextResponse.json({ key: data.key });
  } catch (error) {
    console.error('Error generating Deepgram key:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate Deepgram key' },
      { status: 500 }
    );
  }
} 