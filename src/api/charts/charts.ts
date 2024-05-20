import axios from 'axios';

export function requestChartsSelection() {
    return axios.get('/chart/selection');
}
