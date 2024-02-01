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

class BorderImageDotsPaint {
    static get inputProperties() {
        return ['--progress', '--border-color', '--border-dots-speed']
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Geometry} geom
     * @param {StylePropertyMapReadOnly} properties
     */
    paint(ctx, geom, properties) {
        const dotSize = 5
        const dotColor = properties.get('--border-color').toString()
        const progress = parseFloat(properties.get('--progress'))
        const dotSpeed = parseInt(properties.get('--border-dots-speed'))
        const offset = progress * dotSpeed

        const {width, height} = geom
        const circumference = (width + height - dotSize * 2) * 2
        const spacing = evenSpacing(40, circumference)
        const dotPositions = [...new Array(spacing.count)].map((_, index) => ({
            position: (index * spacing.size + offset) % circumference,
        }))

        const drawdot = (x, y) => {
            ctx.fillStyle = dotColor
            ctx.beginPath()
            ctx.ellipse(x, y, dotSize, dotSize, 0, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.fill()
        }

        for (const dot of dotPositions) {
            const {position} = dot
            const dotOffset = dotSize + dotSize
            const a = width - dotOffset
            const b = width + height - dotOffset
            const c = width + height + width - dotOffset
            if (position > c) {
                drawdot(dotSize, height - (position - c))
                continue
            }
            if (position > b) {
                drawdot(width - (position - b), height - dotSize)
                continue
            }
            if (position > a) {
                drawdot(width - dotSize, position - a + dotSize)
                continue
            }

            drawdot(position + dotSize, dotSize)
        }
    }
}

registerPaint('border-image-dots-paint', BorderImageDotsPaint)
