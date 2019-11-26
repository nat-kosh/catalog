<template>
    <div>
        <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 44.571C12.657 44.571 3.429 35.343 3.429 24 3.429 12.657 12.657 3.429 24 3.429c11.343 0 20.571 9.228 20.571 20.571 0 11.343-9.228 20.571-20.571 20.571zM48 24c0 13.234-10.766 24-24 24S0 37.234 0 24C0 10.767 10.766 0 24 0s24 10.767 24 24zM12 35.996a1.714 1.714 0 0 0 3.429 0 8.571 8.571 0 0 1 17.142 0 1.714 1.714 0 1 0 3.429 0c0-6.627-5.373-12-12-12s-12 5.373-12 12zm2.572-20.571a2.571 2.571 0 1 0 0 5.143 2.571 2.571 0 0 0 0-5.143zm18.857 0a2.571 2.571 0 1 0 0 5.142 2.571 2.571 0 0 0 0-5.142z" fill="#c3cadb" fill-rule="evenodd"></path>
        </svg>
        <span class="text">{{ message }}</span>
        <span v-if="typeof callback == 'function'"
              class="link"
              v-on:click="callback">Вернуться в каталог</span>
    </div>
</template>

<script>
    export default {
        name: "BaseError",
        props: {
            message: {
                type: String,
                required: true
            },
            callback: {
                type: Function,
                required: false
            }
        }
    }
</script>

<style scoped>
    div {
        width: 100%;
        margin: 20px 0 0;
        text-align: center;
    }
    span {
        display: block;
        width: 100%;
        margin: 10px 0 0;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
    }
    .text {
        color: #536069;
    }
</style>