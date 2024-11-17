<nav>
	<div class="details">
		<p>{$t('profile_sidebar.navbar_title')}</p>
		<p>{UserName}</p>
	</div>

	<div class="tabs-container">
<!--		<p><strong>General</strong></p>-->
		<p><strong>{$t('profile_sidebar.general_title')}</strong></p>

		<a class="tab {activeTab === '/account/config/profile' ? 'active' : ''}"
			 href="/account/config/profile">
			<User size={20}/>
<!--			Perfil-->
			{$t('profile_sidebar.profile')}
		</a>

		<a class="tab {activeTab === '/account/config/language' ? 'active' : ''}"
			 href="/account/config/language">
			<Globe size={20}/>
<!--			Idioma-->
			{$t('profile_sidebar.language')}
		</a>

		<a class="tab {activeTab === '/account/config/badge' ? 'active' : ''}"
			 href="/account/config/badge">
			<Star size={20}/>
<!--			Insignias-->
			{$t('profile_sidebar.badges')}
		</a>

		<a class="tab {activeTab === '/account/config/security' ? 'active' : ''}"
			 href="/account/config/security">
			<Shield size={20}/>
<!--			Seguridad-->
			{$t('profile_sidebar.security')}
		</a>
	</div>
</nav>

<script>
	import { Star, Globe, Shield, User } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { t} from '$lib/translations';

	let UserName = 'User name'
	let activeTab;

	$: activeTab = $page.url.pathname

	onMount(() => {
		const storedData = localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token');

		if (storedData) {
			// Parse the JSON data to access user info
			const sessionData = JSON.parse(storedData);
			console.log(sessionData);

			UserName = `${sessionData.user.user_metadata.first_name} ${sessionData.user.user_metadata.last_name}`;
		}
	})
</script>

<style>
    nav{
        width: 256px;
        height: 90vh;
        background-color: var(--luma-color-gray-100);
        padding: 1.5rem 1rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        gap: var(--luma-element-spacing);
        border-right: 3px solid var(--luma-color-gray-200);
    }

    .tabs-container{
        display: flex;
        flex-direction: column;
    }

    .tabs-container p:first-child{
        color: var(--luma-color-gray-700);
        padding: 10px;
    }

    .tab{
        display: flex;
        justify-content: start;
        align-items: center;
        border-left: 3px solid var(--luma-color-gray-100);
        gap: var(--luma-half-element-spacing);
        height: 45px;
    }

    .tab:hover{
        color: var(--luma-color-orange-600);
    }

    .tab.active{
        border-left: 3px solid var(--luma-color-orange-600);
        color: var(--luma-color-orange-600);
    }

    .details{
        display: flex;
        flex-direction: column;
        gap: var(--luma-half-element-spacing);
    }

    .details p:first-child{
        color: var(--luma-color-gray-700);
        font-weight: bold;
    }

    .details p:nth-child(2){
        font-size: var(--luma-body-font-size);
        color: var(--luma-color-gray-600);
    }
</style>