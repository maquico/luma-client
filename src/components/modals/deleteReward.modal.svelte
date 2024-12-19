<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { showToast } from '$lib/stores/toastStore';
	import axios from 'axios';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let rewardId;
	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
	let userId = userData.user.id;

	const close = () => {
		show = false;
		dispatch('close');
	};

	const deleteReward = async () => {
		console.log(rewardId, userId);

		await axios
			.delete('https://luma-server.onrender.com/api/rewards', {
				data: {
					rewardId: rewardId,
					requestUserId: userId
				}
			})
			.then((response) => {
				console.log('Recompensa eliminada', response.data);
				showToast('Recompensa eliminada', {theme: 'dark', type: 'success', duration: 5000 });
				close()
			})
			.catch((error) => {
				console.error('Error al eliminar la recompensa', error);

				if (error.response) {
					// Check if the status code is 400
					if (error.response.status === 400 || error.response.status === 403) {
						showToast(error.response.data, {theme: 'dark', type: 'warning', duration: 5000 });
						return;
					}
				}
				// Generic error toast
				showToast('Error al eliminar la recompensa', {theme: 'dark', type: 'error', duration: 5000 });
				close()
			});
	};
</script>

{#if show}
	<Modal header closeByBackgroundClick title="Eliminar recompensa" on:close={close}>
		<p>¿Estás seguro de que deseas eliminar esta recompensa? Esta acción no se puede deshacer.</p>
		<div class="controls">
			<button type="button" class="btn" on:click={close}> Cancelar </button>
			<button type="button" class="btn" on:click={deleteReward}> Eliminar </button>
		</div>
	</Modal>
{/if}

<style>
	.controls {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		margin-top: 1rem;
	}
</style>
