import './droplet.js'

class UIRain extends HTMLElement {
    /** @type {ShadowRoot} */
    root

    /** @type {CSSStyleSheet} */
    stylesheet

    /** @type {number} */
    startTime = performance.now()

    constructor() {
        super()
        this.root = this.attachShadow({mode: 'open'})

        /** @type {CSSStyleSheet} */
        this.stylesheet = new CSSStyleSheet()
        this.stylesheet.replaceSync(':host { --time: 0; }')
        this.root.adoptedStyleSheets.push(this.stylesheet)

        /** @type {HTMLTemplateElement} */
        const template = document.querySelector('#ui-rain-template')
        this.root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
        for (const _ of [...new Array(80)]) {
            this.append(document.createElement('ui-droplet'))
        }
        this.loop()
    }

    loop() {
        const progress = ((performance.now() - this.startTime) / 1000).toFixed(4)
        this.stylesheet.replaceSync(`:host { --time: ${progress}; }`)
        requestAnimationFrame(() => this.loop())
    }
}

customElements.define('ui-rain', UIRain)

// Append lorem ipsum
;(() => {
    const container = document.querySelector('.overflow-container-inner')
    /** @type {HTMLTemplateElement} */
    const template = document.querySelector('#template-lorem-ipsum')
    for (const _ of [...new Array(10)]) {
        container.append(template.content.cloneNode(true))
    }
})()
