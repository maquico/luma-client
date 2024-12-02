import { redirect } from "@sveltejs/kit"
import { supabase } from '$lib/supabaseClient.js';

export const load = async ({ locals }) => {
	return {
		user: locals.user
	}
}

export const actions = {
	login: async ({ cookies, request, locals }) => {
		console.log('login form action');

		//fetch all the data from the form
		const formData = await request.formData();
		const _email = formData.get('email');
		const _password = formData.get('password');

		//login with supabase native function
		const { data, error } = await supabase.auth.signInWithPassword({
			email: _email,
			password: _password,
		})

		if (error) {
			return {
				status: 400,
				body: { error: error.message }
			};
		}

		//sets cookie with session.access_token
		cookies.set("auth", "authenticated_user", {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 7, // 1 week
		})

		throw redirect(303, "/")
	},
}
