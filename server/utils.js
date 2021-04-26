import { SERVER_CONFIG } from './server.config';

export const utils = {
    themovieDBurl: _themovieDBurl,
    getIdMovieFromPathParam: _getIdMovieFromPathParam

}

function _themovieDBurl(key) {

    let url;
    switch (key) {

        case 'discover':
            url = SERVER_CONFIG.themoviedb_api_config.base_url + 'discover/movie?api_key=' + SERVER_CONFIG.themoviedb_api_config.api_key + '%language=' + SERVER_CONFIG.themoviedb_api_config.language;
    }
    return url;
}

function _getIdMovieFromPathParam(path) {
    return path.split("/")[1];
}