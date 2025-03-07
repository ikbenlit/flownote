const translations = {
  app: {
    title: 'FlowNote',
    error: {
      unexpected: 'Er is een onverwachte fout opgetreden'
    }
  },
  auth: {
    login_title: 'Inloggen',
    email: 'E-mailadres',
    password: 'Wachtwoord',
    login: 'Inloggen',
    logging_in: 'Bezig met inloggen...',
    error: {
      invalid_credentials: 'Ongeldige inloggegevens',
      email_not_verified: 'E-mailadres is nog niet geverifieerd',
      session_expired: 'Je sessie is verlopen, log opnieuw in'
    }
  },
  dashboard: {
    welcome: 'Welkom',
    subtitle: 'Wat wil je vandaag doen?',
    quick_actions: 'Snelle acties',
    create_note: 'Nieuwe notitie',
    start_recording: 'Start opname',
    generate_ai: 'AI Generator',
    recent_notes: 'Recente notities',
    view_all: 'Bekijk alles',
    no_recent_notes: 'Je hebt nog geen notities gemaakt'
  },
  notes: {
    title: 'Notities',
    subtitle: 'Beheer al je notities',
    create: 'Nieuwe notitie',
    search_placeholder: 'Zoek in notities...',
    updated: 'Bijgewerkt:',
    delete: {
      title: 'Notitie verwijderen',
      confirmation: 'Weet je zeker dat je deze notitie wilt verwijderen?'
    },
    cancel: 'Annuleren',
    no_notes: 'Je hebt nog geen notities',
    title_label: 'Titel',
    title_placeholder: 'Voer een titel in...',
    content_label: 'Inhoud',
    content_placeholder: 'Begin met typen...',
    tags_label: 'Tags',
    tags_placeholder: 'Voeg een tag toe...',
    add_tag: 'Tag toevoegen',
    save: 'Opslaan',
    error: {
      title_required: 'Titel is verplicht',
      content_required: 'Inhoud is verplicht',
      save_failed: 'Het opslaan van de notitie is mislukt'
    }
  },
  transcription: {
    title: 'Audio transcriptie',
    subtitle: 'Neem audio op of upload een bestand om te transcriberen',
    result: 'Transcriptie resultaat',
    save: 'Opslaan',
    edit_save: 'Bewerken & opslaan',
    status: {
      connected: 'Verbonden met Deepgram',
      recording: 'Opname bezig...',
      processing: 'Verwerken...',
      idle: 'Klaar om op te nemen'
    },
    error: {
      token_failed: 'Kon geen toegangstoken verkrijgen',
      websocket: 'Deepgram WebSocket fout',
      connection_failed: 'Verbinding met Deepgram mislukt',
      recording_failed: 'Kon niet beginnen met opnemen',
      no_speech: 'Geen spraak gedetecteerd',
      permission_denied: 'Toegang tot microfoon geweigerd',
      microphone: 'Kon geen toegang krijgen tot de microfoon',
      processing: 'Er is een fout opgetreden bij het verwerken van de audio'
    },
    actions: {
      start: 'Start opname',
      stop: 'Stop opname'
    },
    info: {
      silence_timer: 'Stilte: {0} seconden',
      processing_hint: 'Transcriptie wordt verwerkt...'
    }
  },
  ai_generator: {
    title: 'AI Generator',
    subtitle: 'Genereer content met AI',
    prompt_placeholder: 'Waar wil je over schrijven?',
    generate: 'Genereren',
    save: 'Opslaan als notitie',
    processing: 'AI genereert content...',
    error: 'Er is een fout opgetreden bij het genereren van content'
  },
  tasks: {
    title: 'Taken',
    subtitle: 'Beheer je to-do lijst',
    add: 'Taak toevoegen',
    placeholder: 'Nieuwe taak...',
    no_tasks: 'Geen taken gevonden',
    delete: {
      title: 'Taak verwijderen',
      confirmation: 'Weet je zeker dat je deze taak wilt verwijderen?'
    },
    mark: 'Markeer als taak',
    marked_count_label: '{0} taken gemarkeerd',
    marked_texts: 'Gemarkeerde taken',
    remove_marking: 'Markering verwijderen',
    batch_created_count: '{0} taken zijn aangemaakt',
    error: {
      batch_creation_failed: 'Sommige taken konden niet worden aangemaakt'
    }
  },
  formatting: {
    bold: 'Vet',
    italic: 'Cursief',
    underline: 'Onderstrepen',
    heading1: 'Kop 1',
    heading2: 'Kop 2',
    heading3: 'Kop 3',
    bullet_list: 'Opsomming',
    ordered_list: 'Genummerde lijst',
    insert_link: 'Link invoegen',
    enter_url: 'Voer de URL in'
  }
} as const

export type TranslationKey = keyof typeof translations

export default translations 