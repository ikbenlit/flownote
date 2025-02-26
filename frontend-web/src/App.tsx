import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TranscriptionPage } from './pages/transcription-page';
import { NotesPage } from './pages/NotesPage';
import { NoteDetailPage } from './pages/NoteDetailPage';
import { NoteEditPage } from './pages/NoteEditPage';
import { NewNotePage } from './pages/NewNotePage';
import { NewNoteFromTranscriptionPage } from './pages/NewNoteFromTranscriptionPage';
import AIGeneratorPage from './pages/AIGeneratorPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { NoteProvider } from './context/NoteContext';
import { AuthProvider } from './context/AuthContext';
import { AIProvider } from './context/AIContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import { MainLayout } from './components/MainLayout';

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AuthProvider>
          <NoteProvider>
            <AIProvider>
              <Router>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  
                  {/* Protected routes wrapped in MainLayout */}
                  <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>
                      <Route path="/app" element={<DashboardPage />} />
                      <Route path="/transcribe" element={<TranscriptionPage />} />
                      <Route path="/notes" element={<NotesPage />} />
                      <Route path="/notes/:id" element={<NoteDetailPage />} />
                      <Route path="/notes/edit/:id" element={<NoteEditPage />} />
                      <Route path="/notes/new" element={<NewNotePage />} />
                      <Route path="/notes/new-from-transcription" element={<NewNoteFromTranscriptionPage />} />
                      <Route path="/ai-generator" element={<AIGeneratorPage />} />
                    </Route>
                  </Route>
                </Routes>
              </Router>
            </AIProvider>
          </NoteProvider>
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
