<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { Tags, User } from 'lucide-svelte';
	import { DateInput, DatePicker } from 'date-picker-svelte';
	let showDatePickerStart = false;
	let showDatePickerEnd = false;
	let startDate = new Date();
	let endDate = new Date();

	const dispatch = createEventDispatcher();

	export let show = true;
	export let data;

	let userId = '37d3b652-d314-4124-9685-add5f0c6fc19';

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

	const initialFormData = {
		projectId: 1,
		name: '',
		priority: '',
		time: '',
		state: '',
		startDate: '',
		endDate: '',
		description: '',
		tags: '',
		comment: ''
	};

	let formData = { ...initialFormData };

	function validate() {
		console.log('Validating form data...');

		try {
			const response = axios.post('https://luma-server.onrender.com/api/task', {
				projectId: formData.projectId,
				name: formData.name,
				priority: formData.priority,
				startDate: formatDateForDB(startDate),
				endDate: formatDateForDB(endDate),
				time: formData.time,
				userId: userId,
				tags: formData.tags,
				description: formData.description
			});

			console.log('Task created successfully:', response.data);

			close();
		} catch (error) {
			console.error('Error creating task:', error);
		}
	}
</script>

{#if show}
	<Modal header controls controlsOptions on:close={close}>
		<form on:submit|preventDefault={validate}>
			<div class="overview">
				<p class="project-name">Project name</p>
			</div>

			<label class="input input-bordered flex items-center gap-2">
				<input type="text" bind:value={formData.name} class="grow" placeholder="Task name" />
			</label>

			<div class="task-details">
				<label class="input input-bordered flex items-center gap-2 w-full">
					<User />
					<input type="text" class="grow" placeholder="User" />
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

			<div class="controls">
				<button type="submit" class="btn btn-primary"> Guardar </button>
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
