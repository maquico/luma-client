<script>
	import { projectData } from '$lib/stores/projectStore';
	import InviteModal from '$components/modals/invite.modal.svelte'
	import DeleteUserModal from '$components/modals/deleteMember.modal.svelte'
	import { Trash2 } from 'lucide-svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	console.log($projectData);

	onMount(async () => {
		loading = true
		try {
			await Promise.all([
				getAllRoles(),
				getAllMembers()
			])
		} catch (error) {
			console.error("Error fulfilling promises:", error);
		} finally {
			loading = false
		}
		selectedRoles = projectMembers.map((row) => row.Rol_ID);
		// console.log(selectedRoles);
	})

	let showInvitationModal = false
	let showDeleteModal = false
	let roles = []
	let projectMembers = []
	let loading = true
	let selectedRoles
	let selectedData = {}
	// let selectedData = { userId: '', projectId: ''}

	function handleInvitationClose(){
		showInvitationModal = false
	}

	function handleDeleteClose(){
		showDeleteModal = false
	}

	function handleDeleteMember(memberInfo){
		showDeleteModal = true
		selectedData = memberInfo
		// selectedData.userId = memberInfo.Usuario_ID
		// selectedData.projectId = memberInfo.Proyecto_ID
		// console.log(selectedData);
	}

	async function getAllRoles(){
		await axios.get('https://luma-server.onrender.com/api/roles/')
			.then((response) => {
				roles = response.data || []
			})
			.catch((error) => {
				console.log(error.data);
			})
	}

	async function getAllMembers(){
		await axios.get(`https://luma-server.onrender.com/api/member/project/${$page.params.id}`)
			.then((response) => {
				console.log(response.data);
				projectMembers = response.data || []
			})
			.catch((error) => {
				console.log(error.data);
			})
	}

	let columns = ['Miembro', 'Correo', 'Rol', '']
</script>

{#if loading}
	<div class="overlay">
		<span class="loader"></span>
	</div>
{/if}

<p class="title">Configuración de equipo</p>

<div class="content">
	<div class="invite-container">
		<button class="btn btn-primary" on:click={() => {showInvitationModal = true}}>INVITAR MIEMBRO</button>
	</div>

	<table>
		<thead>
			<tr>
				{#each columns as column}
					<th class="{column === '' ? 'action' : ''}">{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
		{#if loading}
			<tr>
				<td> loading ... </td>
			</tr>
		{:else}
			{#each projectMembers as row, index}
				<tr>
					<td>{row.Usuarios.nombreCompleto}</td>
					<td>{row.Usuarios.correo}</td>
					<td>
						<select name="user-role-{index}" id="user-role-{index}" bind:value={selectedRoles[index]}>
							{#each roles as role}
								<option value="{role.Rol_ID}">{role.nombre}</option>
							{/each}
						</select>
					</td>
					<td class="center">
						<button class="icon-container" on:click={() => {handleDeleteMember(row)}}>
							<Trash2 size={20}/>
						</button>
					</td>
				</tr>
			{/each}
		{/if}

		</tbody>
	</table>

	<div class="controls">
		<button class="btn btn-outline">CANCELAR</button>
		<button class="btn btn-primary">GUARDAR</button>
	</div>
</div>

<InviteModal show={showInvitationModal} on:close={handleInvitationClose} />
<DeleteUserModal show={showDeleteModal} on:close={handleDeleteClose} memberInfo={selectedData}/>


<style>
		.title{
				padding: 0 1rem;
				font-size: var(--luma-h3-font-size);
		}

		.content{
				width: 60vw;
				padding: 1rem;
				display: flex;
				flex-direction: column;
				gap: 1rem;
		}

    .invite-container,
		.controls{
				text-align: right;
		}

		.btn{
				font-size: 12px;
		}

		table{
				width: 100%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 4px;
		}

		table tr{
				border: 2px solid var(--luma-color-gray-200);
		}

    table tr td{
        padding: 0.8rem 1rem;
    }

    table thead tr th:first-child,
		table tbody tr td:first-child{
				width: 200px;
    }


    table tr td .icon-container{
        cursor: pointer;
    }

    table tr td .icon-container:hover{
        color: var(--luma-color-red-error);
    }

		table tr td select{
				padding: 0.20rem 1rem;
				border-radius: 5px;
		}

    table tr td.center{
				display: flex;
				justify-content: center;
    }

		table tr th{
        padding: 0.5rem 1rem;
				text-align: left;
				color: var(--luma-color-gray-700);
		}

    table tr th.action{
        width: 80px;
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