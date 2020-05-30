<template>
    <label class='input-checkbox'>
        <span class='input-checkbox--wrapper'>
            <input type="checkbox"
                    v-model='model'
                    class='input-checkbox--input'/>
            <svg class='input-checkbox--svg'
                    viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
        </span>
        <span class='input-checkbox--label'>{{ label }}</span>
    </label>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: '',
            },
            value: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                model: false,
            };
        },

        watch: {
            value(v) {
                this.model = v;
            },
            model(m) {
                this.$emit('input', m);
            },
        },

        mounted() {
            this.model = this.value;
        }
    };
</script>
