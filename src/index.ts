import REGL from 'regl';
import { setupCanvas } from './setup';
class App {
  canvas: HTMLCanvasElement;
  regl: REGL.Regl;
  constructor() {
    [this.canvas, this.regl] = setupCanvas('output-canvas');
  }
}
new App();
