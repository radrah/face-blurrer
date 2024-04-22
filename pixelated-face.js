const video = document.querySelector('.webcam')
const canvas = document.querySelector('.video')
const ctx = canvas.getContext('2d')
ctx.strokeStyle = '#ffc600'
ctx.lineWidth = 2

const faceCanvas = document.querySelector('.face ')
const faceCtx = faceCanvas.getContext('2d')
const faceDectector = new FaceDetector();
const optionsInputs = document.querySelectorAll('.controls input[type="range"]')
console.log(optionsInputs);

const options = {
    SIZE: 10,
    SCALE: 1.25,
}

function handleOption(event) {
    const { value, name } = event.currentTarget;
    options[name] = parseFloat(value)
}
optionsInputs.forEach(input => input.addEventListener('input', handleOption))

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
    faceCtx.imageSmoothingEnabled = false
    faceCtx.clearRect(0,0, faceCanvas.width, faceCanvas.height)
    faceCtx.drawImage(
    // (5 args) arguments to start the blurring from
    video,
    face.x,
    face.y,
    face.width,
    face.height,

    // (4 args) args to fully blur the face
    face.x,
    face.y,
    options.SIZE,
    options.SIZE
    )

    const width = face.width * options.SCALE
    const height = face.height * options.SCALE
    faceCtx.drawImage(
        faceCanvas,
        face.x,
        face.y,
        options.SIZE,
        options.SIZE,
        face.x - (width - face.width) / 2,
        face.y - (height - face.height) / 2,
        width,
        height
    )
}

populateVideo().then(detect)