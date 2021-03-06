const TAU = Math.PI * 2;
const toRad = (t) => (t * (TAU / 360)) as number;
export const WIDTH = 512;
export const HEIGHT = 512;
export const PCL_COUNT = Math.pow(512, 2);
export const DECAY_RATE = 0.95;
export const SENSOR_ANGLE = toRad(2);
export const ROTATION_ANGLE = toRad(8);
export const SENSOR_OFFSET = 12;
export const STEP_SIZE = 1.25;
export const DEPOSIT_AMT = 1 / 255;
export const BLUR_KERNAL_SIZE = 3;
