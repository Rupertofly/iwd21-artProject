import REGL from 'regl';
import { HEIGHT, WIDTH } from './constants';

export function setupCanvas(id: string) {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(id);
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const glContext = canvas.getContext('webgl');
  const reglContext = REGL({ gl: glContext, extensions: ['OES_texture_float'] });

  return [canvas, reglContext] as const;
}
