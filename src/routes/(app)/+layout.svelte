<TopNavBar/>
<div>
	<slot />
</div>

<ToastContainer placement="bottom-right" let:data={data}>
	<BootstrapToast {data} /> <!-- Provider template for your toasts -->
</ToastContainer>

<script>
	import '$src/app.css';
	import TopNavBar from '$components/top.navbar.svelte';
	import { ToastContainer, FlatToast, BootstrapToast }  from "svelte-toasts";
</script>

<style>
	div{
			overflow: hidden;
	}
</style>

