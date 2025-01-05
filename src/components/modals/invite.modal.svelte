<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';
	import { projectData } from '$lib/stores/projectStore';
	import { showToast } from '$lib/stores/toastStore.js';

	let invitationMail;
	const dispatch = createEventDispatcher();
	export let show = true;

	const close = () => {
		show = false;
		dispatch('close');
	};

	// Email validation function
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Send invitation with validation and error handling
	async function sendInvitation() {
		if (!isValidEmail(invitationMail)) {
			showToast('error', 'Formato de correo inválido', 'Por favor, ingrese un correo electrónico válido.');
			return;
		}

		await axios
			.post('https://luma-server.onrender.com/api/invitation/send/', {
				email: invitationMail,
				projectId: $projectData.Proyecto_ID,
			})
			.then((response) => {
				console.log(response.data);
				dispatch('close');
				showToast('Invitación enviada exitosamente', { type: 'success', duration: 5000 });
			})
			.catch((error) => {
				console.error(error);
				showToast('Error al enviar la invitación', { type: 'error', duration: 5000 });
			});
	}
</script>

{#if show}
	<Modal
		header
		title="Agregar usuario"
		on:close={close}
	>
		<form on:submit|preventDefault={sendInvitation}>
			<p>
				Enviar invitación del proyecto a través de correo
				electrónico
			</p>
			<label class="form-control w-full">
				<input
					type="email"
					placeholder="Type here"
					class="input input-bordered w-full"
					bind:value={invitationMail}
				/>
			</label>
			<div class="controls">
				<button class="btn btn-outline" on:click={close}>
					Cancelar
				</button>
				<button type="submit" class="btn btn-primary">
					Ingresar
				</button>
			</div>
		</form>
	</Modal>
{/if}

<style>
	.controls {
		text-align: right;
	}

	form {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
