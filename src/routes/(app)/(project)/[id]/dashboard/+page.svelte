<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { page } from '$app/stores';
	import { projectData } from '$lib/stores/projectStore';
	import { ClipboardPenLine } from 'lucide-svelte';
	import axios from 'axios';
	import { t } from '$lib/translations';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';

	let userData
	let userID

	if (browser) {
		userData = localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token')
			? JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'))
			: null;

		if (!userData) {
			console.log('No hay usuario en local storage');
		} else {
			userID = userData.user.id;
		}
	}

	let projectMembers = []
	let pendingTasks = []
	let boardStats = []
	let loading = true
	let hasDataForDonutChart = true
	let hasDataForBarChart = true

	// Data for the bar chart
	let BarChartData = [];
	let BarChartLabels = [];
	let barChart;
	let chartCanvas1;

	// Data for the second (donut) chart
	let donutChart;
	let chartCanvas2;

	onMount(async () => {
		loading = true
		try {
			await Promise.all([
				getMembersStats(),
				getPendingTasks(),
				getStats(),
				getBarStats()
			]);

			hasDataForDonutChart =
				boardStats.pendientes ||
				boardStats.aprobadas ||
				boardStats.completadas; // True if any value is non-zero

			// Donut Chart
			if (hasDataForDonutChart){
				donutChart = chartCanvas2.getContext('2d');
				new Chart(donutChart, {
					type: 'doughnut',
					data: {
						labels: [$t('project_dashboard.pending'), $t('project_dashboard.completed'), $t('project_dashboard.approved')],
						datasets: [{
							label: 'Color Distribution',
							data:  [boardStats.pendientes, boardStats.completadas, boardStats.aprobadas],
							backgroundColor: [
								'rgb(255, 113, 74)', // Luma-orange
								'rgb(255, 119, 151)', // Luma-secondary-color-pink
								'rgb(105, 45, 215)'  // Luma-violet
							],
							borderColor: [
								'rgb(255, 255, 255)' // White
							],
							borderWidth: 1
						}]
					},
					options: {
						cutout: '0', // Adjusts the size of the inner circle for the donut
						plugins: {
							legend: {
								labels: {
									boxWidth: 12
								},
								position: 'right' // Moves the legend to the right
							}
						}
					}
				});
			}


			hasDataForBarChart =
				BarChartData.length > 0 ||
				BarChartLabels.length > 0;

			// Bar Chart
			if(hasDataForBarChart){
				barChart = chartCanvas1.getContext('2d');
				new Chart(barChart, {
					type: 'bar',
					data: {
						labels: BarChartLabels,
						datasets: [{
							label: $t('project_dashboard.approved_tasks'),
							data: BarChartData,
							backgroundColor: [
								'rgb(255, 113, 74)', // Luma-orange
								'rgb(255, 119, 151)', // Luma-secondary-color-pink
								'rgb(105, 45, 215)'  // Luma-violet
							],
							borderColor: [
								'rgb(255, 113, 74)', // Luma-orange
								'rgb(255, 119, 151)', // Luma-secondary-color-pink
								'rgb(105, 45, 215)'  // Luma-violet
							],
							borderWidth: 1
						}]
					},
					options: {
						plugins: {
							legend: {
								display: true,
								labels: {
									boxWidth: 0, // Removes the color box
									padding: 10, // Adjusts spacing
									font: {
										size: 14, // Adjusts the font size
									}
								}
							}
						},
						scales: {
							y: {
								beginAtZero: true
							}
						}
					}
				});
			}
		} catch (error) {
			console.error("Error fulfilling promises:", error);
		} finally {
			loading = false; // Hide overlay
		}
		loading = false
	});

	async function getMembersStats(){
		await axios.get(`https://luma-server.onrender.com/api/dashboard/ranking/${$page.params.id}`)
			.then((response) => {
				console.log(response.data);
				projectMembers = response.data || []
			})
			.catch((error) => {
				console.log(error.data);
			})
	}

	async function getPendingTasks(){
		await axios.get(`https://luma-server.onrender.com/api/dashboard/tareasPendientes/${userID}/${$page.params.id}`)
			.then((response) => {
				// console.log(response.data);
				pendingTasks = response.data
			})
			.catch((error) => {
				console.log(error);
			})
	}

	async function getStats(){
		await axios.get(`https://luma-server.onrender.com/api/dashboard/conteoTareas/${$page.params.id}`)
			.then((response) => {
				boardStats = response.data
			})
			.catch((error) => {
				console.log(error.data);
			})
	}

	async function getBarStats(){
		await axios.get(`https://luma-server.onrender.com/api/dashboard/tareasAprobadas/${$page.params.id}`)
			.then((response) => {
				for(let member of response.data){
					BarChartData.push(member.tareasAprobadas)
					BarChartLabels.push(member.nombre)
				}
			})
			.catch((error) => {
				console.log(error.data);
			})
	}
