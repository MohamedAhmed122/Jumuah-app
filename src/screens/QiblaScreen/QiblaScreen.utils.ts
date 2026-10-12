export function magnetometerHeading(x: number, y: number): number {
  const angle = Math.atan2(y, x) * (180 / Math.PI) - 90;
  return ((angle % 360) + 360) % 360;
}

export function getRelativeAngle(bearing: number, heading: number): number {
  return ((bearing - heading) % 360 + 360) % 360;
}

export function continuousRotation(current: number, target: number): number {
  const delta = (((target - current) % 360) + 540) % 360 - 180;
  return current + delta;
}

export function needsCalibration(accuracy: number | null): boolean {
  return accuracy !== null && accuracy < 2;
}
