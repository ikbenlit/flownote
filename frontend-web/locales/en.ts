const translations = {
  app: {
    title: 'FlowNote',
    error: {
      unexpected: 'An unexpected error occurred'
    },
    navigation: {
      collapse: 'Collapse menu',
      expand: 'Expand menu'
    }
  },
  auth: {
    login_title: 'Login',
    register_title: 'Register',
    reset_password_title: 'Reset Password',
    reset_password_description: 'Enter your email address to receive a password reset link.',
    email: 'Email address',
    password: 'Password',
    confirm_password: 'Confirm password',
    login: 'Login',
    register: 'Register',
    reset_password: 'Reset password',
    logging_in: 'Logging in...',
    registering: 'Registering...',
    resetting_password: 'Resetting...',
    login_with_google: 'Login with Google',
    register_with_google: 'Register with Google',
    or: 'or',
    no_account: 'No account yet? Register here',
    forgot_password: 'Forgot password?',
    have_account: 'Already have an account? Login here',
    logout: 'Logout',
    error: {
      invalid_credentials: 'Invalid login credentials',
      email_not_verified: 'Email address is not verified yet',
      session_expired: 'Your session has expired, please login again',
      passwords_dont_match: 'Passwords do not match',
      email_in_use: 'This email address is already in use',
      weak_password: 'Password is too weak',
      invalid_email: 'Invalid email address',
      registration_failed: 'Registration failed',
      reset_failed: 'Password reset failed',
      user_not_found: 'No user found with this email address',
      google_popup_closed: 'Google login window was closed',
      google_popup_blocked: 'Google login window was blocked',
      google_popup_cancelled: 'Google login was cancelled',
      network_error: 'Network error occurred',
      google_login_failed: 'Google login failed',
      google_registration_failed: 'Google registration failed'
    },
    reset_password_success: 'A password reset link has been sent to your email address.'
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome',
    subtitle: 'What would you like to do today?',
    quick_actions: 'Quick actions',
    create_note: 'New note',
    start_recording: 'Start recording',
    generate_ai: 'AI Generator',
    recent_notes: 'Recent notes',
    view_all: 'View all',
    no_recent_notes: 'You haven\'t created any notes yet'
  },
  notes: {
    title: 'Notes',
    subtitle: 'Manage all your notes',
    create: 'New note',
    search_placeholder: 'Search in notes...',
    updated: 'Updated:',
    delete: {
      title: 'Delete note',
      confirmation: 'Are you sure you want to delete this note?'
    },
    cancel: 'Cancel',
    no_notes: 'You don\'t have any notes yet',
    title_label: 'Title',
    title_placeholder: 'Enter a title...',
    content_label: 'Content',
    content_placeholder: 'Start typing...',
    tags_label: 'Tags',
    tags_placeholder: 'Add a tag...',
    add_tag: 'Add tag',
    save: 'Save',
    error: {
      title_required: 'Title is required',
      content_required: 'Content is required',
      save_failed: 'Failed to save the note'
    }
  },
  transcription: {
    title: 'Audio Transcription',
    subtitle: 'Record audio or upload a file to transcribe',
    result: 'Transcription Result',
    save: 'Save',
    edit_save: 'Edit & Save',
    live_preview: 'Live Preview', // Toegevoegd
    create_note: 'Create Note', // Al aanwezig
    clear: 'Clear', // Al aanwezig
    start: 'Start Recording',
    recording: 'Recording...',
    processing: 'Processing...',
    status: {
      connected: 'Connected to Deepgram',
      connecting: 'Connecting...',
      recording: 'Recording in progress...',
      processing: 'Processing...',
      idle: 'Ready to record'
    },
    error: {
      token_failed: 'Could not obtain access token',
      websocket: 'Deepgram WebSocket error',
      connection_failed: 'Connection to Deepgram failed',
      recording_failed: 'Could not start recording',
      no_speech: 'No speech detected',
      permission_denied: 'Microphone access denied',
      microphone: 'Could not access the microphone',
      processing: 'An error occurred while processing the audio'
    },
    actions: {
      start: 'Start Recording',
      stop: 'Stop Recording'
    },
    info: {
      silence_timer: 'Silence: {0} seconds',
      processing_hint: 'Transcription is being processed...'
    }
  },
  ai_generator: {
    title: 'AI Generator',
    subtitle: 'Generate content with AI',
    prompt_placeholder: 'What would you like to write about?',
    generate: 'Generate',
    save: 'Save as note',
    processing: 'AI is generating content...',
    error: 'An error occurred while generating content'
  },
  tasks: {
    title: 'Tasks',
    subtitle: 'Manage your to-do list',
    add: 'Add task',
    placeholder: 'New task...',
    no_tasks: 'No tasks found',
    task: 'task',
    tasks: 'tasks',
    from_note: 'From note',
    delete: {
      title: 'Delete task',
      confirmation: 'Are you sure you want to delete this task?'
    },
    mark: 'Mark as task',
    marked_count_label: '{0} tasks marked',
    marked_texts: 'Marked tasks',
    remove_marking: 'Remove marking',
    batch_created_count: '{0} tasks have been created',
    filter: {
      all_statuses: 'All statuses',
      all_priorities: 'All priorities',
      clear: 'Clear filters'
    },
    status: {
      todo: 'To do',
      in_progress: 'In progress',
      done: 'Done'
    },
    priority: {
      low: 'Low',
      medium: 'Medium',
      high: 'High'
    },
    error: {
      batch_creation_failed: 'Some tasks could not be created'
    }
  },
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    dark_mode: 'Dark Mode',
    light_mode: 'Light Mode',
    language: 'Language',
    language_nl: 'Dutch',
    language_en: 'English',
    notifications: 'Notifications',
    push_notifications: 'Push Notifications',
    theme_toggle_aria_label: {
      to_light: 'Switch to light mode',
      to_dark: 'Switch to dark mode'
    }
  },
  formatting: {
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    bullet_list: 'Bullet list',
    ordered_list: 'Numbered list',
    insert_link: 'Insert link',
    enter_url: 'Enter the URL'
  }
} as const;

export type TranslationKey = keyof typeof translations;

export default translations;