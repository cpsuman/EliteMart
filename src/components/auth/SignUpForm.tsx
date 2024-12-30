import React, { useState } from 'react';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { InputField } from './InputField';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePhone, formatPhoneNumber } from '../../utils/validation';

export const SignUpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!validatePhone(phone)) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await signUp(email, password, name, phone);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-4">
        <InputField
          icon={<User className="h-5 w-5 text-gray-400" />}
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
        <InputField
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <InputField
          icon={<Phone className="h-5 w-5 text-gray-400" />}
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={handlePhoneChange}
          required
          disabled={loading}
        />
        <InputField
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </form>
  );
};