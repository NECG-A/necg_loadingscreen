import {keydown} from './keydown.js'

const video = document.querySelector('video')

const volume = document.querySelector('media-volume')

video.volume = volume.value = localStorage.getItem('volume') ?? 1
video.muted = volume.muted = localStorage.getItem('muted') === 'true'

volume.addEventListener('muted', () => localStorage.setItem('muted', video.muted = volume.muted))
volume.addEventListener('input', () => localStorage.setItem('volume', video.volume = volume.value)) 

keydown.m = () => volume.muted = !volume.muted