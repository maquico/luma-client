<div>
	<ProfileSideBar/>
	<section>
		<slot/>
	</section>
</div>

<script>
	import ProfileSideBar from '$components/profile.sidebar.svelte'
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
			overflow: auto;
  }
</style>