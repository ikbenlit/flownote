// Eenvoudige test voor Deepgram SDK
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@deepgram/sdk');

async function testDeepgram() {
  console.log('Deepgram test script');
  
  try {
    // API Key ophalen
    const apiKey = process.env.DEEPGRAM_API_KEY;
    if (!apiKey) {
      console.error('DEEPGRAM_API_KEY ontbreekt in .env.local');
      return;
    }
    
    console.log(`API Key gevonden: ${apiKey.substring(0, 5)}...`);
    
    // SDK versie
    const sdkVersion = require('@deepgram/sdk/package.json').version;
    console.log(`Deepgram SDK versie: ${sdkVersion}`);
    
    // Client initialiseren
    console.log('Client initialiseren...');
    const deepgram = createClient(apiKey);
    console.log('Client succesvol geïnitialiseerd');
    
    // Probeer een token te genereren
    // Volgens v3 migratiegids: https://developers.deepgram.com/docs/js-sdk-v2-to-v3-migration-guide
    console.log('Token genereren...');
    try {
      // V3 format: project ID is niet nodig, direct op deepgram.keys
      const { result, error } = await deepgram.keys.create({
        comment: 'Test token',
        scopes: ['member'],
        expiresIn: 60
      });
      
      if (error) {
        console.error('Error tijdens key creation:', error);
        return;
      }
      
      if (result && result.key) {
        console.log(`Token succesvol gegenereerd: ${result.key.substring(0, 5)}...`);
      } else {
        console.error('Geen token ontvangen in het resultaat:', result);
      }
    } catch (tokenError) {
      console.error('Fout bij genereren token:', tokenError);
    }
  } catch (error) {
    console.error('Algemene fout:', error);
  }
}

// Test uitvoeren
testDeepgram(); 