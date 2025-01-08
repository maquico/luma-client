<script>
	import { supabase } from '$lib/supabaseClient';
	import { clickOutside } from '$lib/clickOutside.js';
	import logo from '$assets/luma-logo.png';
	import { Info, ShoppingCart, Gem, Coins, LogOut, User, Star, Globe } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';
	import { API_BASE_URL } from '$lib/stores/apiStore.js';
	import { userData, setUserData } from '$lib/stores/userStore.js';
	import coinImage from '$assets/coin.png';

	import axios from 'axios';

	let userDropdown = false;
	let userName = 'John Doe';
	let userMail = 'jdoe@acme.com';
	let userCoins = 'loading...';

	onMount(() => {
		const storedData = localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token');

		if (storedData) {
			// Parse the JSON data to access user info
			const sessionData = JSON.parse(storedData);
			console.log(sessionData);

			userName = `${sessionData.user.user_metadata.first_name} ${sessionData.user.user_metadata.last_name}`;
			userMail = sessionData.user.user_metadata.email;
		}

		const localUserData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
		const userID = localUserData.user.id;
		// Get the user extra info from the endpoint
		axios
			.get(`${API_BASE_URL}/user/${userID}`)
			.catch((error) => {
				console.error('Error:', error);
			})
			.then((response) => {
				console.log('Success:', response.data);
				setUserData(response.data[0]);
				userCoins = $userData.monedas;
			});
	});

	async function signOut() {
		// console.log(getSession());

		const { error } = await supabaseSignOut();
		if (!error) {
			// Request to delete the auth cookie
			await fetch('/account/logout', {
				method: 'POST'
			});

			goto('/account/login');
		} else {
			console.error('Error signing out:', error.message);
		}

		// console.log(getSession());
	}

	//Supabase native signOut function
	async function supabaseSignOut() {
		const { error } = await supabase.auth.signOut({});
		return { error };
	}
</script>

<div class="navbar">
	<a class="right" href="/">
		<img src={logo} alt="luma-logo" />
	</a>

	<div class="left">
		<div class="currency-container">
			<!--			<div class="gem currency">-->
			<!--			<span>-->
			<!--				XXX,XXX-->
			<!--			</span>-->
			<!--				<div class="icon-container">-->
			<!--					<Gem />-->
			<!--				</div>-->
			<!--			</div>-->
			<div class="coins currency">
				<span>
					{userCoins}
				</span>
				<div class="icon-container">
					<img src={coinImage} />
				</div>
			</div>
		</div>
		<a href="/shop/general" class="shop cursor-pointer">
			<ShoppingCart />
		</a>
		<a href="/faq" class="faq cursor-pointer">
			<Info />
		</a>

		<div
			class="avatar placeholder"
			use:clickOutside
			on:click_outside={() => {
				if (userDropdown) userDropdown = !userDropdown;
			}}
			on:click={() => {
				userDropdown = !userDropdown;
			}}
		>
			<div class="w-8 rounded-full bg-neutral text-neutral-content">
				<span class="text-xs">
					{userName
						.split(' ')
						.map((name) => name[0].toUpperCase())
						.slice(0, 2)
						.join('')}
				</span>
			</div>
		</div>

		<!--		TODO: pendiente revisar si afecta el comportamiento de que el dropdown cierre cuando se haga click fuera del menu-->
		<div class="dropdown-menu-container {userDropdown ? 'open' : ''}">
			<div class="dropdown-menu">
				<div class="user-info">
					<h3>{userName}</h3>
					<p>{userMail}</p>
				</div>

				<div class="divider" />

				<div class="links">
					<a class="menu-link" href="/account/config/profile">
						<User size={20} />
						<p>{$t('profile_dropdown.profile_text')}</p>
					</a>
					<a class="menu-link" href="/account/config/language">
						<Globe size={20} />
						<p>{$t('profile_dropdown.language_text')}</p>
					</a>
					<a class="menu-link" href="/account/config/badge">
						<Star size={20} />
						<p>{$t('profile_dropdown.badge_text')}</p>
					</a>
				</div>

				<div class="divider" />

				<form action="/logout" method="POST">
					<button>
						<div
							class="sign-out"
							on:click={() => {
								signOut();
							}}
						>
							<a class="menu-link" href="/">
								<LogOut size={20} />
								<p>{$t('profile_dropdown.signOut_text')}</p>
							</a>
						</div>
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		background-color: var(--luma-color-gray-50);
		height: 64px;
		position: relative;
		padding: 0 2rem;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}

	.avatar {
		cursor: pointer;
	}

	.dropdown-menu-container {
		position: absolute;
		top: 80%;
		right: 1.3rem;
		width: 250px;
		max-height: 0px;
		overflow: hidden;
		z-index: 9999;
	}
	.dropdown-menu-container.open {
		max-height: 400px;
	}

	.dropdown-menu {
		overflow: hidden;
		border-radius: 5px;
		background-color: var(--luma-color-gray-50);
		padding: 20px;
		margin: 10px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}

	.left {
		display: flex;
		gap: 1rem;
	}

	.left .currency {
		font-size: 14px;
		position: relative;
		padding: 2px 14px 2px 10px;
		border: 1px solid var(--luma-color-gray-400);
		border-radius: 0.8rem;
	}

	.currency-container {
		display: flex;
		gap: 25px;
		margin-right: 15px;
	}

	.icon-container {
		position: absolute;
		top: 0px;
	}

	.gem .icon-container,
	.coins .icon-container {
		background-color: var(--luma-color-gray-50);
		right: -15px;
	}

	.divider {
		background-color: var(--luma-color-gray-100);
		transform: translateX(-20px);
		width: 1000px;
		height: 0.5px;
		margin: 16px 0;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.menu-link {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.menu-link:hover p {
		scale: 1.05;
		color: var(--luma-color-gray-600);
	}
</style>
