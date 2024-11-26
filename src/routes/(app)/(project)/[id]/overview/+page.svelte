<script>
	import { projectData } from '$lib/stores/projectStore';
	import { goto } from '$app/navigation';
	import { DateTime} from 'luxon';

	console.log($projectData);
</script>

{#if $projectData}
	<div class="main">

		<p class="title">{ $projectData.nombre }</p>

		<div class="content">
			<div class="main-content">
				<p> {$projectData.descripcion}</p>
			</div>

			<aside>
				<div class="members-content">
					<p>MIEMBROS</p>

					<div class="members-grid">
						<!--{#each [1,2,3,4,5,6] as member}-->
						{#each $projectData.miembros as member}
<!--							TODO: pendiente añadir bien el routing con el id del miembro-->
<!--							TODO: pendiente parsear el nombre para mostrar iniciales del usuario-->
							<div class="member" on:click={() => {goto(`/user/${member.Usuario_ID}`)}}>
								XX
							</div>
						{/each}
					</div>
				</div>

				<div class="creation-date">
					<p>FECHA DE CREACION</p>
					<p class="date"> {DateTime.fromISO($projectData.fechaRegistro).toFormat('LLL dd, yyyy')} </p>
				</div>

				<div class="tasks">
					<div class="completed-tasks">
						<p>TOTAL TAREAS</p>
						<p class="value"> {$projectData.totalTareas} </p>
					</div>
					<div class="approved-tasks">
						<p>TAREAS APROBADAS</p>
						<p class="value"> {$projectData.tareasAprobadas} </p>
					</div>
				</div>
			</aside>
		</div>

	</div>

{:else}
	<p>Loading project data...</p>
{/if}

<style>
    .title {
        font-size: var(--luma-h3-font-size);
        margin-bottom: 1rem;
    }

		.content{
				height: 68vh;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(1, 1fr);
        gap: var(--luma-element-spacing);
		}
		
		.main-content{
        grid-column: span 2 / span 2;
        grid-row: span 2 / span 2;
				/*background-color: lightgreen;*/
		}
		
		aside{
        /*background-color: lightpink;*/
        grid-row: span 2 / span 2;
        grid-column-start: 3;
				display: flex;
				flex-direction: column;
				gap: var(--luma-element-spacing);
				padding-inline: var(--luma-half-element-spacing);
		}

		.members-content{
				display: flex;
				flex-direction: column;
				gap: var(--luma-half-element-spacing);
		}

		.members-grid{
				display: grid;
				grid-template-rows: repeat(2, 1fr);
				grid-template-columns: repeat(3, 1fr);
				grid-gap: var(--luma-half-element-spacing);
				width: 60%;
		}

		.member{
				padding: var(--luma-half-element-spacing);
				background-color: var(--luma-color-gray-200);
				display: flex;
				align-items: center;
				justify-content: center;
				width: 70px;
				height: 70px;
				border-radius: 5px;
				cursor: pointer;
		}

		.creation-date{
				display: flex;
				flex-direction: column;
				gap: var(--luma-half-element-spacing);
		}

		.creation-date .date{
				font-size: var(--luma-paragraph-font-size);
				font-weight: bold;
		}

    .tasks .value{
        font-size: var(--luma-h5-font-size);
        font-weight: bold;
    }

		.tasks{
        display: flex;
        flex-direction: column;
        gap: var(--luma-element-spacing);
		}

		.tasks .approved-tasks,
		.tasks .completed-tasks{
				display: flex;
				flex-direction: column;
				gap: var(--luma-half-element-spacing);
		}

</style>