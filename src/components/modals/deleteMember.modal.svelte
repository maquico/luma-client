<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';
	import axios from 'axios';

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

		// await axios.delete('https://luma-server.onrender.com/api/member/client', {
		// 	"projectId": memberInfo.Proyecto_ID,
		// 	"userId": memberInfo.Usuario_ID,
		// 	"requestUserId": userData.user.id
		// })
		// 	.then((response) => {
		// 		console.log('Delete successful:', response.data);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error during delete request:', error);
		// 	})
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
