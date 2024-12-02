<TopNavBar/>
<div>
	<ConfigSideBar/>
	<section>
		<slot/>
	</section>
</div>

<ToastContainer placement="bottom-right" let:data={data}>
	<BootstrapToast {data} /> <!-- Provider template for your toasts -->
</ToastContainer>

<script>
	import '$src/app.css';
	import ConfigSideBar from '$components/project.config.sidebar.svelte'
	import TopNavBar from '$components/top.navbar.svelte';
	import { BootstrapToast, ToastContainer } from 'svelte-toasts';
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