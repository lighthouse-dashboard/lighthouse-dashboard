<template>
    <div class="site-config">
        <ul class="list">
            <li class="list-item">
                <p class="u-reset caption list-item--caption">
                    {{ $t('site.name-field') }}
                </p>
                <a class="u-reset subtitle1 link"
                        target="_blank"
                        :href="site.url">
                    {{ site.name }}
                </a>
            </li>


            <li class="list-item"
                    v-if="site.is_disabled">
                <p class="u-reset caption list-item--caption">
                    {{ $t('site.is-disabled') }}
                </p>
                <p class="u-reset subtitle1 list-item--content">
                    <unicon name="ban"/>
                    Site is disabled
                </p>
            </li>

            <li class="list-item"
                    v-if="site.last_audit">
                <p class="u-reset caption list-item--caption">
                    {{ $t('general.last-audit') }}
                </p>
                <p class="u-reset subtitle1 list-item--content">
                    <unicon name="clock-five"
                            class="list-item--icon"/>
                    {{ site.last_audit | format-date }}
                </p>
            </li>

            <li class="list-item"
                    v-if="!site.is_public">
                <p class="u-reset caption list-item--caption">
                    {{ $t('site.is-public') }}
                </p>
                <p class="u-reset subtitle1 list-item--content">
                    <unicon name="lock"
                            class="list-item--icon"/>
                    {{ $t('site.private') }}
                </p>
            </li>

            <li class="list-item"
                    v-if="site.is_favorite">
                <p class="u-reset caption list-item--caption">
                    {{ $t('site.device') }}
                </p>
                <p class="u-reset subtitle1 list-item--content">
                    <unicon name="heart"
                            class="list-item--icon"/>
                    {{ $t('site.is-favorite') }}
                </p>
            </li>

            <li class="list-item">
                <p class="u-reset caption list-item--caption">
                    {{ $t('site.device') }}
                </p>
                <p class="u-reset subtitle1 site-config--list-item-value">
                    <unicon
                            name="mobile-android"
                            class="list-item--icon"
                            v-if="site.device === 'mobile'"/>
                    <unicon
                            class="list-item--icon"
                            name="desktop"
                            v-else/>
                    {{ $t(`site.devices-${ site.device }`) }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Notification from '../notification/notification';
    import SiteEditBtn from '../site-edit-btn/site-edit-btn';

    export default {
        components: { Notification, SiteEditBtn },
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
