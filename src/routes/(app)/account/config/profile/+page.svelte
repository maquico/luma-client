<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { showToast } from '$lib/stores/toastStore';
	import { browser } from '$app/environment';
	import { t } from '$lib/translations';

	let name;
	let lastName;
	let email;
	let userData = null;
	let userID = null;
	let userInfo = null;

	if (browser) {
		// Retrieve user data only in the browser environment
		const localData = localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token');
		if (localData) {
			userData = JSON.parse(localData);
			userID = userData.user.id;
		} else {
			console.error('No user data found in localStorage');
		}
	}

	async function getUserInfo() {
		if (!userID) {
			console.error('Usuario no autenticado');
			showToast('Usuario no autenticado', { type: 'error', duration: 5000 });
			return;
		}

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
				console.error('Error fetching user data:', error);
			});
	}

	function changeUserDetails() {
		if (!userID) {
			showToast('Usuario no autenticado', { type: 'error', duration: 5000 });
			return;
		}

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

			showToast(`Informacion actualizada`, {
				type: 'info',
				duration: 5000,
				theme: 'dark'
			});
		} catch (error) {
			console.error('Error creating reward:', error);
		}
	}

	onMount(async () => {
		await getUserInfo();
	});
</script>

<div class="content">
	<p class="title">{$t('profile_config.profile')}</p>

	<div class="container">
		<label for="username">
			<span>{$t('profile_config.name')}</span>
			<input
				id="username"
				type="text"
				placeholder={name ? name : $t('profile_config.placeholder')}
				required
				bind:value={name}
			/>
		</label>

		<label for="lastname">
			<span>{$t('profile_config.last_name')}</span>
			<input
				id="lastname"
				type="text"
				placeholder={lastName ? lastName : $t('profile_config.placeholder')}
				required
				bind:value={lastName}
			/>
		</label>

		<label for="mail">
			<span>{$t('profile_config.email')}</span>
			<input
				id="mail"
				type="text"
				placeholder={email ? email : $t('profile_config.placeholder')}
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
				{$t('profile_config.save')}
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
