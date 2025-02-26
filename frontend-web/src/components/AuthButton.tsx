import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/I18nContext";
import { FaGoogle, FaSignOutAlt, FaUser } from "react-icons/fa";

interface AuthButtonProps {
  compact?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ compact = false }) => {
  const { currentUser, loading, signInWithGoogle, signOut } = useAuth();
  const { t } = useI18n();
  const [photoError, setPhotoError] = useState<boolean>(false);
  
  // Reset photo error when user changes
  useEffect(() => {
    setPhotoError(false);
  }, [currentUser?.uid]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleImageError = () => {
    setPhotoError(true);
  };

  if (loading) {
    return (
      <button disabled className={`${compact ? 'p-2' : 'px-4 py-2'} bg-gray-300 text-gray-500 font-semibold rounded-lg shadow-md cursor-not-allowed`}>
        <span className="inline-block animate-pulse">{compact ? '...' : t('app.loading')}</span>
      </button>
    );
  }

  if (currentUser) {
    // For debugging
    console.log("User photo URL:", currentUser.photoURL);
    
    if (compact) {
      return (
        <div className="flex flex-col items-center">
          {currentUser.photoURL && !photoError ? (
            <img 
              src={currentUser.photoURL} 
              alt={t('auth.profile.image')}
              onError={handleImageError}
              className="w-8 h-8 rounded-full border border-gray-200"
              referrerPolicy="no-referrer"
            />
          ) : (
            <FaUser className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          )}
          <button 
            onClick={handleSignOut}
            className="mt-2 p-2 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-gray-300 dark:bg-dark-bg-tertiary dark:text-dark-text-primary dark:hover:bg-dark-border-primary"
            title={t('auth.logout')}
          >
            <FaSignOutAlt className="w-4 h-4" />
          </button>
        </div>
      );
    }
    
    return (
      <div className="flex items-center">
        <div className="mr-4 flex items-center">
          {currentUser.photoURL && !photoError ? (
            <img 
              src={currentUser.photoURL} 
              alt={t('auth.profile.image')}
              onError={handleImageError}
              className="w-8 h-8 rounded-full mr-2 border border-gray-200"
              referrerPolicy="no-referrer"
            />
          ) : (
            <FaUser className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          )}
          <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
            {currentUser.displayName || currentUser.email}
          </span>
        </div>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 flex items-center dark:bg-dark-bg-tertiary dark:text-dark-text-primary dark:hover:bg-dark-border-primary"
        >
          <FaSignOutAlt className="mr-2" />
          {t('auth.logout')}
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <button 
        onClick={handleSignIn}
        className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
        title={t('auth.login')}
      >
        <FaGoogle className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button 
      onClick={handleSignIn}
      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center"
    >
      <FaGoogle className="mr-2" />
      {t('auth.login')}
    </button>
  );
};

export default AuthButton;
