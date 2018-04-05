<template>
    <ul>
        <li><a class="subheader">Projects</a></li>
        <li v-for="project in projects">
            <router-link :to="{name: 'project', params: project}">
                {{ project.project }}
            </router-link>
        </li>
    </ul>
</template>

<script>

    export default {


        props: {
            projects: {
                type: Array,
                required: true
            },

        },

        data() {
            return {};
        }
    };
</script>
