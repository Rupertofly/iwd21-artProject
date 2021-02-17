precision mediump float;

varying vec2 pos;
uniform vec2 u_res;
uniform sampler2D u_prevTex;
uniform float u_decay;



void main() {
  float col = 0.;
  vec2 adjustedPosition = vec2(gl_FragCoord.x,u_res.y-gl_FragCoord.y);
  const float kernel = 1.;
  const float count = pow(2.*1.+1.,2.);
  for (float xd = -kernel;xd < kernel;xd++){
    for (float yd = -kernel;yd < kernel;yd++) {
      vec2 offset = vec2(xd,yd);
      vec2 texPos = fract((adjustedPosition + offset)/u_res);
      float value = texture2D(u_prevTex,texPos).r;
      col += (value/count)*u_decay;
    }
  }
  gl_FragColor = vec4(vec3(col),1.0);
}