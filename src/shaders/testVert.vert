precision mediump float;
attribute vec3 position;
varying vec2 pos;

void main() {
  gl_Position = vec4(position,1.0);
  pos = vec2(0.5+position.x/2.,1.0-(0.5+position.y/2.));
}