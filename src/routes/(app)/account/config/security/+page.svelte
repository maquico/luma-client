<script>
	let userPassword
	let newPassword
	let confirmNewPassword

	function changePassword(){
		console.log('userPassword', userPassword);
		console.log('newPassword', newPassword);
		console.log('confirmNewPassword', confirmNewPassword);
	}

	function clearInputs(){
		userPassword = ''
		newPassword = ''
		confirmNewPassword = ''
	}

</script>

<div class="content">
	<p class="title">Seguridad</p>

	<div class="container">

			<label for="user-password">
				<span>Contraseña actual</span>
				<input id="user-password" type="text" placeholder="type here" required bind:value={userPassword}>
			</label>

			<label for="new-password">
				<span>Nueva contraseña</span>
				<input id="new-password" type="text" placeholder="type here" required bind:value={newPassword}>
			</label>

			<label for="confirm-password">
				<span>Confirmar nueva contraseña</span>
				<input id="confirm-password" type="text" placeholder="type here" required bind:value={confirmNewPassword}>
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