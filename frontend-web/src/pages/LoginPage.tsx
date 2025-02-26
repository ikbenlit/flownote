import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import { ThemeToggle } from '../components/ThemeToggle';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage: React.FC = () => {
  const { currentUser, loading, signInWithGoogle, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from?.pathname || '/';

  useEffect(() => {
    // If user is already logged in, redirect to the page they were trying to access
    if (currentUser && !loading) {
      navigate(from, { replace: true });
    }
  }, [currentUser, loading, navigate, from]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Navigation will happen in the useEffect
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-architects-daughter font-bold text-gray-900 dark:text-dark-text-primary">
          Welkom bij FlowNote
        </h2>
        <p className="mt-2 text-center text-sm font-patrick-hand text-gray-600 dark:text-dark-text-secondary">
          Meld je aan om je notities en transcripties te beheren
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-dark-bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-dark-border-primary">
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 rounded-md">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-dark-accent-blue hover:bg-blue-700 dark:hover:bg-dark-accent-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue disabled:bg-blue-300 dark:disabled:bg-dark-accent-blue/50 transition-colors duration-200"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Laden...
                </span>
              ) : (
                <span className="flex items-center">
                  <FaGoogle className="mr-2" />
                  Aanmelden met Google
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 