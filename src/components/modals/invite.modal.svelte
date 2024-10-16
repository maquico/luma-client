<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';
	import axios from 'axios';
	import { projectData } from '$lib/stores/projectStore';

	let invitationMail

	console.log($projectData);

	const dispatch = createEventDispatcher();

	export let show = true;

	const close = () => {
		show = false;
		dispatch('close')
	}

	//TODO: add a toast when invitation has been send
	async function sendInvitation() {
		await axios.post('https://luma-server.onrender.com/api/invitation/send/', {
			email: invitationMail,
			projectId: $projectData.Proyecto_ID
		})
			.then((response) => {
				console.log(response.data);
				dispatch('close')
			})
			.catch((error) => {
				console.log(error.data);
			})
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
				<input type="email" placeholder="Type here" class="input input-bordered w-full" bind:value={invitationMail}/>
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
    .controls{
        text-align: right;
    }

    form{
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
