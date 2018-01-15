/** @module  color-rgba */

'use strict'

var rgba = require('color-rgba')
var clamp = require('clamp')
var dtype = require('dtype')

module.exports = function normalize (color, type) {
	if (type === 'float' || !type) type = 'array'
	if (type === 'uint') type = 'uint8'
	if (type === 'uint_clamped') type = 'uint8_clamped'
	var Ctor = dtype(type)
	var output = new Ctor(4)

	//same class does not change values
	if (color instanceof Ctor) {
		if (Array.isArray(color)) {
			return color.slice()
		}

		output.set(color)

		return output
	}

	var normalize = type !== 'uint8' && type !== 'uint8_clamped'

	//consider uint8 array as 0..255 channel values
	if (color instanceof Uint8Array || color instanceof Uint8ClampedArray) {
		output[0] = color[0]
		output[1] = color[1]
		output[2] = color[2]
		output[3] = color[3] != null ? color[3] : 255
		if (normalize) {
			output[0] /= 255
			output[1] /= 255
			output[2] /= 255
			output[3] /= 255
		}

		return output
	}

	//attempt to parse non-array arguments
	if (!color.length || typeof color === 'string') {
		color = rgba(color)
		color[0] /= 255
		color[1] /= 255
		color[2] /= 255
	}

	//consider every other array type as 0..1 float values
	if (!normalize) {
		output[0] = clamp(Math.round(color[0] * 255), 0, 255)
		output[1] = clamp(Math.round(color[1] * 255), 0, 255)
		output[2] = clamp(Math.round(color[2] * 255), 0, 255)
		output[3] = color[3] == null ? 255 : clamp(Math.floor(color[3] * 255), 0, 255)
	} else {
		output[0] = color[0]
		output[1] = color[1]
		output[2] = color[2]
		output[3] = color[3] != null ? color[3] : 1
	}

	return output
}
