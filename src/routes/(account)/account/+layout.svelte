<script>
	import 'tailwindcss/tailwind.css';
</script>

<navbar>
	<a href="/" class="btn btn-primary">Homepage</a>
	<a href="/account/login" class="btn btn-primary">Login</a>
	<a href="/account/register" class="btn btn-primary">Register</a>
	<a href="/account/password/reset" class="btn btn-primary">Reset</a>
</navbar>

<div class="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
	<slot />
</div>

<style>
	navbar {
		background: white;
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}
</style>
