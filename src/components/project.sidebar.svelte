<nav>
	<div>
		<a class="tab {activeTab === '/overview' ? 'active' : ''}"
			 href="/overview">
			<Text size={20}/>
			Resumen
		</a>

		<a class="tab {activeTab === '/board' ? 'active' : ''}"
			 href="/board" >
			<SquareKanban size={20}/>
			Tablero
		</a>

		<a class="tab {activeTab === '/dashboard' ? 'active' : ''}"
			 href="/dashboard" >
			<LayoutPanelLeft size={20}/>
			Graficos
		</a>
	</div>


	<a class="settings" href="/config">
		<Settings size={20}/>
		Configuración
	</a>
</nav>

<script>
	import { LayoutPanelLeft, Settings, SquareKanban, Text } from 'lucide-svelte';
	import { page } from '$app/stores';

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

		div{
				height: auto;
				display: flex;
				flex-direction: column;
		}

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