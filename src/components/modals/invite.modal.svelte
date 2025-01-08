<script>
	import Modal from '$components/modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';
	import { projectData } from '$lib/stores/projectStore';
	import { showToast } from '$lib/stores/toastStore.js';
	import { t } from '$lib/translations';

	let invitationMail;
	const dispatch = createEventDispatcher();
	export let show = true;

	const close = () => {
		show = false;
		dispatch('close');
	};

	// Email validation function
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Send invitation with validation and error handling
	async function sendInvitation() {
		if (!invitationMail) {
			showToast($t('invite.required_email'), { type: 'warning', duration: 5000, theme: 'dark' });
			return;
		}
		if (!isValidEmail(invitationMail)) {
			showToast($t('invite.invalid_email'), { type: 'warning', duration: 5000, theme: 'dark'  });
			return;
		}

		await axios
			.post('https://luma-server.onrender.com/api/invitation/send/', {
				email: invitationMail,
				projectId: $projectData.Proyecto_ID,
			})
			.then((response) => {
				console.log(response.data);
				dispatch('close');
				showToast($t('invite.invite_success'), { type: 'success', duration: 5000, theme: 'dark' });
			})
			.catch((error) => {
				console.error(error);
				showToast($t('invite.invite_error'), { type: 'error', duration: 5000, theme: 'dark'  });
			});
	}
</script>

{#if show}
	<Modal
		header
		title={$t('invite.title')}
		on:close={close}
	>
		<form on:submit|preventDefault={sendInvitation}>
			<p>
				{$t('invite.send_invite')}
			</p>
			<label class="form-control w-full">
				<input
					type="text"
					placeholder={$t('invite.type_here')}
					class="input input-bordered w-full"
					bind:value={invitationMail}
				/>
			</label>
			<div class="controls">
				<button class="btn btn-outline" on:click={close}>
					{$t('invite.cancel')}
				</button>
				<button type="submit" class="btn btn-primary">
					{$t('invite.send')}
				</button>
			</div>
		</form>
	</Modal>
{/if}

<style>
	.controls {
		text-align: right;
	}

	form {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
