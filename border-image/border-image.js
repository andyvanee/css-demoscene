import './border-image-dashed.js'
import './border-image-dots.js'

class BorderImageDemo extends HTMLElement {
    /** @type {ShadowRoot} */
    root

    /** @type {CSSStyleSheet} */
    stylesheet

    constructor() {
        super()
        this.root = this.attachShadow({mode: 'open'})
        this.stylesheet = new CSSStyleSheet()
        this.stylesheet.replaceSync(':host { --progress: 0; }')
        this.root.adoptedStyleSheets.push(this.stylesheet)
    }

    connectedCallback() {
        /** @type {HTMLTemplateElement} */
        const template = document.querySelector('#template-border-image-demo')
        this.root.append(template.content.cloneNode(true))

        /** @type {HTMLTemplateElement} */
        const lorem = document.querySelector('#template-lorem-ipsum')

        /** @type {HTMLTemplateElement} */
        const inner = document.querySelector('#template-border-image-inner')

        for (const _ of [...new Array(4)]) {
            this.append(inner.content.cloneNode(true))
            this.append(lorem.content.cloneNode(true))
        }

        document.querySelector('main').addEventListener('scroll', () => {
            const {top, height} = this.getBoundingClientRect()
            const end = Math.abs(height - window.innerHeight)
            const progress = ((0 - top) / end).toFixed(4)
            this.stylesheet.replaceSync(`:host { --progress: ${progress}; }`)
        })
    }
}

customElements.define('border-image-demo', BorderImageDemo)
