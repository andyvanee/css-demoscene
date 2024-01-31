if (typeof registerPaint !== 'function') throw 'Not a Paint context'

import {computeStars} from './Star.js'
import * as Star from './Star.js'

if (registerPaint) {
    class StarfieldPaint {
        /** @type {Star.Star[] | null} */
        stars

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
            const {width, height} = geom
            const progress = parseFloat(properties.get('--starfieldProgress').toString())

            if (!this.stars) this.stars = computeStars({count: 1024, width, height})

            ctx.imageSmoothingEnabled = false
            ctx.beginPath()
            ctx.fillStyle = `lab(${progress * 56.05} ${progress * -19.27} ${progress * -43.69} / 1)`
            ctx.rect(0, 0, geom.width, geom.height)
            ctx.fill()

            for (const star of this.stars) {
                ctx.fillStyle = star.color(progress)
                ctx.beginPath()
                ctx.ellipse(star.x, star.y, star.size, star.size, 0, 0, 2 * Math.PI)
                ctx.fill()
            }
        }
    }

    registerPaint('starfield-paint', StarfieldPaint)
}
