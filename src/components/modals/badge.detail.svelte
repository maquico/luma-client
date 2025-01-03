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
		width="500px"
		closeByBackgroundClick
		title={badgeData.title}
		controls
		on:close={close}
	>
		<div class="content">

			<div class="img-container">
				<img src="{badgeData.icon}" alt="imagen de insignia">
			</div>

			<p>{badgeData.description}</p>

		</div>
	</Modal>
{/if}

<style>
	.img-container{
		padding-block: 2rem 0rem;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.img-container img{
			width: 150px;
	}

	.content{
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
	}

	.content p{
			text-align: center;
	}
</style>
