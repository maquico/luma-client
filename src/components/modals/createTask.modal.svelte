<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import axios from 'axios';
	import { Tags, User } from 'lucide-svelte';
	import { DatePicker } from 'date-picker-svelte';
	import { projectData } from '$lib/stores/projectStore';

	let showDatePickerStart = false;
	let showDatePickerEnd = false;
	let startDate = new Date();
	let endDate = new Date();
    let selectedUserId = ""; // To bind selected user ID
	let projectMembers= $projectData.miembros;

	const dispatch = createEventDispatcher();

	export let show = true;
	export let data = null;
	export let isEdit = false; 

	const userId = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token')).user.id;
	const taskId = data?.id;

	const initialFormData = {
		id: data?.id,
        projectId: '',
        name: '',
        priority: '',
        time: '',
        state: '',
        startDate: '',
        endDate: '',
        tags: '',
        description: '',
        comment: ''
    };

	let formData = { ...initialFormData };
    let isLoading = false; // Track loading state
    let errorMessage = ''; // Track error messages

	const close = () => {
		show = false;
		formData = { ...initialFormData };
		dispatch('close');
	};

	function formatDate(date) {
		return date.toLocaleDateString('es-ES', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

	function formatDateForDB(date) {
		return date.toISOString().split('T')[0]; // Devuelve solo YYYY-MM-DD
	}

	async function fetchTaskData() {
        if (!taskId || !isEdit) return;

        try {
            isLoading = true;
            const response = await axios.get(`https://luma-server.onrender.com/api/task/${taskId}`);
            const task = response.data[0]; 

            // Map response to `formData`
            formData = {
                projectId: task.Proyecto_ID,
                name: task.nombre,
                priority: task.prioridad,
                time: task.tiempo,
                state: task.Estado_Tarea_ID,
                startDate: new Date(task.fechaInicio),
                endDate: new Date(task.fechaFin),
                tags: task.etiquetas,
                description: task.descripcion,
                comment: '', // Assuming comments aren't part of the task object
            };

            // Set additional states
            selectedUserId = task.Usuario_ID;
            startDate = new Date(task.fechaInicio);
            endDate = new Date(task.fechaFin);

        } catch (error) {
            console.error('Error fetching task data:', error);
            errorMessage = 'Failed to load task data. Please try again.';
        } finally {
            isLoading = false;
        }
    }

	async function validate() {
      try {
          if (isEdit) {
			const taskObj = {
            	Proyecto_ID: formData.projectId,
            	Task_ID: taskId,
            	nombre: formData.name,
            	prioridad: formData.priority,
            	tiempo: formData.time,
            	etiquetas: formData.tags,
            	descripcion: formData.description,
            	fechaInicio: formatDateForDB(startDate),
            	fechaFin: formatDateForDB(endDate),
            	Usuario_ID: selectedUserId // Bind selected user
        	};

        	const response = await axios.put(
        	    `https://luma-server.onrender.com/api/task/byRol/${userId}`, taskObj
        	);
            console.log('Task updated successfully:', response.data);
          } else {
              const response = await axios.post('https://luma-server.onrender.com/api/task', {
                  ...formData,
                  startDate: formatDateForDB(startDate),
                  endDate: formatDateForDB(endDate),
                  userId: userId
              });
              console.log('Task created successfully:', response.data);
          }
          close();
      } catch (error) {
          console.error(isEdit ? 'Error updating task:' : 'Error creating task:', error);
      }
	}

	// Fetch task data on mount when editing
    onMount(() => {
        if (isEdit) {
            fetchTaskData();
        }
    });
</script>

{#if show}
	<Modal title={isEdit ? 'Edit Task' : 'Create Task'} header controls controlsOptions on:close={close}>
		<form on:submit|preventDefault={validate}>
			<div class="overview">
				<p class="project-name">Project name</p>
			</div>

			<label class="input input-bordered flex items-center gap-2">
				<input type="text" bind:value={formData.name} class="grow" placeholder="Task name" />
			</label>

			<div class="task-details">
				<!-- Dropdown for selecting a user -->
                <label class="form-control">
                    <div class="label">
                        <span class="label-text">Asignar Usuario</span>
                    </div>
                    <select
                        class="select select-bordered w-full"
                        bind:value={selectedUserId}
                        required
                    >
                        <option value="" disabled selected>Seleccionar Usuario</option>
                        {#each projectMembers as member}
                            <option value={member.Usuario_ID}>{member.nombreCompleto} - {member.nombreRol}</option>
                        {/each}
                    </select>
                </label>

				<label class="input input-bordered flex items-center gap-2 w-full">
					<Tags />
					<input type="text" bind:value={formData.tags} class="grow" placeholder="Tags" />
				</label>

				<select class="select select-bordered w-full">
					<option value="" disabled selected>Estado</option>
					<!-- Placeholder visible por defecto -->
					<option value="1">Nuevo</option>
					<option value="2">En Progreso</option>
					<option value="3">Completadas</option>
					<option value="4">Aprobadas</option>
				</select>
			</div>

			<div class="content">
				<div class="row">
					<!-- Campo de Fecha Inicio -->
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Fecha inicio</span>
						</div>
						<input
							type="text"
							class="input input-bordered w-full"
							value={formatDate(startDate)}
							readonly
							on:click={() => (showDatePickerStart = !showDatePickerStart)}
						/>
						{#if showDatePickerStart}
							<DatePicker bind:value={startDate} />
						{/if}
					</label>

					<!-- Campo de Fecha Fin -->
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Fecha fin</span>
						</div>
						<input
							type="text"
							class="input input-bordered w-full"
							value={formatDate(endDate)}
							readonly
							on:click={() => (showDatePickerEnd = !showDatePickerEnd)}
						/>
						{#if showDatePickerEnd}
							<DatePicker bind:value={endDate} />
						{/if}
					</label>
				</div>

				<div class="row">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Esfuerzo</span>
						</div>
						<select class="select select-bordered" bind:value={formData.time}>
							<option disabled selected></option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Prioridad</span>
						</div>
						<select class="select select-bordered" bind:value={formData.priority}>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</label>
				</div>
			</div>

			<label class="form-control">
				<div class="label">
					<span class="label-text">Descripción</span>
				</div>
				<textarea
					class="textarea textarea-bordered h-24"
					bind:value={formData.description}
					placeholder="Descricion de la tarea"
				></textarea>
			</label>

			<!--
			<label class="form-control">
				<div class="label">
					<span class="label-text">Comentario</span>
				</div>
				<textarea
					class="textarea textarea-bordered h-24"
					bind:value={formData.comment}
					placeholder="Comentario de la tarea"
				></textarea>
			</label>
			-->

			<div class="controls">
				<button type="submit" class="btn btn-primary">{isEdit ? 'Actualizar' : 'Guardar'}</button>
			</div>
		</form>
		<!--		{#if data}-->
		<!--			{data}-->
		<!--		{/if}-->
	</Modal>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.task-details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	textarea {
		resize: none;
	}

	.row {
		display: flex;
		gap: 1rem;
	}

	.controls {
		text-align: right;
	}
</style>
