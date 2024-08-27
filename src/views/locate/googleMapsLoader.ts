import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['maps', 'routes', 'marker', 'geocoding'],
});

const mapsLibrary = loader.importLibrary('maps');
const routesLibrary = loader.importLibrary('routes');
const markerLibrary = loader.importLibrary('marker');
const geocodingLibrary = loader.importLibrary('geocoding');

export {
	mapsLibrary,
	routesLibrary,
	markerLibrary,
	geocodingLibrary,
};
