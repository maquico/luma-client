<script>
	import axios from 'axios';
	import { projectData } from '$lib/stores/projectStore';
	import { showToast } from '$lib/stores/toastStore';
	import DeleteProjectModal from '$components/modals/deleteProject.modal.svelte';

	console.log($projectData);

	let projectName = $projectData.nombre;
	let projectDescription = $projectData.descripcion;
	let projectId = $projectData.Proyecto_ID;
	let invalidInput;
	let showModal = false;

	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
	let userID = userData.user.id;

	function handleClose() {
		showModal = false;
	}

	function validate() {
		invalidInput = false;
		if (projectName.length > 50) {
			console.error('El nombre del proyecto no debe exceder 50 caracteres.');
			invalidInput = true;
			return;
		}

		axios
			.put('https://luma-server.onrender.com/api/projects', {
				nombre: projectName,
				descripcion: projectDescription,
				projectId: projectId,
				requestUserId: userID
			})
			.then((response) => {
				console.log('Proyecto editado con ID:', projectId);
				console.log('Proyecto editado:', response.data);

				showToast(`Informacion actualizada`, {
					type: 'info',
					duration: 5000,
					theme: 'dark'
				});
			})
			.catch((error) => {
				console.error('Error al editar el proyecto:', error);

				showToast(`No tienes permiso para editar`, {
					type: 'error',
					duration: 5000,
					theme: 'dark'
				});
			});
	}
	function cancelChanges() {
		// Resetear los valores
		projectName = $projectData.nombre;
		projectDescription = $projectData.descripcion;
	}
</script>

<DeleteProjectModal show={showModal} on:close={handleClose} />

<div class="content">
	<p class="title">Nuevo Proyecto</p>

	<div class="container">
		<label for="projectName">
			<span>Nombre del Proyecto</span>
			<input id="projectName" type="text" required bind:value={projectName} />
		</label>

		<label for="projectDescription">
			<span>Descripción</span>
			<textarea id="projectDescription" required bind:value={projectDescription}></textarea>
		</label>

		<div class="controls">
			<button class="btn btn-outline" on:click={cancelChanges}> Cancelar </button>
			<button type="submit" class="btn btn-primary" on:click={validate}> Guardar </button>
		</div>

		<br />

		<label for="deleteProject">
			<span>Eliminar Proyecto</span>
			<p>Para elimnar el proyecto haz click en "ELIMINAR PROYECTO"</p>
		</label>
		<button
			class="btn btn-primary"
			on:click={() => {
				showModal = true;
			}}
		>
			Eliminar
		</button>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
	}

	.content .title {
		font-size: var(--luma-h4-font-size);
	}

	.container {
		width: 70%; /* Mantener el ancho amplio */
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
	}

	input,
	textarea {
		margin-top: var(--luma-half-element-spacing);
		border-radius: 8px;
		padding: var(--luma-half-element-spacing);
		width: 100%; /* Asegura que los campos ocupen todo el ancho del contenedor */
	}

	textarea {
		resize: vertical;
		min-height: 120px; /* Aumenté la altura mínima del textarea */
	}

	.controls {
		text-align: right;
	}
</style>
