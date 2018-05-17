<template>
    <div>
        hello
    </div>
</template>

<script>
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
                required: true,
            },
        },

        data() {
            return {
                chartData: null,
                chartDataLength: null,
                categories: null,
                artifacts: null,
                computedClass: null,
            };
        },

        mounted() {
            this.$api.getBuildDreihouseData(this.vcs, this.username, this.project, this.buildnum)
                .then((data) => {
                    console.log(data);
                });
        },

    }
</script>
