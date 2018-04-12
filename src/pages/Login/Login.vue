<template>
    <div class="component blue-grey">
        <div class="row wrapper">
            <div class="col s12 m6 offset-m3 l4 offset-l4">
                <div class="card">
                    <div class="card-image">
                        <div class="pineapple">
                            <div class="leaf middle"></div>
                            <div class="leaf left"></div>
                            <div class="leaf right"></div>
                            <div class="shadow"></div>
                            <div class="body">
                                <div class="eye left"></div>
                                <div class="eye right"></div>
                                <div class="mouth"></div>
                                <div class="arm left"></div>
                                <div class="arm right"></div>
                                <div class="leg left"></div>
                                <div class="leg right"></div>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="password" type="password" class="validate" v-model="password" :disabled="isSubmitting">
                                <label for="password">{{ $t('message.password') }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <button class="waves-effect waves-light btn" @click="submit" :disabled="isSubmitting">{{ $t('message.login') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {

        components: {},

        data() {
            return {
                password: null,
                isSubmitting: false
            };
        },

        beforeRouteEnter: (to, from, next) => {
            if (Vue.auth.isAuthenticated()) {
                return next({ name: 'dashboard' });
            }
            return next();
        },

        methods: {
            submit() {
                this.isSubmitting = true;
                this.$auth.login(this.password)
                    .then(() => {
                        this.$toast.notify(this.$t('message.login_succeed'));
                        this.$router.push({ name: 'dashboard' })
                    })
                    .catch(e => {
                        this.$toast.notify(this.$t('error.login_failed'))
                    })
                    .finally( () => {
                        this.isSubmitting = false;
                    })
            }
        }
    };
</script>

<style scoped>

    .component {
        width: 100vw;
        height: 100vh;
        display: flex;

    }

    .wrapper {
        display: flex;
        flex-flow: column;
        height: 100%;
        justify-content: center;
        flex: 1 1 100%;
    }

    .card-image {
        padding-top: 20px;
    }

    .pineapple {
        font-size: 90vmin;
        height: 200px;
        margin: 50px auto;
        width: 180px;
        position: relative;
        padding-top: 20px;
    }

    .pineapple div {
        position: absolute;
    }

    .leaf {
        background-color: darkgreen;
        border-radius: 90% 0 90% 0;
        height: 20%;
        top: 10%;
        width: 20%;
    }

    .leaf.left {
        -webkit-animation: leafLeft 0.25s ease-in-out alternate infinite;
        animation: leafLeft 0.25s ease-in-out alternate infinite;
        left: 50%;
        -webkit-transform-origin: bottom left;
        transform-origin: bottom left;
    }

    .leaf.middle {
        -webkit-animation: leafMiddle 0.25s ease-in-out alternate infinite;
        animation: leafMiddle 0.25s ease-in-out alternate infinite;
        background-color: green;
        left: 40%;
        top: 5%;
        -webkit-transform: rotate(-40deg);
        transform: rotate(-40deg);
    }

    .leaf.right {
        -webkit-animation: leafRight 0.25s ease-in-out alternate infinite;
        animation: leafRight 0.25s ease-in-out alternate infinite;
        left: 50%;
        -webkit-transform-origin: bottom left;
        transform-origin: bottom left;
    }

    .body {
        -webkit-animation: body 0.25s ease-in-out alternate infinite;
        animation: body 0.25s ease-in-out alternate infinite;
        background-color: #ffa700;
        border-radius: 40%;
        height: 50%;
        left: 24%;
        top: 27%;
        width: 54%;
    }

    .body::after {
        background: repeating-linear-gradient(-45deg, transparent, transparent 15%, darkorange 15%, darkorange 20%), repeating-linear-gradient(45deg, transparent, transparent 15%, darkorange 15%, darkorange 20%);
        border-radius: 40%;
        content: '';
        height: 100%;
        position: absolute;
        width: 100%;
    }

    .eye {
        -webkit-animation: eye 1.04s infinite;
        animation: eye 1.04s infinite;
        background-color: black;
        border-radius: 100%;
        height: 15%;
        top: 35%;
        width: 15%;
        z-index: 2;
    }

    .eye.left {
        left: 25%;
    }

    .eye.right {
        right: 25%;
    }

    .mouth {
        background-color: black;
        border-radius: 20% 20% 80% 80%;
        height: 12%;
        left: 41%;
        top: 50%;
        width: 18%;
        z-index: 2;
    }

    .arm {
        background-color: #ffa700;
        border-radius: 100vw;
        height: 50%;
        top: 20%;
        width: 20%;
    }

    .arm.left {
        -webkit-animation: armLeft 0.26s ease-in-out alternate infinite;
        animation: armLeft 0.26s ease-in-out alternate infinite;
        left: 10%;
        -webkit-transform-origin: bottom left;
        transform-origin: bottom left;
    }

    .arm.right {
        -webkit-animation: armRight 0.26s ease-in-out alternate infinite;
        animation: armRight 0.26s ease-in-out alternate infinite;
        right: 10%;
        -webkit-transform-origin: bottom right;
        transform-origin: bottom right;
    }

    .leg {
        -webkit-animation: foot 0.26s alternate 0.13s infinite;
        animation: foot 0.26s alternate 0.13s infinite;
        background: #ffa700;
        border-radius: 100vw;
        bottom: -20%;
        height: 40%;
        width: 20%;
    }

    .leg.left {
        left: 20%;
    }

    .leg.right {
        right: 20%;
    }

    .shadow {
        -webkit-animation: shadow 0.26s ease alternate infinite;
        animation: shadow 0.26s ease alternate infinite;
        background-color: tan;
        border-radius: 100%;
        bottom: 5%;
        height: 10%;
        left: 28%;
        opacity: 0.5;
        width: 46%;
    }

    @-webkit-keyframes leafLeft {
        from {
            -webkit-transform: rotate(-75deg);
            transform: rotate(-75deg);
        }
        to {
            -webkit-transform: rotate(-85deg);
            transform: rotate(-85deg);
        }
    }

    @keyframes leafLeft {
        from {
            -webkit-transform: rotate(-75deg);
            transform: rotate(-75deg);
        }
        to {
            -webkit-transform: rotate(-85deg);
            transform: rotate(-85deg);
        }
    }

    @-webkit-keyframes leafMiddle {
        from {
            -webkit-transform: translateY(-10%) rotate(-40deg);
            transform: translateY(-10%) rotate(-40deg);
        }
        to {
            -webkit-transform: translateY(10%) rotate(-40deg);
            transform: translateY(10%) rotate(-40deg);
        }
    }

    @keyframes leafMiddle {
        from {
            -webkit-transform: translateY(-10%) rotate(-40deg);
            transform: translateY(-10%) rotate(-40deg);
        }
        to {
            -webkit-transform: translateY(10%) rotate(-40deg);
            transform: translateY(10%) rotate(-40deg);
        }
    }

    @-webkit-keyframes leafRight {
        from {
            -webkit-transform: rotate(-5deg);
            transform: rotate(-5deg);
        }
        to {
            -webkit-transform: rotate(5deg);
            transform: rotate(5deg);
        }
    }

    @keyframes leafRight {
        from {
            -webkit-transform: rotate(-5deg);
            transform: rotate(-5deg);
        }
        to {
            -webkit-transform: rotate(5deg);
            transform: rotate(5deg);
        }
    }

    @-webkit-keyframes armLeft {
        from {
            -webkit-transform: rotate(-40deg);
            transform: rotate(-40deg);
        }
        to {
            -webkit-transform: rotate(-50deg);
            transform: rotate(-50deg);
        }
    }

    @keyframes armLeft {
        from {
            -webkit-transform: rotate(-40deg);
            transform: rotate(-40deg);
        }
        to {
            -webkit-transform: rotate(-50deg);
            transform: rotate(-50deg);
        }
    }

    @-webkit-keyframes armRight {
        from {
            -webkit-transform: rotate(40deg);
            transform: rotate(40deg);
        }
        to {
            -webkit-transform: rotate(50deg);
            transform: rotate(50deg);
        }
    }

    @keyframes armRight {
        from {
            -webkit-transform: rotate(40deg);
            transform: rotate(40deg);
        }
        to {
            -webkit-transform: rotate(50deg);
            transform: rotate(50deg);
        }
    }

    @-webkit-keyframes body {
        from {
            -webkit-transform: translateY(-2%);
            transform: translateY(-2%);
        }
        to {
            -webkit-transform: translateY(2%);
            transform: translateY(2%);
        }
    }

    @keyframes body {
        from {
            -webkit-transform: translateY(-2%);
            transform: translateY(-2%);
        }
        to {
            -webkit-transform: translateY(2%);
            transform: translateY(2%);
        }
    }

    @-webkit-keyframes eye {
        100% {
            -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
        }
        50% {
            -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
        }
        100% {
            -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
        }
    }

    @keyframes eye {
        100% {
            -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
        }
        50% {
            -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
        }
        100% {
            -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
        }
    }

    @-webkit-keyframes foot {
        from {
            -webkit-transform: translateY(-10%);
            transform: translateY(-10%);
        }
        to {
            -webkit-transform: translateY(10%);
            transform: translateY(10%);
        }
    }

    @keyframes foot {
        from {
            -webkit-transform: translateY(-10%);
            transform: translateY(-10%);
        }
        to {
            -webkit-transform: translateY(10%);
            transform: translateY(10%);
        }
    }

    @-webkit-keyframes shadow {
        from {
            -webkit-transform: scaleX(1.1);
            transform: scaleX(1.1);
        }
        to {
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
        }
    }

    @keyframes shadow {
        from {
            -webkit-transform: scaleX(1.1);
            transform: scaleX(1.1);
        }
        to {
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
        }
    }

</style>
