
import React from 'react';
import Hello from '../components/Hello';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.08),transparent_70%)] z-0"></div>
      <Hello />
    </div>
  );
};

export default Index;
