<template>
    <div class="site-config">
        <list class="site-config--list">
            <list-item class="site-config--list-item">
                <p class="u-reset caption">
                    Name
                </p>
                <p class="u-reset subtitle1">{{ site.name }}</p>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="u-reset caption">
                    URL
                </p>
                <p class="u-reset subtitle1">
                    <a class="link"
                            :href="site.url">
                        {{site.name}}
                    </a>
                </p>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="u-reset caption">Last Audit</p>
                <p class="u-reset subtitle1">{{ site.last_audit | format-date }}</p>
            </list-item>
        </list>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Btn from '../base/btn/btn';
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';

    export default {
        components: { ListItem, List, Btn },
        props: {
            /** @type {Sites.SiteConfig} */
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
