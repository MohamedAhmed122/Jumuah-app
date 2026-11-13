import { VECTOR_EPSILON } from './QiblaScreen.constants';
import type { SensorVector } from './QiblaScreen.types';

export const DEVICE_TOP: SensorVector = { x: 0, y: 1, z: 0 };
export const DEVICE_BACK: SensorVector = { x: 0, y: 0, z: -1 };

export function cross(a: SensorVector, b: SensorVector): SensorVector {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

export function dot(a: SensorVector, b: SensorVector): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function normalize(vector: SensorVector): SensorVector | null {
  const length = Math.sqrt(dot(vector, vector));
  if (length < VECTOR_EPSILON) return null;
  return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
}
