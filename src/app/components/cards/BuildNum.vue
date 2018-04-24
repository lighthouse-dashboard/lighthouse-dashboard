<template>
    <Card>
        <span slot="title">{{ $t('message.build_num') }}</span>
        #{{ buildNum }}
    </Card>
</template>

<script>

    import Card from '@/components/cards/Card';

    export default {
        components: {
            Card,
        },

        props: {
            buildNum: {
                type: Number,
                required: true,
            },
        },
    };
</script>
