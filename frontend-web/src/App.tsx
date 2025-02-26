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
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import { ThemeToggle } from './components/ThemeToggle';
import { FaMicrophone, FaStickyNote, FaRobot } from 'react-icons/fa';
import AuthButton from './components/AuthButton';

function App() {
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
                              FlowNote
                            </Link>
                            <Link to="/transcribe" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
                              <FaMicrophone className="mr-1.5" />
                              Transcribe
                            </Link>
                            <Link to="/notes" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
                              <FaStickyNote className="mr-1.5" />
                              Notes
                            </Link>
                            <Link to="/ai-generator" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
                              <FaRobot className="mr-1.5" />
                              AI Generator
                            </Link>
                          </div>
                          <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <AuthButton />
                          </div>
                        </div>
                      </nav>
                      <div className="container mx-auto px-4 py-8">
                        <h1 className="font-architects-daughter text-3xl font-bold">Welcome to Your Workspace</h1>
                        <p className="font-patrick-hand mt-2">Start creating with AI-powered assistance.</p>
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
}

export default App;
