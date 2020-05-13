<template>
    <label class="input-field"
            :class='classes'>
        <input class='input-field--input'
                :disabled='disabled'
                :placeholder='placeholder'
                :type='type'
                :value='model'
                @input='onChange'>
        <span class='input-field--error'
                v-if='error'>{{ error }}</span>
        <slot/>
    </label>
</template>

<script>
    import bemMixin from '../../../mixins/bem-mixin';

    export default {
        mixins: [bemMixin('input-field')],
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
            disabled: {
                type: Boolean,
                default: false,
            }
        },

        data() {
            return {
                model: '',
            };
        },

        computed: {
            classes() {
                return [
                    this.createFacet(this.error ? 'has-error' : ''),
                    this.createFacet(this.disabled ? 'disabled' : ''),
                ];
            },
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
