/** @module  color-normalize */
import rgba from 'color-rgba'
import dtype from 'dtype'

export default function normalize(color, type) {
	if (type === 'float' || !type) type = 'array'
	else if (type === 'uint') type = 'uint8'
	else if (type === 'uint_clamped') type = 'uint8_clamped'

	var output = new (dtype(type))(4)
	var normalize = type !== 'uint8' && type !== 'uint8_clamped'

	// attempt to parse non-array arguments
	if (Object(color) !== color) {
		color = rgba(color)
		color[0] /= 255
		color[1] /= 255
		color[2] /= 255
	}

	// 0, 1 are possible contradictory values for Arrays:
	// [1,1,1] input gives [1,1,1] output instead of [1/255,1/255,1/255], which may be collision if input is meant to be uint.
	// converting [1,1,1] to [1/255,1/255,1/255] in case of float input gives larger mistake since [1,1,1] float is frequent edge value, whereas [0,1,1], [1,1,1] etc. uint inputs are relatively rare
	if (isInt(color)) {
		output[0] = color[0]
		output[1] = color[1]
		output[2] = color[2]
		output[3] = color[3] ?? 255

		if (normalize) {
			output[0] /= 255
			output[1] /= 255
			output[2] /= 255
			output[3] /= 255
		}

		return output
	}

	if (!normalize) {
		output[0] = Math.min(Math.max(color[0] * 255 | 0, 0), 255)
		output[1] = Math.min(Math.max(color[1] * 255 | 0, 0), 255)
		output[2] = Math.min(Math.max(color[2] * 255 | 0, 0), 255)
		output[3] = color[3] == null ? 255 : Math.min(Math.max(color[3] * 255 | 0, 0), 255)
	} else {
		output[0] = color[0]
		output[1] = color[1]
		output[2] = color[2]
		output[3] = color[3] ?? 1
	}

	return output
}

function isInt(color) {
	if (color instanceof Uint8Array || color instanceof Uint8ClampedArray) return true

	return Array.isArray(color) &&
		(!color[0] || color[0] > 1) &&
		(!color[1] || color[1] > 1) &&
		(!color[2] || color[2] > 1) &&
		(!color[3] || color[3] > 1)
}
