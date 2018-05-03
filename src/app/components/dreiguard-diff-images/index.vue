<template>
    <div class="row">
        <div v-if="!images || images.length === 0">
            <p>{{ $t("dreiguard.no_diffs_available") }}</p>
        </div>

        <div
            class="col"
            v-for="(image) in images"
            v-if="images && images.length > 0"
            :key="image"
            :class="imageSizeClass"
        >
            <img class="responsive-img" :src="image" :title="image" :alt="image"/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        props: {
            vcs: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            project: {
                type: String,
                required: true,
            },
            buildnum: {
                type: Number,
                required: false,
                default: null
            },
            max: {
                type: Number,
                required: false,
                default: 0,
            },
        },

        data() {
            return {
                images: null,
            };
        },

        computed: {
            ...mapGetters({
                branch: 'branch',
            }),
            imageSizeClass() {
                return 's' + (12 / this.images.length);
            }
        },

        methods: {
            load() {
                this.getBuildNum()
                    .then(num => {
                        this.loadImages(num);
                    });
            },

            getBuildNum() {
                if (this.buildnum) {
                    return Promise.resolve(this.buildnum);
                }

                return this.$api.getLatestBuilds(this.vcs, this.username, this.project, this.branch)
                    .then((builds) => {
                        return builds.shift().build_num;
                    });
            },

            loadImages(buildnum) {
                return this.$api.getDreiguardDiffImagesData(this.vcs, this.username, this.project, buildnum)
                    .then(data => {
                        if (this.max > 0) {
                            this.images = data.slice(0, this.max);
                        } else {
                            this.images = data;
                        }
                    });
            }
        },

        watch: {
            username() {
                this.images = null;
                this.load();
            },
            project() {
                this.images = null;
                this.load();
            },
        },

        mounted() {
            this.load();
        }
    };
</script>
