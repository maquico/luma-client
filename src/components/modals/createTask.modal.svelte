<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import axios from 'axios';
	import { Tags, User } from 'lucide-svelte';
	import { DatePicker } from 'date-picker-svelte';
	import { projectData } from '$lib/stores/projectStore';
	import { showToast } from '$lib/stores/toastStore';
	import { t } from '$lib/translations';

	let showDatePickerStart = false;
	let showDatePickerEnd = false;
	let startDate = new Date();
	let endDate = new Date();
	let projectMembers= $projectData.miembros;
	let projectId = $projectData.Proyecto_ID;
	let loadedFormData = {}; // Track loaded form data for comparison

	const dispatch = createEventDispatcher();

	export let show = true;
	export let data = null;
	export let isEdit = false; 

	const userId = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token')).user.id;
	const taskId = data?.id;
	// Extract the current user's role from the project data and projectMembers
	const currentUserRole = projectMembers.find(member => member.Usuario_ID === userId)?.Rol_ID;

	const initialFormData = {
		id: data?.id,
        projectId: '',
        name: '',
        priority: '',
        time: '',
        state: '0',
        startDate: '',
        endDate: '',
        tags: '',
        description: '',
        comment: ''
    };

	let formData = { ...initialFormData };
    let isLoading = false; // Track loading state
    let errorMessage = ''; // Track error messages

	const restrictedFields = {
    	1: ['userId', 'time', 'priority', 'startDate', 'endDate'], // Role ID 1 can't edit these fields
    	2: []
	};

	// Check if a field should be blocked
	const isFieldRestricted = (fieldName) => {
		// Check if field is restricted based on role
		const isRestrictedByRole = restrictedFields[currentUserRole]?.includes(fieldName);

		// Allow editing of 'time' and 'priority' only if it's an update
		if (fieldName === 'time' || fieldName === 'priority') {
			return isRestrictedByRole && isEdit;
		}

		return isRestrictedByRole;
	};


	const close = () => {
		show = false;
		formData = { ...initialFormData };
		dispatch('close');
	};

	const handleDelete = () => {
		show = false;
		dispatch('delete')
	}

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

	// Reactive statement to fetch task data when `data` changes and modal is shown
	$: {
		if (isEdit && show) {
			fetchTaskData();
		}
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
                priority: String(task.prioridad),
                time: String(task.tiempo),
                state: String(task.Estado_Tarea_ID),
                startDate: new Date(task.fechaInicio),
                endDate: new Date(task.fechaFin),
				userId: task.Usuario_ID,
                tags: task.etiquetas,
                description: task.descripcion,
                comment: '', // Assuming comments aren't part of the task object
            };

            // Set additional states
            // selectedUserId = task.Usuario_ID;
            startDate = new Date(task.fechaInicio);
            endDate = new Date(task.fechaFin);
			loadedFormData = { ...formData }; // Save loaded form data for comparison

        } catch (error) {
            console.error('Error fetching task data:', error);
            errorMessage = 'Failed to load task data. Please try again.';
        } finally {
            isLoading = false;
        }
    }

	async function validate() {
    try {
		// Update or create the task based on the isEdit flag
        try {
			// Check if form data has changed before sending the other update request
			const formHasChanged = () => {
				return Object.keys(formData)
                .filter(key => key !== 'state')
                .some(key => formData[key] !== loadedFormData[key]);
        	};
			
            if (isEdit) {
				if (formHasChanged()) {
                	const taskObj = {
                	    Proyecto_ID: formData.projectId,
                	    Task_ID: taskId,
                	    nombre: formData.name !== loadedFormData.name ? formData.name : undefined,
                	    prioridad: parseInt(formData.priority),
                	    tiempo: parseInt(formData.time),
                	    etiquetas: formData.tags !== loadedFormData.tags ? formData.tags : undefined,
                	    descripcion: formData.description !== loadedFormData.description ? formData.description : undefined,
                	    fechaInicio: formData.startDate !== loadedFormData.startDate ? formatDateForDB(startDate) : undefined,
                	    fechaFin: formData.endDate !== loadedFormData.endDate ? formatDateForDB(endDate) : undefined,
                	    Usuario_ID: formData.userId !== loadedFormData.userId ? formData.userId : undefined	
                	};

					console.log("USER ID ", formData.userId);
					// Remove undefined properties from the task object
					Object.keys(taskObj).forEach(key => taskObj[key] === undefined && delete taskObj[key]);

                	await axios.put(
						`https://luma-server.onrender.com/api/task/byRol/${userId}`, taskObj
                	)
					.then((response) => {
    				        console.log('Task details updated:', response.data);
    				        showToast($t('create_task.update_success'), { type: 'success', duration: 5000 });
    				})
    				.catch((error) => {
    				    console.error('Error updating task details:', error);
					
    				    if (error.response) {
    				        // Check if the status code is 400
    				        if (error.response.status === 400 || error.response.status === 403) {
								if (error.response.data === 'El usuario no es miembro del proyecto') {
									showToast($t('create_task.not_member'), { type: 'warning', duration: 5000 });
								} else if(error.response.data === 'Rol de usuario sin permisos para actualizar tareas'){
									showToast($t('create_task.not_leader'), { type: 'warning', duration: 5000 });
								} else if(error.response.data === 'No hay campos válidos para actualizar'){
									showToast($t('create_task.not_valid'), { type: 'warning', duration: 5000 });
								} else {
									showToast(error.response.data, { type: 'warning', duration: 5000 });
								}
    				            return;
    				        }
    				    }
    				    // Generic error toast
    				    showToast($t('create_task.update_error'), { type: 'error', duration: 5000 });
    				});
				}

				if (formData.state !== loadedFormData.state) {
    				await axios
    				    .put(`https://luma-server.onrender.com/api/task/status/${taskId}`, {
    				        projectId: parseInt(formData.projectId),
    				        newStatusId: parseInt(formData.state),
    				        userId: userId
    				    })
    				    .then((response) => {
    				        console.log('Task status updated:', response.data);
    				        showToast($t('create_task.status_change'), { type: 'success', duration: 5000 });
    				    })
    				    .catch((error) => {
    				        console.error('Error updating task status:', error);
						
    				        if (error.response) {
    				            // Check if the status code is 400
    				            if (error.response.status === 400 || error.response.status === 403) {
    				                // Handle specific known error message
    				            	if (error.response.data === 'Task already has the new status') {
    				            	    //showToast('Task already with that status', { type: 'info', duration: 5000 });
    				            	} else if(error.response.data === 'User does not have permission to approve tasks'){
									showToast($t('create_task.not_leader'), { type: 'warning', duration: 5000 });
									} else if(error.response.data === 'Task has no user associated'){
										showToast($t('create_task.no_user'), { type: 'warning', duration: 5000 });
									} else {
										showToast(error.response.data, { type: 'warning', duration: 5000 });
									}
    				                return;
    				            }
    				        }
    				        // Generic error toast
    				        showToast($t('create_task.update_status_error'), { type: 'error', duration: 5000 });
    				    });
				}
            } else if (!isEdit) {
				const requestBody = {	
    				projectId: projectId,
    				name: formData.name,
    				priority: parseInt(formData.priority),
    				startDate: formatDateForDB(startDate),
    				endDate: formatDateForDB(endDate),
    				time: formData.time,
    				userId: userId,
    				tags: formData.tags,
    				description: formData.description
				}
				await axios
					.post('https://luma-server.onrender.com/api/task', requestBody)
					.then((response) => {
    				        console.log('Task created: ', response.data);
    				        showToast($t('create_task.create_success'), { type: 'success', duration: 5000 });
    				    })
    				    .catch((error) => {
    				        console.error('Error creating task:', error);
						
    				        if (error.response) {
    				            // Check if the status code is 400
    				            if (error.response.status === 400 || error.response.status === 403) {
    				                showToast(error.response.data, { type: 'warning', duration: 5000 });
    				                return;
    				            }
    				        }
						
    				        // Generic error toast
    				        showToast($t('create_task.create_error'), { type: 'error', duration: 5000 });
    				    });
            }
			dispatch('update');
            close();
        } catch (error) {
			console.error(isEdit ? 'Error updating task:' : 'Error creating task:', error);
            showToast($t('create_task.saving_error'), { type: 'error', duration: 5000 });
        }
    } catch (error) {
		console.error('Unexpected error occurred:', error);
        showToast($t('create_task.unexpected_error'), { type: 'error', duration: 5000 });
    }
}
</script>

