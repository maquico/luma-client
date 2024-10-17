<script>
	import { goto } from '$app/navigation';
	import { ListFilter } from 'lucide-svelte';
	import CreateProjectModal from '$components/modals/createProject.modal.svelte';
	import noContent from '$lib/assets/no-content.png'
	import { onMount } from 'svelte';
	import axios from 'axios';

	let frequentProjects = [];
	let otherProjects = [];
	let searchValue = '';
	let showModal = false;
	let loading = true;
	let userId

	$: filter(searchValue);

	async function loadProjects() {
		try {
			const response = await axios.get(`https://luma-server.onrender.com/api/projects/user/${userId}`);
			const projects = response.data || [];
			frequentProjects = projects.slice(0, 3);
			otherProjects = projects.slice(3);
		} catch (err) {
			console.error("Error while fetching projects: ", err);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		const storedData = localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token');

		if (storedData) {
			// Parse the JSON data to access user info
			const sessionData = JSON.parse(storedData);

			userId = sessionData.user.id;
		}

		loadProjects()
	});

	function filter(searchValue) {
		console.log(searchValue);
	}

	function handleClose() {
		showModal = false;
	}

	function formatDate(fechaRegistro) {
		return new Date(fechaRegistro).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}
</script>

<div
	class="h-[90.5vh] flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500"
>
	<div class="page-content">
		{#if loading}
			<div class="flex items-center justify-center w-full">
				<div class="loading loading-dots loading-lg"/>
			</div>
		{:else}

			<div class="controls">
				Proyectos

				<!--TOOD: cambiar la condicional para cuando se pase al flujo normal -->
				{#if frequentProjects.length !== 0}
				<!--{#if frequentProjects.length === 0}-->
					<div class="left">
						<label class="input input-bordered flex items-center gap-2">
							<ListFilter />
							<input
								type="text"
								name="search"
								id="search"
								placeholder="Buscar proyecto ..."
								bind:value={searchValue}
								size="20"
							/>
						</label>
						<button
							class="btn btn-primary"
							on:click={() => {
							showModal = true;
						}}
						>
							NUEVO PROYECTO
						</button>
					</div>
				{/if}

			</div>

			<!--TOOD: cambiar la condicional para cuando se pase al flujo normal -->
			{#if frequentProjects.length === 0}
			<!--{#if frequentProjects.length !== 0} &lt;!&ndash;No content&ndash;&gt;-->
				<div class="no-content">
					<div class="right">
						<p class="title"> No hay nada por aquí... aún. </p>
						<p>Comienza creando un nuevo proyecto para empezar. <br>
							Tus proyectos aparecerán aquí una vez crees uno o te inviten para formar parte</p>
						<button
							class="btn btn-primary"
							on:click={() => {
							showModal = true;
						}}
						>
							NUEVO PROYECTO
						</button>
					</div>

					<img src="{noContent}" alt="no-content image" />


				</div>
			{:else}
				<!--		Projects-->
				<div class="frequent-projects-container">
					{#each frequentProjects as project}
						<button
							class="card frequent-projects cursor-pointer"
							on:click={() => {
							goto(`/${project.Proyecto_ID}/overview`);
						}}
						>
						<span class="top">
							<div class="avatar placeholder">
								<div class="text-neutral-content w-10 p-2 border-2 rounded-l">
									<span class="text-xl">XX</span>
								</div>
							</div>
							<p class="title">{project.nombre}</p></span
						>
							<span class="down">
							<p class="description">{project.descripcion}</p>
							<p class="create-details">{project.creator} • {formatDate(project.fechaRegistro)}</p>
						</span>
						</button>
					{/each}
				</div>
				{#if otherProjects.length !== 0}
					<div class="projects-container">
						{#each otherProjects as project}
							<button
								class="projects cursor-pointer"
								on:click={() => {
								goto(`/${project.Proyecto_ID}/overview`);
							}}
							>
								{project.nombre}
							</button>
						{/each}
					</div>
				{/if}

			{/if}
		{/if}
	</div>
</div>

<CreateProjectModal show={showModal} on:close={handleClose} />

<style>
	.page-content {
		width: 70rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.controls {
		font-size: var(--luma-h4-font-size);
		color: var(--luma-color-gray-50);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.controls .left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.controls .left button{
			color: white;
	}

	.card {
		background-color: white;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 2rem;
	}

	.no-content{
      background-color: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2rem;
			height: 65vh;
			gap: 2rem;
	}

	.no-content .right{
			display: flex;
			flex-direction: column;
			text-align: center;
			gap: 1rem;
			width: 30vw;
	}

	.no-content .right button{
			margin-top: 1rem;
			color: var(--luma-color-gray-50);
	}

	.no-content .title{
			color: var(--luma-color-gray-500);
			font-weight: bold;
			font-size: 2rem;
      margin-bottom: 1rem;
	}

	.no-content img{
      width: 30rem;
	}

	.frequent-projects-container {
		display: flex;
		gap: 1rem;
	}

	.frequent-projects.card {
		align-items: start;
		justify-content: start;
		height: auto;
		width: stretch;
		text-align: left;
		gap: 10px;
	}

	.frequent-projects .top {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.frequent-projects .down {
		padding-left: 3.5rem;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.frequent-projects .description {
		font-size: var(--luma-body-font-size);
		width: 200px;
		height: 40px;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.frequent-projects .create-details {
		font-size: var(--luma-body-font-size);
		color: var(--luma-color-blue);
		font-weight: 500;
	}

	.projects-container {
		border-radius: 4px;
		height: 300px;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;

		/*Scrollbar*/
		scrollbar-width: thin;
	}

	.projects-container .projects {
		width: 100%;
		border-bottom: 1px solid var(--luma-color-gray-200);
		padding: 1rem 2rem;
		text-align: left;
	}
</style>
