import axios from 'axios';
import { getDashCodeParam } from './chartsParams';

export function requestChartsSelection() {
  return axios.get('/chart/selection');
}

export function getProductsDashboards(dashCode: string) {
  return axios.get('/dashboard_detail?' + getDashCodeParam(dashCode));
}
