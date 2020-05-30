<template>
    <div class="input-select"
            :class='classes'>
        <label>
            <span class="input-select--label" v-if='label'>{{ label }}</span>
            <select class="input-select--select"
                    :disabled='disabled'
                    :value='value'
                    @change='onChange'>
                <slot/>
            </select>
        </label>
    </div>
</template>

<script>
    import bemMixin from '../../../mixins/bem-mixin';

    export default {
        mixins: [bemMixin('input-select')],

        props: {
            value: {
                type: String,
                default: '',
            },

            label: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                model: null,
            };
        },

        computed: {
            classes() {
                return [
                    this.createFacet(this.disabled ? 'disabled' : ''),
                ];
            },
        },

        methods: {
            onChange(e) {
                debugger;
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
        },
    };
</script>
