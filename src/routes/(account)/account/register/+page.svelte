<script>
	import logo from '$lib/assets/luma-logo.png';
	import { Eye, EyeOff } from 'lucide-svelte';
	import ButtonComponent from '$components/button.svelte';
	import axios from 'axios';
	import { showToast } from '$lib/stores/toastStore';
	import { goto } from '$app/navigation';
	import { t } from '$lib/translations';

	let name;
	let lastName;
	let email;
	let password;
	let confirmPassword;
	let invalidInput = false;
	let validRegex = /^[\w-]+@[a-zA-Z\dx-]+\.[a-zA-Z]{2,}$/;

	async function register() {
		try {
			if (email.match(validRegex)) {
				if(password && password === confirmPassword){
					await axios.post('https://luma-server.onrender.com/api/user/', {
						email: email,
						password: password,
						first_name: name,
						last_name: lastName
					})
						.then((response) => {
							console.log(response.data);
							// Optionally redirect after successful registration
							console.log('successfull register');
							showToast($t('register.tst_successful'), { theme: 'light', type: 'success', duration: 5000 });
							goto('/account/register/checkemail');
						})
						.catch((error) => {
							console.error('Error:', error);
							if(error.response.data.startsWith("Password should be at least 8 characters")){
								showToast($t('register.tst_8_char_password'), { theme: 'light', type: 'error', duration: 5000 });
							}else{
								showToast(error.response.data, { theme: 'light', type: 'error', duration: 5000 });
							}
						});
					invalidInput = false;
				}else{
					console.error('Error: Los campos de contraseña no coinciden.');
					showToast($t('register.tst_passwords_dont_match'), { theme: 'light', type: 'error', duration: 5000 });
				}
			} else {
				console.error('Error: El formato del correo electrónico no es válido');
				showToast($t('register.tst_invalid_email'), { theme: 'light',  type: 'error', duration: 5000 });
				invalidInput = true;
			}
		} catch (error) {
			showToast(`El registro ha fallado debido a un problema interno. Contacta al soporte.`, { theme: 'light', type: 'error', duration: 5000 });
			console.error($t('register.tst_request_error'), error.response ? error.response.data : error.message);
			invalidInput = true;
		}
	}

	function showPassword(inputId) {
		let x = document.getElementById(inputId);
		if (x.type === 'password') {
			x.type = 'text';
		} else {
			x.type = 'password';
		}
	}
</script>

<div class="register-container">
	<div class="card register">
		<img src={logo} alt="luma-logo" />
		<form on:submit|preventDefault={register}>
			<label
				class="input input-bordered flex items-center gap-2 {invalidInput ? 'input-error' : ''}"
			>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="{$t('register.name_placeholder')}"
					bind:value={name}
					size="30"
					required
				/>
			</label>

			<label
				class="input input-bordered flex items-center gap-2 {invalidInput ? 'input-error' : ''}"
			>
				<input
					type="text"
					name="lastName"
					id="lastName"
					placeholder="{$t('register.last_name_placeholder')}"
					bind:value={lastName}
					size="30"
					required
				/>
			</label>

			<label
				class="input input-bordered flex items-center gap-2 {invalidInput ? 'input-error' : ''}"
			>
				<input
					type="text"
					name="email"
					id="email"
					placeholder="{$t('register.email_placeholder')}"
					bind:value={email}
					size="30"
					required
				/>
			</label>

			<label
				class="input input-bordered flex items-center gap-2 {invalidInput ? 'input-error' : ''}"
			>
				<input
					type="password"
					name="password"
					id="password"
					class="grow"
					placeholder="{$t('register.password_placeholder')}"
					bind:value={password}
					required
				/>
				<label class="swap">
					<input
						type="checkbox"
						on:click={() => {
							showPassword('password');
						}}
					/>
					<div class="swap-on"><Eye /></div>
					<div class="swap-off"><EyeOff /></div>
				</label>
			</label>

			<label
				class="input input-bordered flex items-center gap-2 {invalidInput ? 'input-error' : ''}"
			>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					class="grow"
					placeholder="{$t('register.confirm_password_placeholder')}"
					bind:value={confirmPassword}
					required
				/>
				<label class="swap">
					<input
						type="checkbox"
						on:click={() => {
							showPassword('confirmPassword');
						}}
					/>
					<div class="swap-on"><Eye /></div>
					<div class="swap-off"><EyeOff /></div>
				</label>
			</label>
			<ButtonComponent label="{$t('register.main_button_action')}" isPrimary="true"/>
		</form>
	</div>
	<div class="card">
		<a href="/account/login">{$t('register.have_account')}<span>{$t('register.login_button')}</span></a>
	</div>
</div>

<style>
	.register-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 400px;
	}

	.register {
		gap: 20px;
		padding: 2rem 2rem !important;
		height: 530px;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 20rem;
	}

	form label {
		background: white;
		border: 2px solid lightgray;
	}

	form .swap {
		border: none;
	}

	.card {
		background-color: white;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 2rem;
	}

	.card a {
		color: black;
	}

	.card a span {
		color: #692dd7;
	}
</style>
