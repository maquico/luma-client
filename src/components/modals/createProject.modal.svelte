<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { userData } from '$lib/stores/userStore.js';
	import { get } from 'svelte/store';
	import Modal from '$components/modal.svelte';
	import axios from 'axios';
	import { t } from '$lib/translations';
	import { showToast } from '$lib/stores/toastStore';
	import { browser } from '$app/environment';


	const dispatch = createEventDispatcher();

	export let show = true;
	let projectName = '';
	let projectDescription = '';
	// let userId = '37d3b652-d314-4124-9685-add5f0c6fc19';
	let userLocalData

	let userID;
	let userNewData;
	if (browser) {
		userLocalData = localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token')
			? JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'))
			: null;

		if (!userLocalData) {
			console.log('No hay usuario en local storage');
			// get data from the store
			userNewData = get(userData);
			console.log('userNewData', userNewData);
		} else {
			userID = userLocalData.user.id;
		}
	}

	let invalidInput = false;

	const close = () => {
		show = false;
		dispatch('close');
	};

	function validate() {
		invalidInput = false;
		if (projectName.length > 50) {
			console.error('El nombre del proyecto no debe exceder 50 caracteres.');
			invalidInput = true;
			return;
		}

		axios
			.post('https://luma-server.onrender.com/api/projects', {
				nombre: projectName,
				descripcion: projectDescription,
				userId: userID
			})
			.then((response) => {
				const projectId = response.data.proyecto_id;
				console.log('Proyecto creado con ID:', projectId);
				goto(`/${projectId}/overview`);
				console.log('Proyecto creado:', response.data);
				show = false;
				dispatch('close');
			})
			.catch((error) => {
				console.error('Error al crear el proyecto:', error);
			});
	}
</script>

{#if show}
	<Modal header closeByBackgroundClick title={$t('create_project.modal_title')} on:close={close}>
		<form on:submit|preventDefault={validate}>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">{$t('create_project.project_name')}</span>
				</div>
				<input
					type="text"
					bind:value={projectName}
					placeholder={$t('create_project.input_placeholder')}
					class="input input-bordered w-full"
				/>
				{#if invalidInput}
					<span style="color:red;">{$t('create_project.project_name_warning')}</span>
				{/if}
			</label>
			<label class="form-control">
				<div class="label">
					<span class="label-text">{$t('create_project.project_description')}</span>
				</div>
				<textarea
					bind:value={projectDescription}
					class="textarea textarea-bordered h-24"
					placeholder={$t('create_project.input_placeholder')}
					style="resize: none"
				/>
			</label>

			<div class="controls">
				<button class="btn btn-outline" on:click={close}> {$t('create_project.cancel')}</button>
				<button type="submit" class="btn btn-primary"> {$t('create_project.create')}</button>
			</div>
		</form>
	</Modal>
{/if}

<style>
	.controls {
		text-align: right;
	}

	form {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
