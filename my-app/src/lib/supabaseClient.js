import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://rtrkbhtpjcqcshsatnxb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cmtiaHRwamNxY3Noc2F0bnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDk0OTYsImV4cCI6MjA1NTc4NTQ5Nn0.5HwFvafPubYOSCIQxL1pdHQl40KOJsBK0c4Mgc0GtKw')