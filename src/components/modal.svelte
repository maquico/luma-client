<div>
	<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 overflow-auto" on:click={closeByBackgroundClick? close : ''}>
		<div class="mx-auto my-36 w-[600px] bg-white rounded-md shadow-xl p-10" on:click|stopPropagation>
			{#if header}
				<div class="header">
					<div class="title">
						{title}
					</div>

					<div class="controls">
						{#if controlOptions}
							<button>
								<Ellipsis />
							</button>
						{/if}
						<button on:click={close}>
							<X />
						</button>
					</div>
				</div>
			{/if}
			<div class="content">
				<slot/>
			</div>
		</div>
	</div>
</div>

<script>
	import {createEventDispatcher} from 'svelte';
	import { Ellipsis, X } from 'lucide-svelte';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let header = false
	export let title
	export let controlOptions = false
	export let closeByBackgroundClick = false

	const close = () => {
		show = false;
		dispatch('close')
	}
</script>

<style>
    .header{
        display: flex;
        justify-content: space-between;
    }

		.header .title{
				font-size: var(--luma-title-font-size);
		}
</style>