import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { Database } from '../types/supabase';

export const supabaseClient = useSupabaseClient<Database>();
