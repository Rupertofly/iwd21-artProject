precision mediump float;

varying vec2 pos;
uniform vec2 u_res;
uniform sampler2D u_prevTex;
uniform sampler2D u_depTex;

void main() {
  vec2 uv = gl_FragCoord.xy/u_res;
  vec4 depositValue = texture2D(u_depTex,uv);
  vec4 outputValue = texture2D(u_prevTex,uv) + depositValue;
  gl_FragColor = outputValue;
}