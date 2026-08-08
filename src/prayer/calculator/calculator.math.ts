export function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export function normalizeAngle(angle: number) {
  return angle - 360 * Math.floor(angle / 360);
}

export function normalizeHour(hour: number) {
  return hour - 24 * Math.floor(hour / 24);
}
