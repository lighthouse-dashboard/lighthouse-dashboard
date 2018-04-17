<template>
    <Card>
        <span slot="title">{{ $t("message.user") }}</span>
        {{username}}
        <img :src="avatar" alt="" class="circle right" height="45px">
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
