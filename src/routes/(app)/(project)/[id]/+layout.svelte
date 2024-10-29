<div>
	<SideBar/>
	<section>
		<slot/>
	</section>
</div>

<script>
	import SideBar from '$components/project.sidebar.svelte'
	import { setProjectData } from '$lib/stores/projectStore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import axios from 'axios';

	export let projectData;
	let projectId

	async function getProjectDetails(id){
		await axios.get(`https://luma-server.onrender.com/api/projects/id/${id}`)
			.then((response) => {
				projectData = response.data
				console.log(projectData);
				setProjectData(projectData);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	onMount(() => {
		projectId = $page.params.id
		getProjectDetails(projectId)
	})
</script>

<style>
	div{
			display: flex;
	}

	section{
			padding: var(--luma-element-spacing);
			background-color: var(--luma-color-gray-50);
			width: 85vw;
	}
</style>