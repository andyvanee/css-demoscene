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
        return ['--progress', '--border-background-color', '--border-dash-color', '--border-dash-speed']
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
        const scrollSpeed = parseInt(properties.get('--border-dash-speed'))

        const {width, height} = geom
        const offset = progress * scrollSpeed

        const xSpacing = evenSpacing(12, width)
        const ySpacing = evenSpacing(12, height)

        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, geom.width, geom.height)

        ctx.fillStyle = borderColor

        {
            const {count, size} = xSpacing

            for (let x = -2; x < count; x += 2) {
                const offsetX = x * size + (offset % (size * 2))
                ctx.fillRect(offsetX, 0, size, size)
                ctx.fillRect(width - offsetX, height - size, size, size)
            }
        }

        {
            const {count, size} = ySpacing

            for (let y = -2; y < count; y += 2) {
                const offsetY = y * size + (offset % (size * 2))
                ctx.fillRect(0, height - offsetY, size, size)
                ctx.fillRect(width - size, offsetY, size, size)
            }
        }

        ctx.strokeStyle = borderColor
        ctx.lineWidth = 4
        ctx.rect(0, 0, width, height)
        ctx.stroke()
    }
}

registerPaint('border-image-dashed-paint', BorderImageDashedPaint)
