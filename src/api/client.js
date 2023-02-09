import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
export const client = createClient(supabaseUrl, supabaseKey);
export const parseData = ({ data, error }) => {
  if (error) throw error;
  return data;
};
