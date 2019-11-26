<template>
    <div class="tile-wrapper">
        <a class="tile"
           :href="url"
           target="_blank">
            <div class="tile-image">
                <CatalogTileImage :name="name"></CatalogTileImage>
            </div>
            <div class="tile-info">
                <h2>{{name}}</h2>
                <span>{{info}}</span>
            </div>
        </a>
    </div>
</template>

<script>
    import CatalogTileImage from './CatalogTileImage';

    export default {
        name: 'CatalogTile',
        components: {
            CatalogTileImage
        },
        props: {
            name: {
                type: String,
                required: true
            },
            info: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: false
            }
        }
    }
</script>

<style>
    .tile-wrapper {
        display: inline-block;
        width: 33.33%;
        margin: 22px 0 0;
        padding: 0 9px;
        box-sizing: border-box;
    }
    .tile {
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 8px 8px 0 0;
        background-color: #fff;
        box-shadow: 0 1px 8px rgba(78, 116, 152, .2);
        overflow: hidden;
        vertical-align: top;
        cursor: pointer;
        transition: .3s;
    }
    .tile:hover {
        transform: scale(1.05);
    }
    .tile-image {
        height: 84px;
    }
    .tile-image:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
    .tile-info {
        padding: 12px 11px;
        box-sizing: border-box;
    }
    .tile-info > h2 {
        font-size: 15px;
        line-height: 20px;
        color: #108ce5;
    }
    .tile-info > span {
        display: inline-block;
        font-size: 12px;
        line-height: 16px;
        color: #536069;
    }
    @media screen and (max-width: 700px) {
        .tile-wrapper {
            width: 50%;
        }
    }
    @media screen and (max-width: 500px) {
        .tile-wrapper {
            width: 100%;
            padding: 0;
        }
    }
</style>