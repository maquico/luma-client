<script>
	import { projectData } from '$lib/stores/projectStore';

	console.log($projectData);
</script>

{#if $projectData}
	<div class="main">

		<p class="title">{ $projectData.nombre }</p>

		<div class="content">
			<div class="main-content">
<!--				<p> {$projectData.descripcion}</p>-->
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis consequat orci vel varius. Aliquam augue lorem, fringilla nec ipsum in, rutrum dignissim enim. Suspendisse eleifend ultrices leo nec luctus. Nulla malesuada massa in porttitor suscipit. Donec sit amet rutrum erat. Donec neque nulla, sollicitudin id eleifend ac, mollis sit amet sem. Etiam finibus, enim porttitor mollis dignissim, tortor mauris convallis lacus, non aliquam massa est vel est. Donec eu massa efficitur, laoreet nibh rhoncus, pulvinar tortor. Sed eget sodales velit.
				</p>

				<br>

				<p>
					Suspendisse lacinia interdum magna sed placerat. Proin dignissim, quam ut accumsan viverra, nibh leo mattis neque, eget molestie turpis mauris ac neque. Etiam et dapibus dolor. Vestibulum eu odio laoreet, vehicula ligula sit amet, semper ante. Quisque in accumsan lectus. Vivamus nulla mi, posuere nec lobortis ac, faucibus non ante. Curabitur viverra, sapien id viverra tempor, augue mi gravida lorem, eget auctor quam risus eget metus. Phasellus in ligula facilisis, luctus sapien a, feugiat risus. Vestibulum ut euismod sem
				</p>
			</div>

			<aside>
				<div class="members-content">
					<p>MIEMBROS</p>

					<div class="members-grid">
						{#each [1,2,3,4,5,6] as member}
							<div class="member">
								XX
							</div>
						{/each}
					</div>
				</div>

				<div class="creation-date">
					<p>FECHA DE CREACION</p>
					<p class="date"> 00/00/2024</p>
				</div>

				<div class="tasks">
					<div class="completed-tasks">
						<p>TAREAS COMPLETADAS</p>
						<p class="value"> 00 </p>
					</div>
					<div class="approved-tasks">
						<p>TAREAS APROBADAS</p>
						<p class="value"> 00 </p>
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
		}

		.creation-date{
				display: flex;
				flex-direction: column;
				gap: var(--luma-half-element-spacing);
		}

		.creation-date .date,
		.tasks .value{
				font-size: var(--luma-paragraph-font-size);
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