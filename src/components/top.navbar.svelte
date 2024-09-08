<div class="navbar">
	<a class="right" href="/">
		<img src={logo} alt="luma-logo" />
	</a>

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

		<button class="avatar"
						use:clickOutside on:click_outside={() => { if(userDropdown) userDropdown = !userDropdown }}
						on:click={() => { userDropdown = !userDropdown}}
		>
			<div class="w-9 rounded-full">
				<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="user-avatar" />
			</div>
		</button>

<!--		TODO: pendiente revisar si afecta el comportamiento de que el dropdown cierre cuando se haga click fuera del menu-->
		<div class="dropdown-menu-container {userDropdown ? 'open' : ''}">
			<div class="dropdown-menu">
				<div class="user-info">
					<h3>John Doe</h3>
					<p>jdoe@acme.com</p>
				</div>

				<div class="divider"/>

				<div class="links">
					<a class="menu-link" href="/account/config/language">
						<Globe size={20}/>
						<p>Idioma</p>
					</a>
					<a class="menu-link" href="/account/config/badge">
						<Star size={20}/>
						<p>Insignias</p>
					</a>
					<a class="menu-link" href="/account/config/profile">
						<User size={20}/>
						<p>Perfil</p>
					</a>
				</div>

				<div class="divider"/>

				<div class="sign-out">
					<a class="menu-link" href="/">
						<LogOut size={20}/>
						<p>Salir</p>
					</a>
				</div>
			</div>
		</div>

	</div>
</div>

<script>
	import {clickOutside} from '$lib/clickOutside.js';
	import logo from '$assets/luma-logo.png'
	import { Info, ShoppingCart, Gem, Coins, LogOut, User, Star, Globe  } from 'lucide-svelte';

 	let userDropdown = false
</script>

<style>
	.navbar{
			display: flex;
			justify-content: space-between;
			background-color: var(--luma-color-gray-50);
			height: 64px;
			position: relative;
			padding: 0 2rem;
	}

  .dropdown-menu-container{
      position: absolute;
      top: 80%;
      right: 1.3rem;
      width: 220px;
			max-height: 0px;
			overflow: hidden;
			z-index: 9999;
  }
	.dropdown-menu-container.open{
      max-height: 400px;
  }

  .dropdown-menu{
			overflow: hidden;
      border-radius: 5px;
      background-color: var(--luma-color-gray-50);
      padding: 20px;
      margin: 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

	.left{
			display: flex;
			gap: 10px;
	}

	.left .currency{
			font-size: 14px;
			position: relative;
			padding: 2px 14px 2px 10px;
			border: 1px solid var(--luma-color-gray-400);
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
			background-color: var(--luma-color-gray-50);
			right: -15px;
  }

	.divider{
			background-color: var(--luma-color-gray-100);
			transform: translateX(-20px);
			width: 1000px;
			height: 0.5px;
			margin: 16px 0;
	}

	.links{
			display: flex;
			flex-direction: column;
			gap: 10px;
	}

	.menu-link{
      cursor: pointer;
			display: flex;
			align-items: center;
			gap: 15px;
	}

  .menu-link:hover p{
  	scale: 1.05;
			color: var(--luma-color-gray-600);
	}

</style>