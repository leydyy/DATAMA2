import { createClient } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Ensures the token persists
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
