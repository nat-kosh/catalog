import { fetchDataByType } from '../../api/swapi';

const state = {
    // Map for caching images urls
    imagesUrls: {},
    // For searched element
    searchData: {
        films: [],
        apiPage: 0,
        next: true,
        searchValue: ''
    },
    // For catalog elements
    commonData: {
        films: [],
        apiPage: 0,
        next: true
    },
    // For visible elements with limit
    visibleFilms: [],
    limit: 9,
    resource: 'films/',
    loading: false,
    next: true,
    type: 'common',
    error: false
};

const getters = {
    error(state) {
        return state.error;
    },
    films(state) {
        return state.visibleFilms;
    },
    getImageUrl(state) {
        return (key) => state.imagesUrls[key];
    },
    isLoading(state) {
        return state.loading;
    },
    isNext(state, getters) {
        let type = getters.stateObjectType;

        return state.visibleFilms.length < state[type].films.length || state[type].next;
    },
    stateObjectType(state) {
        return `${state.type}Data`;
    },
    searchString(state) {
        return state.searchData.searchValue;
    }
};

const actions = {
    resetSearch(context) {
        context.commit('clearSearch');
    },
    saveImage(context, imageInfo) {
        context.commit('setImageUrl', imageInfo);
    },
    switchToCatalog(context, page) {
        context.commit('setType', 'common');
        context.commit('setVisibleFilms', {
            'films': context.state.commonData.films,
            'offset': context.state.limit * (page + 1)
        });
    },
    loadFilms(context, params) {
        context.commit('setType', params.search ? 'search' : 'common');
        let filmsObject =  params.search ? context.state.searchData : context.state.commonData;
        let offset = context.state.limit * (params.page + 1);


        context.commit('setVisibleFilms', {
            'films': filmsObject.films,
            'offset': offset
        });
        context.commit('setSearchValue', params.search);

        if (filmsObject.films.length < context.state.limit * (params.page + 1) && filmsObject.next) {
            context.commit('setSeparateData', {
                'type': context.getters.stateObjectType,
                'key': 'apiPage',
                'value': filmsObject.apiPage + 1});
            context.dispatch('apiCall', {
                'filmsObject': filmsObject,
                'params': params,
                'callback': 'loadFilms'});
        }
    },
    // Common function for getting catalog data and search,
    // Using server side search only because API is a blackbox, so we don't known which algorithm it use.
    apiCall(context, payload) {
        let data = {};

        if (payload.params.page >= 0) {
            data.page = payload.filmsObject.apiPage;
        }
        if (payload.params.search) {
            data.search = payload.params.search;
        }

        context.commit('setLoadingState', true);
        fetchDataByType(context.state.resource, data).then(response => {
            if (response.data.results) {
                context.commit('setLoadingState', false);
                context.commit('setData', {
                    'type': context.getters.stateObjectType,
                    'page': payload.filmsObject.apiPage,
                    'next': Boolean(response.data.next),
                    'films': response.data.results
                });

                if (payload.callback) {
                    context.dispatch(payload.callback, payload.params);
                }
            }
        }).catch(error => {
            if (error.response && error.response.status == 404) {
                context.commit('setLoadingState', false);
                context.commit('setData', {
                    'type': context.getters.stateObjectType,
                    'page': payload.filmsObject.apiPage,
                    'next': false,
                    'films': []
                });
            } else {
                context.commit('setError');
            }
        });
    }
};

const mutations = {
    setImageUrl(state, imageInfo) {
        state.imagesUrls[imageInfo.key] = imageInfo.url;
    },
    setLoadingState(state, payload) {
        state.loading = payload;
    },
    setData(state, payload) {
        state[payload.type].films = state[payload.type].films.concat(payload.films);
        state[payload.type].apiPage = payload.page;
        state[payload.type].next = payload.next;
    },
    setSeparateData(state, payload) {
        state[payload.type][payload.key] = payload.value;
    },
    setVisibleFilms(state, payload) {
        state.visibleFilms = payload.films.slice(0, payload.offset);
    },
    setType(state, type) {
        state.type = type;
    },
    clearSearch(state) {
        state.searchData.films = [];
        state.searchData.apiPage = 0;
        state.searchData.next = true;
        state.searchData.searchValue = '';
    },
    setSearchValue(state, string) {
        state.searchData.searchValue = string;
    },
    setError(state) {
        state.error = true;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}