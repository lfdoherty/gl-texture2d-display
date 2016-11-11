precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uSize;
varying vec2 vPos;
//uniform float useAlpha;

void main() {
	vec2 uv = (vPos + 1.0) * 0.5;
	uv.y = 1.0 - uv.y;
	vec4 col = texture2D(uTexture, uv);
	${include_mutator}
	gl_FragColor = col;
}
