import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaGoogle, FaSignOutAlt, FaUser } from "react-icons/fa";

const AuthButton: React.FC = () => {
  const { currentUser, loading, signInWithGoogle, signOut } = useAuth();

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

  if (loading) {
    return (
      <button disabled className="px-4 py-2 bg-gray-300 text-gray-500 font-semibold rounded-lg shadow-md cursor-not-allowed">
        <span className="inline-block animate-pulse">Loading...</span>
      </button>
    );
  }

  if (currentUser) {
    return (
      <div className="flex items-center">
        <div className="mr-4 flex items-center">
          {currentUser.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt="Profile" 
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <FaUser className="w-6 h-6 text-gray-600 mr-2" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {currentUser.displayName || currentUser.email}
          </span>
        </div>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 flex items-center"
        >
          <FaSignOutAlt className="mr-2" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleSignIn}
      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center"
    >
      <FaGoogle className="mr-2" />
      Sign in with Google
    </button>
  );
};

export default AuthButton;
