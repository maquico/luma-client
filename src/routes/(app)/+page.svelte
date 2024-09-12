<div class="h-[90.5vh] flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
	<div class="page-content">
		<div class="controls">
			Proyectos
			<div class="left">
				<label class="input input-bordered flex items-center gap-2">
					<ListFilter />
					<input type="text" name="search" id="search" placeholder="Buscar proyecto ..." bind:value={searchValue} size="20"/>
				</label>
				<button class="btn btn-primary" on:click={() => {showModal = true}}> Nuevo projecto </button>
			</div>
		</div>

<!--		Projects-->
		<div class="frequent-projects-container">
			{#each frequentProjects as project}
				<button class="card frequent-projects cursor-pointer" on:click={() => {goto('/overview')}}>
					<span class="top">
						<div class="avatar placeholder">
						 <div class="text-neutral-content w-10 p-2 border-2 rounded-l">
							<span class="text-xl">XX</span>
						 </div>
						</div>
						<p class="title">{project.title}
					</span>
					<span class="down">
						<p class="description">	{project.description}</p>
						<p class="create-details">{project.creator} • {project.create_date}</p>
					</span>
<!--					<span class="right">-->
<!--						<div class="avatar placeholder">-->
<!--						 <div class="text-neutral-content w-10 p-2 border-2 rounded-l">-->
<!--							<span class="text-xl">XX</span>-->
<!--						 </div>-->
<!--						</div>-->
<!--				  </span>-->
<!--					<span class="left">-->
<!--      			<p class="title">{project.title}</p>-->
<!--						<p class="description">	{project.description}</p>-->
<!--						<p class="create-details">{project.creator} • {project.create_date}</p>-->
<!--			     </span>-->
				</button>
			{/each}
		</div>
		{#if otherProjects.length !== 0}
			<div class="projects-container">
				{#each otherProjects as project}
					<button class="projects cursor-pointer" on:click={() => {goto('/overview')}}>
						{project.title}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<CreateProjectModal show={showModal} on:close={handleClose} />

<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { ListFilter } from 'lucide-svelte';
	import CreateProjectModal from '$components/modals/createProject.modal.svelte'

	let projects = [
		{
			"title": "Desarrollo de Plataforma E-commerce",
			"description": "Plataforma para la venta de productos ecológicos y frescos en la República Dominicana.",
			"create_date": "2024-08-15",
			"members": ["Ana Gómez", "Luis Pérez", "María Rodríguez"],
			"creator": "Juan Martínez"
		},
		{
			"title": "Chatbot para Conti",
			"description": "Desarrollo de un chatbot amigable para empleados de una organización multinacional.",
			"create_date": "2024-08-05",
			"members": ["Carlos López", "Sofía Jiménez"],
			"creator": "Laura Fernández"
		},
		{
			"title": "Proyecto Luma",
			"description": "Plataforma web que combina la gestión de proyectos con la gamificación.",
			"create_date": "2024-07-30",
			"members": ["Raúl Torres", "Diana Morales", "Esteban Vega"],
			"creator": "Marcelo Silva"
		},
		{
			"title": "Aplicativo Biblioteca con FastAPI",
			"description": "Gestión de una biblioteca de libros con FastAPI para implementar conceptos de DevOps.",
			"create_date": "2024-07-10",
			"members": ["Isabel Rivera", "Pedro Sánchez"],
			"creator": "Clara Castillo"
		},
		{
			"title": "Sistema de Gestión de Inventarios",
			"description": "Sistema automatizado para el control y seguimiento de inventarios en una cadena de tiendas minoristas.",
			"create_date": "2024-06-20",
			"members": ["Elena González", "Fernando Herrera"],
			"creator": "Miguel Pérez"
		},
		{
			"title": "Aplicación de Seguimiento de Salud",
			"description": "App móvil que permite a los usuarios monitorear su salud mediante el seguimiento de parámetros como la actividad física y la alimentación.",
			"create_date": "2024-05-05",
			"members": ["Julia Ramírez", "Andrés López", "Natalia Duarte"],
			"creator": "Roberto Suárez"
		},
		{
			"title": "Plataforma de Cursos en Línea",
			"description": "Desarrollo de una plataforma de e-learning para ofrecer cursos en línea sobre diferentes disciplinas.",
			"create_date": "2024-04-18",
			"members": ["Carmen Ortiz", "Eduardo Castro"],
			"creator": "Adriana Muñoz"
		},
		{
			"title": "Sistema de Facturación Electrónica",
			"description": "Desarrollo de un sistema para la emisión y gestión de facturas electrónicas para pequeñas y medianas empresas.",
			"create_date": "2024-03-12",
			"members": ["Patricia Paredes", "Ricardo Serrano"],
			"creator": "Diego Vásquez"
		},
		{
			"title": "Proyecto Luma",
			"description": "Plataforma web que combina la gestión de proyectos con la gamificación.",
			"create_date": "2024-07-30",
			"members": ["Raúl Torres", "Diana Morales", "Esteban Vega"],
			"creator": "Marcelo Silva"
		},
		{
			"title": "Aplicativo Biblioteca con FastAPI",
			"description": "Gestión de una biblioteca de libros con FastAPI para implementar conceptos de DevOps.",
			"create_date": "2024-07-10",
			"members": ["Isabel Rivera", "Pedro Sánchez"],
			"creator": "Clara Castillo"
		},
		{
			"title": "Sistema de Gestión de Inventarios",
			"description": "Sistema automatizado para el control y seguimiento de inventarios en una cadena de tiendas minoristas.",
			"create_date": "2024-06-20",
			"members": ["Elena González", "Fernando Herrera"],
			"creator": "Miguel Pérez"
		},
	]

	let frequentProjects = []
	let otherProjects = []
	let searchValue = ''
	let showModal = false

	$:filter(searchValue)

	onMount(() => {
		frequentProjects = projects.slice(0,3);
		otherProjects = projects.slice(3)
	})

	function filter(searchValue){
		console.log(searchValue);
	}

	function handleClose(){
		showModal = false
	}

</script>

<style>
    .page-content{
        width: 70rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .controls{
				font-size: var(--luma-h4-font-size);
				color: var(--luma-color-gray-50);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

		.controls .left{
				display: flex;
				align-items: center;
        gap: 1rem;
		}

    .card{
        background-color: white;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 2rem;
    }

    .frequent-projects-container{
        display: flex;
        gap: 1rem;
    }

    .frequent-projects.card{
        align-items: start;
        justify-content: start;
        height: auto;
        width: fill;
        text-align: left;
        gap: 10px;
    }

		.frequent-projects .top{
				display: flex;
				align-items: center;
				gap: 1rem;
		}

    .frequent-projects .down{
    	padding-left: 3.5rem;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

    .frequent-projects .description{
        font-size: var(--luma-body-font-size);
        width: 200px;
        height: 40px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical
		}

		.frequent-projects .create-details{
				font-size: var(--luma-body-font-size);
				color: var(--luma-color-blue);
				font-weight: 500;
		}

				/*.frequent-projects .left .title{*/
    /*    color: var(--luma-color-gray-950);*/
    /*}*/

    /*.frequent-projects .left	.description{*/
    /*    font-size: var(--luma-body-font-size);*/
    /*    width: 200px;*/
    /*    height: 40px;*/
    /*    overflow: hidden;*/
    /*    display: -webkit-box;*/
    /*    -webkit-line-clamp: 2;*/
    /*    -webkit-box-orient: vertical;*/
    /*}*/

    /*.frequent-projects .left .create-details{*/
    /*    font-size: var(--luma-body-font-size);*/
    /*    color: var(--luma-color-blue);*/
    /*    font-weight: 500;*/
    /*}*/


    .projects-container{
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


    .projects-container .projects{
        width: 100%;
        border-bottom: 1px solid var(--luma-color-gray-200);
        padding: 1rem 2rem;
        text-align: left;
    }
</style>

