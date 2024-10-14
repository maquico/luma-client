<script>
	import ShopNavBar from '$components/shop.navbar.svelte';
	import ShopSideBar from '$components/shop.sidebar.svelte';

	let showProjectSelect = false;

	function handleTabChange(event) {
		showProjectSelect = event.detail === '/shop/customize'; // Cambia la visibilidad según la ruta
	}
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
	}
</style>
