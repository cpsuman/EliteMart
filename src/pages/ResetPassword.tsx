import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AuthLayout } from '../components/auth/AuthLayout';
import { InputField } from '../components/auth/InputField';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';

export const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      navigate('/signin');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Set new password">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <InputField
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
          <InputField
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        <Button
          type="submit"
          isLoading={loading}
          className="w-full"
        >
          Update password
        </Button>
      </form>
    </AuthLayout>
  );
};