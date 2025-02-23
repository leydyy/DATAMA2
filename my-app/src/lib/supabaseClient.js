import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://shkxkunapgltgiouiazc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoa3hrdW5hcGdsdGdpb3VpYXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNjE4NzAsImV4cCI6MjA1NTYzNzg3MH0.TfoqE15HdzvCAju_0eIY-f44YUsCY1LtXTxtij_kpkw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
