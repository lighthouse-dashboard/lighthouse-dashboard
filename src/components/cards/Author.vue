<template>
    <Card class="author-card">
        <span slot="title">{{ $t("message.user") }}</span>
        <div class="row">
            <div class="col s10">
                <span class="truncate">{{username}}</span>
            </div>
            <div class="col s2">
                <img :src="avatar" alt="" class="circle avatar">

            </div>
        </div>
    </Card>
</template>

<script>

    import Card from '@/components/cards/Card';

    export default {
        components: {
            Card
        },

        props: {
            username: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
                required: true
            },
        }
    }
</script>
