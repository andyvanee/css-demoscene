if (typeof registerPaint !== 'function') throw 'Not a Paint context'

if (registerPaint) {
    class StarfieldPaint {
        static get inputProperties() {
            return ['--starfieldProgress']
        }

        paint(ctx, geom, properties) {
            const progress = parseFloat(properties.get('--starfieldProgress'))
            ctx.beginPath()
            ctx.fillStyle = `lab(${progress * 56.05} ${progress * -19.27} ${progress * -43.69} / 1)`
            ctx.rect(20, 20, geom.width, geom.height)
            ctx.fill()
        }
    }

    registerPaint('starfield-paint', StarfieldPaint)
}
