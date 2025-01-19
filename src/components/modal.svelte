<script>
	import { createEventDispatcher } from 'svelte';
	import { Ellipsis, Rewind, Trash2, X } from 'lucide-svelte';
	import { clickOutside } from '$lib/clickOutside.js';
	import DeleteTaskModal from '$components/modals/deleteTask.modal.svelte';
	import DeleteRewardModal from './modals/deleteReward.modal.svelte';
	import { t } from '$lib/translations';

	const dispatch = createEventDispatcher();

	export let width = '600px';
	export let show = true;
	export let header = false;
	export let title;
	export let controls = false;
	export let controlsOptions = false;
	export let closeByBackgroundClick = false;
	export let deleteModalType = 'task';
	export let rewardID;
	export let data = {};
	export let isEdit = false;

	// Delete Task Modal
	let showModal = false;
	let userDropdown = false;

	function handleClose() {
		showModal = false;
	}

	const close = () => {
		show = false;
		dispatch('close');
	};

	const handleDelete = () => {
		show = false;
		dispatch('delete');
	};
</script>

<div>
	<div
		class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 overflow-auto"
		on:click={closeByBackgroundClick ? close : ''}
	>
		<!--		<div class="mx-auto my-36 w-[600px] bg-white rounded-md shadow-xl p-10" style="width: {width}" on:click|stopPropagation>-->
		<div
			class="mx-auto my-36 bg-white rounded-md shadow-xl p-10"
			style="width: {width}"
			on:click|stopPropagation
		>
			{#if header}
				<div class="header">
					<div class="title">
						{#if title}{title}{/if}
					</div>

					{#if controls}
						<div class="controls">
							{#if controlsOptions}
								{#if isEdit}
									<button
										use:clickOutside
										on:click_outside={() => {
											if (userDropdown) userDropdown = !userDropdown;
										}}
										on:click={() => {
											userDropdown = !userDropdown;
										}}
									>
										<Ellipsis />
									</button>

									<div class="dropdown-menu-container {userDropdown ? 'open' : ''}">
										<div class="dropdown-menu">
											<button
												on:click={() => {
													showModal = true;
												}}
											>
												{$t('modal.delete')}
												<Trash2 size={20} />
											</button>
										</div>
									</div>
								{/if}
							{/if}
							<button on:click={close}>
								<X />
							</button>
						</div>
					{/if}
				</div>
			{/if}
			<div class="content">
				<slot />
			</div>
		</div>
	</div>
</div>

{#if deleteModalType === 'reward' && isEdit}
	<DeleteRewardModal
		show={showModal}
		rewardId={rewardID}
		on:close={handleClose}
		on:delete={handleDelete}
	/>
	{console.log('Modal Type', deleteModalType)}
{:else if deleteModalType === 'task' && isEdit}
	<DeleteTaskModal show={showModal} {data} on:close={handleClose} on:delete={handleDelete} />
	{console.log('Modal Type:', deleteModalType)}
{/if}

<style>
	.header {
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.header .title {
		font-size: var(--luma-title-font-size);
	}

	.dropdown-menu-container {
		position: absolute;
		top: 50%;
		right: 1rem;
		width: 220px;
		max-height: 0px;
		overflow: hidden;
		z-index: 9999;
	}
	.dropdown-menu-container.open {
		max-height: 400px;
	}

	.dropdown-menu {
		overflow: hidden;
		border-radius: 5px;
		background-color: var(--luma-color-gray-50);
		padding: 20px;
		margin: 10px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}

	.dropdown-menu button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.dropdown-menu button:hover {
		color: var(--luma-color-red-error);
	}
</style>
