<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let rewardId;

	const close = () => {
		show = false;
		dispatch('close');
	};

	const deleteReward = async () => {
		try {
			await axios.delete(`https://luma-server.onrender.com/api/rewards/${rewardId}`);
			console.log(`Recompensa con ID ${rewardId} eliminada exitosamente.`);
			dispatch('delete', rewardId); // Notifica al padre sobre la eliminación
			close();
		} catch (error) {
			console.error('Error al eliminar la recompensa:', error);
		}
	};
</script>

{#if show}
	<Modal header closeByBackgroundClick title="Eliminar recompensa" on:close={close}>
		<p>¿Estás seguro de que deseas eliminar esta recompensa? Esta acción no se puede deshacer.</p>
		<div class="controls">
			<button type="button" class="btn btn-secondary" on:click={close}> Cancelar </button>
			<button type="button" class="btn btn-danger" on:click={deleteReward}> Eliminar </button>
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
