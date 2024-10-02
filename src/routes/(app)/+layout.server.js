import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	const { data, error } = await supabase.auth.getSession();
	const { data: { user } } = await supabase.auth.getUser()

	console.log({data});
	console.log({user});

	// if (data.session) {
	// 	console.log('User is already logged in');
	// 	throw redirect(303, '/');
	// }
	//
	// if (error || !data.session) {
	// 	console.log('compai, pero loggeate por lo menos');
	//
	// 	// Redirect the user to the login page if there's no session
	// 	throw redirect(303, '/account/login');
	// }

	// If the user is authenticated, return the session data or user information
	return {
		session: data.session
	};
};

// import { redirect } from '@sveltejs/kit';
// import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
//
// export const load = async ({ cookies }) => {
// 	const supabase = createSupabaseServerClient({
// 		supabaseUrl: 'https://kyttbsnmnrayejpbxmpp.supabase.co/',
// 		supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5dHRic25tbnJheWVqcGJ4bXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5NzkyODMsImV4cCI6MjAzNDU1NTI4M30.FlLb0Y8VtqCGYwz13CCkLVns78B_6LzTBw8WcA5QI5o',
// 		cookies,
// 	});
//
// 	const { data: { session } } = await supabase.auth.getSession();
//
// 	console.log({session});
//
// 	// Redirect user to login if session doesn't exist
// 	if (!session) {
// 		throw redirect(303, '/account/login');
// 	}
//
// 	return { session };
// };
