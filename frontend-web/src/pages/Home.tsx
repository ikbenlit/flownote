import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 text-gray-800">
      <h2 className="text-4xl font-bold">Welcome to FlowNote</h2>
      <p className="text-lg mt-4">Your AI-powered content creation assistant.</p>
    </div>
  );
};

export default Home;
