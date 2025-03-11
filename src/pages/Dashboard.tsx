
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null; // Don't render anything while checking auth

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.08),transparent_70%)] z-0"></div>
      
      <div className="max-w-3xl w-full p-8 bg-card rounded-lg shadow-lg z-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome, <span className="text-primary">{user.email || 'User'}</span>
        </h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h2 className="text-xl font-semibold mb-2">Your Account Information</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-destructive text-destructive-foreground rounded-md shadow hover:bg-destructive/90 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
