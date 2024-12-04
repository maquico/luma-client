<script>
	import axios from 'axios';
	import { showToast } from '$lib/stores/toastStore';  // Import your toast store
	import bcrypt from 'bcryptjs';

	const API_BASE_URL = 'https://luma-server.onrender.com/api';
	let userPassword = '';
	let newPassword = '';
	let confirmNewPassword = '';
	const userId = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token')).user.id;;

	// Function to change password
	async function changePassword() {
		try {
			// Check if the new password and confirmation match
			if (newPassword !== confirmNewPassword) {
				showToast('Las contraseñas no coinciden.', { type: 'warning', duration: 5000 });
				return;
			}

			// Fetch the encrypted password using axios
			const { data } = await axios.get(`${API_BASE_URL}/user/password/${userId}`);
			const encryptedPassword = data;
			console.log('Encrypted password:', encryptedPassword);

			// Compare user-provided password with the encrypted password
			const isPasswordCorrect = await bcrypt.compare(userPassword, encryptedPassword);
			if (!isPasswordCorrect) {
				showToast('Contraseña actual incorrecta', { type: 'error', duration: 5000 });
				return;
			}

			// Send the new password to the backend using axios
			await axios.put(`${API_BASE_URL}/user/password/reset`, {
				userId,
				newPassword: newPassword,
			});

			showToast('Contraseña actualizada exitosamente', { type: 'success', duration: 5000 });
			clearInputs();
		} catch (error) {
			console.error('Error changing password:', error);
			showToast('Error inesperado', { type: 'error', duration: 5000 });
		}
	}

	// Function to clear inputs
	function clearInputs() {
		userPassword = '';
		newPassword = '';
		confirmNewPassword = '';
	}
</script>

<div class="content">
	<p class="title">Seguridad</p>

	<div class="container">

			<label for="user-password">
				<span>Contraseña actual</span>
				<input id="user-password" type="password" placeholder="type here" required bind:value={userPassword}>
			</label>

			<label for="new-password">
				<span>Nueva contraseña</span>
				<input id="new-password" type="password" placeholder="type here" required bind:value={newPassword}>
			</label>

			<label for="confirm-password">
				<span>Confirmar nueva contraseña</span>
				<input id="confirm-password" type="password" placeholder="type here" required bind:value={confirmNewPassword}>
			</label>

			<div class="controls">
				<button class="btn btn-outline" on:click={() => {clearInputs()}}>
					Cancelar
				</button>

				<button type="submit" class="btn btn-primary" on:click={() => {changePassword()}}>
					Guardar
				</button>
			</div>

	</div>

</div>

<style>
    .content{
        display: flex;
        flex-direction: column;
        /*background-color: lightcoral;*/
    }

    .content .title{
        font-size: var(--luma-h4-font-size);
    }

    .container{
				width: 30%;
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
				gap: 1rem;
        gap: var(--luma-half-element-spacing);
    }

		label{
        display: flex;
        flex-direction: column;
		}

		input{
				margin-top: var(--luma-half-element-spacing);
				border-radius: 8px;
				padding: var(--luma-half-element-spacing);
		}

		.controls{
				/*background-color: lightgreen;*/
				display: flex;
				gap: 1rem;
				justify-content: end;
		}
		
		.controls button{
		}
</style>
