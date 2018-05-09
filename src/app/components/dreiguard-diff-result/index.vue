<template>
    <div class="row dreiguard-diff-result">
        <table>
            <thead>
            <tr>
                <th>
                    {{ $t("dreiguard.diff") }}
                </th>
                <th>
                    {{ $t("dreiguard.source") }}
                </th>
                <th>
                    {{ $t("dreiguard.reference") }}
                </th>
            </tr>
            </thead>

            <tr>
                <td>
                    <i class="material-icons small red-text" v-if="comparison.diff.percentage >= maxDiff">warning</i>
                </td>
                <td>
                    {{ comparison.source.os }}
                    {{ comparison.source.os_version }}
                    {{ comparison.source.browserName }}
                    {{ comparison.source.browser_version }}
                </td>
                <td>
                    {{ comparison.reference.os }}
                    {{ comparison.reference.os_version }}
                    {{ comparison.reference.browserName }}
                    {{ comparison.reference.browser_version }}
                </td>
            </tr>
            <tr>
                <td>
                    <img class="responsive-img dreiguard-diff-result__image" :src="comparison.diff.diffFile"/>
                </td>
                <td>
                    <img class="responsive-img dreiguard-diff-result__image" :src="comparison.compareFiles[0]"/>
                </td>
                <td>
                    <img class="responsive-img dreiguard-diff-result__image" :src="comparison.compareFiles[1]"/>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props: {
            comparison: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                maxDiff: Vue.config.diffAlerts,
            };
        },
    };
</script>
