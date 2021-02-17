precision mediump float;

uniform vec2 u_res;
uniform sampler2D u_prevTex;
uniform sampler2D u_pallete;

void main() {
  vec4 value = texture2D(u_prevTex,gl_FragCoord.xy/u_res);
  vec4 color = texture2D(u_pallete,vec2(value.r,0.));
  gl_FragColor = color;
}