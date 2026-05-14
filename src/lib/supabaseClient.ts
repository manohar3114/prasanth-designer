import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient<Database> | null = null;

export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_, prop) {
    if (!supabaseUrl || !supabaseAnonKey) {
      const msg = 'Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your settings.';
      console.error(msg);
      throw new Error(msg);
    }
    
    if (!client) {
      client = createClient<Database>(supabaseUrl, supabaseAnonKey);
    }
    
    return (client as any)[prop];
  }
});
