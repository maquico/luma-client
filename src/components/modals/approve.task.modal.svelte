<script>
	import Modal from '$components/modal.svelte'
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/translations';

	const dispatch = createEventDispatcher();

	export let show = true;

	const close = (result ) => {
		show = false;
		dispatch('close', { detail: result  });
	}

	function deny(){
		show = false;
		dispatch('deny')
	}

</script>

{#if show}
	<Modal
		header
		closeByBackgroundClick
		title={$t('approve_task.title')}
		controls
		on:close={() => close("denied")}
	>
		<div>
			<p>{$t('approve_task.you_sure')}</p>

			<div class="controls">
				<button class="btn-approve" on:click={() => close("approved")}>{$t('approve_task.approve')}</button> <!-- Approve button -->
				<button class="btn-decline" on:click={() => deny()}>{$t('approve_task.deny')}</button>  <!-- Deny button -->
			</div>

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

	.btn-approve:hover{
			color: white;
			background-color: var(--luma-color-green-success);
  }

  .btn-decline:hover{
      color: white;
      background-color: var(--luma-color-red-error);
  }

</style>
