var triangle = require('@lfdoherty/fast-big-triangle')
var glslify  = require('glslify')
const makeShader = require('@lfdoherty/gl-shader')

var WMap     = typeof WeakMap === 'undefined'
  ? require('weakmap')
  : WeakMap

module.exports = display

var cache  = new WMap

var viewport = new Float32Array(2)
var size     = new Float32Array(2)

function display(tex, scale = 1, mutatorGlsl = '') {
  var gl     = tex.gl
  var canvas = tex.gl.canvas
  var glCache = cache.get(gl)
  if(!glCache){
    glCache = {};
    cache.set(gl, glCache)
  }
  let shader = glCache[mutatorGlsl]

  if (!shader) {
    const fullFragShader = glslify('./display.frag').replace(/\$\{include_mutator\}/gi, mutatorGlsl);
    console.log('fullFragShader: ' + fullFragShader)
    console.log('mutatorGlsl: ' + mutatorGlsl)
    glCache[mutatorGlsl] = shader = makeShader(gl, glslify('./display.vert'), fullFragShader)
  }

  viewport[0] = canvas.width
  viewport[1] = canvas.height
  size[0] = tex.shape[0] * scale
  size[1] = tex.shape[1] * scale

  gl.viewport(
      (viewport[0] - size[0]) / 2
    , (viewport[1] - size[1]) / 2
    , size[0]
    , size[1]
  )

  shader.bind()
  shader.uniforms.uSize     = size
  shader.uniforms.uTexture  = tex.bind(0)
  //shader.uniforms.useAlpha = useAlpha ? 1. : 0.;

  triangle(gl)
  //shader.unbind();
  gl.bindTexture(gl.TEXTURE_2D, null)
  gl.useProgram(null);
}
