<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { Tags, User } from 'lucide-svelte';
	import { DateInput, DatePicker } from 'date-picker-svelte';
	let date = new Date();
	let showDatePicker = false;

	const dispatch = createEventDispatcher();

	export let show = true;
	export let data;

	const close = () => {
		show = false;
		formData = { ...initialFormData };
		dispatch('close');
	};

	const initialFormData = {
		projectId: 1,
		name: '',
		priority: '',
		time: '',
		startDate: '',
		endDate: '',
		userId: '37d3b652-d314-4124-9685-add5f0c6fc19',
		description: '',
		tags: ''
	};

	let formData = { ...initialFormData };

	function validate() {
		console.log('Validating form data...');

		try {
			const response = axios.post('https://luma-server.onrender.com/api/task', {
				projectId: formData.projectId,
				name: formData.name,
				priority: formData.priority,
				time: formData.time,
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
				<label class="input input-bordered flex items-center gap-2">
					<User />
					<input type="text" class="grow" placeholder="User" />
				</label>

				<label class="input input-bordered flex items-center gap-2">
					<Tags />
					<input type="text" bind:value={formData.tags} class="grow" placeholder="Tags" />
				</label>
			</div>

			<div class="content">
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

				<div class="row">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Fecha inicio</span>
						</div>
						<DateInput
							bind:value={date}
							on:click={() => {
								showDatePicker = !showDatePicker;
							}}
						/>
						{#if showDatePicker}
							<DatePicker bind:value={date} />
						{/if}
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Fecha fin</span>
						</div>
						<DateInput
							bind:value={date}
							on:click={() => {
								showDatePicker = !showDatePicker;
							}}
						/>
						{#if showDatePicker}
							<DatePicker bind:value={date} />
						{/if}
					</label>

					<!-- <label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Pick the best fantasy franchise</span>
						</div>
						<select class="select select-bordered">
							<option disabled selected>Pick one</option>
							<option>Star Wars</option>
							<option>Harry Potter</option>
							<option>Lord of the Rings</option>
							<option>Planet of the Apes</option>
							<option>Star Trek</option>
						</select>
					</label> -->
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
			</div>

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
