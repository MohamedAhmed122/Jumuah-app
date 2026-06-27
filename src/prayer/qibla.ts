const MECCA = { lat: 21.4225, lng: 39.8262 };

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function toDeg(rad: number) { return (rad * 180) / Math.PI; }

export function calculateQiblaBearing(coords: { lat: number; lng: number }): number {
  const dLng = toRad(MECCA.lng - coords.lng);
  const lat1 = toRad(coords.lat);
  const lat2 = toRad(MECCA.lat);

  const x = Math.sin(dLng) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  const bearing = toDeg(Math.atan2(x, y));
  return (bearing + 360) % 360;
}

export function compassDirection(bearing: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(bearing / 45) % 8];
}
