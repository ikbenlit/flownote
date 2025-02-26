export type Language = 'nl' | 'en';

export interface Translations {
  [key: string]: {
    [language in Language]: string;
  };
}

export const translations: Translations = {
  // Common
  'app.name': {
    nl: 'FlowNote',
    en: 'FlowNote',
  },
  'app.welcome': {
    nl: 'Welkom bij je Werkruimte',
    en: 'Welcome to Your Workspace',
  },
  'app.subtitle': {
    nl: 'Begin met creëren met AI-ondersteunde hulp.',
    en: 'Start creating with AI-powered assistance.',
  },
  'app.copyright': {
    nl: 'Alle rechten voorbehouden.',
    en: 'All rights reserved.',
  },
  'app.loading': {
    nl: 'Laden...',
    en: 'Loading...',
  },

  // Navigation
  'nav.transcribe': {
    nl: 'Transcriberen',
    en: 'Transcribe',
  },
  'nav.notes': {
    nl: 'Notities',
    en: 'Notes',
  },
  'nav.ai-generator': {
    nl: 'AI Generator',
    en: 'AI Generator',
  },

  // Auth
  'auth.login': {
    nl: 'Inloggen',
    en: 'Login',
  },
  'auth.logout': {
    nl: 'Uitloggen',
    en: 'Logout',
  },
  'auth.register': {
    nl: 'Registreren',
    en: 'Register',
  },
  'auth.login.with.google': {
    nl: 'Aanmelden met Google',
    en: 'Sign in with Google',
  },
  'auth.welcome.message': {
    nl: 'Welkom bij FlowNote',
    en: 'Welcome to FlowNote',
  },
  'auth.login.subtitle': {
    nl: 'Meld je aan om je notities en transcripties te beheren',
    en: 'Sign in to manage your notes and transcriptions',
  },
  'auth.profile.image': {
    nl: 'Profielfoto',
    en: 'Profile Image',
  },

  // Notes
  'notes.create': {
    nl: 'Nieuwe Notitie',
    en: 'New Note',
  },
  'notes.edit': {
    nl: 'Notitie Bewerken',
    en: 'Edit Note',
  },
  'notes.delete': {
    nl: 'Notitie Verwijderen',
    en: 'Delete Note',
  },
  'notes.save': {
    nl: 'Opslaan',
    en: 'Save',
  },
  'notes.cancel': {
    nl: 'Annuleren',
    en: 'Cancel',
  },
  'notes.empty.state': {
    nl: 'Nog geen notities gevonden. Begin met het maken van je eerste notitie!',
    en: 'No notes found yet. Start by creating your first note!',
  },
  'notes.edit.title': {
    nl: 'Bewerk notitie',
    en: 'Edit note',
  },
  'notes.delete.title': {
    nl: 'Verwijder notitie',
    en: 'Delete note',
  },
  'notes.view': {
    nl: 'Bekijk Notitie',
    en: 'View Note',
  },
  'notes.updated': {
    nl: 'Bijgewerkt op:',
    en: 'Updated on:',
  },

  // Transcription
  'transcription.start': {
    nl: 'Start Opname',
    en: 'Start Recording',
  },
  'transcription.stop': {
    nl: 'Stop Opname',
    en: 'Stop Recording',
  },
  'transcription.save': {
    nl: 'Transcriptie Opslaan',
    en: 'Save Transcription',
  },

  // AI Generator
  'ai.generate': {
    nl: 'Genereren',
    en: 'Generate',
  },
  'ai.prompt': {
    nl: 'Voer je prompt in...',
    en: 'Enter your prompt...',
  },

  // Theme
  'theme.dark': {
    nl: 'Donker Thema',
    en: 'Dark Theme',
  },
  'theme.light': {
    nl: 'Licht Thema',
    en: 'Light Theme',
  },
  'theme.toggle': {
    nl: 'Thema Wisselen',
    en: 'Toggle Theme',
  },

  // Language
  'language.select': {
    nl: 'Taal Selecteren',
    en: 'Select Language',
  },
  'language.nl': {
    nl: 'Nederlands',
    en: 'Dutch',
  },
  'language.en': {
    nl: 'Engels',
    en: 'English',
  },

  // Landing Page
  'landing.hero.title': {
    nl: 'Welkom bij FlowNote',
    en: 'Welcome to FlowNote',
  },
  'landing.hero.subtitle': {
    nl: 'Transformeer je gedachten in georganiseerde notities',
    en: 'Transform your thoughts into organized notes',
  },
  'landing.cta.start': {
    nl: 'Start met Schrijven',
    en: 'Start Writing',
  },
  'landing.cta.demo': {
    nl: 'Bekijk Demo',
    en: 'View Demo',
  },
  'landing.feature.writing.title': {
    nl: 'Natuurlijk Schrijven',
    en: 'Natural Writing',
  },
  'landing.feature.writing.description': {
    nl: 'Een rustgevende omgeving voor het vastleggen van je gedachten, met een handgeschreven gevoel.',
    en: 'A calming environment for capturing your thoughts with a handwritten feel.',
  },
  'landing.feature.speech.title': {
    nl: 'Spraak naar Tekst',
    en: 'Speech to Text',
  },
  'landing.feature.speech.description': {
    nl: 'Spreek je gedachten uit en zie ze direct omgezet worden in tekst met onze geavanceerde spraakherkenning.',
    en: 'Speak your thoughts and see them instantly converted to text with our advanced speech recognition.',
  },
  'landing.feature.ai.title': {
    nl: 'AI Assistent',
    en: 'AI Assistant',
  },
  'landing.feature.ai.description': {
    nl: 'Laat onze AI je helpen met het structureren, samenvatten en verbeteren van je notities.',
    en: 'Let our AI help you structure, summarize, and improve your notes.',
  },
  'landing.cta.section.title': {
    nl: 'Begin Vandaag met FlowNote',
    en: 'Start with FlowNote Today',
  },
  'landing.cta.section.subtitle': {
    nl: 'Ontdek hoe FlowNote je helpt bij het organiseren van je gedachten en ideeën',
    en: 'Discover how FlowNote helps you organize your thoughts and ideas',
  },
  'landing.cta.register': {
    nl: 'Gratis Aanmelden',
    en: 'Register for Free',
  },
  'landing.social.title': {
    nl: 'Wat gebruikers zeggen',
    en: 'What users are saying',
  },
}; 