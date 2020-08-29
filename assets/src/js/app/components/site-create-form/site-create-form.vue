<template>
    <div class="site-create-form">
        <div class="site-create-form--field-set">
            <input-field v-model="value.name"
                    :placeholder="$t('site.create.name-placeholder')"
                    :label="$t('site.name-field')"/>
        </div>

        <div class="site-create-form--field-set">
            <input-field v-model="value.url"
                    :placeholder="$t('site.create.url-placeholder')"
                    :label="$t('site.url-field')"/>
        </div>

        <div class="site-create-form--field-set">
            <input-select v-model="value.device"
                    label="Device">
                <option value="desktop">
                    {{ $t('site.devices-desktop') }}
                </option>
                <option value="mobile">
                    {{ $t('site.devices-mobile') }}
                </option>
            </input-select>
        </div>

        <div class="site-create-form--field-set">
            <input-checkbox v-model="value.is_disabled"
                    :label="$t('site.is-disabled')"/>
        </div>

        <div class="site-create-form--field-set">
            <input-checkbox v-model="value.is_favorite"
                    :label="$t('site.is-favorite')"/>
        </div>

        <div class="site-create-form--field-set">
            <input-checkbox v-model="value.is_public"
                    :label="$t('site.is-public')"/>
        </div>
    </div>
</template>

<script>
    import InputCheckbox from '../base/input-checkbox/input-checkbox';
    import InputField from '../base/input-field/input-field';
    import InputSelect from '../base/input-select/input-select';

    export default {
        components: { InputCheckbox, InputSelect, InputField },
        props: {
            value: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                model: null,
            };
        },

        watch: {
            model(m) {
                this.$emit('input', m);
            },
        },

        mounted() {
            this.model = this.value;
        },
    };
</script>
