<nav>
	<div>
		<a class="tab {$projectActiveTab === 'overview' ? 'active' : ''}" href="/overview" on:click="{() => setActiveTab('overview')}">
			<Text size={20}/>
			Resumen
		</a>

		<a class="tab {$projectActiveTab === 'board' ? 'active' : ''}" href="/board" on:click="{() => setActiveTab('board')}">
			<SquareKanban  size={20}/>
			Tablero
		</a>

		<a class="tab {$projectActiveTab === 'dashboard' ? 'active' : ''}" href="/dashboard" on:click="{() => setActiveTab('dashboard')}">
			<LayoutPanelLeft  size={20}/>
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
	import { writable } from 'svelte/store';

	let projectActiveTab = writable('overview');

	function setActiveTab(tab) {
		projectActiveTab.set(tab);
	}

</script>

<style>
    nav{
      width: 256px;
			height: 90vh;
			background-color: var(--luma-color-gray-50);
			padding: 1.5rem 1rem 1rem 1rem;
      display: flex;
      flex-direction: column;
			justify-content: space-between;
      gap: 1rem;
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
        border-left: 3px solid var(--luma-color-gray-50);
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
      background-color: var(--luma-color-gray-100);
		}

		.settings{
				padding: 0 1rem ;
				display: flex;
				align-items: center;
				gap: var(--luma-half-element-spacing);
		}
</style>