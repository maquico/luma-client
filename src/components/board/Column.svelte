<script>
	import { flip } from 'svelte/animate';
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import Card from "$components/board/Card.svelte";
	import axios from 'axios';
	import { projectData } from '$lib/stores/projectStore';
	import { showToast } from '$lib/stores/toastStore';

	let projectID =  $projectData.Proyecto_ID
	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'))
	let userID = userData.user.id

	const flipDurationMs = 150;

	export let name;
	export let items;
	export let onDrop;
	export let statusId;

	//En esta funcion se maneja el cambio de estado
	function handleDndConsiderCards(e) {
		const { items: newItems, info: { id, trigger } } = e.detail;
		// console.log("got consider", name);
		// console.log("Cambio de estado a", name);
		// console.log("Cambio de estado a", e.detail);
		if (trigger == TRIGGERS.DRAG_STARTED) {
			const itemIdx = items.findIndex(item => item.id === id);
			// console.log("index", itemIdx); //Estoy moviendo el objeto X
		}
		items = newItems;
	}

	async function handleDndFinalizeCards(e) {
		const { items: newItems, info: { id, trigger } } = e.detail;

		onDrop(e.detail.items);

		if (trigger == TRIGGERS.DROPPED_INTO_ZONE){
			console.log('cambiaste de estado al estado ' + statusId + ' ' + name);
			console.log(e.detail.items[e.detail.items.length - 1]);

			let taskID = e.detail.items[e.detail.items.length - 1]

			//TODO: consumir el endpoint para actualizar la tarea
			//TODO: validaciones a lugar: para el estado APPROVED, el usuario que lo hace tiene que tener rol de Lider, y la tarea debe de tener un usuario asignado
			await axios.put(`https://luma-server.onrender.com/api/task/status/${taskID.id}`, {
				projectId: projectID,
				newStatusId: statusId,
				userId: userID
			})
				.then((response) => {
					// console.log(response.data);
					console.log('status de tarea actualizada');
					console.log(response.data);
					showToast('Cambio de estado guardado', { type: 'success', duration: 50000 })
				})
				.catch((error) => {
					// console.log(error.data);
					console.log('arregle su diparate');
					console.log(error);
					showToast('KBOOM! 💣', { type: 'error', duration: 50000 })
				})
		}
	}

</script>

<div class='wrapper'>
	<div class="column-title">
		{name}
	</div>
	<div class="column-content"
			 use:dndzone={{items, flipDurationMs, dropTargetStyle: {}}}
			 on:consider={handleDndConsiderCards}
			 on:finalize={handleDndFinalizeCards}>
		{#each items as item (item.id)}
			<!--Al consultar item, obtengo toda la informacion de la tarjeta-->
			<div animate:flip="{{duration: flipDurationMs}}" >
				<Card data={item}/>
			</div>
		{/each}
	</div>
</div>

<style>
    .wrapper {
        height: 100%;
        width: 100%;
        /*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
        overflow-y: hidden;
    }
    .column-content {
        height: calc(100% - 2.5em);
				padding: 0 var(--luma-half-element-spacing);
        /* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
        overflow-y: scroll;
    }
    .column-title {
        height: 2.5em;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>