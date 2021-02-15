precision mediump float;

varying vec2 pos;

void main() {
  gl_FragColor = vec4(pos.x-0.5/1440.,pos.y - 0.5/1440.,0.,1.);
}