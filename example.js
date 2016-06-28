var canvas  = document.body.appendChild(document.createElement('canvas'))
var gl      = require('gl-context')(canvas, render)
var createTexture   = require('@lfdoherty/gl-texture2d')
var baboon    = require('baboon-image')
var display = require('./')

const img = baboon
const texture = createTexture(gl, img.shape[0], img.shape[1])
const data = new Uint8Array(img.shape[0]*img.shape[1]*4)
let i=0;
for(let x=0;x<img.shape[0];++x){
for(let y=0;y<img.shape[1];++y){
  data[i++] = img.get(x,y,0)
  data[i++] = img.get(x,y,1)
  data[i++] = img.get(x,y,2)
  data[i++] = img.get(x,y,3)
}
}
texture.setData(data)
window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)

function render() {
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  display(texture)
}
