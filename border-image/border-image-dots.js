CSS.paintWorklet.addModule('./border-image-dots.paint.js')

class BorderImageDots extends HTMLElement {
    /** @type {ShadowRoot} */
    root

    constructor() {
        super()
        this.root = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        /** @type {HTMLTemplateElement} */
        const template = document.querySelector('#template-border-image-dots')
        this.root.append(template.content.cloneNode(true))
    }
}

customElements.define('border-image-dots', BorderImageDots)
