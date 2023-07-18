import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { Database } from '../database.types';

export const supabaseClient = useSupabaseClient<Database>();
