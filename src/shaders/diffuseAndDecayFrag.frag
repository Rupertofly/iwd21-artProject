precision mediump float;

varying vec2 pos;
uniform vec2 u_res;
uniform sampler2D u_prevTex;
uniform float u_decay;



void main() {
  float col = 0.0;
  vec2 adjustedPosition = vec2(gl_FragCoord.x,gl_FragCoord.y);
  const float count = 9.;
  for (float xd = -1.;xd <= 1.;xd++){
    for (float yd = -1.;yd <= 1.;yd++) {
      vec2 offset = vec2(xd,yd);
      vec2 texPos = fract((adjustedPosition + offset)/u_res);
      float value = texture2D(u_prevTex,texPos).r;
      col = col + (value/count)*u_decay;
    }
  }
  gl_FragColor = vec4(vec3(col),1.0);
}