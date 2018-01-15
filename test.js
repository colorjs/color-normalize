const assert = require('assert')
const rgba = require('./')


assert.deepEqual(rgba('red'), [1, 0, 0, 1])
assert.deepEqual(rgba('rgb(80, 120, 160)', 'uint8'), [80, 120, 160, 255])
assert.deepEqual(rgba('rgba(255, 255, 255, .5)', 'float64'), [1, 1, 1, .5])
assert.deepEqual(rgba('hsla(109, 50%, 50%, .75)', 'uint8'), [87, 191, 64, 191])
assert.deepEqual(rgba(new Float32Array([0, 0.25, 0, 1]), 'uint8_clamped'), [0, 64, 0, 255])
assert.deepEqual(rgba(new Uint8Array([0, 72, 0, 255]), 'array'), [0, 0.2823529411764706, 0, 1])
assert.deepEqual(rgba(new Uint8Array([0, 72, 0, 255]), 'uint8'), [0, 72, 0, 255])

assert.deepEqual(rgba([0,0,0,1]), [0,0,0,1])
