
import React, { useEffect, useState } from 'react';

export const Hello = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <span className="text-sm font-medium text-primary mb-2 tracking-wider animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
        WELCOME
      </span>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
        <span className="text-gradient">Hello World</span>
      </h1>
      <div className="mt-8 h-[1px] w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}></div>
    </div>
  );
};

export default Hello;
