# Vereenvoudigd Implementatieplan: Taken bij Opslaan

Dit vereenvoudigde implementatieplan richt zich op het wijzigen van het gedrag van tekstmarkeringen in FlowNote. In plaats van direct taken aanmaken bij het klikken op een markering, zullen taken worden aangemaakt bij het opslaan van de notitie, waarna de markeringen worden verwijderd.

## Fase 1: Aanpassen van de TaskMarkExtension

### 1.1 Verwijderen van directe taakcreatie
- Identificeer en verwijder de code die direct een taak aanmaakt wanneer een gebruiker op een markering klikt
- Verwijder event listeners voor klik-acties op markeringen (behoud wel de visuele stijling)
- Behoud de functionaliteit om markeringen aan te maken via het Bubble Menu

### 1.2 Behoud markeringsmetadata
- Zorg dat bij het markeren nog steeds de juiste metadata wordt opgeslagen:
  - Uniek ID (via UUID)
  - Start- en eindpositie in document
  - De gemarkeerde tekst zelf
  - Tijdstempel van markeren

## Fase 2: Implementeren van Batch Verwerking bij Opslaan

### 2.1 Extractie van markeringen
- Verbeter/controleer de bestaande functie om alle markeringen uit de editor te extraheren
- Zorg dat deze functie de volledige metadata van elke markering ophaalt

### 2.2 Aanpassen van de handleSubmit functie
- Identificeer de handleSubmit functie in NoteEditor.tsx
- Voeg logica toe om vóór het opslaan alle markeringen te verzamelen
- Implementeer een loop die voor elke markering een taak aanmaakt via TaskContext
- Houd bij hoeveel taken zijn aangemaakt
- Voeg functionaliteit toe om na het aanmaken van taken alle markeringen te verwijderen

### 2.3 Verwijderen van markeringen
- Implementeer een functie om alle taakmarkeringen uit de editor te verwijderen 
- Zorg dat dit gebeurt nadat de taken zijn aangemaakt maar voordat de notitie wordt opgeslagen
- Verzeker dat de uiteindelijk opgeslagen notitie geen markeringen meer bevat

## Fase 3: Gebruikersfeedback

### 3.1 Notificatiefunctionaliteit
- Implementeer of hergebruik bestaande toast/notificatie-functionaliteit
- Toon een melding na het opslaan met het aantal aangemaakte taken
- Zorg voor verschillende meldingen bij 0, 1 of meerdere taken

### 3.2 Vertalingen voor nieuwe meldingen
- Voeg vertalingen toe voor de nieuwe meldingen
- Zorg voor ondersteuning van meervouden (één taak vs. meerdere taken)

## Fase 4: Testen en Validatie

### 4.1 Handmatig testen
- Test de volledige flow van markeren tot taakcreatie
- Verifieer dat markeringen correct worden gemaakt en weergegeven
- Controleer dat taken correct worden aangemaakt bij opslaan
- Valideer dat markeringen worden verwijderd na opslaan
- Test verschillende scenario's (geen markeringen, veel markeringen, etc.)

### 4.2 Edge cases afhandelen
- Test gedrag met zeer lange markeringen
- Verifieer gedrag bij annuleren van opslaan
- Controleer gedrag bij navigeren weg van editor met onopgeslagen markeringen

## Tijdlijn en Afhankelijkheden

- **Fase 1**: 1 dag - Aanpassing van het gedrag van markeringen
- **Fase 2**: 1-2 dagen - Implementatie van de batch verwerking
- **Fase 3**: 0,5 dag - Toevoegen van gebruikersfeedback
- **Fase 4**: 0,5-1 dag - Testen en bug fixes

Totale geschatte implementatietijd: 3-4,5 dagen

## Voordelen van deze Aanpak

- **Eenvoudigere gebruikerservaring**: Markeren tijdens schrijven, taken worden alleen aangemaakt bij opslaan
- **Verminderde complexiteit**: Geen synchronisatie tussen taken en markeringen nodig
- **Duidelijke feedback**: Gebruiker weet exact hoeveel taken zijn aangemaakt
- **Schone interface**: Na opslaan beginnen gebruikers met een "schone lei" qua markeringen
- **Minder accidentele taakcreatie**: Voorkomt dat gebruikers per ongeluk taken aanmaken door op markeringen te klikken
