<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	const dispatch = createEventDispatcher();

	export let show = true;
	export let data

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
		title="Eliminar tarea"
		on:close={close}
	>
		<p>Modal eliminar tarea </p>
	</Modal>
{/if}

<style>
    /*.controls{*/
    /*    text-align: right;*/
    /*}*/

    /*form{*/
    /*    margin-top: 1rem;*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*    gap: 1rem;*/
    /*}*/
</style>
