<template>
    <div id="wrapper">
        <h1 v-if="title">{{ title }}</h1>
        <div class="input-wrapper">
            <div :class="{disabled: isLoading}" class="custom-input">
                <input type="text"
                       :placeholder="isLoading ? '' : 'Введите название'"
                       v-model="searchValue"
                       v-on:keyup="onKeyUp"
                       :disabled="isLoading">
            </div>
        </div>
        <div id="catalog-container" v-if="! error">
            <CatalogTile v-for="(film, index) in films"
                         :key="`film-tile-${index}`"
                         :name="film.title"
                         :info="film.director"
                         :url="film.url"></CatalogTile>

        </div>
        <BaseSpinner v-if="isLoading"></BaseSpinner>
        <BaseError  v-if="films.length == 0 && !isLoading"
                    :callback="toCatalog"
                    message="Фильмы не найдены"></BaseError>
        <BaseError  v-if="error"
                    message="Что-то пошло не так, пожалуйста, перезагрузите старницу"></BaseError>
        <BaseButton v-if="isNext"
                    value="Показать еще"
                    color="blue"
                    :handler="loadMore"
                    :disabled="isLoading"></BaseButton>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import CatalogTile from './CatalogTile';
    import BaseButton from './BaseButton';
    import BaseError from './BaseError';
    import BaseSpinner from './BaseSpinner';


    export default {
        name: 'FilmCatalog',
        components: {
            CatalogTile,
            BaseButton,
            BaseError,
            BaseSpinner
        },
        data() {
            return {
                catalogPage: 0,
                searchPage: 0,
                searchValue: '',
                isSearch: false,
                timeOutId: 0
            }
        },
        computed: {
            ...mapGetters('films', {
                films: 'films',
                isNext: 'isNext',
                isLoading: 'isLoading',
                previousSearchValue: 'searchString',
                error: 'error',
            })
        },
        props: {
            title: {
                type: String,
                required: false
            }
        },
        mounted() {
            this.getFilms({
                page: this.catalogPage
            });
        },
        methods: {
            getFilms(params) {
                this.$store.dispatch('films/loadFilms', params);
            },
            loadMore() {
                this.getFilms({
                    page: this.isSearch ? ++this.searchPage : ++this.catalogPage,
                    search: this.searchValue
                });
            },
            search() {
                this.isSearch = true;

                if (!this.searchValue || this.previousSearchValue != this.searchValue) {
                    this.resetSearch();
                }

                this.getFilms({
                    page: this.searchPage,
                    search: this.searchValue
                });
            },
            toCatalog() {
                this.searchValue = '';
                this.$store.dispatch('films/switchToCatalog', this.catalogPage);
                this.isSearch = false;
                this.resetSearch();
            },
            resetSearch() {
                this.searchPage = 0;
                this.$store.dispatch('films/resetSearch');
            },
            onKeyUp(event) {
                clearTimeout(this.timeOutId);

                if (this.isLoading) {
                    return
                }

                if (event.keyCode == 13) {
                    this.search();
                } else {
                    this.timeOutId = setTimeout(this.search, 500);
                }
            }
        }
    }
</script>

<style scoped>
    h1 {
        width: 100%;
        margin: 0 0 18px;
        font-size: 24px;
        font-weight: 600;
        line-height: 34px;
        color: #222D35;
    }
    #wrapper {
        width: 100%;
        max-width: 871px;
        margin: 0 auto;
        padding: 22px 31px 30px;
        box-sizing: border-box;
    }
    #catalog-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: stretch;
        margin: 0 -9px;
        font-size: 0;
    }
    .custom-input {
        position: relative;
        width: 100%;
        padding: 8px 20px 8px 39px;
        border: 1px solid #e4e4e4;
        box-sizing: border-box;
        border-radius: 4px;
        background-color: #fff;
        transition: border-color .3s;
    }
    .custom-input.disabled,
    .custom-input.disabled > input {
        background-color: #efefef;
        pointer-events: none;
        cursor: not-allowed;
    }
    .custom-input:hover,
    .custom-input:focus {
        border-color: #108ce5;
    }
    .custom-input:before {
        content: '';
        position: absolute;
        display: block;
        height: 16px;
        width: 16px;
        left: 11px;
        background-repeat: no-repeat;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+PHBhdGggZD0iTTE1LjgyNyAxNC41NzNsLTMuNzE2LTMuOTZhNi41MzUgNi41MzUgMCAwMDEuNDgtNC4xNTNDMTMuNTkgMi44OTggMTAuNzYxIDAgNy4yODUgMCAzLjgxIDAgLjk4MiAyLjg5OC45ODIgNi40NnMyLjgyOCA2LjQ2IDYuMzA0IDYuNDZhNi4xMzMgNi4xMzMgMCAwMDMuNjEyLTEuMTY5bDMuNzQ0IDMuOTlhLjgwNy44MDcgMCAwMDEuMTYzLjAyNC44NTguODU4IDAgMDAuMDIyLTEuMTkyek03LjI4NiAxLjY4NWMyLjU3IDAgNC42NiAyLjE0MiA0LjY2IDQuNzc1IDAgMi42MzMtMi4wOSA0Ljc3NS00LjY2IDQuNzc1LTIuNTcgMC00LjY2LTIuMTQyLTQuNjYtNC43NzUgMC0yLjYzMyAyLjA5LTQuNzc1IDQuNjYtNC43NzV6IiBmaWxsPSIjQkZCRkJGIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcDAiPjxwYXRoIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC43MSkiIGQ9Ik0wIDBoMTUuNjE0djE2SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+);
    }
    .custom-input > input {
        height: 100%;
        width: 100%;
        border: none;
        transition: none;
    }
    .custom-input > input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #c3d0d8;
        opacity: 1; /* Firefox */
    }
    .custom-input > input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #c3d0d8;
    }
    .custom-input > input::-ms-input-placeholder { /* Microsoft Edge */
        color: #c3d0d8;
    }
    @media screen and (max-width: 500px) {
        #catalog-container {
            margin: 0;
        }
    }
</style>
