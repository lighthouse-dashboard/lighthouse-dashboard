<template>
    <ul class="site-actions-list list">
        <li class="list-item"
                v-for="entry in menuEntries"
                :key="entry.name">
            <a target="_blank"
                    class="link"
                    :href="entry.link">
                {{ entry.name }}
            </a>
        </li>
    </ul>
</template>

<script>
    import { customProjectMenuEntries } from '../../../../../../config/dashboard';

    export default {
        props: {
            url: {
                type: String,
                required: true,
            },
        },

        computed: {
            menuEntries() {
                return customProjectMenuEntries.map((entry) => ({
                    name: entry.name,
                    link: entry.link(this.url),
                }));
            },
        },
    };
</script>
