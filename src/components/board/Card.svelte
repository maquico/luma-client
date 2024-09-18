<script>
	import CreateTaskModal from '$components/modals/createTask.modal.svelte';

	export let name;

	let showModal = false

	function handleClose(){
		showModal = false
	}

</script>

<div class="card" on:click={() => {showModal = true}}>
	{name}
</div>

<CreateTaskModal data={name} show={showModal} on:close={handleClose}/>

<style>
    .card {
        height: 4em;
        width: 100%;
        margin: 0.4em 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #dddddd;
        border: 1px solid #333333;
    }
</style>