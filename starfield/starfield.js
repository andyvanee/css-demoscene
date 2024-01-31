CSS.paintWorklet.addModule('./starfield.paint.js')

class StarfieldInner extends HTMLElement {
    /** @type {ShadowRoot} */
    root = null

    constructor() {
        super()
        this.root = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        /** @type {HTMLElement} */
        const parent = this.parentElement

        /** @type {HTMLTemplateElement} */
        const template = document.querySelector('#template-starfield-inner')

        this.root.append(template.content.cloneNode(true))
        this.appendLoremIpsum()
        this.configureScrollTimeline()
    }

    appendLoremIpsum() {
        /** @type {HTMLTemplateElement} */
        const lorem = document.querySelector('#template-lorem-ipsum')

        for (const _ of new Array(2)) this.root.append(lorem.content.cloneNode(true))
    }

    configureScrollTimeline() {
        const timeline = new ScrollTimeline({
            source: document.querySelector('main'),
            axis: 'block',
        })

        // 1000 values 0.0 - 1.0
        const starfieldProgressValues = [...new Array(1000)].map((_, i) => i / 1000)

        this.animate({'--starfieldProgress': starfieldProgressValues}, {timeline})
    }
}

customElements.define('starfield-inner', StarfieldInner)
