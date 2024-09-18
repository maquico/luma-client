<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	const dispatch = createEventDispatcher();

	export let show = true;

	const close = () => {
		show = false;
		dispatch('close')
	}

	function validate() {
		console.log("I'm the validate() function")
		// TODO: validate password with db data
		// if (email.match(validRegex) && password){
		//
		// 	axios.post('http://localhost:3000/api/session', {
		// 		email: email,
		// 		password: password,
		// 	})
		// 		.then(response => {
		// 			console.log(response.data);
		// 			console.log('successfull login');
		// 			goto('/');
		// 		})
		// 		.catch(error => {
		// 			console.error('Error:', error);
		// 		});
		//
		// 	invalidInput=false
		// }else{
		// 	console.log('error login');
		// 	invalidInput=true
		// }
	}

</script>

{#if show}
	<Modal
		header
		closeByBackgroundClick
		title="Agregar usuario"
		on:close={close}
	>
		<form on:submit|preventDefault={validate}>
			<p>
				Enviar invitación del proyecto a través de correo
				electrónico
			</p>
			<label class="form-control w-full">
				<input type="email" placeholder="Type here" class="input input-bordered w-full " />
			</label>
			<div class="controls">
				<button class="btn btn-outline" on:click={close}>
					Cancelar
				</button>
				<button type="submit" class="btn btn-primary">
					Ingresar
				</button>
			</div>
		</form>
	</Modal>
{/if}

<style>
    .controls{
        text-align: right;
    }

    form{
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
