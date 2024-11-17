<script>
	import Modal from '$components/modal.svelte'
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let show = true;

	const close = () => {
		show = false;
		dispatch('close')
	}

</script>

{#if show}
	<Modal
		header
		closeByBackgroundClick
		title="Aprobar tarea"
		controls
		on:close={close}
	>
		APPROVE
	</Modal>
{/if}

<style>

</style>
