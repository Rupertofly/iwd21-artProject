import { DECAY_RATE, HEIGHT, WIDTH } from './constants';
type Radians = number;
type Pt = [x: number, y: number];
const { PI, sin, cos, atan2, round } = Math;
export const TAU = PI * 2;
export const uniformConsts = {
  u_res: [WIDTH, HEIGHT],
  u_decay: DECAY_RATE,
} as const;
export function betterAtan(x: number, y: number): Radians {
  let at = atan2(y, x);
  return at < 0 ? TAU - at : at;
}
export function offset(angle: Radians, distance: number): Pt {
  return [cos(angle) * distance, sin(angle) * distance];
}
export function wrap(x: number, y: number): Pt {
  return [(WIDTH + x) % WIDTH, (HEIGHT + y) % HEIGHT];
}
export function roundPt(x: number, y: number): Pt {
  return [round(x), round(y)];
}
export function normAngle(h: Radians): Radians {
  return (TAU + h) % TAU;
}
export function addPt(a: Pt, b: Pt): Pt {
  return [a[0] + b[0], a[1] + b[1]];
}
export function subPt(a: Pt, b: Pt): Pt {
  return [a[0] - b[0], a[1] - b[1]];
}
export function toI(x: number, y: number): number {
  return 4 * ((HEIGHT - y) * WIDTH + x);
}
export function fixPt(pt: Pt) {
  return wrap(...roundPt(...pt));
}
