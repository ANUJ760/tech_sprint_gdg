class KeystrokeCapture {
    constructor(input) {
        this.input = input
        this.events = []
        this.downMap = new Map()
        this.onDown = this.onDown.bind(this)
        this.onUp = this.onUp.bind(this)
    }

    start() {
        this.events = []
        this.downMap.clear()
        this.input.addEventListener("keydown", this.onDown)
        this.input.addEventListener("keyup", this.onUp)
    }

    stop() {
        this.input.removeEventListener("keydown", this.onDown)
        this.input.removeEventListener("keyup", this.onUp)
    }

    onDown(e) {
        if (e.repeat) return
        if (["Shift","Control","Alt","CapsLock","Tab","Meta"].includes(e.key)) return
        const t = performance.now()
        this.downMap.set(e.key, t)
        this.events.push({ key: e.key, type: "down", time: t })
    }

    onUp(e) {
        if (!this.downMap.has(e.key)) return
        const t = performance.now()
        this.events.push({ key: e.key, type: "up", time: t })
        this.downMap.delete(e.key)
    }

    getEvents() {
        return this.events
    }
}

export default KeystrokeCapture
