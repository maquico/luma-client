<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';

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
		title="Crear nuevo proyecto"
		on:close={close}
	>

	</Modal>
{/if}

<style>

</style>
