<nav>
	<div>
<!--		TODO: pendiente analizar si agregar nombre de proyecto en sidebar-->
<!--		<div class="details">-->
<!--			Project Name-->
<!--		</div>-->

		<a class="tab {activeTab === 'overview' ? 'active' : ''}"
			 href={`/${projectID}/overview`}>
			<Text size={20}/>
			Resumen
		</a>

		<a class="tab {activeTab === 'board' ? 'active' : ''}"
			 href={`/${projectID}/board`}>
			<SquareKanban size={20}/>
			Tablero
		</a>

		<a class="tab {activeTab === 'dashboard' ? 'active' : ''}"
			 href={`/${projectID}/dashboard`}>
			<LayoutPanelLeft size={20}/>
			Graficos
		</a>
	</div>


	<a class="settings"
		 href={`/${projectID}/config`}>
		<Settings size={20}/>
		Configuración
	</a>
</nav>

<script>
	import { LayoutPanelLeft, Settings, SquareKanban, Text } from 'lucide-svelte';
	import { page } from '$app/stores';

	let activeTab;
	let projectID;

	$: projectID = $page.url.pathname.split('/')[1]
	$: activeTab = $page.url.pathname.split('/')[2]
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

		div{
				height: auto;
				display: flex;
				flex-direction: column;
		}

    /*.details{*/
		/*		padding: var(--luma-half-element-spacing) 0 1rem 1rem;*/
		/*		border-bottom: 1px solid var(--luma-color-gray-400);*/
		/*		margin-bottom: 1rem;*/
    /*    color: var(--luma-color-gray-400);*/
    /*    font-weight: bold;*/
    /*}*/

		.tab{
				display: flex;
				justify-content: start;
				align-items: center;
        border-left: 3px solid var(--luma-color-gray-100);
				gap: var(--luma-half-element-spacing);
				height: 50px;
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