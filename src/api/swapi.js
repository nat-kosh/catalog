import axios from 'axios';

const baseApiUrl = 'https://swapi.co/api/';

export function fetchDataByType(type, params) {
    let requestParamsArray = [];

    if (params.page >= 0) {
        requestParamsArray.push(`?page=${params.page}`);
    }
    if (params.search) {
        requestParamsArray.push(`&search=${params.search}`);
    }

    return fetch(type + requestParamsArray.join('&'));
}

function fetch(uri) {
    return axios.get(baseApiUrl + uri);
}
