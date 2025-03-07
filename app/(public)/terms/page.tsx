import React from 'react'
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden - FlowNote',
  description: 'Algemene voorwaarden en gebruiksvoorwaarden van FlowNote',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Algemene Voorwaarden</h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Algemeen</h2>
        <p>Deze voorwaarden zijn van toepassing op alle diensten van FlowNote:</p>
        <ul>
          <li>Notitie management</li>
          <li>Taakbeheer</li>
          <li>AI assistentie</li>
          <li>Transcriptie services</li>
        </ul>

        <h2>2. Gebruik van de Service</h2>
        <p>Bij gebruik van FlowNote gaat u akkoord met:</p>
        <ul>
          <li>Verantwoordelijk gebruik van de diensten</li>
          <li>Respect voor intellectueel eigendom</li>
          <li>Geen misbruik van de AI functionaliteit</li>
          <li>Geen delen van toegangsgegevens</li>
        </ul>

        <h2>3. Aansprakelijkheid</h2>
        <p>FlowNote:</p>
        <ul>
          <li>Streeft naar 99.9% beschikbaarheid</li>
          <li>Is niet aansprakelijk voor dataverlies</li>
          <li>Adviseert regelmatige backups</li>
          <li>Behoudt zich het recht voor diensten te wijzigen</li>
        </ul>

        <h2>4. Beëindiging</h2>
        <p>U kunt:</p>
        <ul>
          <li>Uw account op elk moment opzeggen</li>
          <li>Een kopie van uw data opvragen</li>
          <li>Verzoeken tot volledige verwijdering</li>
        </ul>
      </div>
    </div>
  )
} 