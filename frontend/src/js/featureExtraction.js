export function extractTimingData(events) {
    const downs = []
    const ups = []

    events.forEach(e => {
        if (e.type === "down") downs.push(e)
        else ups.push(e)
    })

    const hold = []
    const pressPress = []
    const releasePress = []

    for (let i = 0; i < downs.length; i++) {
        const up = ups.find(u => u.key === downs[i].key && u.time >= downs[i].time)
        if (up) hold.push(up.time - downs[i].time)
    }

    for (let i = 0; i < downs.length - 1; i++) {
        pressPress.push(downs[i + 1].time - downs[i].time)
        const up = ups.find(u => u.key === downs[i].key)
        if (up) releasePress.push(downs[i + 1].time - up.time)
    }

    return [
        ...hold,
        ...pressPress,
        ...releasePress
    ]
}
