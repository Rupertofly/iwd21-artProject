precision mediump float;

varying vec2 pos;
uniform vec2 u_res;
uniform sampler2D u_prevTex;
uniform sampler2D u_depTex;

void main() {
  float depositValue = texture2D(u_depTex,pos).r;
  vec4 outputValue = texture2D(u_prevTex,pos);
  outputValue.r = depositValue;
  gl_FragColor = outputValue;
}