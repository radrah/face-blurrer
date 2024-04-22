// The face detection does not work on all browsers and operating systems.
// If you are getting a `Face detection service unavailable` error or similar,
// it's possible that it won't work for you at the moment.

const video = document.querySelector('.webcam')
const canvas = document.querySelector('.video')
const ctx = canvas.getContext('2d')
ctx.strokeStyle = '#ffc600'
ctx.lineWidth = 2

const faceCanvas = document.querySelector('.face ')
const faceCtx = canvas.getContext('2d')
const faceDectector = new FaceDetector();

// Write a function to populate users video

async function populateVideo(){
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },

});

    video.srcObject = stream
    await video.play()

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    faceCanvas.width = video.videoWidth
    faceCanvas.height = video.videoHeight
}

async function detect(){
    const faces = await faceDectector.detect(video)
    // console.log(faces.length);
    faces.forEach(drawFace)
    faces.forEach(censor)
    requestAnimationFrame(detect)
}

function drawFace(face) {
    const { width, height, top, left } = face.boundingBox
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeRect(left, top, width, height)
}

function censor({boundingBox: face}){
    console.log(face);
}

populateVideo().then(detect)