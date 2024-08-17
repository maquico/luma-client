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
						<button type="submit" class="btn btn-primary">
							Ingresar
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
											id=""
											bind:value={userOTP[n]}
											maxlength="1">
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
						<button type="submit" class="btn btn-primary">
							Enviar
						</button>
						<div class="flex items-center justify-center text-sm font-medium space-x-1 text-gray-500">
							<p>¿No recibiste el código?</p> <span class="flex flex-row items-center text-blue-600" on:click={() => {console.log(OTP)}}>Reenviar</span>
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

	let currentStep = 0
	let steps = [{}, {}, {}];
	let email = 'mockup@email.com'
	let userOTP = ['','','','','','']
	let OTP
	let newPassword
	let confirmNewPassword
	let invalidInput=false

	let validRegex = /^[\w-]+@[a-zA-Z\dx-]+\.[a-zA-Z]{2,}$/

	$:console.log(userOTP);
	$:email.match(validRegex) ? invalidInput=false : invalidInput=true

	onMount(() => {
		OTP = Math.floor(100000 + Math.random() * 900000)
	})

	function sendEmailOTP(){
		if (email.match(validRegex)){
			console.log('valid email');
			console.log(OTP);
			//TODO: send email with OTP
			invalidInput=false
			currentStep++
		}else{
			console.log('wrong email pattern');
		}
	}

	function validateOTP() {
		if (Number(userOTP.join('')) === OTP){
			currentStep++
			invalidInput=false
		}else{
			console.log('wrong OTP')
			invalidInput=true
		}
	}

	function validateAndConfirmNewPassword(){
		if (confirmNewPassword === newPassword){
			console.log('both password match');
			goto('/account/login')
			//TODO: toast exitoso
		}else{
			console.log('wrong match');
			invalidInput=true
		}
	}

	function showPassword() {
		let x = document.getElementById("password");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
	}

	function showConfirmPassword() {
		let x = document.getElementById("confirmPassword");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
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

</style>