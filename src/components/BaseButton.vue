<template>
    <div :class="[{disabled: disabled},color]"
         class="button"
         v-on:click="click"
         v-show="!disabled"><span>{{ value }}</span>
    </div>
</template>

<script>
    export default {
        name: "BaseButton",
        props: {
            value: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: false
            },
            handler: {
                type: Function,
                required: true
            },
            disabled: {
                type: Boolean,
                required: false
            }
        },
        methods: {
            click() {
                if (!this.disabled) {
                    this.handler();
                }
            }
        }
    }
</script>

<style scoped>
    .button {
        display: block;
        height: 32px;
        width: 190px;
        margin: 31px auto;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        transition: .3s;
    }
    .button > span {
        display: inline-block;
        font-size: 13px;
        font-weight: 400;
        line-height: 32px;
        color: #fff;
    }
    .button.blue {
        background-color: #108ce5;
    }
    .button.blue:hover {
        background-color: #0862a3;
    }
    .button.disabled {
        background-color: #9d9da3;
        pointer-events: none;
    }
</style>