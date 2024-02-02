CSS.paintWorklet.addModule('./droplet.paint.js')

class UIDroplet extends HTMLElement {
    /** @type {ShadowRoot} */
    root

    /** @type {CSSStyleSheet} */
    stylesheet

    startOffset = Math.random()

    constructor() {
        super()
        this.root = this.attachShadow({mode: 'open'})

        /** @type {CSSStyleSheet} */
        this.stylesheet = new CSSStyleSheet()
        this.stylesheet.replaceSync(':host { --time: 0; --start-offset: 0; --droplet-speed: 1000; }')
        this.root.adoptedStyleSheets.push(this.stylesheet)

        /** @type {HTMLTemplateElement} */
        const template = document.querySelector('#ui-droplet-template')
        this.root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
        const {width} = this.parentElement.getBoundingClientRect()
        const randomX = Math.random() * width
        const randomizeSpeed = Math.floor(Math.random() * 1500 + 500)
        this.stylesheet.replace(
            `:host { left: ${randomX}px; --start-offset: ${this.startOffset}; --droplet-speed: ${randomizeSpeed}; }`
        )
    }
}

customElements.define('ui-droplet', UIDroplet)
