<div class="login-container">
	<div class="card login">
		<img src={logo} alt="luma-logo"/>
		<img class="not-logged-in" src={notloggedin} alt="user-notloggedin"/>
		<p>No estas autenticado, favor de hacer login</p>
<!--		<div class="divider">O</div>-->
		<a href="/account/login">¿Ya tienes una cuenta? <span>Iniciar sesión</span></a>
	</div>

	<div class="card">
		<a href="/account/register">¿No tienes una cuenta? <span>Registrar usuario</span></a>
	</div>
</div>

<script>
	import logo from '$lib/assets/luma-logo.png'
	import notloggedin from '$lib/assets/user-notloggedin.png'
</script>

<style>
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