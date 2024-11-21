<script>
	import Modal from '$components/modal.svelte'
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let show = true;

	const close = (result ) => {
		show = false;
		dispatch('close', { detail: result  });
	}

</script>

{#if show}
	<Modal
		header
		closeByBackgroundClick
		title="Aprobar tarea"
		controls
		on:close={() => close("denied")}
	>
		<div>
			<p>Are you sure you want to approve this task?</p>

			<div class="controls">
				<button class="btn-approve" on:click={() => close("approved")}>Approve</button> <!-- Approve button -->
				<button class="btn-decline" on:click={() => close("denied")}>Deny</button>  <!-- Deny button -->
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
