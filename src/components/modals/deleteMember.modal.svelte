<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';
	import axios from 'axios';
	import { showToast } from '$lib/stores/toastStore';
	import { browser } from '$app/environment'; // Check for browser environment
	import { t } from '$lib/translations';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let memberInfo
	let userData = null

	if (browser) {
		// Retrieve user data only in the browser environment
		const localData = localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token');
		if (localData) {
			userData = JSON.parse(localData);
		} else {
			console.error('No user data found in localStorage');
		}
	}

	const close = () => {
		show = false;
		dispatch('close')
	}

	async function deleteMember() {
		console.log(memberInfo.Proyecto_ID, memberInfo.Usuario_ID, userData.user.id);

		if (memberInfo.Usuario_ID === userData.user.id) {
			console.log('No puedes eliminarte a ti mismo del proyecto');
			showToast($t('delete_member.cant_delete'), { type: 'warning', duration: 5000 });
			return;
		}
		await axios.delete('https://luma-server.onrender.com/api/member/client', {
			params: {
				projectId: memberInfo.Proyecto_ID,
				userId: memberInfo.Usuario_ID,
				requestUserId: userData.user.id
			}
		})
		.then((response) => {
    	        console.log('Member deleted succesfully:', response.data);
    	        showToast($t('delete_member.delete_success'), { type: 'success', duration: 5000 });
				dispatch('reload');
    	})
    	.catch((error) => {
    	    console.error('Error deleting member:', error);
		
    	    if (error.response) {
    	        // Check if the status code is 400
    	        if (error.response.status === 400 || error.response.status === 403) {
    	            showToast(error.response.data, { type: 'warning', duration: 5000 });
    	            return;
    	        }
    	    }
    	    // Generic error toast
    	    showToast($t('delete_member.delete_error'), { type: 'error', duration: 5000 });
    	});
		dispatch('close')
	}
</script>

{#if show}
	<Modal
		header
		closeByBackgroundClick
		controls
		title={$t('delete_member.confirm_delete')}
		on:close={close}
	>
		<div class="content">
			<p> {$t('delete_member.you_sure01')} <span class="member">{memberInfo.Usuarios.nombreCompleto}</span> {$t('delete_member.you_sure02')} </p>
			<p class="warning"> {$t('delete_member.warning')}</p>

			<div class="controls">
				<button class="btn btn-outline" on:click={close}>
					{$t('delete_member.cancel')}
				</button>
				<button type="submit" class="btn btn-error" on:click={deleteMember}>
					{$t('delete_member.delete')}
				</button>
			</div>
		</div>
	</Modal>
{/if}

<style>
		.content{
				margin-top: 1rem;
				display: flex;
				flex-direction: column;
				gap: 1rem;
		}

		.content .member{
				font-weight: bold;
				color: var(--luma-color-gray-500);
		}

		.content .warning{
				color: var(--luma-color-red-error);
		}

    .controls{
        text-align: right;
    }
</style>
