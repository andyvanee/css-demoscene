CSS.paintWorklet.addModule('./border-image-dashed.paint.js')

class BorderImageDashed extends HTMLElement {
    /** @type {ShadowRoot} */
    root

    constructor() {
        super()
        this.root = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        /** @type {HTMLTemplateElement} */
        const template = document.querySelector('#template-border-image-dashed')
        this.root.append(template.content.cloneNode(true))
    }
}

customElements.define('border-image-dashed', BorderImageDashed)
