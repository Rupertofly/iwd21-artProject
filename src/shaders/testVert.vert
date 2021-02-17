precision mediump float;
attribute vec3 position;
varying vec2 pos;

void main() {
  gl_Position = vec4(position,1.0);
}