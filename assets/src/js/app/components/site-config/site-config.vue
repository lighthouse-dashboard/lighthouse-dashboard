<template>
    <div class="site-config">
        <list class="site-config--list">
            <list-item class="site-config--list-item">
                <p class="caption">
                    Name
                </p>
                <p>{{ site.name }}</p>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="caption">
                    URL
                </p>
                <p>
                    <a class="link"
                            :href="site.url">
                        {{site.name}}
                    </a>
                </p>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="caption">Last Audit</p>
                <p>{{ site.last_audit | format-date }}</p>
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
