<ShopNavBar/>
<div>
	<ShopSideBar/>
	<section>
		<slot/>
	</section>
</div>

<script>
	import ShopNavBar from '$components/shop.navbar.svelte'
	import ShopSideBar from '$components/shop.sidebar.svelte'
</script>

<style>
	div{
			display: flex;
	}
</style>