<script>
	import { flip } from 'svelte/animate';
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import Card from "$components/board/Card.svelte";
	import axios from 'axios';
	import { projectData } from '$lib/stores/projectStore';
	import { showToast } from '$lib/stores/toastStore';
	import ApproveTaskModal from '$components/modals/approve.task.modal.svelte';

	let projectID =  $projectData.Proyecto_ID
	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'))
	let userID = userData.user.id
	let showModal = false;

	const flipDurationMs = 150;

	export let name;
	export let items;
	export let onDrop;
	export let statusId;
	let isLeader = true

	// Function to open the modal and await user response
	function openApprovalModal() {
		return new Promise((resolve) => {
			showModal = true;
			const handleClose = (event) => {
				// Check the result from the modal, either approved or denied
				showModal = false;
				resolve(event.detail); // Resolve to true if approved, else false
			};
			document.addEventListener('close', handleClose, { once: true });
		});
	}

	function handleDndConsiderCards(e) {
		const { items: newItems, info: { id, trigger } } = e.detail;
		if (trigger == TRIGGERS.DRAG_STARTED) {
			const itemIdx = items.findIndex(item => item.id === id);
			// console.log("index", itemIdx); //Estoy moviendo el objeto X
			// console.log(items[itemIdx].id);
		}
		items = [...newItems]
	}

	async function handleDndFinalizeCards(e) {
		const { items: newItems, info: { id, trigger } } = e.detail;

		// Prevent the drop if the task is being dropped into the same status column
		const itemIdx = items.findIndex(item => item.id === id);

		//TODO: validaciones a lugar: para el estado APPROVED, el usuario que lo hace tiene que tener rol de Lider, y la tarea debe de tener un usuario asignado
		//TODO: dropped item deleted from the UI, fix this issue
		// Check if we're dropping in the "Approved" status column and if the user has leader role
		if (statusId === 4 && isLeader) {
			// TODO: hay un error, que cuando cambio una tarea de APPROVED a DONE, me sale nuevamente el modal
			// TODO: tambien, cuando declino la aprobacion, el card se elimina de la ui
			const approved = await openApprovalModal();
			if (!approved) {
				// If not approved, show a toast and reset items
				showToast('Task approval was not granted.', { type: 'warning', duration: 5000 });
				items = [...items]; // Revert items to the original state
				return;
			}
		} else if (statusId === 4 && !isLeader) {
			showToast('This status requires leader approval and cannot accept items.', { type: 'warning', duration: 5000 });
			items = [...items]; // Revert items to the original state
			return;
		}

		// Allow the drop to proceed, update the items array permanently
		items = newItems;
		onDrop(e.detail.items);

		if (trigger == TRIGGERS.DROPPED_INTO_ZONE){
			const itemIdx = items.findIndex(item => item.id === id);
			console.log('cambiaste de estado la tarea ' + items[itemIdx].id + ' al estado ' + statusId + ' ' + name);

			let taskID = items[itemIdx].id

			await axios.put(`https://luma-server.onrender.com/api/task/status/${taskID}`, {
				projectId: projectID,
				newStatusId: statusId,
				userId: userID
			})
				.then((response) => {
					// console.log(response.data);
					console.log('status de tarea actualizada');
					console.log(response.data);
					showToast('Cambio de estado guardado', { type: 'success', duration: 5000 })
				})
				.catch((error) => {
					// console.log(error.data);
					console.log('Error updating task status');
					console.log(error);

					if (error.response.data === "Task already has the new status"){
						showToast('Task already with that status', { type: 'info', duration: 5000 })
						return
					}

					showToast('KBOOM! 💣', { type: 'error', duration: 5000 })
					return
				})
		}
	}

	function handleClose(event) {
		showModal = false;
		let approvalStatus = false; // Update based on user action in the modal

		approvalStatus = event.detail.detail === "approved"; // true if "approved", false if "denied"
		document.dispatchEvent(new CustomEvent('close', { detail: approvalStatus }));
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
				<Card data={item} />
			</div>
		{/each}
	</div>
</div>

<ApproveTaskModal show={showModal} on:close={handleClose}/>

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