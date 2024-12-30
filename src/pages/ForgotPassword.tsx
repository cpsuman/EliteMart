import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AuthLayout } from '../components/auth/AuthLayout';
import { InputField } from '../components/auth/InputField';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { validateEmail } from '../utils/validation';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setSubmitted(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <AuthLayout title="Check your email">
        <div className="text-center">
          <p className="mt-2 text-gray-600">
            We've sent password reset instructions to {email}
          </p>
          <Link to="/signin" className="mt-4 text-blue-600 hover:text-blue-500 block">
            Return to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset your password">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <p className="text-gray-600 text-sm mb-4">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          <InputField
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          isLoading={loading}
          className="w-full"
        >
          Send reset instructions
        </Button>

        <div className="text-center">
          <Link to="/signin" className="text-blue-600 hover:text-blue-500 text-sm">
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};