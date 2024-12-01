<script>
	import BadgeDetailModal from '$components/modals/badge.detail.svelte';
	import { LockKeyhole } from 'lucide-svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';

	let showModal = false;
	let selectedBadge;
	let userId = '9f44dcbd-7c8a-4e70-b8ce-c25e54435bbb';
	let badges = [];

	function handleClose() {
		showModal = false;
	}

	function loadBadges() {
		axios
			.get(`https://luma-server.onrender.com/api/badge-obtained/user-client?userId=${userId}`)
			.then((response) => {
				badges = response.data.badges;
				console.log('Badges:', badges);
				badges = sortBadges(badges);
				console.log('Badges:', badges);
			})
			.catch((error) => {
				console.error('Error fetching badges:', error);
			});
	}

	function sortBadges(badges) {
		return badges.sort((a, b) => {
			if (a.unlocked && !b.unlocked) {
				return -1;
			} else if (!a.unlocked && b.unlocked) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	onMount(() => {
		loadBadges();
	});

	console.log('Badges:', badges);
</script>

<div class="content">
	<p class="title">Insignias</p>

	<div class="scrollable">
		<div class="badges-grid">
			{#each badges as badge}
				<div
					class="badge {badge.unlocked ? '' : 'locked'}"
					on:click={() => {
						if (badge.unlocked) {
							showModal = true;
							selectedBadge = badge;
						}
					}}
				>
					{badge.title}

					{#if !badge.unlocked}
						<div class="lock-icon">
							<LockKeyhole size={140} />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<BadgeDetailModal show={showModal} on:close={handleClose} badgeData={selectedBadge} />

<style>
	.content {
		display: flex;
		flex-direction: column;
	}

	.content .title {
		font-size: var(--luma-h4-font-size);
	}

	.scrollable {
		height: 80vh;
		overflow: auto;
	}

	.badges-grid {
		padding: var(--luma-half-element-spacing);
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: minmax(1fr, auto);
		grid-gap: 20px;
	}

	.badge {
		background-color: var(--luma-color-gray-50);
		width: auto;
		height: 230px;
		border: 0px;
		border-radius: 8px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
		position: relative;
	}

	.locked::after {
		content: '';
		background-color: var(--luma-color-gray-500);
		width: 100%;
		height: 100%;
		border-radius: 8px;
		position: absolute;
		top: 0;
		left: 0;
	}

	.locked .lock-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		color: white;
		z-index: 2;
	}
</style>
