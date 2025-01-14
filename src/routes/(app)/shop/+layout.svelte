<script>
	import ShopNavBar from '$components/shop.navbar.svelte';
	import ShopSideBar from '$components/shop.sidebar.svelte';
	import { onMount } from 'svelte';

	let showProjectSelect = false;

	// Function to handle tab changes
	function handleTabChange(event) {
		showProjectSelect = event.detail === '/shop/customize'; // Update visibility based on the route
	}

	// Set `showProjectSelect` on component load based on the current URL
	onMount(() => {
		showProjectSelect = window.location.pathname === '/shop/customize';
	});
</script>

<ShopNavBar on:tabChange={handleTabChange} />
<div class="container">
	<ShopSideBar {showProjectSelect} />
	<div class="main-content">
		<section>
			<slot />
		</section>
	</div>
</div>

<style>
	.container {
		display: flex;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
    height: 83.5vh;
    overflow-y: scroll;
	}
</style>
