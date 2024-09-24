<script>
	import ShopNavBar from '$components/shop.navbar.svelte';
	import ShopSideBar from '$components/shop.sidebar.svelte';
</script>

<ShopNavBar />
<div class="container">
	<ShopSideBar />
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
