import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

export const supabase = createApp(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Ensures the token persists
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
