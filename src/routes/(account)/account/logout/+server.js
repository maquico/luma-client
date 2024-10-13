import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	cookies.set("auth", "", {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
		maxAge: 0 // Set maxAge to 0 to delete the cookie
	});

	return json({ success: true });
}
