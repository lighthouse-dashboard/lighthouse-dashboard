<template>
    <label class="input-field">
        <input class='input-field--input'
                :placeholder='placeholder'
                :type='type'
                :value='model'
                @input='onChange'>
        <span class='input-field--error' v-if='error'>{{ error }}</span>
        <slot/>
    </label>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: 'text',
            },
            error: {
                type: String,
                default: null,
            },
        },

        data() {
            return {
                model: '',
            };
        },

        methods: {
            onChange(e) {
                this.$emit('input', e.target.value);
            },
        },

        watch: {
            value(val) {
                this.model = val;
            },
        },

        mounted() {
            this.model = this.value;
        }
    };
</script>
