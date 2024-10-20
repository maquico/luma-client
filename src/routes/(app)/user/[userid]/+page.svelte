<script>
	import BadgeDetailModal from '$components/modals/badge.detail.svelte';
	import { LockKeyhole } from 'lucide-svelte';

	let showModal = false;
	let selectedBadge
	let selectedProfile

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
			"unlocked": true,
			"icon": "night-owl.svg"
		},
		{
			"title": "Achiever",
			"description": "Awarded for completing 10 tasks.",
			"unlocked": false,
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
			"unlocked": true,
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
			"unlocked": true,
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
			"unlocked": false,
			"icon": "veteran.svg"
		},
		{
			"title": "Strategist",
			"description": "Awarded for planning and scheduling 5 tasks.",
			"unlocked": false,
			"icon": "strategist.svg"
		},
		{
			"title": "Rising Star",
			"description": "Awarded for completing your first project.",
			"unlocked": false,
			"icon": "rising-star.svg"
		},
		{
			"title": "Green Thumb",
			"description": "Awarded for contributing to an environmental initiative.",
			"unlocked": false,
			"icon": "green-thumb.svg"
		},
		{
			"title": "Mentor",
			"description": "Awarded for guiding a new user through their first steps.",
			"unlocked": false,
			"icon": "mentor.svg"
		},
		{
			"title": "Overachiever",
			"description": "Awarded for exceeding a weekly goal by 150%.",
			"unlocked": false,
			"icon": "overachiever.svg"
		},
		{
			"title": "Persistent",
			"description": "Awarded for completing a task after 3 failed attempts.",
			"unlocked": false,
			"icon": "persistent.svg"
		},
		{
			"title": "Adventurer",
			"description": "Awarded for trying a new feature within the first 24 hours of its release.",
			"unlocked": false,
			"icon": "adventurer.svg"
		},
		{
			"title": "Code Breaker",
			"description": "Awarded for solving a coding challenge.",
			"unlocked": false,
			"icon": "code-breaker.svg"
		},
		{
			"title": "Early Adopter",
			"description": "Awarded for being one of the first 100 users of the platform.",
			"unlocked": false,
			"icon": "early-adopter.svg"
		},
		{
			"title": "Well Rounded",
			"description": "Awarded for engaging in at least 5 different activities on the platform.",
			"unlocked": true,
			"icon": "well-rounded.svg"
		}
	]

	function getUnlockedBadges(badges) {
		return badges.filter(badge => badge.unlocked);
	}

	const sortedResponse = getUnlockedBadges(response);

	let currentPage = 1;
	const itemsPerPage = 10; // 2 rows of 5 columns

	$: getCurrentPageItems(currentPage)

	function getCurrentPageItems(currentPage) {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		console.log('start', start);
		console.log('end', end);
		console.log(sortedResponse.slice(start, end));
		return sortedResponse.slice(start, end);
	}

	function nextPage() {
		if (currentPage < Math.ceil(sortedResponse.length / itemsPerPage)) {
			currentPage += 1;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	}

</script>

<div class="main">
	<div class="side-bar">
		<div class="search-container">
<!--			<p>Buscar perfiles</p>-->
			<input type="text" placeholder="Buscar perfiles" class="search-bar">
		</div>

		<div class="profiles-container">
			{#each [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] as profile}
				<div class="profile {selectedProfile === profile ? 'selected': ''}" on:click={() => {selectedProfile = profile}}>
					<p>Profile {profile}</p>
				</div>
			{/each}
		</div>
	</div>
	
	<div class="content">
		<div class="profile-info">
			<div class="top">

			</div>

			<div class="bottom">
				<div class="user-profile-picture">
					<div class="avatar placeholder">
						<div class="bg-neutral text-neutral-content w-24 rounded-full">
						<span class="text-3xl">
							A
						</span>
						</div>
					</div>
				</div>

				<div class="user-details">
					<p class="name">Alejandro Martínez López</p>
					<p class="mail">alejandro.martinez@example.com</p>
				</div>
			</div>
		</div>

		<!--TODO: Analizar cambiar grid con paginacion-->
		<p class="badge-title">Insignias</p>
		<div class="scrollable">
			<div class="badges-pagination">
					{#each getCurrentPageItems(currentPage) as badge}
						<div class="badge {badge.unlocked ? '' : 'locked'}" on:click={() => { if (badge.unlocked) { showModal = true; selectedBadge = badge; } }}>
							{badge.title}

							{#if !badge.unlocked}
								<div class="lock-icon">
									<LockKeyhole size={140} />
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<!--{#if sortedResponse.length > 10}-->
					<div class="pagination-controls">
						<button on:click={prevPage} disabled={currentPage === 1}>Previous</button>
						<span>Page {currentPage} of {Math.ceil(sortedResponse.length / itemsPerPage)}</span>
						<button on:click={nextPage} disabled={currentPage === Math.ceil(sortedResponse.length / itemsPerPage)}>Next</button>
					</div>
				<!--{/if}-->
			</div>
		</div>
</div>

<BadgeDetailModal show={showModal} on:close={handleClose} badgeData={selectedBadge}/>

<style>
	.main{
			background-color: var(--luma-color-gray-50);
      width: 100vw;
			height: 90vh;
			display: flex;
	}

	.side-bar{
      width: 256px;
      height: 90vh;
      background-color: var(--luma-color-gray-100);
      border-right: 3px solid var(--luma-color-gray-200);
			padding: 1.5rem 1rem 1rem 1rem;
			display: flex;
			flex-direction: column;
	}

	.search-container{
      display: flex;
			flex-direction: column;
			gap: var(--luma-half-element-spacing);
	}

  /*.search-container p{*/
	/*		font-size: var(--luma-h5-font-size);*/
  /*}*/

  .search-container .search-bar{
			padding: var(--luma-half-element-spacing);
			border-radius: 8px;
	}

	.profiles-container{
			margin-top: 1rem;
			display: flex;
			flex-direction: column;
			gap: var(--luma-half-element-spacing);
			overflow: auto;
      /*-ms-overflow-style: none;  !* IE and Edge *!*/
      /*scrollbar-width: none;  !* Firefox *!*/
  }

	.profile{
		padding-block: var(--luma-half-element-spacing);
		padding-inline: 1rem;
	}

	.profile:hover{
      color: var(--luma-color-orange-600);
      font-weight: bold;
	}

	.profile.selected{
      border-left: 3px solid var(--luma-color-orange-600);
      color: var(--luma-color-orange-600);
	}

	.content{
			width: 90vw;
			padding-top: 1.5rem;
			padding-inline: 4rem;
	}

	.profile-info{
			border-bottom: 3px solid var(--luma-color-gray-200);
			margin-bottom: 1.5rem;
	}

	.top{
			width: 100%;
			height: 12vh;
			background-color: var(--luma-color-secondary-orange);
      opacity: 0.8;
			border-radius: 8px;
	}

	.bottom{
			padding-inline: var(--luma-element-spacing);
			/*background-color: lightgrey;*/
      display: flex;
      gap: 1rem;
			height: 15vh;
	}

	.profile-info .user-profile-picture{
		background-color: white;
		height: 110px;
		padding: var(--luma-half-element-spacing);
		border-radius: 50%;
		transform: translateY(-40%);
	}

	.profile-info .user-details{
			display: flex;
			flex-direction: column;
			justify-content: center;
      transform: translateY(-15%);
	}

  .profile-info .user-details .name{
			font-size: var(--luma-title-font-size);
			font-weight: bold;
  }

  .profile-info .user-details .mail{
  }

	.badge-title{
			font-size: var(--luma-h4-font-size);
	}

  .scrollable{
			/*background-color: pink;*/
      height: 43vh;
      overflow: auto;
			padding-top: var(--luma-half-element-spacing);
  }

  .badges-pagination {
      padding: var(--luma-half-element-spacing);
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: 100px;
      grid-gap: 20px;
      height: 236px;
  }

  .pagination-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
  }

  .pagination-controls button {
      background-color: var(--luma-color-secondary-orange);
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }

  .pagination-controls button:disabled {
      background-color: var(--luma-color-gray-300);
      cursor: not-allowed;
  }

  .badge{
      background-color: var(--luma-color-gray-50);
      width: auto;
      height: 100px;
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