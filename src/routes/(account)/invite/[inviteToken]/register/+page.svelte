<script>
	import logo from '$lib/assets/luma-logo.png';
	import { Eye, EyeOff } from 'lucide-svelte';
	import ButtonComponent from '$components/button.svelte';
	import axios from 'axios';
	import { showToast } from '$lib/stores/toastStore';

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
							// goto('/account/register/checkemail');
							console.log('successfull register');
							showToast("¡Registro exitoso! 🎉 Tu cuenta ha sido creada correctamente.", { theme: 'light', type: 'success', duration: 5000 });
						})
						.catch((error) => {
							console.error('Error:', error);
							if(error.response.data.startsWith("Password should be at least 8 characters")){
								showToast("La contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.", { theme: 'light', type: 'error', duration: 5000 });
							}else{
								showToast(error.response.data, { theme: 'light', type: 'error', duration: 5000 });
							}
						});
					invalidInput = false;
				}else{
					console.error('Error: Los campos de contraseña no coinciden.');
					showToast('Los campos de contraseña no coinciden', { theme: 'light', type: 'error', duration: 5000 });
				}
			} else {
				console.error('Error: El formato del correo electrónico no es válido');
				showToast('El formato del correo electrónico no es válido', { theme: 'light',  type: 'error', duration: 5000 });
				invalidInput = true;
			}
		} catch (error) {
			showToast(`El registro ha fallado debido a un problema interno. Contacta al soporte.`, { theme: 'light', type: 'error', duration: 5000 });
			console.error('Error: El registro ha fallado debido a un problema interno. Contacta al soporte.', error.response ? error.response.data : error.message);
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
			<ButtonComponent label="Registrarse" isPrimary="true"/>
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
