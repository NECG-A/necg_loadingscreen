export const keydown = {}

document.addEventListener('keydown', ({key}) => keydown[key]?.())