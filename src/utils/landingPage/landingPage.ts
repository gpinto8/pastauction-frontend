import type { Section } from '@/api/landingPage/landingPage';

const PHOTO_BOX_PAGE_AREA = 'photo box';
export function getPhotoBoxes(sections: Section[]) {
  return (
    sections
      .filter(section => section.page_area == PHOTO_BOX_PAGE_AREA)
      // Sort by area position
      .sort((a, b) => a.area_position - b.area_position)
  );
}

const HEAD_PAGE_AREA = 'head';
export function getVideoPageArea(sections: Section[]) {
  return sections.find(
    section =>
      section.page_area == HEAD_PAGE_AREA && section.media_type == 'video'
  );
}

export function getHeadPageArea(sections: Section[]) {
  return (
    sections
      .filter(
        section =>
          section.page_area == HEAD_PAGE_AREA && section.media_type == 'text'
      )
      // Sort by area position
      .sort((a, b) => a.area_position - b.area_position)
  );
}
