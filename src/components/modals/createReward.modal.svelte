<script>
    import { onMount } from 'svelte';
    import Modal from '$components/modal.svelte';
    import { createEventDispatcher } from 'svelte';
    import axios from 'axios';
	import { showToast } from '$src/lib/stores/toastStore.js';
	import { selectedProjectStore } from '$src/lib/stores/selectedProjectStore.js';

    const dispatch = createEventDispatcher();

    export let show = true;
    export let rewardId = null;
    export let isEdit = false; 
	export let modalType = 'reward';

    const userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'));
    const userId = userData.user.id;
    const initialFormData = {
        projectId: '',
        name: '',
        quantity: '',
        capacity: '',
        icon: '',
        price: '',
        description: ''
    };

    let userProjects = [];
	let selectedProjectUserRole;
	let isEditable = false;
    let data;
    let formData = { ...initialFormData };
	let loadedFormData = { ...initialFormData };
    let projectsOptions = [];
	let iconsOptions = [];

    const close = () => {
        show = false;
        formData = { ...initialFormData };
        dispatch('close');
    };



	// Set role and determine if fields are editable
	const setRoleAndEditable = () => {
        const selectedProject = userProjects.find(p => p.Proyecto_ID === formData.projectId);
        if (selectedProject) {
            selectedProjectUserRole = selectedProject.queryingUserRole;
            isEditable = selectedProjectUserRole === 'Lider';
        }
    };

	const fetchIcons = async () => {
		try {
			const response = await axios.get('https://luma-server.onrender.com/api/icon');
			iconsOptions = response.data.map((icon) => ({
				value: icon.Icono_ID,
				label: icon.nombre
			}));
		} catch (error) {
			console.error('Error fetching icons:', error);
		}
	};

    const fetchProjectsByUser = async () => {
        try {
            const response = await axios.get(
                `https://luma-server.onrender.com/api/projects/user/${userId}`
            );
            userProjects = response.data;

			if (!isEdit) {
				projectsOptions = response.data.filter((project) => project.queryingUserRole === 'Lider')
				.map((project) => ({
            	    value: project.Proyecto_ID,
            	    label: project.nombre
            	}));
			} else {
				projectsOptions = response.data
				.map((project) => ({
            	    value: project.Proyecto_ID,
            	    label: project.nombre
            	}));
			}

            if (projectsOptions.length > 0) {
                formData.projectId = projectsOptions[0].value;
                setRoleAndEditable();
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchRewardData = async () => {
        console.log('Fetching reward data...');
        await axios
            .get(`https://luma-server.onrender.com/api/rewards/${rewardId}`)
            .then((response) => {
                data = response.data[0];
                formData.projectId = data.Proyecto_ID;
                formData.name = data.nombre;
                formData.quantity = data.cantidad;
                formData.capacity = data.limite;
                formData.icon = data.Icono_ID;
                formData.price = data.precio;
                formData.description = data.descripcion;

				loadedFormData = { ...formData };
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
			setRoleAndEditable();
    };

    $: if (show && rewardId) {
        console.log('Modal abierto, ejecutando fetchRewardData');
        fetchRewardData();
    }

    onMount(() => {
        fetchProjectsByUser();
		fetchIcons();
    });


    
    async function validate() {
        try {
            const formHasChanged = () => {
                        return Object.keys(formData)
                        .some(key => formData[key] !== loadedFormData[key]);
            };

            if (isEdit) {
				console.log('isEdit', isEdit);
                if (formHasChanged()) {
					console.log("FORM HAS CHANGED")
                    const rewardObj = {
                        iconoId: formData.icon,
                        nombre: formData.name,
                        descripcion: formData.description,
                        precio: formData.price,
                        cantidad: formData.quantity,
                        limite: formData.capacity,
                        rewardId: rewardId,
                        requestUserId: userId
                    };
    
                    // Remove undefined properties from the task object
                    Object.keys(rewardObj).forEach(key => rewardObj[key] === undefined && delete rewardObj[key]);
    
                    await axios.put(
                        `https://luma-server.onrender.com/api/rewards/`, rewardObj
                    )
                    .then((response) => {
                        console.log('Reward details updated:', response.data);
                        showToast('Detalles de recompensa actualizados', { type: 'success', duration: 5000 });
                    })
                    .catch((error) => {
                        console.error('Error updating reward details:', error);
                        
                        if (error.response) {
                            // Check if the status code is 400
                            if (error.response.status === 400 || error.response.status === 403) {
                                showToast(error.response.data, { type: 'warning', duration: 5000 });
                                return;
                            }
                        }
                        // Generic error toast
                        showToast('Error updating reward details', { type: 'error', duration: 5000 });
                    });
                }
    
            } else {
                axios.post('https://luma-server.onrender.com/api/rewards/create', {
                    projectId: formData.projectId,
                    iconoId: formData.icon,
                    nombre: formData.name,
                    descripcion: formData.description,
                    precio: formData.price,
                    cantidad: formData.quantity,
                    limite: formData.capacity
                })
				.then((response) => {
					console.log('Reward created:', response.data);
					showToast('Recompensa creada exitosamente', { type: 'success', duration: 5000 });
				})
				.catch((error) => {
					console.error('Error updating rewards details:', error);
					if (error.response) {
                            // Check if the status code is 400
                            if (error.response.status === 400 || error.response.status === 403) {
                                showToast(error.response.data, { type: 'warning', duration: 5000 });
                                return;
                            }
                        }
                        // Generic error toast
                        showToast('Error updating reward details', { type: 'error', duration: 5000 });
                });
            }
			dispatch('update');
            close();
        } catch (error) {
            console.error('Error creating or updating reward:', error);
        }
    }

</script>

{#if show}
    <Modal
        header
		title="Recompensa personalizada"
        controls
        controlsOptions
        on:close={close}
        rewardID={rewardId}
        deleteModalType={'reward'}
    >
        <form on:submit|preventDefault={validate}>
            <div class="overview">
				<br/>
                <p class="project-name">Project name</p>
                <select class="select select-bordered w-full max-w-xs" 
				bind:value={formData.projectId}
				disabled={isEdit}
				required>
                    <option value="" disabled>Proyecto en el que eres Lider</option>
                    {#each projectsOptions as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select>
            </div>

            <p class="reward-name">Reward name</p>
            <label class="input input-bordered flex items-center gap-2">
                <input type="text"
				bind:value={formData.name}
				disabled={!isEditable}
				class="grow"
				placeholder="Reward name"
				required/>
            </label>

            <div class="content">
                <div class="row">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Cantidad</span>
                        </div>
                        <label class="input input-bordered flex items-center gap-2">
                            <input
                                type="number"
								min="0"
                                bind:value={formData.quantity}
								disabled={!isEditable}
                                class="grow"
                                placeholder="Reward quantity"
								required
                            />
                        </label>
                    </label>

                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Icono</span>
                        </div>
                        <select class="select select-bordered"
                        bind:value={formData.icon}
                        disabled={!isEditable}
                        required>
                            {#each iconsOptions as icon}
                                <option value={icon.value}>{icon.label}</option>
                            {/each}
                        </select>
                    </label>
                </div>

                <div class="row">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Precio</span>
                        </div>
                        <label class="input input-bordered flex items-center gap-2">
                            <input
                                type="number"
								min="0"
                                bind:value={formData.price}
								disabled={!isEditable}
                                class="grow"
                                placeholder="Reward price"
								required
                            />
                        </label>
                    </label>

                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Límite</span>
                        </div>
                        <label class="input input-bordered flex items-center gap-2">
                            <input
                                type="number"
								min="1"
								max="100"
                                bind:value={formData.capacity}
								disabled={!isEditable}
                                class="grow"
                                placeholder="Reward capacity"
								required
                            />
                        </label>
                    </label>
                </div>
            </div>

            <label class="form-control">
                <div class="label">
                    <span class="label-text">Descripción</span>
                </div>
                <textarea
                    class="textarea textarea-bordered h-24"
                    bind:value={formData.description}
					disabled={!isEditable}
                    placeholder="Descricion de la recompensa"
                ></textarea>
            </label>

            <div class="controls">
                <button type="submit" class="btn btn-primary"> Guardar </button>
            </div>
        </form>
    </Modal>
{/if}

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .task-details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    textarea {
        resize: none;
    }

    .row {
        display: flex;
        gap: 1rem;
    }

    .controls {
        text-align: right;
    }
</style>