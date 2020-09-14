<template>
    <tile class="login-form"
            :facets="['centered']"
            icon="keyhole-circle"
            title="Login">

        <div class="login-form--input-wrapper">
            <input-field
                    :disabled="isLoading || isLoggedIn"
                    placeholder="Password"
                    type="password"
                    :value="password"
                    :error="errorMessage"
                    @input="onChange"/>
        </div>
        <template slot="footer">
            <loading-indicator :facets="['small']"
                    v-if="isLoading"/>

            <btn type="submit"
                    :disabled="!isSubmittable || isLoggedIn"
                    :facets="['flat']"
                    v-else>
                {{ $t('login-form.submit-btn') }}
            </btn>
        </template>
    </tile>
</template>

<script>
    import Btn from '../base/btn/btn';
    import InputField from '../base/input-field/input-field';
    import LoadingIndicator from '../base/loading-indicator/loading-indicator';
    import Tile from '../tile/tile';

    export default {
        components: { Tile, LoadingIndicator, InputField, Btn },
        props: {
            password: {
                type: String,
                default: '',
            },
            errorMessage: {
                type: [Error, Boolean],
                default: false,
            },
            title: {
                type: String,
                required: true,
            },
            isLoading: {
                type: Boolean,
                default: false,
            },
            isSubmittable: {
                type: Boolean,
                default: false,
            },
            isLoggedIn: {
                type: Boolean,
                default: false,
            },
        },

        methods: {
            onChange(val) {
                this.$emit('change', val);
            },
        },
    };
</script>
