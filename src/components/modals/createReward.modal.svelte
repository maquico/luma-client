<script>
	import { onMount } from 'svelte';
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';
	import { loadRewardsFunction } from '$src/lib/stores/rewardStore.js';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let rewardId;

	let userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
	let userId = userData.user.id;
	let loadRewards;
	let data;

	const close = () => {
		show = false;
		formData = { ...initialFormData };
		dispatch('close');
	};

	const initialFormData = {
		projectId: '',
		name: '',
		quantity: '',
		capacity: '',
		icon: '',
		price: '',
		description: ''
	};

	let formData = { ...initialFormData };
	let projectsOptions = [];

	loadRewardsFunction.subscribe((func) => {
		loadRewards = func;
	});

	const fetchProjectsByUser = async () => {
		try {
			const response = await axios.get(
				`https://luma-server.onrender.com/api/projects/user/${userId}`
			);
			projectsOptions = response.data.map((project) => ({
				value: project.Proyecto_ID,
				label: project.nombre
			}));
			if (projectsOptions.length > 0) {
				formData.projectId = projectsOptions[0].value;
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	};

	const fetchRewardData = async () => {
		console.log('Fetching reward data...');

		await axios
			.get(`https://luma-server.onrender.com/api/rewards/${rewardId}`)
			.then((response) => {
				data = response.data[0];
				formData.projectId = data.Proyecto_ID;
				formData.name = data.nombre;
				formData.quantity = data.cantidad;
				formData.capacity = data.limite;
				formData.icon = data.Icono_ID;
				formData.price = data.precio;
				formData.description = data.descripcion;

				console.log('rewardDATA', response.data);
			})
			.catch((error) => {
				console.error('Error fetching user data:', error);
			});
	};

	$: if (show && rewardId) {
		console.log('Modal abierto, ejecutando fetchRewardData');
		fetchRewardData();
	}

	onMount(() => {
		fetchProjectsByUser();
	});

	function validate() {
		try {
			const response = axios.post('https://luma-server.onrender.com/api/rewards/create', {
				projectId: formData.projectId,
				iconoId: formData.icon,
				nombre: formData.name,
				descripcion: formData.descripion,
				precio: formData.price,
				cantidad: formData.quantity,
				limite: formData.capacity
			});

			console.log('Form data:', formData);

			console.log('Reward created successfully:', response.data);
			loadRewards();

			close();
		} catch (error) {
			console.error('Error creating reward:', error);
		}
	}
</script>

{#if show}
	<Modal header controls controlsOptions on:close={close}>
		<form on:submit|preventDefault={validate}>
			<div class="overview">
				<p class="project-name">Project name</p>
				<select class="select select-bordered w-full max-w-xs" bind:value={formData.projectId}>
					<option value="" disabled>Selecciona un Proyecto</option>
					{#each projectsOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<p class="reward-name">Reward name</p>
			<label class="input input-bordered flex items-center gap-2">
				<input type="text" bind:value={formData.name} class="grow" placeholder="Reward name" />
			</label>

			<div class="content">
				<div class="row">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Cantidad</span>
						</div>
						<label class="input input-bordered flex items-center gap-2">
							<input
								type="text"
								bind:value={formData.quantity}
								class="grow"
								placeholder="Reward quantity"
							/>
						</label>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Icono</span>
						</div>
						<select class="select select-bordered" bind:value={formData.icon}>
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
							<span class="label-text">Precio</span>
						</div>
						<label class="input input-bordered flex items-center gap-2">
							<input
								type="text"
								bind:value={formData.price}
								class="grow"
								placeholder="Reward price"
							/>
						</label>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Límite</span>
						</div>
						<select class="select select-bordered" bind:value={formData.capacity}>
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

			<div class="controls">
				<button type="submit" class="btn btn-primary"> Guardar </button>
			</div>
		</form>
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
