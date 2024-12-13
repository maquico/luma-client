<script>
	import 'tailwindcss/tailwind.css';
	import { BootstrapToast, ToastContainer } from 'svelte-toasts';
</script>

<div class="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
	<slot />
</div>

<ToastContainer placement="bottom-right" let:data={data}>
	<BootstrapToast {data} /> <!-- Provider template for your toasts -->
</ToastContainer>

<style>
</style>