{#if show}
	<Modal title={isEdit ? $t('create_task.edit_title') : $t('create_task.create_title')} data={data} isEdit={isEdit} header controls controlsOptions on:close={close} on:delete={handleDelete}>
		<form on:submit|preventDefault={validate}>
			<div class="overview">
				<p class="project-name" hidden>{$t('create_task.project_name')}</p>
			</div>

			<label class="input input-bordered flex items-center gap-2">
				<input type="text" bind:value={formData.name} required class="grow" placeholder={$t('create_task.task_name')} />
			</label>

			<div class="task-details">
				<!-- Dropdown for selecting a user -->
                <label class="form-control">
                    <div class="label">
                        <span class="label-text">{$t('create_task.assign_user')}</span>
                    </div>
                    <select
                        class="select select-bordered w-full"
                        bind:value={formData.userId}
                        required
						disabled={isFieldRestricted('userId')}
                    >
                        <option value="" disabled selected>{$t('create_task.select_user')}</option>
                        {#each projectMembers as member}
                            <option value={member.Usuario_ID}>{member.nombreCompleto} - {member.nombreRol}</option>
                        {/each}
                    </select>
                </label>

				<label class="input input-bordered flex items-center gap-2 w-full">
					<Tags />
					<input type="text" bind:value={formData.tags} class="grow" placeholder={$t('create_task.tags')} />
				</label>

				<select class="select select-bordered w-full" bind:value={formData.state}>
					<option value="0" disabled selected>{$t('create_task.status')}</option>
					<!-- Placeholder visible por defecto -->
					<option value="1">{$t('create_task.to_do')}</option>
					<option value="2">{$t('create_task.in_progress')}</option>
					<option value="3">{$t('create_task.done')}</option>
					<option value="4">{$t('create_task.approved')}</option>
				</select>
			</div>

			<div class="content">
				<div class="row">
					<!-- Campo de Fecha Inicio -->
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">{$t('create_task.start_date')}</span>
						</div>
						<input
							type="text"
							class="input input-bordered w-full"
							value={formatDate(startDate)}
							readonly
							on:click={() => (showDatePickerStart = !showDatePickerStart)}
							disabled={isFieldRestricted('startDate')}
						/>
						{#if showDatePickerStart}
							<DatePicker bind:value={startDate} />
						{/if}
					</label>

					<!-- Campo de Fecha Fin -->
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">{$t('create_task.end_date')}</span>
						</div>
						<input
							type="text"
							class="input input-bordered w-full"
							value={formatDate(endDate)}
							readonly
							on:click={() => (showDatePickerEnd = !showDatePickerEnd)}
							disabled={isFieldRestricted('endDate')}
						/>
						{#if showDatePickerEnd}
							<DatePicker bind:value={endDate} />
						{/if}
					</label>
				</div>

				<div class="row">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">{$t('create_task.effort')}</span>
						</div>
						<select class="select select-bordered" bind:value={formData.time} required disabled={isFieldRestricted('time')}>
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
							<span class="label-text">{$t('create_task.priority')}</span>
						</div>
						<select class="select select-bordered" bind:value={formData.priority} required disabled={isFieldRestricted('priority')}>
							<option value="1">{$t('create_task.really_high')}</option>
							<option value="2">{$t('create_task.high')}</option>
							<option value="3">{$t('create_task.normal')}</option>
							<option value="4">{$t('create_task.low')}</option>
							<option value="5">{$t('create_task.really_low')}</option>
						</select>
					</label>
				</div>
			</div>

			<label class="form-control">
				<div class="label">
					<span class="label-text">{$t('create_task.description')}</span>
				</div>
				<textarea
					class="textarea textarea-bordered h-24"
					bind:value={formData.description}
					placeholder={$t('create_task.description_placeholder')}
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
				<button type="submit" class="btn btn-primary">{isEdit ? $t('create_task.update') : $t('create_task.save')}</button>
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
