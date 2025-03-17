# Prioriteiten & Aanbevelingen

## 1. Transcriptie Pagina (app/app/transcribe)
Je transcriptie-functionaliteit heeft een goede basis, maar kan inderdaad verbeterd worden.

### Aanbevelingen:

- **Deepgram taalselectie:** Voeg een taalschakelaar toe met Nederlands als standaard, maar geef gebruikers de optie om te wisselen.
- **Juiste Deepgram model:** Update de API-aanroep om het nova-2 model te gebruiken voor betere resultaten in het Nederlands:

```javascript
// In de backend API call
const options = {
  language: 'nl',
  model: 'nova-2',
  smart_format: true
};
```

- **Visualisatie verbeteren:** Voeg real-time geluidsvisualisatie toe en een duidelijkere indicatie van opnamestatus.
- **Van spraak naar notitie:** Zorg voor een naadloze knop "Opslaan als notitie" die direct navigeert naar het notitie-aanmaakformulier met voorgevulde transcriptie.

## 2. Notities Pagina (app/app/notes)

### Aanbevelingen:

- **HTML-weergave oplossen:** Gebruik een veilige HTML-rendering oplossing. In plaats van dangerouslySetInnerHTML:

```javascript
// Installeer eerst: npm install react-html-parser
import parse from 'html-react-parser';

// In je component
{parse(note.content)}
```

- **Rich Text Editor implementeren:** Integreer TipTap voor een betere editor-ervaring:
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-highlight
```

- **Taakmarkering:** Voeg een aangepaste TipTap-extensie toe die tekst kan markeren als taak.

## 3. Taken Pagina (app/app/tasks)

### Aanbevelingen:

- **Datamodel eerst:** 
  - Definieer het Task model met velden zoals title, status, priority, sourceNoteId, en dueDate.
- **Weergave-opties:** 
  - Bouw een schakelaar tussen lijstweergave en kaartweergave.
- **Taak management:** 
  - Implementeer functionaliteit voor het afvinken, bewerken en verwijderen van taken.
- **Groepering van taken:** 
  - Voeg filtering toe op bron-notitie om gerelateerde taken samen te zien.

## Stapsgewijze Aanpak

### Fase 1: Verbeter Core Transcriptie
1. Update de Deepgram integratie voor Nederlands
2. Verbeter de visualisatie
3. Implementeer "Opslaan als notitie" functionaliteit

### Fase 2: Fix en Verbeter Notities
1. Los het HTML-weergaveprobleem op
2. Implementeer de TipTap rich text editor
3. Bouw de basis taakmarkering

### Fase 3: Bouw Taken Functionaliteit
1. Ontwerp het takenmodel en database structuur
2. Implementeer weergave-opties
3. Voeg taakbeheer toe (status wijzigen, verwijderen)
4. Implementeer notitie-naar-taak extractie

## Code Voorbeelden voor Fase 1

### Deepgram Integratie Verbetering:

```typescript
// In de backend functie die Deepgram aanroept (index.ts of transcription-controller.ts)
const transcribeAudio = async (audioBuffer: Buffer) => {
  try {
    const response = await deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      {
        language: 'nl',         // Nederlands als standaard
        model: 'nova-2',        // Het nieuwste model voor betere nauwkeurigheid
        smart_format: true,     // Automatische interpunctie en formatting
        diarize: true,          // Spreker onderscheiding (indien nodig)
        utterances: true        // Splits op natuurlijke pauzes
      }
    );
    
    return response.results;
  } catch (error) {
    console.error('Deepgram error:', error);
    throw new Error('Transcriptie mislukt');
  }
};
```

### Opslaan als Notitie Functionaliteit:

```typescript
// In TranscribePage component
const handleSaveAsNote = () => {
  router.push({
    pathname: '/app/notes/new',
    query: { 
      content: transcription,
      title: `Transcriptie ${new Date().toLocaleDateString()}` 
    }
  });
};

// En add button
<Button onClick={handleSaveAsNote} disabled={!transcription}>
  <FaSave className="mr-2" />
  Opslaan als notitie
</Button>
```