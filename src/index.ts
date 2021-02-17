import REGL from 'regl';
import vert from './shaders/testVert.vert';
import frag from './shaders/testFrag.frag';
import { Scene } from './Scene';
import { setupCanvas } from './setup';

const scn = new Scene();
scn.setup();

// const imgElem = document.createElement('img');
// imgElem.src = '/img/richFilt.png';
// class App {
//   canvas: HTMLCanvasElement;
//   regl: REGL.Regl;
//   constructor() {
//     [this.canvas, this.regl] = setupCanvas('output-canvas');
//     let regl = this.regl;
//     regl.clear({
//       color: [1, 0, 0, 1],
//       depth: 0,
//       stencil: 0,
//     });
//     let tex = regl.texture(imgElem);
//     let posAttribute = regl.buffer({ data: [-1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1] });
//     let drawing = regl({
//       vert,
//       attributes: { position: posAttribute },
//       uniforms: {
//         u_res: (c) => [c.drawingBufferWidth, c.drawingBufferHeight],
//         u_img: tex,
//         u_t: (c) => c.time / 5,
//       },
//       count: 4,
//       primitive: 'triangle strip',
//       depth: { enable: false },
//     });
//     let xt = regl({ uniforms: { u_blu: 0.7 }, frag });
//     regl.frame(() =>
//       drawing(() => {
//         regl.clear({ color: [1, 1, 1, 1] });
//         xt();
//       })
//     );
//   }
// }
// imgElem.onload = (e) => new App();
