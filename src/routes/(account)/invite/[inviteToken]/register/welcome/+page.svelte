<script>
	import logo from '$lib/assets/luma-logo.png';
	import image from '$lib/assets/welcome-img.png';
	import ButtonComponent from '$components/button.svelte';
</script>

<div class="welcome-container">
	<div class="card welcome">
		<div class="text-section">
			<h1>Gracias por registrarte a</h1>
			<img src={logo} alt="logo luma" />
			<p>
				¡Tu correo ha sido verificado con éxito! Bienvenido a Luma, donde transformarás la gestión
				de proyectos en una experiencia interactiva y motivadora. Ahora, estás a un paso de comenzar
				a formar tu equipo, completar misiones, y desbloquear recompensas.
			</p>
			<p>¡Prepárate para llevar tu productividad al siguiente nivel con Luma!</p>
			<hr />
			<div class="button-container">
				<ButtonComponent
					label="Iniciar sesión"
					isPrimary="True"
					isLarge="True"
					href="/account/login"
				/>
			</div>
		</div>
		<div class="divider"></div>
		<div class="image-section">
			<img src={image} alt="Welcome" />
		</div>
	</div>
</div>

<style>
	.welcome-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.welcome {
		width: 600px;
		background-color: white;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		flex-direction: row;
		padding: 20px;
		gap: 20px;
	}

	.text-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.text-section h1,
	.text-section p {
		max-width: 300px;
	}

	.text-section h1 {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 10px;
		color: black;
	}

	.text-section p {
		font-size: 15px;
		margin-bottom: 20px;
		color: black;
	}

	.text-section .logo {
		width: 100px;
		height: auto;
		margin-bottom: 40px;
	}

	.divider {
		width: 1px;
		height: 355px;
		background-color: lightgray;
	}

	.image-section {
		display: flex;
		align-items: center;
	}

	.image-section img {
		width: 200px;
		height: 250px;
		object-fit: contain;
		border-radius: 10px;
	}

	.button-container {
		width: 100%;
	}

	.button-container ButtonComponent {
		width: 200px;
	}
</style>
