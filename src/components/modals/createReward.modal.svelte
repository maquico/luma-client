<script>
    import { onMount } from 'svelte';
    import Modal from '$components/modal.svelte';
    import { createEventDispatcher } from 'svelte';
    import axios from 'axios';
    import { loadRewardsFunction } from '$src/lib/stores/rewardStore.js';
    import { get } from 'svelte/store';

    const dispatch = createEventDispatcher();

    export let show = true;
    export let rewardId;
    export let isEdit = false; 

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
    const restrictedFields = {
        'Miembro': ['name', 'quantity', 'capacity', 'icon', 'price', 'description'],
        'Lider': []
    };
    let userProjects = [];
    let selectedProjectUserRole = 'Current user role'
    let loadRewards;
    let data;
    let formData = { ...initialFormData };
    let projectsOptions = [];

    const close = () => {
        show = false;
        formData = { ...initialFormData };
        dispatch('close');
    };

    const getSelectedProjectUserRole = () => {
        const selectedProject = userProjects.find((project) => project.Proyecto_ID === formData.projectId);
        selectedProjectUserRole = selectedProject.queryingUserRole;
        console.log('Selected project user role:', selectedProjectUserRole);
    };

    // Check if a field should be blocked
    const isFieldRestricted = (fieldName) => {
        // Check if field is restricted based on role
        const isRestrictedByRole = restrictedFields[selectedProjectUserRole]?.includes(fieldName);
        return isRestrictedByRole;
    };

    loadRewardsFunction.subscribe((func) => {
        loadRewards = func;
    });

    const fetchProjectsByUser = async () => {
        try {
            const response = await axios.get(
                `https://luma-server.onrender.com/api/projects/user/${userId}`
            );
            userProjects = response.data;
            projectsOptions = response.data.map((project) => ({
                value: project.Proyecto_ID,
                label: project.nombre
            }));
            if (projectsOptions.length > 0) {
                formData.projectId = projectsOptions[0].value;
                getSelectedProjectUserRole(); // Call initially to set the role
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

                console.log('rewardDATA', response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

    $: if (show && rewardId) {
        console.log('Modal abierto, ejecutando fetchRewardData');
        fetchRewardData();
    }

    onMount(() => {
        fetchProjectsByUser();
    });
    
    async function validate() {
        try {
            const formHasChanged = () => {
                        return Object.keys(formData)
                        .some(key => formData[key] !== loadedFormData[key]);
            };

            if (isEdit) {
                if (formHasChanged()) {
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
                        `https://luma-server.onrender.com/api/rewards/${userId}`, rewardObj
                    )
                    .then((response) => {
                        console.log('Task details updated:', response.data);
                        showToast('Detalles de tarea actualizados', { type: 'success', duration: 5000 });
                    })
                    .catch((error) => {
                        console.error('Error updating task details:', error);
                        
                        if (error.response) {
                            // Check if the status code is 400
                            if (error.response.status === 400 || error.response.status === 403) {
                                showToast(error.response.data, { type: 'warning', duration: 5000 });
                                return;
                            }
                        }
                        // Generic error toast
                        showToast('Error updating task details', { type: 'error', duration: 5000 });
                    });
                }
    
            } else {
                const response = axios.post('https://luma-server.onrender.com/api/rewards/create', {
                    projectId: formData.projectId,
                    iconoId: formData.icon,
                    nombre: formData.name,
                    descripcion: formData.description,
                    precio: formData.price,
                    cantidad: formData.quantity,
                    limite: formData.capacity
                });
    
                console.log('Form data:', formData);
    
                console.log('Reward created successfully:', response.data);
            }
            loadRewards();
            close();
        } catch (error) {
            console.error('Error creating reward:', error);
        }
    }
</script>

{#if show}
    <Modal
        header
        controls
        controlsOptions
        on:close={close}
        rewardID={rewardId}
        deleteModalType={'reward'}
    >
        <form on:submit|preventDefault={validate}>
            <div class="overview">
                <p class="project-name">Project name</p>
                <select class="select select-bordered w-full max-w-xs" 
				bind:value={formData.projectId} 
				on:change={getSelectedProjectUserRole}
				disabled={isFieldRestricted('projectId')}
				required>
                    <option value="" disabled>Selecciona un Proyecto</option>
                    {#each projectsOptions as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select>
            </div>

            <p class="reward-name">Reward name</p>
            <label class="input input-bordered flex items-center gap-2">
                <input type="text"
				bind:value={formData.name}
				disabled={isFieldRestricted('name')}
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
								disabled={isFieldRestricted('quantity')}
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
						disabled={isFieldRestricted('icon')}
						required>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
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
								disabled={isFieldRestricted('price')}
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
                        <select
						class="select select-bordered"
						bind:value={formData.capacity}
						disabled={isFieldRestricted('capacity')}
						required>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
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
					disabled={isFieldRestricted('description')}
                    placeholder="Descricion de la tarea"
                ></textarea>
            </label>

            <div class="controls">
                <button type="submit" class="btn btn-primary" disabled={isFieldRestricted('name')}> Guardar </button>
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