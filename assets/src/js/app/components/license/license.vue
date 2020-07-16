<template>
    <div class="license">
        <ul>
            <li v-for="[key, object] in licenseObjects"
                    :key="key">
                <a target="_blank"
                        class="u-reset link"
                        :href="object.url || object.repository">
                    <p>{{ key }} {{ object.licenses }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

    import licenses from '../../../../../static/licenses.json';

    export default {
        props: {},
        data: () => ({
            licenses,
        }),
        computed: {
            licenseObjects() {
                return Object.entries(licenses);
            },
        },
    };
</script>
