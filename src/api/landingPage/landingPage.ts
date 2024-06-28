import axios from 'axios';

export type Section = {
  text_title: string;
  text_description: string | null;
  responsive_status: string;
  page_area: string;
  area_position: number;
  media_type: string;
  media_name: string | null;
  media_url: string | null;
  media_path: string | null;
  media_aws_path: string | null;
  active: boolean;
};
export function homepageSections() {
  return axios.get('/bidwatcher_homepage_media');
}
