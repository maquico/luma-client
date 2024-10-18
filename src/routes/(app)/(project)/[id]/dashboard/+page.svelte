<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	// Data for the first chart
	let chartData = [20, 100, 50, 12, 20, 130, 45];
	let Labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
	let ctx1;
	let chartCanvas1;

	// Data for the second (donut) chart
	let secondChartData = [300, 50, 100];
	let secondLabels = ['Red', 'Blue', 'Yellow'];
	let ctx2;
	let chartCanvas2;

	onMount(() => {
		// First Chart
		ctx1 = chartCanvas1.getContext('2d');
		new Chart(ctx1, {
			type: 'bar',
			data: {
				labels: Labels,
				datasets: [{
					label: 'Unit Sales',
					data: chartData,
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});

		// Second Chart (Donut)
		ctx2 = chartCanvas2.getContext('2d');
		new Chart(ctx2, {
			type: 'doughnut',
			data: {
				labels: secondLabels,
				datasets: [{
					label: 'Color Distribution',
					data: secondChartData,
					backgroundColor: [
						'rgba(255, 99, 132, 0.6)', // Red
						'rgba(54, 162, 235, 0.6)', // Blue
						'rgba(255, 206, 86, 0.6)'  // Yellow
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				cutout: '0', // Adjusts the size of the inner circle for the donut
				plugins: {
					legend: {
						position: 'right' // Moves the legend to the right
					}
				}
			}
		});
	});
</script>

<p class="title">Gráficos de proyecto</p>

<div class="content">

	<div class="first-row">
		<div class="card">
			<table class="team-members">
				<thead>
					<tr>
						<th> Header 1</th>
						<th> Header 1</th>
						<th> Header 1</th>
					</tr>
				</thead>
				<tbody>
					{#each [1,2,3,4,5,6] as member}
						<tr>
							<td> Data 1</td>
							<td> Data 1</td>
							<td> Data 1</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="stats-container">
			{#each [1,2,3,4] as statData}
				<div class="stat-elem card">
					<div class="container">
						<p class="value"> 00 </p>
						<p class="title"> LOREM IPSUM </p>
					</div>
				</div>
			{/each}
		</div>

	</div>

	<div class="second-row">
		<div class="pending-tasks">
			<p>Mis pendientes</p>
			<p>USUARIO</p>

			<div class="task-container">
				{#each [1,2,3,4] as pendingTask}
					<div class="task">
						<i>ICON</i>
						<p> LOREM IPSUM</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="card">
<!--			Grafico 1-->
			<div style="width: 400px">
				<canvas bind:this={chartCanvas1} id="firstChart"/>
			</div>

		</div>

		<div class="card">
<!--			Grafico 2-->
			<div style="width: 200px">
				<canvas bind:this={chartCanvas2} id="secondChart"/>
			</div>

		</div>
	</div>

</div>

<style>
    .title {
        font-size: var(--luma-h3-font-size);
        margin-bottom: 1rem;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    /*.elem1 {*/
    /*    display: flex;*/
    /*    align-items: center;*/
    /*    justify-content: center;*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    border: 1px solid red;*/
    /*}*/

		.card{
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
				border-radius: 8px;
				padding: var(--luma-half-element-spacing);
		}

    .first-row {
        /*background-color: pink;*/
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1rem;
        height: 35vh;
    }

		.team-members{
				width: 100%;
				height: 100%;
				/*background-color: lightgray;*/
		}

		.team-members thead{
				/*background-color: pink;*/
				text-align: left;
		}

		.team-members tbody{
				/*background-color: lightgreen;*/
		}

    .stats-container{
        /*border: 1px solid red;*/
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: var(--luma-half-element-spacing);
    }

    .stat-elem{
        /*border: 1px solid green;*/
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .stat-elem .container{
        width: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .stat-elem .container .value{
        font-size: var(--luma-h2-font-size);
        line-height: var(--luma-h2-font-size);
    }

    .stat-elem .container .title{
        font-size: var(--luma-caption-font-size);
        line-height: var(--luma-caption-font-size);
    }

    .second-row {
        /*background-color: green;*/
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
        height: 25vh;
    }

    .pending-tasks{
        /*border: 1px solid red;*/
				flex-direction: column;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
        border-radius: 8px;
        padding: var(--luma-half-element-spacing);
		}

		.pending-tasks .task-container{
				border-top: 1px solid lightgray;
				padding-top: 0.5rem;
		}

		.pending-tasks .task-container .task{
			margin-left: 1rem;
			display: flex;
			gap: 1rem;
		}

</style>
