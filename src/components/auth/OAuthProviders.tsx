import React from 'react';
import { Github, Mail } from 'lucide-react';
//import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { Provider } from '@supabase/supabase-js';
import { supabase } from "../../lib/supabase";

interface OAuthButtonProps {
  provider: Provider;
  icon: React.ReactNode;
  label: string;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, icon, label }) => {
  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      toast.error('Failed to sign in with ' + label);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {icon}
      <span>Continue with {label}</span>
    </button>
  );
};

export const OAuthProviders: React.FC = () => {
  return (
    <div className="space-y-3">
      <OAuthButton
        provider="github"
        icon={<Github className="w-5 h-5" />}
        label="GitHub"
      />
      <OAuthButton
        provider="google"
        icon={<Mail className="w-5 h-5" />}
        label="Google"
      />
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
    </div>
  );
};