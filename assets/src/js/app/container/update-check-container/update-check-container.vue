<template>
    <div class="update-check-container">
        <slot :hasNewVersion="hasNewVersion" :checkForUpdate="checkForUpdate"/>
    </div>
</template>

<script>
    import { checkForUpdates } from '../../api/update-api';

    export default {
        data: () => ({
            hasNewVersion: false,
        }),

        methods: {
            checkForUpdate() {
                checkForUpdates( true )
                    .then( () => {
                        window.location.reload();
                    } );
            },
        },
    };
</script>
