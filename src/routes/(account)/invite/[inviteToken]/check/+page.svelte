<script>
	import logo from '$lib/assets/luma-logo.png'
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import notloggedin from '$assets/user-notloggedin.png';

	let inviteToken;
	let userId;
	let customErrorMsg

	$: inviteToken = $page.params.inviteToken;

	// Access localStorage on the client side
	onMount(() => {
		// Retrieve the stored data from localStorage (assuming it's stored under 'user_session')
		const storedData = localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token');

		if (storedData) {
			// Parse the JSON data to access user info
			const sessionData = JSON.parse(storedData);

			userId = sessionData.user.id;
		}

		validateAndAcceptInvitation()
	});

	async function validateAndAcceptInvitation() {
		await axios.post('https://luma-server.onrender.com/api/invitation/validate', {
			token: inviteToken,
			userId: userId
		}).then(
			(response) => {console.log(response.data)}
		).catch(
			(error) => {
				console.log(error.response.data)
				customErrorMsg = error.response.data
			}
		)
	}
</script>

<div class="login-container">
	<div class="card container">
		<div>Checking and validating invite</div>
		<div>Invite Token: {inviteToken}</div>
		<h1>User ID: {userId}</h1>


	</div>

	<div class="card login">
		<img src={logo} alt="luma-logo"/>
		<img class="not-logged-in" src={notloggedin} alt="user-notloggedin"/>

		<div class="custom-error" style="color: red">
			{customErrorMsg}
		</div>
		<!--		<div class="divider">O</div>-->
<!--		<a href="/account/login">¿Ya tienes una cuenta? <span>Iniciar sesión</span></a>-->
	</div>

	<div class="card">
<!--		<a href="/account/register">¿No tienes una cuenta? <span>Registrar usuario</span></a>-->
	</div>
</div>

<style>
	.container{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 12px;
	}

	/*recycle styles*/
  .login-container{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 400px;
  }

  .login{
      gap: 10px;
      padding: 2rem 2rem !important;
      height: auto;
  }

  .login p{
      color: black;
  }

  .login .not-logged-in{
      width: 250px;
  }

  .card{
      background-color: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2rem;
  }

  .card a{
      color: black;
  }

  .card a span{
      color: #692DD7;
  }
</style>