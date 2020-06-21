<template>
    <confirm-button
            :facets='["danger", "full-width"]'
            confirm="Click to confirm"
            @click='onDeleteClicked'>
        Delete
    </confirm-button>
</template>

<script>
    import Toastify from 'toastify-js';
    import { mapActions } from 'vuex';
    import catchError from '../../utils/catch-error';
    import ConfirmButton from '../base/confirm-button/confirm-button';

    export default {
        components: { ConfirmButton },
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        methods: {
            ...mapActions('sites', ['deleteSite']),

            onDeleteClicked() {
                this.deleteSite({ id: this.id })
                    .then(() => {
                        Toastify({
                            text: 'Page deleted',
                            className: 'info',
                        })
                            .showToast();
                        window.location.href = '/app/dashboard';
                    })
                    .catch(catchError);
            },
        },
    };
</script>
