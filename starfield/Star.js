import {clamp} from '../lib/Number.js'
import {createNoise2D} from '../lib/simplex-noise/simplex-noise.js'
import {Alea} from '../lib/alea.js'

const noiseSize = 2048
const prng = Alea(new Date().getMinutes())
const noise = createNoise2D(prng)

const precomputedNoise = [...new Array(noiseSize)].map((_, x) => {
    const offset = x + 0.01
    const row = offset % 32
    const col = offset - row * 32
    return noise(col, row)
})

/**
 * @typedef Star {Object}
 * @property {number} x
 * @property {number} y
 * @property {number} size
 * @property {(progress: number) => string} color
 */

/**
 * @typedef StarProps {Object}
 * @property {number} width
 * @property {number} height
 */

/**
 * @param {StarProps} props
 * @returns {Star[]}
 */
export const computeStars = ({width, height}) => {
    return [...new Array(noiseSize)].map((_, x) => {
        const sampleX = precomputedNoise[x]
        const sampleY = precomputedNoise[(x + 512) % noiseSize]
        const size = x / 512
        const redshift = clamp((x / noiseSize) * 128 + 128, 0, 255)

        /**
         * @param {number} progress
         * @returns {string}
         */
        const color = progress => `rgb(255, ${redshift}, ${redshift}, ${clamp(0.5 - progress, 0, 1)})`

        return {x: sampleX * width, y: sampleY * height, size, color}
    })
}
