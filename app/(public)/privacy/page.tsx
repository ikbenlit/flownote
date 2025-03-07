import React from 'react'
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Privacy Policy - FlowNote',
  description: 'Privacy beleid en gegevensbescherming van FlowNote',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Gegevensverzameling</h2>
        <p>Wij verzamelen alleen gegevens die noodzakelijk zijn voor het functioneren van FlowNote:</p>
        <ul>
          <li>Email adres voor authenticatie</li>
          <li>Gebruikersnaam</li>
          <li>Door u gemaakte notities en taken</li>
          <li>Transcriptie data</li>
        </ul>

        <h2>2. Gegevensgebruik</h2>
        <p>Uw gegevens worden gebruikt voor:</p>
        <ul>
          <li>Authenticatie en beveiliging</li>
          <li>Het leveren van de FlowNote diensten</li>
          <li>Verbetering van onze services</li>
        </ul>

        <h2>3. Gegevensbescherming</h2>
        <p>Wij nemen de bescherming van uw gegevens serieus:</p>
        <ul>
          <li>Alle data wordt versleuteld opgeslagen</li>
          <li>Toegang is beperkt tot uw eigen account</li>
          <li>Regelmatige security audits</li>
        </ul>

        <h2>4. Uw Rechten</h2>
        <p>U heeft het recht om:</p>
        <ul>
          <li>Uw gegevens in te zien</li>
          <li>Uw gegevens te laten verwijderen</li>
          <li>Een kopie van uw gegevens op te vragen</li>
          <li>Bezwaar te maken tegen gegevensverwerking</li>
        </ul>
      </div>
    </div>
  )
} 