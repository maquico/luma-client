<script>
	//import signOut from '../../signout/signout.js';

	async function signOut(scope) {
		try {
			const { error } = await supabase.auth.signOut({
				scope: scope
			});
			return { error };
		} catch (error) {
			return console.error(error.message);
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button
	on:click={() => {
		signOut('local');
	}}
	class="btn btn-primary"
>
	LogOut
</button>
