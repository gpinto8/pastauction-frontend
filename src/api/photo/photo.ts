export function getImageFromPath(path: string) {
  return `https://pastauction.com/api/v1/photo/${path}`;
}

export function getCountryFlag(countryISO: string) {
  return `https://past-auction-p.s3.amazonaws.com/LogoCountry/${countryISO}.jpeg`;
}
