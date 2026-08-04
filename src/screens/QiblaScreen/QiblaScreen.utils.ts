export function normalizeHeading(x: number, y: number, isIos: boolean): number {
  const headingAdjustment = isIos ? 90 : 0;
  const angle = Math.atan2(y, x) * (180 / Math.PI) + headingAdjustment;

  return (360 - ((angle + 360) % 360)) % 360;
}

export function getRelativeAngle(bearing: number, heading: number): number {
  return ((bearing - heading) % 360 + 360) % 360;
}
