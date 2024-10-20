<script>
	let selectedQuestion = 1;
</script>

<div class="main">

	<div class="faq-questions">
		<p class="title"> Frequently Asked Questions </p>

		{#each [1, 2, 3, 4, 5, 6, 7] as question}
			<div class="question" id={question}>
				<p class="q-title">
					{question} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet.
				</p>
				<p class="q-response">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et ligula et tortor bibendum porta. Nulla
					luctus maximus mauris vel tempor. Integer luctus tincidunt sagittis. Integer egestas eros quis libero iaculis
					condimentum. Duis tincidunt massa urna, sed sollicitudin lacus pellentesque ac. Integer pellentesque faucibus
					lorem, et pulvinar ex eleifend et. Sed nunc augue, consectetur ac bibendum ac, feugiat et mauris. Integer
					egestas massa ac dictum luctus. Integer congue felis eu tortor vulputate, nec tincidunt tellus maximus. Sed
					sed pulvinar est. Mauris euismod erat a ante tincidunt, a fringilla purus blandit. Cras sodales varius urna a
					pulvinar. Phasellus eu luctus dui.
				</p>
			</div>
		{/each}
	</div>

	<aside class="faq-nav">
		<p> On this page </p>
		{#each [1, 2, 3, 4, 5, 6, 7] as section}
			<div class="nav {selectedQuestion === section? 'selected' : ''}">
				<a href="#{section}" on:click={() => selectedQuestion = section}>
					<p>{section}</p>
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
        gap: 8rem;
        padding-inline: 18rem;
        padding-block: 1.5rem;
        overflow: auto;
        scroll-behavior: smooth;
    }

    .faq-questions {
        display: flex;
        flex-direction: column;
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

    .question .q-response {

    }

    .faq-nav {
        padding-top: 1rem;
        width: 100%;
        position: sticky;
        top: 0;
    }

    .faq-nav .nav {
        padding-inline: 1rem;
        padding-block: 0.25rem;
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