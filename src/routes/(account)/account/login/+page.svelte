<div class="login-container">
	<div class="card login">
		<img src={logo} alt="luma-logo"/>
<!--		<form on:submit={validate} action="?/login" method="POST">-->
			<form on:submit={validate} method="POST" action="?/login" use:enhance>

			<label class="input input-bordered flex items-center gap-2 {invalidInput? 'input-error': ''}">
				<input type="text" name="email" id="email" placeholder="{$t('login.email_placeholder')}" bind:value={email} size="30" required/>
				<Mail />
			</label>
			<div class="group">
				<label class="input input-bordered flex items-center gap-2 {invalidInput? 'input-error': ''}">
					<input type="password" name="password" id="password" class="grow" placeholder="{$t('login.password_placeholder')}" bind:value={password} required/>
					<label class="swap">
						<input type="checkbox" on:click={() => {showPassword()}}/>
						<div class="swap-on"><Eye /></div>
						<div class="swap-off"><EyeOff /></div>
					</label>
				</label>
				{#if invalidInput}
					<div id="input-error-info">
						<CircleAlert fill="red" color="white" size="16px"/>
						<p class="text-red-600">{$t('login.invalid_input_message')}</p>
					</div>
				{/if}
			</div>
			<button type="submit" class="btn btn-primary">
				{$t('login.main_button_action')}
			</button>

		</form>
		<div class="divider">O</div>
		<a href="/account/password/reset">{$t('login.forgot_password')}</a>
	</div>

	<div class="card">
		<a href="/account/register">{$t('login.no_account_question')}<span>{$t('login.register_question')}</span></a>
	</div>
</div>

<script>
	import { supabase } from "$lib/supabaseClient";
	import logo from '$lib/assets/luma-logo.png'
	import { enhance } from "$app/forms";
	import { CircleAlert, Eye, EyeOff, Mail } from 'lucide-svelte';
	import { showToast } from '$lib/stores/toastStore';
	import { t } from '$lib/translations';

	let email = ''
	let password = ''
	let invalidInput=false
	let validRegex = /^[\w-]+@[a-zA-Z\dx-]+\.[a-zA-Z]{2,}$/

	async function validate() {
		event.preventDefault();
		if (email.match(validRegex) && password){
			const { data, error } = await logIn(email, password);
			if (error) {
				console.log('Error logIn', error);
				showToast($t('login.invalid_credentials'), { theme: 'light', type: 'error', duration: 5000 });
				invalidInput=true
			} 
		} else {
				console.log('Wrong email format or password is empty');
				showToast($t('login.invalid_credentials'), { theme: 'light', type: 'error', duration: 5000 });
				invalidInput=true
		}
	}


	//Supabase native singIn
	async function logIn(_email, _password){
		const { data, error } = await supabase.auth.signInWithPassword({
			email: _email,
			password: _password,
		});
		return { data, error };
	}

	function showPassword() {
		let x = document.getElementById("password");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	}

</script>

<style>
    .login-container{
        display: flex;
        flex-direction: column;
        gap: 1rem;
				width: 400px;
    }

		.login{
				gap: 20px;
				padding: 2rem 2rem !important;
        height: 430px;
		}

		.input-error{
        border: 2px solid red;
		}

		form{
				display: flex;
				flex-direction: column;
				gap: 20px;
        width: 20rem;
		}

		form label{
				background: white;
				border: 2px solid lightgray;
		}

		form .btn{
				color: white;
				font-weight: bold;
		}

		form .swap{
				border: none;
		}

    .group{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    #input-error-info{
        display: flex;
        gap: 2px;
        align-items: center;
        font-size: 12px;
    }

    #input-error-info p{
        color: red !important;
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

		input:-webkit-autofill {
    		background-color: white !important;
    		-webkit-box-shadow: 0 0 0px 1000px white inset !important;
    		-webkit-text-fill-color: black !important;
		}

</style>