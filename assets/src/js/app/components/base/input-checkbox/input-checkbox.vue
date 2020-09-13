<template>
    <label class="input-checkbox"
            :class="rootClasses">
        <span class="input-checkbox--wrapper">
            <input v-model="model"
                    type="checkbox"
                    class="input-checkbox--input">
            <svg class="input-checkbox--svg"
                    viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"/>
            </svg>
        </span>
        <span class="input-checkbox--label">{{ label }}</span>
    </label>
</template>

<script>
    import bemMixin from '../../../mixins/bem-mixin';

    export default {
        mixins: [bemMixin('input-checkbox')],
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

        computed: {
            rootClasses() {
                return [
                    this.createIfFacet(this.model, 'checked'),
                ];
            },
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
        },
    };
</script>
