import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export async function GET({ params, cookies }) {
	const { inviteToken  } = params;
	console.log('Invite Token:', inviteToken );

	const result = await checkInviteToken(inviteToken);
	console.log('signUpRequired', result);
	let requiredSignUp = false

	if (result === true) { requiredSignUp = true}

	// Retrieve a cookie (for example, a session token)
	const sessionToken = cookies.get('auth');

	// If sessionToken exists, it indicates that the user might be logged in.
	let isLoggedIn = Boolean(sessionToken);

	console.log(requiredSignUp);

	// check if user exists in database
	// doesnt exist => register
	if (requiredSignUp){
		throw redirect(303, `/invite/${inviteToken}/register`)
	}else{
		// user exists => checks if users is already logged in
		// user logged in => validate and accept invitation
		if (isLoggedIn){
			console.log(sessionToken);
			console.log('User is logged in, validate and accept invitation.');
			throw redirect(303, `/invite/${inviteToken}/check`)
		}else{
			// user exists but is not logged in => login
			throw redirect(303, `/invite/${inviteToken}/login`)
		}
	}
}

async function checkInviteToken(token) {

	const { data, error } = await axios.get(`https://luma-server.onrender.com/api/invitation/route/${token}`)

	try {
		if(error){
			return error
		}else{
			return data.signUpRequired
		}
	} catch (e) {
		console.log('unexpected error', e);
		return 'Invitation not found';
	}

	// return null;
}
