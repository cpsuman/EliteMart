import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { SignUpForm } from '../components/auth/SignUpForm';
import { useAuth } from '../context/AuthContext';

export const SignUp: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout title="Create your account">
      <SignUpForm />
      <div className="mt-4 text-center">
        <span className="text-gray-600">Already have an account? </span>
        <Link to="/signin" className="text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};