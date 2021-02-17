import REGL from 'regl';
import { Agent } from './Agent';
import { HEIGHT, PCL_COUNT, WIDTH } from './constants';
import Renderer from './renderer';
import { setupCanvas } from './setup';
import depos from './shaders/depositFrag.frag';
import pass from './shaders/passthroughFrag.frag';
import diffuse from './shaders/diffuseAndDecayFrag.frag';
import colorise from './shaders/coloriseFrag.frag';
import { interpolatePuBu, range, rgb } from 'd3';
import { TAU } from './utils';
const { random: rnd, sin, cos } = Math;
type defCon = REGL.DefaultContext;
type depositProps = {
  depTex: REGL.Texture2D;
};
export class Scene {
  gl: REGL.Regl;
  glcv: HTMLCanvasElement;
  depositTexture: REGL.Texture2D;
  depositData: Float32Array;
  placeCanvas: HTMLCanvasElement;
  placeContext: CanvasRenderingContext2D;
  depDraw: REGL.DrawCommand<defCon, depositProps>;
  diffDraw: REGL.DrawCommand<defCon, {}>;
  renderDraw: REGL.DrawCommand<defCon, {}>;
  passthroughDraw: REGL.DrawCommand<defCon, {}>;
  agents: Agent[] = [];
  renderer: Renderer;
  renderHook: () => Promise<unknown> = async () => null;
  setupHook: () => Promise<unknown> = async () => null;

  constructor(cvID: string = 'output-canvas') {
    [this.glcv, this.gl] = setupCanvas(cvID);
    const regl = this.gl;
    this.depositData = new Float32Array(4 * WIDTH * HEIGHT);
    this.depositTexture = regl.texture({
      data: this.depositData,
      width: WIDTH,
      height: HEIGHT,
      type: 'float32',
    });
    this.renderer = new Renderer(regl);
    const palleteData = new Uint8Array(4 * 512);
    for (let i = 0; i < palleteData.length; i = i + 4) {
      let v = i / 4;
      const cl = rgb(interpolatePuBu(v / 512));
      palleteData[i] = cl.r;
      palleteData[i + 1] = cl.g;
      palleteData[i + 2] = cl.b;
      palleteData[i + 3] = 255;
    }
    this.renderDraw = regl({
      frag: colorise,
      uniforms: {
        u_pallete: regl.texture({ data: palleteData, type: 'uint8', width: 512, height: 1 }),
      },
    });
    this.depDraw = regl({ frag: depos, uniforms: { u_depTex: (_, p) => p.depTex } });
    this.diffDraw = regl({ frag: diffuse });
    this.passthroughDraw = regl({ frag: pass });
  }
  setup = async () => {
    range(PCL_COUNT / 2).forEach(() => {
      let dist = (rnd() * HEIGHT) / 4;
      let ang = rnd() * TAU;
      let cx = WIDTH / 2;
      let cy = HEIGHT / 2;
      let pcl = new Agent(cx + cos(ang) * dist, cy + sin(ang) * dist, Math.random() * TAU * 3);
      pcl.location = this.agents;
      this.agents.push(pcl);
    });
    await this.setupHook();
    window.requestAnimationFrame(this.draw);
  };
  draw = async () => {
    this.depositData.fill(0);
    const rend = this.renderer;
    this.gl.clear({
      color: [0, 0, 0, 0],
    });
    let aa = this.agents;
    let senseData = rend.currentPixels;
    this.agents.forEach((agent) => agent.senseAndTurn(senseData));
    this.agents.forEach((agent) => agent.moveAndDeposit(this.depositData));
    this.depositTexture({ width: WIDTH, height: HEIGHT, type: 'float32', data: this.depositData });
    rend.render(this.depDraw, { depTex: this.depositTexture });
    rend.render(this.diffDraw, {});
    rend.renderToScreen(this.renderDraw);
    await this.renderHook();
    window.requestAnimationFrame(this.draw);
  };
}
