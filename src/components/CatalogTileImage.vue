<template>
    <img :src="imageUrl"
         :alt="name"
         :class="{show: isLoaded, placeholder: true}"
         v-on:load="onLoaded"
         v-on:error="onError">
</template>

<script>
    import { fetchImagesByName } from '../api/pixabay'

    export default {
        name: "CatalogTileImage",
        props: {
            name: {
                type: String,
                required: false
            }
        },
        data() {
            return {
                imageUrl: '',
                placeholder: 'http://placehold.it/260x85?text=Placeholder',
                isLoaded: false,
                isPlaceholder: false,
            }
        },
        methods: {
            onLoaded() {
                this.isLoaded = true;
            },
            onError() {
                this.imageUrl = this.placeholder;
                this.isPlaceholder = true;
            }
        },
        mounted() {
            let loadedImageUrl = this.$store.getters['films/getImageUrl'](this.name);

            if (loadedImageUrl) {
                this.imageUrl = loadedImageUrl;
            } else {
                fetchImagesByName(this.name).then((response) => {
                        let url = '';

                        if (response.data && response.data.hits.length) {
                           url = response.data.hits[0].webformatURL;
                        } else {
                            url = this.placeholder;
                            this.isPlaceholder = true;
                        }

                        this.$store.dispatch('films/saveImage', {
                            key: this.name,
                            url: url
                        });

                        this.imageUrl = url;
                    });
            }
        }
    }
</script>

<style scoped>
    img {
        display: inline-block;
        max-height: 100%;
        width: 100%;
        opacity: 0;
        vertical-align: middle;
        transition: .3s;
    }
    img.show {
        opacity: 1;
    }
</style>