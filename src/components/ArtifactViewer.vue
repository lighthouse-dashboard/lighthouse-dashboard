<template>
    <div>
        <h6>
            <a :href="url" target="_blank">{{url}}</a>
            <a class="right" :href="artifactUrl" target="_blank">{{artifactPath}}</a>
        </h6>
        <BuildChart :columns="columns" :categories="categories" v-if="categories && columns"/>
    </div>
</template>

<script>

    import BuildChart from '@/components/BuildChart.vue';
    export default {
        components: {
            BuildChart
        },

        props: {
            artifactUrl: {
                type: String,
                required: true
            },
            artifactPath: {
                type: String,
                required: true
            },
        },

        data() {
            return {
                columns: null,
                url: null,
                categories: null
            };
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.$circle.getArtifact(this.artifactUrl)
                    .then(data => {
                        const { budget, categories } = data;
                        if (!categories) {
                            return;
                        }

                        this.url = data.url;
                        const shrinkedCategories = categories.map((item) => {
                            return item.score;
                        });

                        const shrinkedBudget = categories.map((item) => {
                            return budget[item.id] ? budget[item.id] : null;
                        });

                        this.categories = categories.map((item) => {
                            return item.name;
                        });

                        this.columns = [
                            ['Report', ...shrinkedCategories],
                            ['Budget', ...shrinkedBudget],
                        ]
                    })
            }
        }
    }
</script>

<style scoped>
    iframe {
        border: none;
        width: 100%;
        height: 420px;
    }
</style>
