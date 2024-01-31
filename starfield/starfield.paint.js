if (typeof registerPaint !== 'function') throw 'Not a Paint context'

import {computeStars} from './Star.js'
import * as Star from './Star.js'

/**
 * @typedef Geometry {Object}
 * @property {number} width
 * @property {number} height
 */

class StarfieldPaint {
    /** @type {Star.Star[] | null} */
    stars

    static get inputProperties() {
        return ['--starfieldProgress']
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Geometry} geom
     * @param {StylePropertyMapReadOnly} properties
     */
    paint(ctx, geom, properties) {
        const {width, height} = geom
        const progress = parseFloat(properties.get('--starfieldProgress').toString())

        if (!this.stars) this.stars = computeStars({width, height})

        ctx.reset()
        ctx.imageSmoothingEnabled = false
        ctx.fillStyle = `lab(${progress * 56.05} ${progress * -19.27} ${progress * -43.69} / 1)`
        ctx.fillRect(0, 0, geom.width, geom.height)

        for (const star of this.stars) {
            ctx.beginPath()
            ctx.fillStyle = star.color(progress)
            const halfSize = star.size / 2
            ctx.ellipse(star.x + halfSize, star.y + halfSize, 1.5, 3.5, 0, 0, 2 * Math.PI)
            ctx.ellipse(star.x, star.y, star.size, star.size, 0, 0, 2 * Math.PI)
            ctx.fill()
        }
    }
}

registerPaint('starfield-paint', StarfieldPaint)