</script>

{#if loading}
	<div class="overlay">
		<span class="loader"></span>
	</div>
{/if}

<p class="title">{$t('project_dashboard.dashboard')}</p>

<div class="content">

	<div class="first-row">
		<div class="card team">
			<table class="team-members">
				<thead>
					<tr>
						<th> {$t('project_dashboard.member')}</th>
						<th> {$t('project_dashboard.assigned_tasks')} </th>
						<th> {$t('project_dashboard.gems')}</th>
					</tr>
				</thead>
				<tbody>
					<!--TODO: add null cases -->
					{#each projectMembers as member}
						<tr>
							<td> {member.nombre}</td>
							<td> {member.totalTareas} </td>
							<td> {member.gemasTotales} </td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="stats-container">
				<div class="stat-elem card">
					<div class="container">
						<p class="value"> {loading? '00' : boardStats.aprobadas} </p>
						<p class="title"> {$t('project_dashboard.approved_tasks')} </p>
					</div>
				</div>

				<div class="stat-elem card">
					<div class="container">
						<p class="value"> {loading? '00' : boardStats.completadas} </p>
						<p class="title"> {$t('project_dashboard.completed_tasks')} </p>
					</div>
				</div>

				<div class="stat-elem card">
					<div class="container">
						<p class="value"> {loading? '00' : boardStats.pendientes} </p>
						<p class="title"> {$t('project_dashboard.pending_tasks')} </p>
					</div>
				</div>

				<div class="stat-elem card">
					<div class="container">
						<p class="value"> {loading? '00' : boardStats.total} </p>
						<p class="title"> {$t('project_dashboard.total_tasks')} </p>
					</div>
				</div>
		</div>

	</div>

	<div class="second-row">
		<div class="pending-tasks">
			<p>{$t('project_dashboard.my_pending_tasks')}</p>
			<div class="task-container">
				<!--TODO: add null cases -->
				{#if pendingTasks.length > 0}
					{#each pendingTasks as task}
						<div class="task">
							<div class="icon-container">
								<ClipboardPenLine size={20} />
							</div>
							<p> {task.nombre} </p>
						</div>
					{/each}
				{:else} <!-- Null case-->
				{$t('project_dashboard.no_pending_tasks')}
				{/if}
			</div>
		</div>
		<div class="card">
			<!--Grafico de barra-->
			<div>
				{#if hasDataForBarChart}
					<canvas bind:this={chartCanvas1} id="firstChart" height="200"/>
				{:else} <!-- Null case-->
					<div class="no-data-message">
						<p> {$t('project_dashboard.no_data')}</p>
					</div>
				{/if}
			</div>

		</div>

		<div class="card">
			<!--Grafico de dona-->
			<div style="width: 200px">
				{#if hasDataForDonutChart}
					<canvas bind:this={chartCanvas2} id="secondChart"></canvas>
				{:else} <!-- Null case-->
					<div class="no-data-message">
						<p> {$t('project_dashboard.no_data')} </p>
					</div>
				{/if}
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

		.card.team{
        justify-content: start !important;
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
				/*height: 100%;*/
				/*background-color: lightgray;*/
		}

		.team-members thead{
				/*background-color: pink;*/
				text-align: left;
		}

		.team-members tbody{
				/*background-color: lightgreen;*/
		}

    .team-members thead th:first-child,
    .team-members tbody td:first-child{
				padding-left: 1rem;
				padding-block: 0.25rem;
    }

		.team-members thead th:not(:first-child),
    .team-members tbody td:not(:first-child){
				width: 150px;
				text-align: center;
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
        height: 31vh;
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
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
		}

		.pending-tasks .task-container .task{
			margin-left: 1rem;
			display: flex;
			gap: 1rem;
			align-items: center;
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
