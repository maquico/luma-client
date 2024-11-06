// Initialize the JS client
import { supabase } from './supabaseClient.js'

// Create a function to handle inserts
const handleInserts = (payload) => {
  console.log('Change received!', payload)
}

// Listen to inserts
export const badgeChannel = async (userId) => {
    supabase
      .channel('obtained_badge')
      .on('postgres_changes', { 
            event: 'INSERT',
            schema: 'public',
            table: 'Insignia_Conseguida',
            filter: `Usuario_ID=eq.${userId}` }, handleInserts)
      .subscribe()
}

// Testing
// const userId = '37d3b652-d314-4124-9685-add5f0c6fc19' 
// badgeChannel(userId)