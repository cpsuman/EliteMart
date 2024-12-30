import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { supabase } from "c:/Users/user/Desktop/EliteMart/src/lib/supabase";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          toast.success('Successfully signed in!');
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Failed to complete authentication');
        navigate('/signin', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};