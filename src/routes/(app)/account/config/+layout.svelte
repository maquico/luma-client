<div>
	<ProfileSideBar/>
	<div class="content">
		<slot/>
	</div>
</div>

<script>
	import ProfileSideBar from '$components/profile.sidebar.svelte'
</script>

<style>
	div{
			display: flex;
	}
</style>