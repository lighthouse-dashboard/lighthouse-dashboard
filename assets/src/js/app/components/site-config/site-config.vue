<template>
    <div class="site-config">
        <list class="site-config--list">
            <list-item class="site-config--list-item">
                <p class="u-reset caption">
                    {{ $t('site.name-field') }}
                </p>
                <a class="u-reset subtitle1 link"
                        :href="site.url">
                    {{ site.name }}
                </a>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="u-reset caption">
                    {{ $t('general.last-audit') }}
                </p>
                <p class="u-reset subtitle1">
                    &#x1F554; {{ site.last_audit | format-date }}
                </p>
            </list-item>

            <list-item class="site-config--list-item"
                    v-if="!site.is_public">
                <p class="u-reset subtitle1">
                    &#x1F512; {{ $t('site.is-public') }}
                </p>
            </list-item>

            <list-item class="site-config--list-item"
                    v-if="site.is_favorite">
                <p class="u-reset subtitle1">
                    &#x2764; {{ $t('site.is-favorite') }}
                </p>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="u-reset subtitle1">
                    <template v-if="site.device === 'mobile'">
                        &#x1F4F1;
                    </template>
                    <template v-else>
                        &#x1F5A5;
                    </template>
                    {{ $t(`site.devices-${site.device}`) }}
                </p>
            </list-item>
        </list>
        <site-edit-btn
                class="project--action-btn"
                :site="site"
                :id="id"/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';
    import SiteEditBtn from '../site-edit-btn/site-edit-btn';

    export default {
        components: { SiteEditBtn, ListItem, List },
        props: {
            id: {
                type: String,
                required: true,
            },

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
