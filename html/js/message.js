export const messages = {}

window.addEventListener('message', ({data}) => messages[data.eventName]?.(data))