import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TranscriptionPage } from './pages/transcription-page';
import { NotesPage } from './pages/NotesPage';
import { NoteDetailPage } from './pages/NoteDetailPage';
import { NoteEditPage } from './pages/NoteEditPage';
import { NewNotePage } from './pages/NewNotePage';
import { NewNoteFromTranscriptionPage } from './pages/NewNoteFromTranscriptionPage';
import { NoteProvider } from './context/NoteContext';
import AuthButton from './components/AuthButton';
import { FaMicrophone, FaStickyNote } from 'react-icons/fa';

function App() {
  return (
    <NoteProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <Link to="/" className="text-xl font-bold">FlowNote</Link>
                <Link to="/transcribe" className="text-gray-600 hover:text-blue-500 flex items-center">
                  <FaMicrophone className="mr-1.5" />
                  Transcribe
                </Link>
                <Link to="/notes" className="text-gray-600 hover:text-blue-500 flex items-center">
                  <FaStickyNote className="mr-1.5" />
                  Notes
                </Link>
              </div>
              <AuthButton />
            </div>
          </nav>

          <Routes>
            <Route path="/" element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Welcome to FlowNote</h1>
                <p className="mt-2">Your AI-powered content creation assistant.</p>
              </div>
            } />
            <Route path="/transcribe" element={<TranscriptionPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/:id" element={<NoteDetailPage />} />
            <Route path="/notes/edit/:id" element={<NoteEditPage />} />
            <Route path="/notes/new" element={<NewNotePage />} />
            <Route path="/notes/new-from-transcription" element={<NewNoteFromTranscriptionPage />} />
          </Routes>
        </div>
      </Router>
    </NoteProvider>
  );
}

export default App;
