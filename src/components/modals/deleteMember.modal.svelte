<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';
	import axios from 'axios';
	import { showToast } from '$lib/stores/toastStore';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let memberInfo
	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'))

	// $: console.log(memberInfo);

	const close = () => {
		show = false;
		dispatch('close')
	}

	async function deleteMember() {
		console.log(memberInfo.Proyecto_ID, memberInfo.Usuario_ID, userData.user.id);

		if (memberInfo.Usuario_ID === userData.user.id) {
			console.log('No puedes eliminarte a ti mismo del proyecto');
			showToast('No puedes eliminarte a ti mismo del proyecto', { type: 'warning', duration: 5000 });
			return;
		}
		await axios.delete('https://luma-server.onrender.com/api/member/client', {
			params: {
				projectId: memberInfo.Proyecto_ID,
				userId: memberInfo.Usuario_ID,
				requestUserId: userData.user.id
			}
		})
		.then((response) => {
    	        console.log('Member deleted succesfully:', response.data);
    	        showToast('Miembro eliminado exitosamente', { type: 'success', duration: 5000 });
				dispatch('reload');
    	})
    	.catch((error) => {
    	    console.error('Error deleting member:', error);
		
    	    if (error.response) {
    	        // Check if the status code is 400
    	        if (error.response.status === 400 || error.response.status === 403) {
    	            showToast(error.response.data, { type: 'warning', duration: 5000 });
    	            return;
    	        }
    	    }
    	    // Generic error toast
    	    showToast('Error eliminando miembro', { type: 'error', duration: 5000 });
    	});
		dispatch('close')
	}
</script>

{#if show}
	<Modal
		header
		closeByBackgroundClick
		controls
		title="Confirmar eliminación"
		on:close={close}
	>
		<div class="content">
			<p> ¿Estás seguro de que deseas eliminar a <span class="member">{memberInfo.Usuarios.nombreCompleto}</span> del proyecto? </p>
			<p class="warning"> * Esta acción es irreversible y el usuario perderá todos los accesos y permisos asociados a este proyecto. *</p>

			<div class="controls">
				<button class="btn btn-outline" on:click={close}>
					Cancelar
				</button>
				<button type="submit" class="btn btn-error" on:click={deleteMember}>
					Eliminar
				</button>
			</div>
		</div>
	</Modal>
{/if}

<style>
		.content{
				margin-top: 1rem;
				display: flex;
				flex-direction: column;
				gap: 1rem;
		}

		.content .member{
				font-weight: bold;
				color: var(--luma-color-gray-500);
		}

		.content .warning{
				color: var(--luma-color-red-error);
		}

    .controls{
        text-align: right;
    }
</style>
