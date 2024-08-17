<div class="navbar">
	<div class="right">
		<img src={logo} alt="luma-logo"/>
	</div>

	<div class="left">
		<div class="shop cursor-pointer">
			<ShoppingCart />
		</div>
		<div class="faq cursor-pointer">
			<Info />
		</div>
		<div class="avatar">
			<div class="w-9 rounded-full">
				<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="user-avatar" />
			</div>
		</div>
	</div>
</div>

<script>
	import logo from '$lib/assets/luma-logo.png'
	import { Info, ShoppingCart } from 'lucide-svelte';
	import { goto } from '$app/navigation';
</script>

<style>
	.navbar{
			display: flex;
			justify-content: space-between;
			background-color: white;
			height: 64px;
	}

	.left{
			display: flex;
			gap: 10px;
	}
</style>