precision mediump float;

varying vec2 pos;
uniform vec2 u_res;
uniform float u_blu;
uniform float u_t;
uniform sampler2D u_img;

void main() {
  vec2 coords = gl_FragCoord.xy;
  coords = vec2(coords.x,u_res.y-coords.y-1.);
  vec4 texCol = texture2D(u_img,fract(sin(coords/u_res.yy+sin(u_t))));
  vec4 sexCol = texture2D(u_img,fract(sin((coords-2.)/u_res.yy+sin(u_t))));
  vec4 nexCol = texture2D(u_img,fract(sin((coords-4.)/u_res.yy+sin(u_t))));
  vec4 outCol = vec4(0.);
  float v = .5;
  float u = .5;
  if (texCol.r < 0.5) outCol = vec4(sexCol.rg*0.8,nexCol.r*.5,1.0);
  if (mod(coords.x,10.) == 0.) v = 0.;
  if (mod(coords.y,10.) == 0.) u = 0.;
  gl_FragColor = outCol;
}