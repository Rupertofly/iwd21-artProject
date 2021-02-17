import { DECAY_RATE, HEIGHT, WIDTH } from './constants';

export const uniformConsts = {
  u_res: [WIDTH, HEIGHT],
  u_decay: DECAY_RATE,
} as const;
