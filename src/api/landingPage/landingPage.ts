import axios from 'axios';
import { paramNameForFirstNLetters } from '../filter/filterApi';

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
  return axios.get('bidwatcher_homepage_media/');
}

export type BrandInfo = {
  brand_category_uso: string;
  brand_category_vehicle: string;
  brand_id_city: number;
  brand_date_end: number;
  brand_date_start: number;
  brand_group: string;
  brand_name: string;
  brand_production: string | null;
  brand_history: string;
  brand_logo: string;
  brand_country_code: string;
  brand_logo_test: string;
  brand_origin_col: string;
  brand_homepage_display: boolean;
  fouder_name: string;
  fouder_born_city: string | null;
  fouder_born_country: string | null;
  fouder_date_born: string | null;
  fouder_date_death: string | null;
  fouder_age: string | null;
  fouder_photo_path: string;
  fouder_origin_col: string;
  brand_country_iso_code: string;
  brand_country_area: string;
  brand_country_info: string;
  brand_country_name: string;
  brand_country_photo_url: string;
  brand_country_logo_test: string | null;
  brand_country_origin_col: string;
  founder_country_iso_code: string | null;
  founder_country_area: string | null;
  founder_country_info: string | null;
  founder_country_name: string | null;
  founder_country_photo_url: string | null;
  founder_country_logo_test: string | null;
  founder_country_origin_col: string | null;
  brand_city_name: string;
  brand_city_longitude: number;
  brand_city_latitude: number;
  brand_city_country_code: string;
};

export const desaturatedBrandLogoUrl = (brandId: number) =>
  `https://past-auction-p.s3.amazonaws.com/Home/Brand/LogoMarchIDesaturati/${brandId}.png`;

export const brandLogoUrl = (brandId: number) =>
  `https://past-auction-p.s3.amazonaws.com/Home/Brand/LogoMarchIColored/${brandId}.png`;

export const getBrandAndFounder = () => {
  return axios.get(
    'bidwatcher_brand_and_founder_hp/?search=brand_homepage_display:true'
  );
};

export const getBrandAndFounderByFirstLetter = (initial: string) => {
  return axios.get(
    `bidwatcher_brand_and_founder_hp/?search=brand_homepage_display:true,${paramNameForFirstNLetters('brand_name', 1)}:${initial}&sort=brand_name:asc`
  );
};
