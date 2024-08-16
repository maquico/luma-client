<div class="login-container">
	<div class="card login">
		<img src={logo} alt="luma-logo"/>
		<form on:submit|preventDefault={validate}>
			<label class="input input-bordered flex items-center gap-2">
				<input type="text" name="email" id="email" class="grow" placeholder="Correo" required/>
			</label>
			<label class="input input-bordered flex items-center gap-2">
				<input type="password" name="password" id="password" class="grow" placeholder="Contraseña" required/>
<!--				<button on:click={() => {'show password'}}>show</button>-->
			</label>
			<button type="submit" class="btn btn-primary">
				Ingresar
			</button>
		</form>
		<div class="divider">O</div>
		<a href="/account/password/reset">¿Has olvidado la contraseña?</a>
	</div>

	<div class="card">
		<a href="/account/register">¿No tienes una cuenta? <span>Registrar usuario</span></a>
	</div>
</div>

<script>
	import logo from '$lib/assets/luma-logo.png'

	function validate() {
		console.log("I'm the validate() function")
	}
</script>

<style>
    .login-container{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

		.login{
				gap: 20px;
				padding: 2rem 2rem !important;
		}

		form{
				display: flex;
				flex-direction: column;
				gap: 20px;
        width: fill;
		}

		form label{
				background: white;
				border: 2px solid lightgray;
		}

		form .btn{
				color: white;
				font-weight: bold;
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