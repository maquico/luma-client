<script>
	let selectedQuestion = 1;

	let FAQ = [
		{
			"id": 1,
			"title": "¿Quién puede modificar el valor en monedas, el esfuerzo y la prioridad de una tarea?",
			"response": "Solo los líderes de proyecto y de la organización pueden modificar estos campos."
		},
		{
			"id": 2,
			"title": "¿Puedo eliminar una tarea dentro de un proyecto?",
			"response": "Solo los líderes de proyecto y de la organización tienen permisos para eliminar tareas."
		},
		{
			"id": 3,
			"title": "¿Cómo se calcula el valor en monedas de una tarea?",
			"response": "El sistema calcula automáticamente el valor en monedas basado en el esfuerzo y la prioridad asignados a la tarea al momento de su creación."
		},
		{
			"id": 4,
			"title": "¿Para qué sirven las gemas y las monedas en LUMA?",
			"response": "Las gemas se utilizan para comprar temas que personalizan la apariencia de tu interfaz, mientras que las monedas se usan para adquirir recompensas personalizadas definidas por los líderes de proyecto."
		},
		{
			"id": 5,
			"title": "¿Cómo puedo comprar y cambiar temas?",
			"response": "Visita la tienda de temas en la plataforma, utiliza gemas para adquirir el tema que desees y cámbialo desde la sección de ajustes de la interfaz."
		},
		{
			"id": 6,
			"title": "¿Puedo cambiar el idioma de la plataforma?",
			"response": "Sí, LUMA permite cambiar entre inglés y español desde la configuración de tu cuenta."
		},
		{
			"id": 7,
			"title": "¿Qué significa que una tarea esté 'aprobada'?",
			"response": "Una tarea es aprobada cuando ha pasado por todos los criterios de validación establecidos. Solo entonces se activan las recompensas asociadas."
		},
		{
			"id": 8,
			"title": "¿Cómo se validan las tareas en LUMA?",
			"response": "Cada tarea tiene criterios específicos que deben cumplirse antes de ser aprobada. Estos pueden incluir la verificación por parte del líder del proyecto u otros parámetros automáticos."
		},
		{
			"id": 9,
			"title": "¿Cómo se pueden adquirir más gemas?",
			"response": "Las gemas se obtienen completando tareas que tienen recompensas asociadas o a través de promociones dentro de la plataforma."
		},
		{
			"id": 10,
			"title": "¿Hay alguna restricción para el uso de gemas o monedas?",
			"response": "Las gemas se utilizan únicamente en la tienda de temas, mientras que las monedas se pueden usar para obtener recompensas específicas que definan los líderes dentro de cada proyecto."
		},
		{
			"id": 11,
			"title": "¿Puedo transferir gemas o monedas a otro usuario?",
			"response": "Actualmente, no es posible transferir gemas o monedas entre usuarios."
		},
		{
			"id": 12,
			"title": "¿Cómo funciona el sistema de recompensas en LUMA y cuál es su propósito dentro de la plataforma?",
			"response": "El sistema de recompensas en LUMA está diseñado para motivar a los usuarios a completar tareas de manera eficiente y colaborar en los proyectos. Cada tarea tiene asignadas recompensas en forma de monedas y gemas, que se otorgan al completarla y aprobarla. Las gemas se pueden usar para personalizar la experiencia del usuario a través de la compra de temas visuales, mientras que las monedas se utilizan para adquirir recompensas personalizadas dentro del proyecto, como acceso a recursos adicionales o beneficios definidos por los líderes. Este sistema fomenta la productividad, ya que los usuarios tienen un incentivo tangible para completar sus tareas y mejorar el rendimiento general del proyecto."
		},
		{
			"id": 13,
			"title": "¿Qué tipo de personalización ofrece LUMA y cómo beneficia a los usuarios?",
			"response": "LUMA permite a los usuarios personalizar la apariencia de su interfaz a través de temas que se pueden adquirir con gemas en la tienda de la plataforma. Esta característica les permite ajustar los colores, fondos y estilos visuales de acuerdo a sus preferencias, creando un entorno de trabajo más atractivo y cómodo. Esta personalización no solo ayuda a que la plataforma se adapte a los gustos individuales, sino que también puede mejorar la concentración y la productividad, ya que los usuarios pueden elegir un tema que les resulte más agradable visualmente, reduciendo la fatiga durante largas sesiones de trabajo."
		},
		{
			"id": 14,
			"title": "¿Cuál es el proceso para crear y gestionar un proyecto en LUMA?",
			"response": "Crear y gestionar un proyecto en LUMA es un proceso intuitivo diseñado para facilitar la organización y coordinación del trabajo en equipo. Para iniciar un nuevo proyecto, un usuario con permisos adecuados puede acceder a la sección 'Crear Proyecto' y definir los parámetros básicos, como el nombre del proyecto, la descripción, y los miembros del equipo. Una vez creado, el proyecto puede ser gestionado a través de un panel de control centralizado que permite a los líderes asignar tareas, establecer prioridades, y monitorear el progreso del equipo. Las herramientas de seguimiento de tareas y gestión de recursos aseguran que todos los miembros estén alineados con los objetivos del proyecto, facilitando la comunicación y la colaboración en tiempo real."
		}
	]



</script>

<div class="main">
	<div class="faq-questions">
		<p class="title"> Frequently Asked Questions </p>

		{#each FAQ as question}
			<div class="question" id={question.id}>
				<p class="q-title {selectedQuestion === question.id? 'selected' : ''}">
					{question.id}.  {question.title}
				</p>
				<p class="q-response">
					{question.response}
				</p>
			</div>
		{/each}
	</div>

	<aside class="faq-nav">
		<p> En esta página </p>
		{#each FAQ as section}
			<div class="nav {selectedQuestion === section.id? 'selected' : ''}">
				<a href="#{section.id}" on:click={() => selectedQuestion = section.id}>
					<p>{section.title}</p>
				</a>
			</div>
		{/each}
	</aside>
</div>

<style>
    .main {
        background-color: var(--luma-color-gray-50);
        width: 100vw;
        height: 90vh;
        display: flex;
        gap: 4rem;
        padding: 1.5rem 6rem 1.5rem 10rem;
        overflow: auto;
        scroll-behavior: smooth;
    }

    .faq-questions {
        display: flex;
        flex-direction: column;
				width: 100%;
    }

    .title {
        font-size: var(--luma-h3-font-size);
        padding-bottom: 1rem;
    }

    .question {
        /*background-color: lightgreen;*/
				padding-bottom: 1.5rem;
    }

    .question .q-title {
        font-weight: bold;
        padding-bottom: var(--luma-half-element-spacing);
    }

    .question .q-title.selected {
        color: var(--luma-color-orange-600);
    }

    .question .q-response {

    }

    .faq-nav {
        padding-top: 1rem;
        width: 35%;
        position: sticky;
        top: 0;
    }

    .faq-nav .nav {
        padding-inline: 1rem;
        padding-block: 0.25rem;
				font-size: var(--luma-caption-font-size);
    }

    .faq-nav .nav:hover {
        color: var(--luma-color-orange-600);
        font-weight: bold;
    }

    .faq-nav .nav.selected {
        border-left: 3px solid var(--luma-color-orange-600);
        color: var(--luma-color-orange-600);
    }
</style>