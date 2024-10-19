<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let badgeData

	$: console.log(badgeData);

	const close = () => {
		show = false;
		dispatch('close')
	}

</script>

{#if show}
	<Modal
		header
		closeByBackgroundClick
		title={badgeData.title}
		controls
		on:close={close}
	>
		<p>{badgeData.description}</p>
		<p>{badgeData.unlocked}</p>
		<p>{badgeData.icon}</p>
	</Modal>
{/if}

<style>

</style>
