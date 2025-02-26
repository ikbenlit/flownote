import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TranscriptionPage } from './pages/transcription-page';
import { NotesPage } from './pages/NotesPage';
import { NoteDetailPage } from './pages/NoteDetailPage';
import { NoteEditPage } from './pages/NoteEditPage';
import { NewNotePage } from './pages/NewNotePage';
import { NewNoteFromTranscriptionPage } from './pages/NewNoteFromTranscriptionPage';
import AIGeneratorPage from './pages/AIGeneratorPage';
import { LandingPage } from './pages/LandingPage';
import { NoteProvider } from './context/NoteContext';
import { AuthProvider } from './context/AuthContext';
import { AIProvider } from './context/AIContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelector } from './components/LanguageSelector';
import { FaMicrophone, FaStickyNote, FaRobot } from 'react-icons/fa';
import AuthButton from './components/AuthButton';
import { useI18n } from './context/I18nContext';

// Wrapper component to use translations in App
const AppContent = () => {
  const { t } = useI18n();
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <NoteProvider>
          <AIProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/app" element={
                    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-200">
                      <nav className="bg-white dark:bg-dark-bg-secondary shadow-sm dark:shadow-dark-bg-primary">
                        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center space-x-6">
                            <Link to="/app" className="font-architects-daughter text-xl font-bold text-gray-900 dark:text-dark-text-primary">
                              {t('app.name')}
                            </Link>
                            <Link to="/transcribe" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
                              <FaMicrophone className="mr-1.5" />
                              {t('nav.transcribe')}
                            </Link>
                            <Link to="/notes" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
                              <FaStickyNote className="mr-1.5" />
                              {t('nav.notes')}
                            </Link>
                            <Link to="/ai-generator" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
                              <FaRobot className="mr-1.5" />
                              {t('nav.ai-generator')}
                            </Link>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 border-r pr-4 dark:border-gray-700">
                              <ThemeToggle />
                              <LanguageSelector />
                            </div>
                            <AuthButton />
                          </div>
                        </div>
                      </nav>
                      <div className="container mx-auto px-4 py-8">
                        <h1 className="font-architects-daughter text-3xl font-bold">{t('app.welcome')}</h1>
                        <p className="font-patrick-hand mt-2">{t('app.subtitle')}</p>
                      </div>
                    </div>
                  } />
                  <Route path="/transcribe" element={<TranscriptionPage />} />
                  <Route path="/notes" element={<NotesPage />} />
                  <Route path="/notes/:id" element={<NoteDetailPage />} />
                  <Route path="/notes/edit/:id" element={<NoteEditPage />} />
                  <Route path="/notes/new" element={<NewNotePage />} />
                  <Route path="/notes/new-from-transcription" element={<NewNoteFromTranscriptionPage />} />
                  <Route path="/ai-generator" element={<AIGeneratorPage />} />
                </Route>
              </Routes>
            </Router>
          </AIProvider>
        </NoteProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
