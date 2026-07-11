const EARTH_RADIUS_KM = 6371;

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

function isWithinRadius(lat1, lng1, lat2, lng2, radiusKm) {
  return haversineDistance(lat1, lng1, lat2, lng2) <= radiusKm;
}

function getBoundingBox(lat, lng, radiusKm) {
  const latRad = toRadians(lat);
  const lngRad = toRadians(lng);
  const radDist = radiusKm / EARTH_RADIUS_KM;
  const minLat = latRad - radDist;
  const maxLat = latRad + radDist;
  let minLng = lngRad - radDist;
  let maxLng = lngRad + radDist;
  if (minLat > maxLat || minLng > maxLng) {
    return null;
  }
  return {
    minLat: (minLat * 180) / Math.PI,
    maxLat: (maxLat * 180) / Math.PI,
    minLng: (minLng * 180) / Math.PI,
    maxLng: (maxLng * 180) / Math.PI,
  };
}

function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  if (km < 10) return `${km.toFixed(1)}km`;
  return `${Math.round(km)}km`;
}

const GeoHelper = {
  haversineDistance,
  isWithinRadius,
  getBoundingBox,
  formatDistance,
  EARTH_RADIUS_KM,
};

module.exports = GeoHelper;
