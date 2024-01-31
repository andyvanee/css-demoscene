if (typeof registerPaint !== 'function') throw 'Not a Paint context'

if (registerPaint) {
    class StarfieldPaint {
        static get inputProperties() {
            return ['--starfieldProgress']
        }

        paint(ctx, geom, properties) {
            const progress = parseFloat(properties.get('--starfieldProgress'))
            ctx.beginPath()
            ctx.fillStyle = `rgba(${progress * 72}, ${progress * 127}, ${progress * 178})`
            ctx.rect(20, 20, geom.width, geom.height)
            ctx.fill()
        }
    }

    registerPaint('starfield-paint', StarfieldPaint)
}
