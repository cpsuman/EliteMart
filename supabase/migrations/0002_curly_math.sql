/*
  # Add phone number to profiles table

  1. Changes
    - Add phone_number column to profiles table
    - Add validation for phone_number format
    - Update RLS policies

  2. Security
    - Maintain existing RLS policies
    - Add phone number to viewable and updatable fields
*/

-- Add phone_number column if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone_number text;
  END IF;
END $$;

-- Add constraint for phone number format
ALTER TABLE profiles 
  ADD CONSTRAINT phone_number_format 
  CHECK (phone_number ~ '^\+?\d{10,12}$|^\(\d{3}\)\s?\d{3}-\d{4}$');

-- Update policies to include phone_number
CREATE POLICY "Users can update own phone_number" 
  ON profiles 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);