export const authenticateUser = (event) => {
	// get the cookies from the request
	const { cookies } = event

	// get the user token from the cookie
	const userToken = cookies.get("auth")

	// this is where you would check the user token against your database
	// to see if it is valid and return the user object
	if (userToken) {
		const user = {
			id: 1,
			email: "user@example.com",
			role: "USER",
		}
		return user
	}

	return null
}
