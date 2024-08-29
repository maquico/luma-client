<div class="navbar">
	<div class="right">
		<img src={logo} alt="luma-logo"/>
	</div>

	<div class="left">
		<div class="currency-container">
			<div class="gem currency">
			<span>
				XXX,XXX
			</span>
				<div class="icon-container">
					<Gem />
				</div>
			</div>
			<div class="coins currency">
			<span>
				XXX,XXX
			</span>
				<div class="icon-container">
					<Coins />
				</div>
			</div>
		</div>
		<a href="/shop" class="shop cursor-pointer">
			<ShoppingCart />
		</a>
		<a href="/faq" class="faq cursor-pointer">
			<Info />
		</a>

		<button class="avatar" on:click={() => {console.log('avatar')}}>
			<div class="w-9 rounded-full">
				<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="user-avatar" />
			</div>
		</button>

<!--		<div class="dropdown dropdown-end">-->
<!--			<div tabindex="0" role="button" class="my-5">-->
<!--				<div class="w-9 rounded-full">-->
<!--					<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="user-avatar" />-->
<!--				</div>-->
<!--			</div>-->
<!--			<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">-->
<!--				<li><a>Item 1</a></li>-->
<!--				<li><a>Item 2</a></li>-->
<!--			</ul>-->
<!--		</div>-->

	</div>
</div>

<script>
	import logo from '$lib/assets/luma-logo.png'
	import { Info, ShoppingCart, Gem, Coins  } from 'lucide-svelte';


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

	.left .currency{
			font-size: 14px;
			position: relative;
			padding: 2px 14px 2px 10px;
			border: 1px solid gray;
			border-radius: 0.8rem;
	}

	.currency-container{
			display: flex;
			gap: 25px;
			margin-right: 15px;
	}

	.icon-container{
			position: absolute;
			top: 0px;
	}

  .gem .icon-container,
  .coins .icon-container{
			background-color: white;
			right: -15px;
  }

</style>