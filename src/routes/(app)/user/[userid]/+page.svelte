<script>
	import BadgeDetailModal from '$components/modals/badge.detail.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto} from '$app/navigation';
	import { t } from '$lib/translations';

	let showModal = false;
	let selectedBadge
	let selectedProfile
	let users = []
	let userData = []
	let userBadges = []
	let badges = []
	let currentPage = 1;
	const itemsPerPage = 10; // 2 rows of 5 columns
	let loading = true;
	let searchQuery = "";

	onMount(async () => {
		try {
			await Promise.all([
				getAllUsers(),
				getUserBadges(),
				getUserInfo()
			])
		} catch (error) {
			console.error("Error fulfilling promises:", error);
		} finally {
			loading = false
		}
	})

	$: currentUserID = $page.params.userid ? $page.params.userid : null;
	$: filteredUsers = users.filter(user => {
		const fullName = `${user.nombre} ${user.apellido}`.toLowerCase();
		return fullName.includes(searchQuery.toLowerCase());
	});

	function handleClose() {
		showModal = false;
	}

	function getCurrentPageItems(currentPage) {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return userBadges.slice(start, end);
	}

	function nextPage() {
		if (currentPage < Math.ceil(userBadges.length / itemsPerPage)) {
			currentPage += 1;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	}

	async function getUserInfo(){
		await axios.get(`https://luma-server.onrender.com/api/user/${$page.params.userid}`)
			.then((response) => {
				// console.log(response.data);
				userData = response.data[0]
			})
			.catch((error) => {
				console.log(error.data);
			})
	}

	async function getAllUsers(){
		await axios.get('https://luma-server.onrender.com/api/user/')
			.then((response) => {
				// console.log(response.data);
				users = response.data || []
			})
			.catch((error) => {
				console.log(error);
			})
	}

	async function getUserBadges(){
		await axios.get(`https://luma-server.onrender.com/api/badge-obtained/user-client?userId=${$page.params.userid}`)
			.then((response) => {
				loading = false
				badges = response.data.badges
				userBadges = sortUnlockedBadges(response.data.badges) || []
				// console.log(userBadges);
			})
			.catch((error) => {
				console.log(error.data);
				loading = false
			})
	}

	function sortUnlockedBadges(badges) {
		return badges
			.filter(badge => badge.unlocked) // Keep only unlocked badges
			.sort((a, b) => b.unlocked - a.unlocked); // Sort unlocked badges
	}

	//TODO: dura un poco al momento de refrescar la pagina, validar que es el tema que esta ocasionando
	//TODO: revisar que alternativa existe para mejorar la experiencia
	function handleNavigation(userId) {
		goto(`/user/${userId}`).then(async () => {
			loading = true
			try {
				await Promise.all([
					getAllUsers(),
					getUserBadges(),
					getUserInfo()
				])
			} catch (error) {
				console.error("Error fulfilling promises:", error);
			} finally {
				loading = false
			}
		});
	}
</script>

{#if loading}
	<div class="overlay">
		<span class="loader"></span>
	</div>
{/if}

<div class="main">
	<div class="side-bar">
		<div class="search-container">
			<input type="text" placeholder={$t('others_badges.search')} class="search-bar" bind:value={searchQuery}>
		</div>

		<div class="profiles-container">
			{#if filteredUsers.length > 0}
				{#each filteredUsers as user}
					<div class="profile {currentUserID === user.Usuario_ID ? 'selected' : ''}" on:click={() => {handleNavigation(user.Usuario_ID)}}>
						<p>{user.nombre} {user.apellido}</p>
					</div>
				{/each}
			{:else}
				<p>{$t('others_badges.no_users')}</p>
			{/if}
		</div>
	</div>
	
	<div class="content">
		<div class="profile-info">
			<div class="top"></div>

			<div class="bottom">
				<div class="user-profile-picture">
					<div class="avatar placeholder">
						<div class="bg-neutral text-neutral-content w-24 rounded-full">
						<span class="text-3xl">
							{userData.nombre?.[0]}{userData.apellido?.[0]}
						</span>
						</div>
					</div>
				</div>

				<div class="user-details">
					{#if loading} <!-- Estado de carga -->
						<p>{$t('others_badges.loading_users')}</p>
					{:else} <!-- Datos cargados -->
						<p class="name">{userData.nombre} {userData.apellido}</p>
						<p class="mail">{userData.correo}</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="badge-title-container">
			<p class="badge-title">{$t('others_badges.badges')}</p>
			<p> {userBadges.length} / {badges.length} </p>
		</div>
		<div class="scrollable">
			<div class="badges-pagination">
				{#if loading} <!--Loading state-->
					<p>{$t('others_badges.loading_badges')}</p>
				{:else} <!--Loading state-->
					{#if userBadges.length > 0} <!-- Check for badges -->
						{#each getCurrentPageItems(currentPage) as badge}
							<div class="badge" on:click={() => { showModal = true; selectedBadge = badge }}>
								<img src="{badge.icon}" alt="{badge.title} icon">
								{badge.title}
							</div>
						{/each}
					{:else} <!-- No results (badges) -->
						<p>{$t('others_badges.no_badges')}</p>
					{/if}
				{/if} <!--End of Loading state-->

				</div>

					{#if userBadges.length > 0}
						<div class="pagination-controls">
							<button on:click={prevPage} disabled={currentPage === 1}>{$t('others_badges.previous')}</button>
							<span>{$t('others_badges.page')} {currentPage} {$t('others_badges.of')} {Math.ceil(userBadges.length / itemsPerPage)}</span>
							<button on:click={nextPage} disabled={currentPage === Math.ceil(userBadges.length / itemsPerPage)}>{$t('others_badges.next')}</button>
						</div>
					{/if}
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
      width: 270px;
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
			margin-bottom: 1rem;
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

	.badge-title-container{
			display: flex;
			align-items: center;
			justify-content: space-between;
      font-size: var(--luma-h5-font-size);
	}

	.badge-title{
			font-size: var(--luma-h4-font-size);
	}

  .scrollable{
			/*background-color: pink;*/
      height: 45vh;
      overflow: auto;
			padding-top: var(--luma-half-element-spacing);
  }

  .badges-pagination {
      padding: var(--luma-half-element-spacing);
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: 100px;
      grid-gap: 20px;
      height: 240px;
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
      height: 110px;
      border: 0px;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
      position: relative;
			display: flex;
			flex-direction: column;
			gap: 8px;
  }

	.badge img{
			width: 55px;
	}

  .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.5rem;
      z-index: 1000;
  }

  .loader {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      position: relative;
      animation: rotate 1s linear infinite
  }
  .loader::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: 5px solid #FFF;
      animation: prixClipFix 2s linear infinite ;
  }

  @keyframes rotate {
      100%   {transform: rotate(360deg)}
  }

  @keyframes prixClipFix {
      0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
      25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
      50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
      75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
      100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
  }

</style>