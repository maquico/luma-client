<script>
	import axios from 'axios';
	import { onMount } from 'svelte';

	let name;
	let lastName;
	let email;
	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
	let userID = userData.user.id;
	let userInfo;

	async function getUserInfo() {
		await axios
			.get(`https://luma-server.onrender.com/api/user/${userID}`)
			.then((response) => {
				userInfo = response.data[0];
				name = userInfo.nombre;
				lastName = userInfo.apellido;
				email = userInfo.correo;

				console.log('name', name);
				console.log('lastName', lastName);
				console.log('email', email);
			})
			.catch((error) => {
				console.error('Error fetching badges:', error);
			});
	}

	function changeUserDetails() {
		try {
			const response = axios.put('https://luma-server.onrender.com/api/user', {
				id: userID,
				firstName: name,
				lastName: lastName
			});

			const responseMail = axios.put('https://luma-server.onrender.com/api/user/email/reset', {
				userId: userID,
				newEmail: email
			});

			console.log('ready');
		} catch (error) {
			console.error('Error creating reward:', error);
		}
	}

	onMount(async () => {
		getUserInfo();
	});
</script>

<div class="content">
	<p class="title">Profile</p>

	<div class="container">
		<label for="username">
			<span>Nombre</span>
			<input
				id="username"
				type="text"
				placeholder={name ? name : 'Type here'}
				required
				bind:value={name}
			/>
		</label>

		<label for="lastname">
			<span>Apellido</span>
			<input
				id="lastname"
				type="text"
				placeholder={lastName ? lastName : 'Type here'}
				required
				bind:value={lastName}
			/>
		</label>

		<label for="mail">
			<span>Correo electrónico</span>
			<input
				id="mail"
				type="text"
				placeholder={email ? email : 'Type here'}
				required
				bind:value={email}
			/>
		</label>

		<div class="controls">
			<button
				class="btn btn-primary"
				on:click={() => {
					changeUserDetails();
				}}
			>
				Guardar
			</button>
		</div>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
	}

	.content .title {
		font-size: var(--luma-h4-font-size);
	}

	.container {
		width: 30%;
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		gap: var(--luma-half-element-spacing);
	}

	label {
		display: flex;
		flex-direction: column;
	}

	input {
		margin-top: var(--luma-half-element-spacing);
		border-radius: 8px;
		padding: var(--luma-half-element-spacing);
	}

	.controls {
		/*background-color: lightgreen;*/
		display: flex;
		gap: 1rem;
		justify-content: end;
	}

	.controls button {
	}
</style>
