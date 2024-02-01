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

class BorderImageDashedPaint {
    static get inputProperties() {
        return ['--progress', '--border-background-color', '--border-dash-color']
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Geometry} geom
     * @param {StylePropertyMapReadOnly} properties
     */
    paint(ctx, geom, properties) {
        const backgroundColor = properties.get('--border-background-color').toString()
        const borderColor = properties.get('--border-dash-color').toString()
        const progress = parseFloat(properties.get('--progress'))

        const {width, height} = geom
        const offset = progress * 180

        const xSpacing = evenSpacing(12, width)
        const ySpacing = evenSpacing(12, height)

        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, geom.width, geom.height)

        ctx.fillStyle = borderColor

        {
            const {count, size} = xSpacing

            for (let x = 0; x < count; x += 2) {
                const offsetX = (x * size + offset) % width
                ctx.fillRect(offsetX, 0, size, size)
                ctx.fillRect(width - offsetX, height - size, size, size)
            }
        }

        {
            const {count, size} = ySpacing

            for (let y = 0; y < count; y += 2) {
                const offsetY = (y * size + offset) % height
                ctx.fillRect(0, height - offsetY, size, size)
                ctx.fillRect(width - size, offsetY, size, size)
            }
        }
    }
}

registerPaint('border-image-dashed-paint', BorderImageDashedPaint)
