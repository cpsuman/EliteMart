import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { SignInForm } from '../components/auth/SignInForm';
import { OAuthProviders } from '../components/auth/OAuthProviders';
import { useAuth } from '../context/AuthContext';

export const SignIn: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout title="Sign in to your account">
      <OAuthProviders />
      <SignInForm />
      <div className="mt-4 text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <Link to="/signup" className="text-blue-600 hover:text-blue-500">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};