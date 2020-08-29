<template>
    <div class="site-config">
        <list class="site-config--list">
            <list-item class="site-config--list-item">
                <p class="u-reset caption">
                    {{ $t('site.name-field') }}
                </p>
                <a class="u-reset link"
                        :href="site.url">
                    {{ site.name }}
                </a>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="u-reset caption">
                    {{ $t('general.last-audit') }}
                </p>
                <p class="u-reset subtitle1">
                    {{ site.last_audit | format-date }}
                </p>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="u-reset caption">
                    {{ $t('site.is-public') }}
                </p>
                <p class="u-reset subtitle1">
                    {{ site.is_public }}
                </p>
            </list-item>
        </list>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';

    export default {
        components: { ListItem, List },
        props: {
            /** @type {Sites.SiteModel} */
            site: {
                type: Object,
                required: true,
            },
        },

        methods: {
            ...mapActions('sites', ['getCurrentSite']),
        },
    };
</script>
