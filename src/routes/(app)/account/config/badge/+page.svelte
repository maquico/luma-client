<script>
	import BadgeDetailModal from '$components/modals/badge.detail.svelte';
	import { LockKeyhole } from 'lucide-svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';

	let showModal = false;
	let selectedBadge;
	let loading = true;
	let badges = [];
	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'))
	let userID = userData.user.id

	onMount(async() => {
		await loadBadges();
		badges = sortBadges(badges);
		loading = false;
	});

	function handleClose() {
		showModal = false;
	}

	async function loadBadges() {
		await axios.get(`https://luma-server.onrender.com/api/badge-obtained/user-client?userId=${userID}`)
			.then((response) => {
				badges = response.data.badges;
			})
			.catch((error) => {
				console.error('Error fetching badges:', error);
			});
	}

	function sortBadges(badges) {
		return badges.sort((a, b) => {
			return (b.unlocked - a.unlocked);
		});
	}

</script>

<div class="content">
	<p class="title">{$t('profile_badges.badges')}</p>

	<div class="scrollable">
		<div class="badges-grid">
			{#if loading}  <!-- Loading state-->
				<div> {$t('profile_badges.loading')} </div>
			{:else} <!-- Fulfilled state-->
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
						<div class="content-badge">
							<img src="{badge.icon}" alt="{badge.title} icon">
							{badge.title}
						</div>

						{#if !badge.unlocked}
							<div class="lock-icon">
								<LockKeyhole size={140} />
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<BadgeDetailModal show={showModal} on:close={handleClose} badgeData={selectedBadge} />

<style>
	.content {
		display: flex;
		flex-direction: column;
	}

	.content-badge{
      display: flex;
      flex-direction: column;
			align-items: center;
			gap: 1rem;
	}

  .content-badge img{
			width: 100px;
	}

	.content .title {
		font-size: var(--luma-h4-font-size);
	}

	.scrollable {
		height: 80vh;
		overflow: auto;
		padding-bottom: 1rem;
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
