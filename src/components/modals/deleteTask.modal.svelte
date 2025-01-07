<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';
	import axios from 'axios'
	import { API_BASE_URL } from '$lib/stores/apiStore';
	import { projectData } from '$lib/stores/projectStore';
	import { showToast } from '$lib/stores/toastStore';
	import { t } from '$lib/translations';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let data = {}

	let title = ''
	let taskId = 0
	const projectId = $projectData.Proyecto_ID;
	const userId = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token')).user.id;

	if (data){
		title = data.name
		taskId = data.id
	}

	const close = () => {
		show = false;
		dispatch('close')
	}

	function validate() {
		axios.delete(`${API_BASE_URL}/task/${taskId}/${userId}/${projectId}`)
		.then((response) => {
			console.log(response)
			showToast($t('delete_task.delete_success'), { type: 'success', duration: 5000 });
			dispatch('delete')
		}).catch((error) => {
			console.error('Error deleting task:', error);
			if (error.response) {
				// Check if the status code is 400
				if (error.response.status === 400 || error.response.status === 403) {
					showToast(error.response.data, { type: 'warning', duration: 5000 });
					return;
				}
			}
			// Generic error toast
			showToast($t('delete_task.delete_error'), { type: 'error', duration: 5000 });
		})
		close()
	}

</script>

{#if show}
	<Modal
		header
		closeByBackgroundClick
		title={$t('delete_task.title')}
		on:close={close}
	>
		<p>{$t('delete_task.you_sure')} </p>
			<div class="controls">
				<button class="btn-delete" on:click={validate}>{$t('delete_task.delete')}</button> 
				<button class="btn-cancel" on:click={close}>{$t('delete_task.cancel')}</button>  
			</div>
	</Modal>
{/if}

<style>
.controls{
			display: flex;
			justify-content: end;
			gap: 1rem;
			margin-top: 1rem;
	}

	.controls button{
			border-radius: 1rem;
			padding: 0.5rem 1rem;
			border: 1px solid var(--luma-color-gray-500);
	}

	.btn-delete:hover{
			color: white;
			background-color: var(--luma-color-red-error);
  }

  .btn-cancel:hover{
      background-color: var(--luma-color-gray-200);
  }
</style>
