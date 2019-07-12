import { API_KEY, Base_Url } from '../App.constants';

export default class MovieService {
    getLatestAndGreatest() {
        const route = '/latest';
        const url = this.buildUrl(route);

        return fetch(url).then(response => response.json());
    }

    getNowPlaying() {
        const route = '/now_playing';
        const url = this.buildUrl(route);

        return fetch(url).then(response => response.json());
    }

    buildUrl(route) {
        return `${Base_Url}${route}?api_key=${API_KEY}`;
    }
}