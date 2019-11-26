<template>
    <div class="spinner"></div>
</template>

<script>
    export default {
        name: "BaseSpinner"
    }
</script>

<style scoped>
    .spinner {
        position: relative;
        display: block;
        height: 30px;
        width: 30px;
        margin: 20px auto 0;
        border-radius: 50%;
        background: #fff;
        background: linear-gradient(45deg,#108ce5 17%,#108ce5 28%,#f7f8ff 64%,#fff 84%);
        filter: progid:DXImageTransform.Microsoft.gradient #108ce5,#fff,GradientType=1;
        -webkit-animation: load 1.4s infinite linear;
        animation: load 1.4s infinite linear;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }
    .spinner:after,
    .spinner:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
    }
    .spinner:before {
        height: 50%;
        width: 50%;
        border-radius: 100% 0 0 0;
        background: #108ce5;
    }
    .spinner:after {
        height: 85%;
        width: 85%;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        background: #fff;
    }
    @-webkit-keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg)
        }

        to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn)
        }
    }
    @keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg)
        }

        to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn)
        }
    }
</style>