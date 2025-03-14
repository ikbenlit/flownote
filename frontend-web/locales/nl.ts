const translations = {
  app: {
    title: 'FlowNote',
    error: {
      unexpected: 'Er is een onverwachte fout opgetreden'
    },
    navigation: {
      collapse: 'Menu inklappen',
      expand: 'Menu uitklappen'
    }
  },
  auth: {
    login_title: 'Inloggen',
    register_title: 'Registreren',
    reset_password_title: 'Wachtwoord resetten',
    reset_password_description: 'Voer je e-mailadres in om een wachtwoord reset link te ontvangen.',
    email: 'E-mailadres',
    password: 'Wachtwoord',
    confirm_password: 'Bevestig wachtwoord',
    login: 'Inloggen',
    register: 'Registreren',
    reset_password: 'Reset wachtwoord',
    logging_in: 'Bezig met inloggen...',
    registering: 'Bezig met registreren...',
    resetting_password: 'Bezig met resetten...',
    login_with_google: 'Inloggen met Google',
    register_with_google: 'Registreren met Google',
    or: 'of',
    no_account: 'Nog geen account? Registreer hier',
    forgot_password: 'Wachtwoord vergeten?',
    have_account: 'Heb je al een account? Log hier in',
    error: {
      invalid_credentials: 'Ongeldige inloggegevens',
      email_not_verified: 'E-mailadres is nog niet geverifieerd',
      session_expired: 'Je sessie is verlopen, log opnieuw in',
      passwords_dont_match: 'Wachtwoorden komen niet overeen',
      email_in_use: 'Dit e-mailadres is al in gebruik',
      weak_password: 'Wachtwoord is te zwak',
      invalid_email: 'Ongeldig e-mailadres',
      registration_failed: 'Registratie is mislukt',
      reset_failed: 'Wachtwoord reset is mislukt',
      user_not_found: 'Geen gebruiker gevonden met dit e-mailadres',
      google_popup_closed: 'Google login venster is gesloten',
      google_popup_blocked: 'Google login venster is geblokkeerd',
      google_popup_cancelled: 'Google login is geannuleerd',
      network_error: 'Netwerkfout opgetreden',
      google_login_failed: 'Google login is mislukt',
      google_registration_failed: 'Google registratie is mislukt'
    },
    reset_password_success: 'Er is een wachtwoord reset link verstuurd naar je e-mailadres.'
  },
  dashboard: {
    title: 'Dashboard',
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
    edit: 'Notitie bewerken',
    search_placeholder: 'Zoek in notities...',
    updated: 'Bijgewerkt:',
    delete: {
      title: 'Notitie verwijderen',
      confirmation: 'Weet je zeker dat je deze notitie wilt verwijderen?'
    },
    cancel: 'Annuleren',
    no_notes: 'Je hebt nog geen notities',
    no_title: 'Geen titel',
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
    live_preview: 'Live voorvertoning',
    create_note: 'Maak notitie',
    clear: 'Wissen', // Toegevoegd!
    start: 'Start opname',
    recording: 'Opname bezig...',
    processing: 'Verwerken...',
    status: {
      connected: 'Verbonden met Deepgram',
      connecting: 'Verbinding maken...',
      recording: 'Opname bezig...',
      processing: 'Verwerken...',
      idle: 'Klaar om op te nemen',
    },
    error: {
      token_failed: 'Kon geen toegangstoken verkrijgen',
      websocket: 'Deepgram WebSocket fout',
      connection_failed: 'Verbinding met Deepgram mislukt',
      recording_failed: 'Kon niet beginnen met opnemen',
      no_speech: 'Geen spraak gedetecteerd',
      permission_denied: 'Toegang tot microfoon geweigerd',
      microphone: 'Kon geen toegang krijgen tot de microfoon',
      processing: 'Er is een fout opgetreden bij het verwerken van de audio',
    },
    actions: {
      start: 'Start opname',
      stop: 'Stop opname',
    },
    info: {
      silence_timer: 'Stilte: {0} seconden',
      processing_hint: 'Transcriptie wordt verwerkt...',
    },
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
  settings: {
    title: 'Instellingen',
    appearance: 'Weergave',
    dark_mode: 'Donkere modus',
    light_mode: 'Lichte modus',
    language: 'Taal',
    language_nl: 'Nederlands',
    language_en: 'Engels',
    notifications: 'Notificaties',
    push_notifications: 'Push Notificaties',
    theme_toggle_aria_label: {
      to_light: 'Schakel naar lichte modus',
      to_dark: 'Schakel naar donkere modus'
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