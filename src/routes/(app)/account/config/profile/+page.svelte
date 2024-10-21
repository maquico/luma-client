<script>
	let name
	let lastName
	let email

	function changeUserDetails(){
		console.log('name', name);
		console.log('lastName', lastName);
		console.log('email', email);
	}
</script>

<div class="content">
	<p class="title">Profile UI</p>

	<div class="container">

		<label for="username">
			<span>Nombre</span>
			<input id="username" type="text" placeholder="type here" required bind:value={name}>
		</label>

		<label for="lastname">
			<span>Apellido</span>
			<input id="lastname" type="text" placeholder="type here" required bind:value={lastName}>
		</label>

		<label for="mail">
			<span>Correo electrónico</span>
			<input id="mail" type="text" placeholder="type here" required bind:value={email}>
		</label>

		<div class="controls">
			<button class="btn btn-primary" on:click={() => {changeUserDetails()}}>
				Guardar
			</button>
		</div>

	</div>
</div>

<style>
    .content{
        display: flex;
        flex-direction: column;
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