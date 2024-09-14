<div>
	<SideBar/>
	<section>
		<slot/>
	</section>
</div>


<script>
	import SideBar from '$components/project.sidebar.svelte'
</script>

<style>
	div{
			display: flex;
	}

	section{
			padding: calc(var(--luma-element-spacing) * 1.5);
			background-color: var(--luma-color-gray-50);
			width: 85vw;
	}
</style>