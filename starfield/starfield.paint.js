import {createNoise2D} from '../lib/simplex-noise/simplex-noise.js'

if (typeof registerPaint !== 'function') throw 'Not a Paint context'

const noise = createNoise2D()

const precomputedNoise = [...new Array(1024)].map((_, x) => {
    const offset = x + 0.01
    const row = offset % 32
    const col = offset - row * 32
    return noise(col, row)
})

if (registerPaint) {
    class StarfieldPaint {
        static get inputProperties() {
            return ['--starfieldProgress']
        }

        /**
         *
         * @param {CanvasRenderingContext2D} ctx
         * @param {{width: number, height: number}} geom
         * @param {StylePropertyMapReadOnly} properties
         */
        paint(ctx, geom, properties) {
            const progress = parseFloat(properties.get('--starfieldProgress').toString())
            const {width, height} = geom

            ctx.beginPath()
            ctx.fillStyle = `lab(${progress * 56.05} ${progress * -19.27} ${progress * -43.69} / 1)`
            ctx.rect(0, 0, geom.width, geom.height)
            ctx.fill()

            ctx.fillStyle = `rgb(255, 255, 255, ${1 - progress})`
            for (let x = 0; x < 1024; x++) {
                const sampleX = precomputedNoise[x]
                const sampleY = precomputedNoise[(x + 512) % 1024]
                const size = x / 256
                ctx.beginPath()
                ctx.ellipse(sampleX * width, sampleY * height, size, size, 0, 0, 2 * Math.PI)
                ctx.fill()
            }

            // ctx.fill()
        }
    }

    registerPaint('starfield-paint', StarfieldPaint)
}
