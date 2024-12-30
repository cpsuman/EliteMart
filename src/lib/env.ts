import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Environment variables interface
interface Env {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  VITE_GOOGLE_CLIENT_ID: string;
  VITE_GITHUB_CLIENT_ID: string;
}

// Validate environment variables
const validateEnv = (): Env => {
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_GOOGLE_CLIENT_ID',
    'VITE_GITHUB_CLIENT_ID'
  ];
  
  for (const varName of requiredVars) {
    if (!import.meta.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }

  return {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    VITE_GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID,
  };
};

export const env = validateEnv();