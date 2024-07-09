import type { Section } from '@/api/landingPage/landingPage';

const orderByAreaPosition = (a: Section, b: Section) =>
  a.area_position - b.area_position;

const PHOTO_BOX_PAGE_AREA = 'photo box';
export function getPhotoBoxes(sections: Section[]) {
  return sections
    .filter(section => section.page_area == PHOTO_BOX_PAGE_AREA)
    .sort(orderByAreaPosition);
}

const HEAD_PAGE_AREA = 'head';
export function getVideoPageArea(sections: Section[]) {
  return sections.find(
    section =>
      section.page_area == HEAD_PAGE_AREA && section.media_type == 'video'
  );
}

export function getHeadPageArea(sections: Section[]) {
  return sections
    .filter(
      section =>
        section.page_area == HEAD_PAGE_AREA && section.media_type == 'text'
    )
    .sort(orderByAreaPosition);
}

const CHART_PAGE_AREA = 'chart';
const CHART_AREA_POSITION_BACKGROUND_IMAGE = -1;
export function getCarouselCharts(sections: Section[]) {
  return sections.filter(
    section =>
      section.page_area == CHART_PAGE_AREA &&
      section.area_position != CHART_AREA_POSITION_BACKGROUND_IMAGE
  );
}

export function getCarouselChartsBackgroundImage(sections: Section[]) {
  return sections.find(
    section =>
      section.page_area == CHART_PAGE_AREA &&
      section.area_position == CHART_AREA_POSITION_BACKGROUND_IMAGE
  );
}

const VIDEO_PAGE_AREA = 'video carousel';
export function getVideos(sections: Section[]) {
  return sections
    .filter(section => section.page_area == VIDEO_PAGE_AREA)
    .sort(orderByAreaPosition);
}
