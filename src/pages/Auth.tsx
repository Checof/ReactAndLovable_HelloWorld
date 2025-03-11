
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) throw error;
        toast({
          title: "Account created",
          description: "Check your email to confirm your account",
        });
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.08),transparent_70%)] z-0"></div>
      
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg z-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{isSignUp ? 'Create Account' : 'Sign In'}</h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp 
              ? 'Create a new account to get started' 
              : 'Sign in to your account to continue'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="email@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading 
              ? 'Processing...' 
              : isSignUp 
                ? 'Create Account' 
                : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center pt-4">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline text-sm"
          >
            {isSignUp 
              ? 'Already have an account? Sign In' 
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
