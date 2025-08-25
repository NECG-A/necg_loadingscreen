import {messages} from './message.js'

const progress = document.querySelector('progress')

messages.loadProgress = ({loadFraction}) => progress.value = loadFraction