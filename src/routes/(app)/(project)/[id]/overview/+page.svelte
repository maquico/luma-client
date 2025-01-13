<script>
	import { projectData } from '$lib/stores/projectStore';
	import { goto } from '$app/navigation';
	import { DateTime} from 'luxon';
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';

	console.log($projectData);

	let loading = true
	let maxCharsPerParagraph = 300;
	let colors = [
		'rgb(255, 113, 74)',    // Luma-orange
		'rgb(255, 119, 151)',   // Luma-secondary-color-pink
		'rgb(105, 45, 215)'     // Luma-violet
	];

	onMount(() => {
		setTimeout(() => {
			loading = false
		}, 1500)
	})

	function splitIntoParagraphs(text, maxLength) {
		let paragraphs = [];
		let sentences = text.split('. '); // Split by sentence boundaries

		let currentParagraph = '';

		for (let sentence of sentences) {
			if ((currentParagraph + sentence).length <= maxLength) {
				currentParagraph += (currentParagraph ? '. ' : '') + sentence;
			} else {
				paragraphs.push(currentParagraph.trim());
				currentParagraph = sentence;
			}
		}

		// Push the last paragraph if it exists
		if (currentParagraph) {
			paragraphs.push(currentParagraph.trim());
		}

		return paragraphs.map(paragraph => paragraph.replace(/\n/g, '<br>')); // Replace any newlines with <br>
	}
</script>

{#if loading}
	<div class="overlay">
		<span class="loader"></span>
	</div>
{/if}

{#if $projectData}
	<div class="main">
		<p class="title">{ $projectData.nombre }</p>

		<div class="content">
			<div class="main-content">
				{#each splitIntoParagraphs($projectData.descripcion, maxCharsPerParagraph) as paragraph}
					<p>{@html paragraph}</p>
				{/each}
			</div>

			<aside>
				<div class="members-content">
					<p>{$t('project_overview.members')}</p>

					<div class="members-grid">
						{#each $projectData.miembros as member}
							<div class="member" on:click={() => {goto(`/user/${member.Usuario_ID}`)}}>
								{
									member.nombreCompleto
									.split(" ")
									.map(name => name[0].toUpperCase())
									.slice(0, 2)
									.join("")
								}
							</div>
						{/each}
					</div>
				</div>

				<div class="creation-date">
					<p>{$t('project_overview.creation_date')}</p>
					<p class="date"> {DateTime.fromISO($projectData.fechaRegistro).toFormat('LLL dd, yyyy')} </p>
				</div>

				<div class="tasks">
					<div class="completed-tasks">
						<p>{$t('project_overview.total_tasks')}</p>
						<p class="value"> {$projectData.totalTareas} </p>
					</div>
					<div class="approved-tasks">
						<p>{$t('project_overview.approved_tasks')}</p>
						<p class="value"> {$projectData.tareasAprobadas} </p>
					</div>
				</div>
			</aside>
		</div>

	</div>

{:else}
	<p>{$t('project_overview.loading')}</p>
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


    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 1.5rem;
        z-index: 1000;
    }

    .loader {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: relative;
        animation: rotate 1s linear infinite
    }
    .loader::before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        inset: 0px;
        border-radius: 50%;
        border: 5px solid #FFF;
        animation: prixClipFix 2s linear infinite ;
    }

    @keyframes rotate {
        100%   {transform: rotate(360deg)}
    }

    @keyframes prixClipFix {
        0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
        25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
        50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
        75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
        100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
    }

</style>