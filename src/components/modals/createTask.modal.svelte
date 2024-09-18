<script>
	import Modal from '$components/modal.svelte'
	import {createEventDispatcher} from 'svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { Tags, User } from 'lucide-svelte';
	import { DateInput, DatePicker } from 'date-picker-svelte';
	let date = new Date()
	let showDatePicker = false


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
		controls
		controlsOptions
		on:close={close}
	>
		<form on:submit|preventDefault={validate}>
			<div class="overview">
				<p class="project-name"> Project name </p>
				<p class="task-name"> Task name </p>
			</div>

			<div class="task-details">
				<label class="input input-bordered flex items-center gap-2">
					<User />
					<input type="text" class="grow" placeholder="Search" />
				</label>

				<label class="input input-bordered flex items-center gap-2">
					<Tags />
					<input type="text" class="grow" placeholder="Search" />
				</label>
			</div>

			<div class="content">
				<div class="row">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Pick the best fantasy franchise</span>
						</div>
						<select class="select select-bordered">
							<option disabled selected>Pick one</option>
							<option>Star Wars</option>
							<option>Harry Potter</option>
							<option>Lord of the Rings</option>
							<option>Planet of the Apes</option>
							<option>Star Trek</option>
						</select>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Pick the best fantasy franchise</span>
						</div>
						<DateInput bind:value={date} on:click={() => {showDatePicker = !showDatePicker}}/>
						{#if showDatePicker}
							<DatePicker bind:value={date} />
						{/if}
					</label>
				</div>

				<div class="row">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Pick the best fantasy franchise</span>
						</div>
						<select class="select select-bordered">
							<option disabled selected>Pick one</option>
							<option>Star Wars</option>
							<option>Harry Potter</option>
							<option>Lord of the Rings</option>
							<option>Planet of the Apes</option>
							<option>Star Trek</option>
						</select>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Pick the best fantasy franchise</span>
						</div>
						<select class="select select-bordered">
							<option disabled selected>Pick one</option>
							<option>Star Wars</option>
							<option>Harry Potter</option>
							<option>Lord of the Rings</option>
							<option>Planet of the Apes</option>
							<option>Star Trek</option>
						</select>
					</label>
				</div>

				<label class="form-control">
					<div class="label">
						<span class="label-text">Your bio</span>
					</div>
					<textarea class="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
				</label>

				<label class="form-control">
					<div class="label">
						<span class="label-text">Your bio</span>
					</div>
					<textarea class="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
				</label>

			</div>

			<div class="controls">
				<button type="submit" class="btn btn-primary">
					Guardar
				</button>
			</div>
		</form>
<!--		{#if data}-->
<!--			{data}-->
<!--		{/if}-->
	</Modal>
{/if}

<style>
    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

		.task-details{
				display: flex;
				flex-direction: column;
				gap: 1rem;
		}

		textarea{
				resize: none;
		}

		.row{
				display: flex;
				gap: 1rem;
		}

    .controls{
        text-align: right;
    }


</style>
