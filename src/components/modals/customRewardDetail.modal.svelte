<script>
    import Modal from '$components/modal.svelte';
    import { createEventDispatcher } from 'svelte';
    import { t } from '$lib/translations';

    const dispatch = createEventDispatcher();

    export let show = true;
    export let title = 'Loading...';
    export let description = 'Loading...';
    export let icon = 'Loading...';

    const close = () => {
        show = false;
        dispatch('close');
    };
</script>

{#if show}
    <Modal
        header
        closeByBackgroundClick
        title={title}
        on:close={close}
    >
        <div class="modal-content">
            <img src={icon} alt="Icon" class="modal-icon" />
            <p class="modal-description">{description}</p>
            <button class="btn btn-primary" on:click={close}>{$t('detail_custom_reward.close')}</button>
        </div>
    </Modal>
{/if}

<style>
    .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1rem;
    }

    .modal-icon {
        width: 50px;
        height: 50px;
        margin-bottom: 1rem;
    }

    .modal-description {
        font-size: 1rem;
        margin-bottom: 1rem;
    }

</style>