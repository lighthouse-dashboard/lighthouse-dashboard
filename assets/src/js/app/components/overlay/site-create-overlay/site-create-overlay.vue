<template>
    <overlay title='Create Site'
            :active='true'
            v-on='$listeners'>
        <site-create-form/>

        <template slot='additional'>
            <btn>Create</btn>
        </template>
    </overlay>
</template>


<script>
    import SiteCreateForm from '../../site-create-form/site-create-form';
    import Overlay from '../overlay';

    export default {
        components: { SiteCreateForm, Overlay },
    };
</script>
