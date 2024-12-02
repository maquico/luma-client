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
			padding-block: 1.5rem;
			padding-inline: 3rem;
      /*padding: 1.5rem 1rem 1rem 1rem;*/
      background-color: var(--luma-color-gray-50);
      width: 85vw;
			height: 90vh;
  }
</style>