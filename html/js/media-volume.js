class MediaVolumeEvent extends Event {}

export class HTMLMediaVolumeElement extends HTMLElement {
    #value
    #muted
    constructor(value = 1, muted = false) {
        super()
        this.#value = value
        this.#muted = muted
    }
    #image
    #input
    #update() {
        this.#image.className = this.muted ? 'muted' : this.value > .5 ? 'high' : 'low'
        this.#input.value = this.muted ? 0 : this.value
    }
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(Object.assign(document.createElement('link'), {
            rel: 'stylesheet',
            href: 'css/media-volume.css'
        }))
        const container = document.createElement('div')
        const image = new Image
        const input = document.createElement('input')
        input.type = 'range'
        input.max = 1
        input.step = .01
        this.#image = container.appendChild(image)
        this.#input = container.appendChild(input)
        shadow.appendChild(container)
        this.#update()
        image.addEventListener('click', () => this.muted = !this.muted)
        input.addEventListener('input', () => this.value = input.value)
    }
    get value() {
        return this.#value
    }
    set value(value) {
        value = Math.min(Math.max(Number(value) || 0, 0), 1)
        if (this.value === value)
            return
        if (value === 0)
            return this.muted = true
        this.#value = value
        if (this.muted)
            this.muted = false
        else
            this.#update()
        this.dispatchEvent(new MediaVolumeEvent('input'))

    }
    get muted() {
        return this.#muted
    }
    set muted(muted) {
        if (this.muted === Boolean(muted))
            return
        this.#muted = muted = !this.#muted
        this.#update()
        this.dispatchEvent(new MediaVolumeEvent('muted'))
    }
}

customElements.define('media-volume', HTMLMediaVolumeElement)