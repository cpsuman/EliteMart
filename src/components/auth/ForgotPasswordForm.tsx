import { useState } from 'react';
import { supabase } from '../../lib/supabase';  // Adjust import path as needed
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the password reset link!');
      navigate('/signin');  // Redirect to Sign In page after successful request
    }

    setLoading(false);
  };

  return (
    <div className="auth-form">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
