// The face detection does not work on all browsers and operating systems.
// If you are getting a `Face detection service unavailable` error or similar,
// it's possible that it won't work for you at the moment.

const video = document.querySelector('.webcam')


const canvas = document.querySelector('.video')
const ctx = canvas.getContext('2d')

const faceCanvas = document.querySelector('.face ')
const faceCtx = canvas.getContext('2d')