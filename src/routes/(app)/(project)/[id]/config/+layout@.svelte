<TopNavBar/>
<div>
	<ConfigSideBar/>
	<section>
		<slot/>
	</section>
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

  section{
      padding: calc(var(--luma-element-spacing) * 1.5);
      background-color: var(--luma-color-gray-50);
      width: 85vw;
      height: 90vh;
  }
</style>