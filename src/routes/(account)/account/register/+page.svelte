<script>
	import logo from '$lib/assets/luma-logo.png';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import ButtonComponent from '$components/button.svelte';
	import axios from 'axios';

	let name;
	let lastName;
	let email;
	let password;
	let confirmPassword;
	let invalidInput = false;
	let validRegex = /^[\w-]+@[a-zA-Z\dx-]+\.[a-zA-Z]{2,}$/;

	function register() {
		if (email.match(validRegex) && password && password === confirmPassword) {
			axios
				.post('https://luma-server.onrender.com/api/user/', {
					email: email,
					password: password,
					first_name: name,
					last_name: lastName
				})
				.then((response) => {
					console.log(response.data);
					// goto('/account/register/checkemail');
					console.log('successfull register');
				})
				.catch((error) => {
					console.error('Error:', error);
				});

			invalidInput = false;
		} else {
			console.log('error register');
			console.error('Error:', error.response ? error.response.data : error.message);
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
					placeholder="Nombre"
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
					placeholder="Apellido"
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
					placeholder="Correo"
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
					placeholder="Contraseña"
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
					placeholder="Confirmar contraseña"
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
			<ButtonComponent label="Registrarse" isPrimary="true" href="/account/register/checkemail" />
		</form>
	</div>
	<div class="card">
		<a href="/account/login">¿Ya tienes una cuenta? <span>Iniciar sesión</span></a>
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
