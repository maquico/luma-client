<nav>
	<div class="top">
		<div class="details">
			<p>Configuraciones de proyecto</p>
			<p>{ProyectName}</p>
		</div>

		<div class="tabs-container">
			<p><strong>General</strong></p>
			<a class="tab {activeTab === '/config' ? 'active' : ''}"
				 href="/config">
				<Text size={20}/>
				Resumen
			</a>

			<a class="tab {activeTab === '/config/team' ? 'active' : ''}"
				 href="/config/team">
				<Users size={20}/>
				Equipo
			</a>
		</div>
	</div>

	<a class="settings" href="/overview">
		<LogOut size={20}/>
		Cerrar configuración
	</a>
</nav>

<script>
	import { LogOut, Text, Users } from 'lucide-svelte';
	import { page } from '$app/stores';

	let ProyectName = 'Nombre de proyecto'

	let activeTab;

	$: activeTab = $page.url.pathname
</script>

<style>
    nav{
				width: 256px;
        height: 90vh;
        background-color: var(--luma-color-gray-100);
        padding: 1.5rem 1rem 1rem 1rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
        border-right: 3px solid var(--luma-color-gray-200);
    }

		.top{
        display: flex;
        flex-direction: column;
        gap: calc(var(--luma-element-spacing) * 1.5);
    }

    .top .details{
        display: flex;
        flex-direction: column;
        gap: var(--luma-half-element-spacing);
    }

    .top .details p:first-child{
        color: var(--luma-color-gray-700);
				font-weight: bold;
    }

    .top .details p:nth-child(2){
			font-size: var(--luma-body-font-size);
			color: var(--luma-color-gray-600);
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

    .tab:hover,
    .settings:hover{
        color: var(--luma-color-orange-600);
    }

    .tab.active{
        border-left: 3px solid var(--luma-color-orange-600);
        color: var(--luma-color-orange-600);
    }

    .settings{
        padding: 0 1rem ;
        display: flex;
        align-items: center;
        gap: var(--luma-half-element-spacing);
    }
</style>