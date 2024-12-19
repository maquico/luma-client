<div class="reset-container">
	<div class="card reset">
			{#if currentStep === 0}
				<div id="first-step">
					<h1>Recuperar contraseña</h1>
					<p> Introduce tu correo, se te enviara un código único de 6 dígitos que tendrás que validar </p>
					<form on:submit|preventDefault={sendEmailOTP}>
						<div class="group">
							<label class="input input-bordered flex items-center gap-2 {invalidInput? 'input-error': ''}">
								<input
									type="text"
									name="email"
									id="email"
									placeholder="Correo"
									size="30"
									required
									bind:value={email}/>
							</label>
							{#if invalidInput}
								<div id="input-error-info">
									<CircleAlert  fill="red" color="white" size="16px"/>
									<p class="text-red-600">Correo invalido</p>
								</div>
							{/if}
						</div>
						<button type="submit" class="btn btn-primary" disabled={loading}>
							{#if loading}
								<span class="spinner"></span> Cargando...
							{:else}
								Ingresar
							{/if}
						</button>
					</form>
				</div>
			{:else if currentStep === 1}
				<div id="second-step">
					<h1>Ingresa OTP</h1>
					<div class="info">
						<p> Ingresa el código de 6 dígitos enviado a <span> {email} </span> </p>
						<p> Este código vence en 2 horas  </p>
					</div>
					<form on:submit|preventDefault={validateOTP}>
						<div class="group">
							<div class="otp">
								{#each [0,1,2,3,4,5] as n}
									<div class="w-10 h-12">
										<input
											class="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-lg border border-gray-200 text-lg bg-white {invalidInput? 'input-error': ''}"
											type="text"
											name=""
											id="otp-{n}"
											bind:value={userOTP[n]}
											maxlength="1"
											on:input={handleInput(n)}
											on:keydown={handleKeydown(n)}>
									</div>
								{/each}
							</div>
							{#if invalidInput}
								<div id="input-error-info">
									<CircleAlert  fill="red" color="white" size="16px"/>
									<p class="text-red-600">OTP incorrecto</p>
								</div>
							{/if}
						</div>
<!--						TODO: añadir un conteo regresivo que indique el tiempo restante de validez de la OTP-->
						<button type="submit" class="btn btn-primary" disabled="{loading}">
							{#if loading}
								<span class="spinner"></span> Cargando...
							{:else}
								Ingresar
							{/if}
						</button>
						<div class="flex items-center justify-center text-sm font-medium space-x-1 text-gray-500">
							<p>¿No recibiste el código?</p>
<!--							TODO: volver a mandar el OTP-->
							<span
															class="flex flex-row items-center text-blue-600 cursor-pointer"
															on:click={resendEmailOTP}>
								{canResend ? 'Reenviar' : `Reintentar en ${resendCooldown}s`}
							</span>
						</div>
					</form>
				</div>
			{:else if currentStep === 2}
				<div id="third-step">
					<h1>Cambiar contraseña</h1>
					<form on:submit|preventDefault={validateAndConfirmNewPassword}>
						<label class="input input-bordered flex items-center gap-2 {invalidInput? 'input-error': ''}">
							<input type="password" name="password" id="password" class="grow" placeholder="Contraseña" bind:value={newPassword} required/>
							<label class="swap">
								<input type="checkbox" on:click={() => {showPassword()}}/>
								<div class="swap-on"><Eye /></div>
								<div class="swap-off"><EyeOff /></div>
							</label>
						</label>
						<div class="group">
							<label class="input input-bordered flex items-center gap-2 {invalidInput? 'input-error': ''}">
								<input type="password" name="password" id="confirmPassword" class="grow" placeholder="Contraseña" bind:value={confirmNewPassword} required/>
								<label class="swap">
									<input type="checkbox" on:click={() => {showConfirmPassword()}}/>
									<div class="swap-on"><Eye /></div>
									<div class="swap-off"><EyeOff /></div>
								</label>
							</label>
							{#if invalidInput}
								<div id="input-error-info">
									<CircleAlert  fill="red" color="white" size="16px"/>
									<p class="text-red-600">Ambas contraseñas no coinciden</p>
								</div>
							{/if}
						</div>
						<button type="submit" class="btn btn-primary">
							Confirmar
						</button>
					</form>
				</div>
			{/if}
		<div style="width: 100%">
			<Steps {steps}
						 current={currentStep}
						 primary="#ff0000"
						 secondary="#ffaaaa"
						 size="1.5rem"
						 line="3px"
						 clickable={false}
						 on:click={(e) => {
        	 currentStep = e.detail.current;
    			}}
			/>
		</div>
	</div>

	<div class="card">
		<a href="/account/login">Regresar a inicio de sesión</a>
	</div>
</div>

<script>
	import { Steps } from 'svelte-steps';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Eye, EyeOff, CircleAlert  } from 'lucide-svelte';
	import axios from 'axios';
	import { showToast } from '$lib/stores/toastStore.js';

	let loading = false;
	let currentStep = 0
	let steps = [{}, {}, {}];
	let email = ''
	let userOTP = ['','','','','','']
	let userID
	let newPassword
	let confirmNewPassword
	let invalidInput = false
	let canResend = true
	let resendCooldown = 30
	let resendInterval
	let loadingResend = false;
	let validRegex = /^[\w-]+@[a-zA-Z\dx-]+\.[a-zA-Z]{2,}$/

	$:email.match(validRegex) ? invalidInput=false : invalidInput=true

	onMount(() => {

	})

	async function sendEmailOTP(){
		if (email.match(validRegex)){
			invalidInput = false
			loading = true
			await axios.post('https://luma-server.onrender.com/api/user/otp/send', {
					email: email
			})
				.then((response) => {
					console.log(response);
					currentStep++
				})
				.catch((error) => {
					console.log(error);

					if (error.response.data.startsWith("Signups not allowed for otp")) {
						showToast('No existe una cuenta asociado al correo ingresado', {theme: 'dark', type: 'error', duration: 5000})
					}else{
						showToast(error.response.data, {theme: 'dark', type: 'error', duration: 5000})
					}
				})
				.finally(() => {
					loading = false
				})
		}else{
			console.log('wrong email pattern');
		}
	}

	async function resendEmailOTP() {
		if (!canResend) return;

		canResend = false;
		resendCooldown = 30;
		resendInterval = setInterval(() => {
			resendCooldown--;
			if (resendCooldown <= 0) {
				clearInterval(resendInterval);
				canResend = true;
			}
		}, 1000);

		loadingResend = true;

		await axios.post('https://luma-server.onrender.com/api/user/otp/send', { email: email })
			.then((response) => {
				showToast('Se ha enviado un nuevo código OTP a su correo electrónico', {
					theme: 'dark',
					type: 'success',
					duration: 5000
				})
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
				showToast('Hubo un error al reenviar el OTP. Intente de nuevo más tarde.', {
					theme: 'dark',
					type: 'error',
					duration: 5000
				});
			})
			.finally( () => {
				loadingResend = false
				})
	}

	async function validateOTP() {
		invalidInput=false
		loading = true
		console.log(email, userOTP.join(''));
		await axios.post('https://luma-server.onrender.com/api/user/otp/verify', {
			email: email,
			token: userOTP.join('')
		})
			.then((response) => {
				console.log(response);
				userID = response.data.user.id
				currentStep++
			})
			.catch((error) => {
				console.log(error);

				if (error.response.data.startsWith("Verify requires either a token or a token hash")) {
					showToast('Ingrese el OTP enviado a su correo electronico', {theme: 'dark', type: 'error', duration: 5000})
				}else if(error.response.data.startsWith("Token has expired or is invalid")){
					showToast('El OTP ha caducado o no es válido', {theme: 'dark', type: 'error', duration: 5000})
				}else{
					showToast(error.response.data, {theme: 'dark', type: 'error', duration: 5000})
				}

			})
			.finally(() => {
				loading = false
			})
	}

	async function validateAndConfirmNewPassword(){
		if (confirmNewPassword === newPassword){
			await axios.put('https://luma-server.onrender.com/api/user/password/reset',
				{
					userId: userID,
					newPassword: confirmNewPassword
				})
				.then((response) => {
					console.log(response);
					showToast('Cambio de contraseña exitoso', {theme: 'dark', type: 'success', duration: 5000})
					goto('/account/login')
				})
				.catch((error) => {
					console.log(error);
					if(error.response.data.startsWith("Password should be at least 8 characters")){
						showToast("La contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.", { theme: 'dark', type: 'error', duration: 5000 });
					}else{
						showToast(error.response.data, { theme: 'dark', type: 'error', duration: 5000 });
					}
				})
		}else{
			console.log('wrong match');
			invalidInput=true
		}
	}

	// Helper functions
	function showPassword() {
		let x = document.getElementById("password");
		x.type = x.type === "password" ? "text" : "password";
	}

	function showConfirmPassword() {
		let x = document.getElementById("confirmPassword");
		x.type = x.type === "password" ? "text" : "password";
	}

	function handleInput(index) {
		return (event) => {
			// Move focus to the next input if a value is entered
			if (event.target.value && index < 5) {
				const nextInput = document.getElementById(`otp-${index + 1}`);
				nextInput.focus();
			}
		};
	}

	function handleKeydown(index) {
		return (event) => {
			// Move focus to the previous input on Backspace
			if (event.key === "Backspace" && !event.target.value && index > 0) {
				const prevInput = document.getElementById(`otp-${index - 1}`);
				prevInput.focus();
			}
		};
	}
</script>

<style>
    .reset-container{
        display: flex;
        flex-direction: column;
        gap: 1rem;
				width: 400px;
    }

    .reset{
        gap: 20px;
        padding: 2rem 2rem !important;
        height: 430px;
    }

		#first-step,
    #second-step,
    #third-step{
				display: flex;
				flex-direction: column;
        gap: 20px;
		}

    #first-step h1,
    #second-step h1,
    #third-step h1{
				text-align: center;
        font-size: 1.2rem;
        font-weight: bold;
				color: black;
    }

    #first-step p,
    #second-step p{
        color: black;
    }

    #first-step form,
    #second-step form,
    #third-step form{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 20rem;
    }

    #first-step form label,
    #third-step form label{
        background: white;
        border: 2px solid lightgray;
    }

    #first-step form .btn,
    #second-step form .btn,
    #third-step .btn{
        color: white;
        font-weight: bold;
    }

		#first-step .input-error,
		#second-step .input-error,
    #third-step .input-error {
				border: 2px solid red;
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

    #third-step form .swap{
        border: none;
    }

		.otp{
				display: flex;
				justify-content: space-evenly;
				align-items: center;
		}

		.info{
				display: flex;
				flex-direction: column;
				gap: 8px;
		}

    .card{
        background-color: white;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
    }

    .card a{
        color: black;
    }

    .spinner {
        border: 2px solid transparent;
        border-top: 2px solid white; /* Adjust color as needed */
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 8px;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>