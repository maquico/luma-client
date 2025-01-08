<nav>
	<div class="top">
		<div class="details">
			<p>{$t('project_config_sidebar.config_title')}</p>
<!--			<p>Configuraciones de proyecto</p>-->
			<p>{ProyectName}</p>
		</div>

		<div class="tabs-container">
			<p><strong>General</strong></p>
			<a class="tab {activeTab === 'config' ? 'active' : ''}"
				 href={`/${projectID}/config`}>
				<Text size={20}/>
				{$t('project_config_sidebar.summary_text')}
<!--				Resumen-->
			</a>

			<a class="tab {activeTab === 'config/team' ? 'active' : ''}"
				 href={`/${projectID}/config/team`}>
				<Users size={20}/>
				{$t('project_config_sidebar.team_text')}

<!--				Equipo-->
			</a>
		</div>
	</div>

	<a class="settings" href={`/${projectID}/overview`}>
		<LogOut size={20}/>
		{$t('project_config_sidebar.exit_config_text')}
<!--		Cerrar configuración-->
	</a>
</nav>

<script>
	import { LogOut, Text, Users } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/translations'
	import { projectData, getProjectDetails  } from '$lib/stores/projectStore';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let ProyectName
	let activeTab;
	let projectID;

	// Subscribe to projectData store to set ProyectName when data is available
	projectData.subscribe((data) => {
		if (data) {
			ProyectName = data.nombre;
		}
	});

	onMount(async () => {
		if (browser) {
			const segments = $page.url.pathname.split('/');
			projectID = segments[1];

			// Fetch project details if projectData is not already available
			if (!$projectData) {
				await getProjectDetails(projectID);
			} else {
				ProyectName = $projectData.nombre;
			}

			// Determine the active tab based on URL segments
			if (segments.length == 4) {
				activeTab = `${segments[2]}/${segments[3]}`;
			} else {
				activeTab = segments[2];
			}
		}
	});

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