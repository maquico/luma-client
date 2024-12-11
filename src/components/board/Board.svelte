<script>
	import { flip } from 'svelte/animate';
	import Column from "$components/board/Column.svelte";
	import { createEventDispatcher } from 'svelte';

	const flipDurationMs = 300;
	const dispatch = createEventDispatcher();

	export let columns;
	// will be called any time a card or a column gets dropped to update the parent data
	// export let onFinalUpdate;

	function handleItemFinalize(columnIdx, newItems) {
		columns[columnIdx].items = newItems;
		// onFinalUpdate([...columns]);
	}

	// Receive the update event from CreateTaskModal
	function handleUpdate(event) {
		console.log('Update event received on Board:', event);
		dispatch('update');
	}

	const handleDelete = () => {
		dispatch('delete')
	}

</script>

<section class="board">
	{#each columns as {id, name, items}, index}
		<div class="column">
<!--			animate:flip="{{duration: flipDurationMs}}"-->
			<Column statusId={id}
							name={name}
							items={items}
							onDrop={(newItems) => handleItemFinalize(index, newItems)} 
							on:update={handleUpdate}
							on:delete={handleDelete}/>
		</div>
	{/each}
</section>

<style>
    .board {
        height: 70vh;
        width: 100%;
				display: flex;
				justify-content: space-between;
				margin-top: 1.5rem;
    }
    .column {
        height: 100%;
        width: 300px;
        padding: 0.5em;
        /*border: 1px solid #333333;*/
        /*background-color: white;*/
    }
</style>