<p class="title">Configuración de equipo</p>

<div class="content">
	<div class="invite-container">
		<button class="btn btn-primary" on:click={() => {showModal = true}}>INVITAR MIEMBRO</button>
	</div>

	<table>
		<tr>
			{#each columns as column}
					<th class="{column === '' ? 'action' : ''}">{column}</th>
			{/each}
		</tr>
		{#each data as row}
			<tr>
				{#each row as row_element}
					{#if row_element === 'Data C4'}
						<td class="center">
							<button class="icon-container" on:click={() => {}}>
								<Trash2 size={20}/>
							</button>
						</td>
					{:else}
						<td>{row_element}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</table>

	<div class="controls">
		<button class="btn btn-outline">CANCELAR</button>
		<button class="btn btn-primary">GUARDAR</button>
	</div>
</div>

<InviteModal show={showModal} on:close={handleClose} />

<script>
	import InviteModal from '$components/modals/invite.modal.svelte'
	import { Trash2 } from 'lucide-svelte';

	let showModal = false

	function handleClose(){
		showModal = false
	}

	let columns = ['Miembro', 'Correo', 'Rol', '']
	let data = [
		['Louis McCandie','lmccandie3@bloglines.com','Data C3','Data C4'],
		['Louis McCandie','lmccandie3@bloglines.com','Data C3','Data C4'],
		['Louis McCandie','lmccandie3@bloglines.com','Data C3','Data C4'],
		['Louis McCandie','lmccandie3@bloglines.com','Data C3','Data C4'],
		['Louis McCandie','lmccandie3@bloglines.com','Data C3','Data C4'],
	]
</script>

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

    table tr td .icon-container{
        cursor: pointer;
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
</style>