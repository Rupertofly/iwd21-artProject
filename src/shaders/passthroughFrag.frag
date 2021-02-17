precision mediump float;

varying vec2 pos;
uniform vec2 u_res;
uniform sampler2D u_prevTex;

void main() {
  gl_FragColor = texture2D(u_prevTex,pos);
}