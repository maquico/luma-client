import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://kyttbsnmnrayejpbxmpp.supabase.co/', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5dHRic25tbnJheWVqcGJ4bXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5NzkyODMsImV4cCI6MjAzNDU1NTI4M30.FlLb0Y8VtqCGYwz13CCkLVns78B_6LzTBw8WcA5QI5o')

// import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
//
// export const load = async ({ fetch, session }) => {
// 	const supabase = createSupabaseLoadClient({
// 		supabaseUrl: 'https://kyttbsnmnrayejpbxmpp.supabase.co/',
// 		supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5dHRic25tbnJheWVqcGJ4bXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5NzkyODMsImV4cCI6MjAzNDU1NTI4M30.FlLb0Y8VtqCGYwz13CCkLVns78B_6LzTBw8WcA5QI5o',
// 		fetch,
// 	});
//
// 	const { data: { supabaseSession } } = await supabase.auth.getSession();
//
// 	return { supabaseSession };
// };
