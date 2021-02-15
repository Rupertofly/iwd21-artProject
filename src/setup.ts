import REGL from 'regl';

export function setupCanvas(id: string) {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(id);
  const glContext = canvas.getContext('webgl');
  const reglContext = REGL({ gl: glContext, extensions: ['OES_texture_float'] });

  return [canvas, reglContext] as const;
}
