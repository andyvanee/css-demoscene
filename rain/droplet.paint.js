if (typeof registerPaint !== 'function') throw 'Not a Paint context'

/**
 * Scale the desired size to a number that fits evenly in container
 * @param {number} targetSize
 * @param {number} containerSize
 * @returns {{count: number, size: number}}
 */
const evenSpacing = (targetSize, containerSize) => {
    let count = Math.floor(containerSize / targetSize)
    if (count % 2 == 0) count--
    return {count, size: containerSize / count}
}

/**
 * @typedef Geometry {Object}
 * @property {number} width
 * @property {number} height
 */

class DropletPaint {
    startOffset = Math.random()

    static get inputProperties() {
        return ['--time', '--start-offset', '--droplet-speed']
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Geometry} geom
     * @param {StylePropertyMapReadOnly} properties
     */
    paint(ctx, geom, properties) {
        const time = parseFloat(properties.get('--time'))
        const startOffset = parseFloat(properties.get('--start-offset'))
        const speed = parseInt(properties.get('--droplet-speed'))
        const {width, height} = geom
        const doubleHeight = height * 2

        const startY = ((time * speed + startOffset * doubleHeight) % doubleHeight) - height
        const yHeight = height / 2
        const endY = startY + yHeight

        const gradient = ctx.createLinearGradient(0, startY, 0, endY)
        gradient.addColorStop(0.0, 'rgba(255,255,255,0.0)')
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.01)')
        gradient.addColorStop(1.0, 'rgba(255,255,255,0.2)')
        ctx.fillStyle = gradient

        ctx.fillRect(0, startY, width, yHeight)
    }
}

registerPaint('droplet-paint', DropletPaint)
