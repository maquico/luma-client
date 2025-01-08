<script>
	import SideBar from '$components/project.sidebar.svelte';
	import { getProjectDetails } from '$lib/stores/projectStore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let projectId;

	onMount(() => {
		projectId = $page.params.id;
		getProjectDetails(projectId); // Fetch and set project details
	});
</script>

<div>
	<SideBar />
	<section>
		<slot />
	</section>
</div>

<style>
	div {
		display: flex;
	}

	section {
		padding: var(--luma-element-spacing);
		background-color: var(--luma-color-gray-50);
		width: 85vw;
	}
</style>
