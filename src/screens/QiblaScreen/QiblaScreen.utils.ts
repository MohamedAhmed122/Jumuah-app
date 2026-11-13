import type { SensorVector } from './QiblaScreen.types';
import { DEVICE_BACK, DEVICE_TOP, cross, dot, normalize } from './QiblaScreen.vectors';

export function normalizeHeading(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

export function magnetometerHeading(x: number, y: number): number {
  return normalizeHeading(Math.atan2(y, x) * (180 / Math.PI) - 90);
}

export function rotationHeading(gravity: SensorVector, magnetic: SensorVector): number | null {
  const up = normalize(gravity);
  const east = normalize(cross(magnetic, gravity));
  if (!up || !east) return null;
  const north = cross(up, east);
  const forward = Math.abs(gravity.y) > Math.abs(gravity.z) ? DEVICE_BACK : DEVICE_TOP;
  return normalizeHeading(Math.atan2(dot(east, forward), dot(north, forward)) * (180 / Math.PI));
}

export function smoothHeading(previous: number | null, next: number, factor: number): number {
  if (previous === null) return next;
  const delta = (((next - previous) % 360) + 540) % 360 - 180;
  return normalizeHeading(previous + delta * factor);
}

export function headingDeclination(trueHeading: number, magneticHeading: number): number | null {
  if (trueHeading < 0 || magneticHeading < 0) return null;
  return (((trueHeading - magneticHeading) % 360) + 540) % 360 - 180;
}

export function getRelativeAngle(bearing: number, heading: number): number {
  return normalizeHeading(bearing - heading);
}

export function continuousRotation(current: number, target: number): number {
  const delta = (((target - current) % 360) + 540) % 360 - 180;
  return current + delta;
}

export function needsCalibration(accuracy: number | null): boolean {
  return accuracy !== null && accuracy < 2;
}
