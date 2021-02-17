import REGL, { Regl } from 'regl';
import vertShader from './shaders/testVert.vert';
import idenShader from './shaders/passthroughFrag.frag';
import { HEIGHT, WIDTH } from './constants';
import { uniformConsts } from './utils';

type setupProps = { fb: REGL.Framebuffer2D | null; oldTex: REGL.Texture2D | null };
const setupDrawConfig: REGL.DrawConfig<{}, {}, setupProps> = {
  attributes: { position: [-1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1] },
  vert: vertShader,
  count: 4,
  primitive: 'triangle strip',
  depth: { enable: false },
  framebuffer: (_, p) => p.fb,
  uniforms: {
    ...uniformConsts,
    u_prevTex: (_, p) => p.oldTex,
  },
};

export class Renderer {
  gl: REGL.Regl;
  defaultDraw: REGL.DrawCommand<REGL.DefaultContext, setupProps>;
  identityDraw: REGL.DrawCommand;
  aFBO: REGL.Framebuffer2D;
  bFBO: REGL.Framebuffer2D;
  aTexture: REGL.Texture2D;
  bTexture: REGL.Texture2D;
  next: 'a' | 'b' = 'a';
  constructor(regl: REGL.Regl) {
    this.gl = regl;
    this.aTexture = regl.texture({ width: WIDTH, height: HEIGHT, type: 'float32' });
    this.bTexture = regl.texture({ width: WIDTH, height: HEIGHT, type: 'float32' });
    this.aFBO = regl.framebuffer({
      color: this.aTexture,
      colorType: 'float',
      depth: false,
    });
    this.bFBO = regl.framebuffer({
      color: this.bTexture,
      colorType: 'float',
      depth: false,
    });
    this.defaultDraw = regl(setupDrawConfig);
    this.identityDraw = regl({ frag: idenShader });
  }
  get currentTex() {
    return this.next === 'a' ? this.bTexture : this.aTexture;
  }
  get currentPixels() {
    return this.next === 'a'
      ? this.gl.read({ framebuffer: this.bFBO })
      : this.gl.read({ framebuffer: this.aFBO });
  }
  get nextTex() {
    return this.next === 'b' ? this.bTexture : this.aTexture;
  }
  swap() {
    this.next = this.next === 'a' ? 'b' : 'a';
  }
  render<T extends REGL.DrawCommand>(drawFunc: T, ...funcArgs: Parameters<T>) {
    switch (this.next) {
      case 'a':
        this.defaultDraw({ fb: this.aFBO, oldTex: this.bTexture }, () => {
          drawFunc(funcArgs);
        });
        break;
      default:
        this.defaultDraw({ fb: this.bFBO, oldTex: this.aTexture }, () => {
          drawFunc(funcArgs);
        });
    }
    this.swap();
  }
  renderToScreen() {
    switch (this.next) {
      case 'a':
        this.defaultDraw({ fb: null, oldTex: this.bTexture }, () => {
          this.identityDraw();
        });
        break;
      default:
        this.defaultDraw({ fb: null, oldTex: this.aTexture }, () => {
          this.identityDraw();
        });
    }
  }
}
export default Renderer;
