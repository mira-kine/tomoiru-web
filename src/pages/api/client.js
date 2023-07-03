import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const client = createClient(supabaseUrl, supabaseKey);

export const checkError = ({ data, error }) => {
  if (error) throw error;
  return data;
};
