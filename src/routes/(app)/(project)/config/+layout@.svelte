<TopNavBar/>
<div>
	<ConfigSideBar/>
	<slot />
</div>

<script>
	import '$src/app.css';
	import ConfigSideBar from '$components/project.config.sidebar.svelte'
	import TopNavBar from '$components/top.navbar.svelte';
</script>

<style>
	div{
			display: flex;
	}
</style>