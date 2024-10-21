<script>
	import BadgeDetailModal from '$components/modals/badge.detail.svelte';
	import { LockKeyhole } from 'lucide-svelte';

	let showModal = false;
	let selectedBadge

	function handleClose() {
		showModal = false;
	}

	let response = [
		{
			"title": "Early Bird",
			"description": "Awarded for logging in before 8 AM.",
			"unlocked": true,
			"icon": "early-bird.svg"
		},
		{
			"title": "Night Owl",
			"description": "Awarded for logging in after 10 PM.",
			"unlocked": false,
			"icon": "night-owl.svg"
		},
		{
			"title": "Achiever",
			"description": "Awarded for completing 10 tasks.",
			"unlocked": true,
			"icon": "achiever.svg"
		},
		{
			"title": "Explorer",
			"description": "Awarded for visiting all sections of the app.",
			"unlocked": false,
			"icon": "explorer.svg"
		},
		{
			"title": "Contributor",
			"description": "Awarded for adding 5 comments.",
			"unlocked": true,
			"icon": "contributor.svg"
		},
		{
			"title": "Supporter",
			"description": "Awarded for providing feedback.",
			"unlocked": true,
			"icon": "supporter.svg"
		},
		{
			"title": "Power User",
			"description": "Awarded for spending over 10 hours on the platform.",
			"unlocked": false,
			"icon": "power-user.svg"
		},
		{
			"title": "Speedster",
			"description": "Awarded for completing a task in under 5 minutes.",
			"unlocked": false,
			"icon": "speedster.svg"
		},
		{
			"title": "Team Player",
			"description": "Awarded for collaborating with 3 different users.",
			"unlocked": true,
			"icon": "team-player.svg"
		},
		{
			"title": "Bug Hunter",
			"description": "Awarded for reporting a bug.",
			"unlocked": true,
			"icon": "bug-hunter.svg"
		},
		{
			"title": "Mastermind",
			"description": "Awarded for completing a difficult challenge.",
			"unlocked": false,
			"icon": "mastermind.svg"
		},
		{
			"title": "Helper",
			"description": "Awarded for answering a question in the forum.",
			"unlocked": true,
			"icon": "helper.svg"
		},
		{
			"title": "Streaker",
			"description": "Awarded for logging in for 7 consecutive days.",
			"unlocked": false,
			"icon": "streaker.svg"
		},
		{
			"title": "Innovator",
			"description": "Awarded for submitting a new feature idea.",
			"unlocked": true,
			"icon": "innovator.svg"
		},
		{
			"title": "Veteran",
			"description": "Awarded for being a user for over a year.",
			"unlocked": true,
			"icon": "veteran.svg"
		}
	]

	function sortBadges(badges) {
		return badges.sort((a, b) => {
			return (b.unlocked - a.unlocked);
		});
	}

	const sortedResponse = sortBadges(response);

</script>

<div class="content">
	<p class="title">Insignias</p>

	<div class="scrollable">
		<div class="badges-grid">
			{#each sortedResponse as badge}
				<div class="badge {badge.unlocked? '': 'locked'}" on:click={() => { if (badge.unlocked) {showModal = true; selectedBadge = badge} }}>
					{badge.title}

					{#if !badge.unlocked}
						<div class="lock-icon">
							<LockKeyhole size={140}/>
						</div>
					{/if}

				</div>
			{/each}
		</div>
	</div>
</div>

<BadgeDetailModal show={showModal} on:close={handleClose} badgeData={selectedBadge}/>

<style>
	.content{
			display: flex;
			flex-direction: column;
	}

	.content .title{
			font-size: var(--luma-h4-font-size);
	}

  .scrollable{
      height: 80vh;
      overflow: auto;
  }

	.badges-grid{
    padding: var(--luma-half-element-spacing);
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: minmax(1fr, auto);
		grid-gap: 20px;
	}

	.badge{
			background-color: var(--luma-color-gray-50);
			width: auto;
			height: 230px;
			border: 0px;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
			position: relative;
	}

	.locked::after{
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