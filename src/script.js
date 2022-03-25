const blockSize = 25
const canvasSize= 600
let refreshTime = 300

const startBtn = document.querySelector('#startBtn')
const stopBtn = document.querySelector('#stopBtn')
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const scoreboard = document.querySelector('#score')

let interval
let blockPositions = []
let newPoint = []

startBtn.addEventListener('click', startGame)
stopBtn.addEventListener('click', stopGame)

let position = [canvasSize / 2, canvasSize / 2]
let direction = [0, 1]
let score = 1

function startGame() {
    refreshTime = 300
    interval = setInterval(round, refreshTime)
    generateNewPoint()
    score = 0
    scoreboard.innerHTML = score+""
}

function round() {
    cls()
    context.fillStyle = 'green'
    context.strokeStyle = 'white';
    position[0] += blockSize * direction[0]
    position[1] += blockSize * direction[1]
    if(!isBonusPoint()) blockPositions.splice(0, 1)
    if(position[0] < 0 || position[0] > canvasSize || position[1] < 0 || position[1] > canvasSize || containsPosition()) {
        stopGame()
        alert("Game over.")
    }
    blockPositions.push([position[0], position[1]])
    for (let blockPosition of blockPositions) {
        context.fillRect(blockPosition[0], blockPosition[1], blockSize, blockSize)
        context.strokeRect(blockPosition[0], blockPosition[1], blockSize, blockSize)
    }
    drawBonusPoint()
}

function stopGame() {
    position = [canvasSize / 2, canvasSize / 2]
    clearInterval(interval)
    blockPositions = []
    cls()

}

function cls() {
    context.fillStyle = 'white'
    context.clearRect(0, 0, canvasSize, canvasSize)
}

window.addEventListener('keydown', (event) => {
    if(event.code === 'ArrowUp' && direction[1] === 0) direction = [0, -1]
    else if(event.code === 'ArrowDown' && direction[1] === 0) direction = [0, 1]
    else if(event.code === 'ArrowLeft' && direction[0] === 0) direction = [-1, 0]
    else if(event.code === 'ArrowRight' && direction[0] === 0) direction = [1, 0]
})

function containsPosition() {
    for (let blockPosition of blockPositions) {
        if(blockPosition[0] === position[0] && blockPosition[1] === position[1]) return true
    }
    return false
}

function generateNewPoint() {
    const pos = canvasSize / blockSize
    const x = Math.floor(Math.random() * pos) * blockSize
    const y = Math.floor(Math.random() * pos) * blockSize
    newPoint = [x,y]
}

function drawBonusPoint() {
    context.fillStyle = 'red'
    context.fillRect(newPoint[0], newPoint[1], blockSize, blockSize)
}

function isBonusPoint() {
    if(position[0] === newPoint[0] && position[1] === newPoint[1]) {
        generateNewPoint()
        if(refreshTime < 100) refreshTime /= 1.08
        else refreshTime /= 1.25
        clearInterval(interval)
        interval = setInterval(round, refreshTime)
        score++
        scoreboard.innerHTML = score+""
        return true
    }
    return false
}