<script>
	import CreateTaskModal from '$components/modals/createTask.modal.svelte';
	import { Calendar } from 'lucide-svelte';
	import { DateTime } from 'luxon';
	import { createEventDispatcher } from 'svelte';

	export let data;
	let title = 'Title'
	let description = 'Description'
	let date = DateTime.now().toFormat('dd LLL yyyy')
	let tags = ['tag1', 'tag2', 'tag3', 'tag4']

	const dispatch = createEventDispatcher();

	if (data){
		title = data.name
		description = data.description
		tags = data.tags
	}

	let showModal = false

	function handleClose(){
		showModal = false
	}

	// Receive the update event from CreateTaskModal
	function handleUpdate(event) {
		console.log('Update event received on Card:', event);
		dispatch('update');
	}


</script>

<div class="card" on:click={() => {showModal = true}}>
	<div class="tags-container inline-spacing">
		{#each tags as tag}
			<div class="tag">
				<p>{tag}</p>
			</div>
		{/each}
	</div>

	<div class="content inline-spacing">
		<p> {title} </p>
<!--		<p> {data.id}</p>-->
		<p> {description} </p>
	</div>

	<div class="bottom ">

		<div class="date inline-spacing">
			<Calendar size={16}/>
			<p> {date} </p>
		</div>

		<div class="assigned-user">
			{#if data.assignedUser}
				XX
			{:else}
				ZZ
			{/if}
		</div>

	</div>
</div>

<CreateTaskModal data={data} isEdit={true} show={showModal} on:close={handleClose} on:update={handleUpdate}/>

<style>
    .inline-spacing{
        padding: 0 var(--luma-half-element-spacing);
    }

    .card {
				border-radius: 6px;
        width: 100%;
        margin: var(--luma-half-element-spacing) 0;
				box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 4px;;
    }

		.tags-container{
				display: flex;
				margin: var(--luma-half-element-spacing) 0;
				gap: var(--luma-half-element-spacing);
		}

		.tag{
				background-color: var(--luma-color-gray-200);
				padding: 0 var(--luma-half-element-spacing);
				border-radius: 1rem;
        font-size: 12px;
		}

		.content{
				margin-bottom: var(--luma-half-element-spacing);
		}

		.content p{
        font-size: 12px;
		}

		.bottom{
        border-top: 0.5px solid var(--luma-color-gray-300);
				padding: var(--luma-half-element-spacing) 0;
				display: flex;
				justify-content: space-between;
		}

		.date{
				font-size: 12px;
				display: flex;
				align-items: center;
				gap: var(--luma-half-element-spacing);
		}

		.assigned-user{
				color: var(--luma-color-gray-50);
				background-color: var(--luma-color-gray-300);
				border-radius: 8px;
				font-size: 8px;
				padding: 0.2rem;
				margin-right: var(--luma-half-element-spacing);
		}
</style>