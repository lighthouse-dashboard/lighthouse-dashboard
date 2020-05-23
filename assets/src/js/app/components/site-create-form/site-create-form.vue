<template>
    <div class="site-create-form">
        <div class='site-create-form--field-set'>
            <input-field v-model='name'
                    placeholder='foo.io'
                    label='Name'/>
        </div>

        <div class='site-create-form--field-set'>
            <input-field v-model='url'
                    placeholder='https://www.foo.io'
                    label='URL'/>
        </div>

        <div class='site-create-form--field-set'>
            <input-select v-model='device'
                    label='Device'>
                <option value='desktop'>Desktop</option>
                <option value='mobile'>Mobile</option>
            </input-select>
        </div>

        <div class='site-create-form--field-set'>
            <input-checkbox label='Is Favorite'/>
        </div>
    </div>
</template>

<script>
    import InputCheckbox from '../base/input-checkbox/input-checkbox';
    import InputField from '../base/input-field/input-field';
    import InputSelect from '../base/input-select/input-select';

    export default {
        components: { InputCheckbox, InputSelect, InputField },
        props: {},
        data() {
            return {
                name: '',
                url: '',
                device: 'desktop',
            };
        },
    };
</script>
