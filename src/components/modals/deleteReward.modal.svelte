<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { showToast } from '$lib/stores/toastStore';
	import axios from 'axios';
	import { t } from '$lib/translations';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let rewardId;
	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
	let userId = userData.user.id;

	const close = () => {
		show = false;
		dispatch('close');
	};

	function deleteReward() {
		console.log(rewardId, userId);

		axios
			.delete('https://luma-server.onrender.com/api/rewards', {
				data: {
					rewardId: rewardId,
					requestUserId: userId
				}
			})
			.then((response) => {
				console.log('Recompensa eliminada', response.data);
				showToast($t('delete_reward.delete_success'), { theme: 'dark', type: 'success', duration: 5000 });
			})
			.catch((error) => {
				console.error('Error al eliminar la recompensa', error);

				if (error.response) {
                            // Check if the status code is 400
                            if (error.response.status === 400 || error.response.status === 403) {
                                if (error.response.data === 'El usuario no tiene permisos para editar el proyecto.') {
                                    showToast($t('delete_reward.not_leader'), { type: 'warning', duration: 5000, theme: 'dark' });
                                    return;
                                } else {
                                    showToast(error.response.data, { type: 'warning', duration: 5000, theme: 'dark' });
                                    return;
                                }
                            }
                }
				// Generic error toast
				showToast($t('delete_reward.delete_error'), {
					theme: 'dark',
					type: 'error',
					duration: 5000
				});
			});

		close();
	}
</script>

{#if show}
	<Modal header closeByBackgroundClick title={$t('delete_reward.delete_reward')} on:close={close}>
		<p>{$t('delete_reward.you_sure')}</p>
		<div class="controls">
			<button type="button" class="btn" on:click={deleteReward}> {$t('delete_reward.delete')} </button>
			<button type="button" class="btn" on:click={close}> {$t('delete_reward.cancel')} </button>
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
