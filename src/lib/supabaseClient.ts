import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types';

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://weixghwcayoppzvkeipn.supabase.co';
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_s4OclCks4cUvfP9uzNmrWQ_fmMcQXb1';

let client: SupabaseClient<Database> | null = null;

export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_, prop) {
    if (!supabaseUrl || !supabaseAnonKey) {
      const msg = 'Supabase credentials missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your settings.';
      console.error(msg);
      throw new Error(msg);
    }
    
    if (!client) {
      client = createClient<Database>(supabaseUrl, supabaseAnonKey);
    }
    
    return (client as any)[prop];
  }
});
