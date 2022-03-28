import Coords from "./Coords";
import Point from "./Point";

/**
 * Velikost jednoho bloku (px)
 * @type {number}
 */
const blockSize = 25

/**
 * Velikost canvasu (px)
 * @type {number}
 */
const canvasSize = 600

/**
 * Za jak kolik ms se pohne had
 * @type {number}
 */
const originalRefreshTime = 300

//HTML ELEMENTS
const startBtn = document.querySelector('#startBtn')
const stopBtn = document.querySelector('#stopBtn')
const canvas = document.querySelector('#canvas')
const scoreboard = document.querySelector('#score')

const context = canvas.getContext('2d')

/**
 * Aktuální pozice
 * @type {Coords}
 */
let position = new Coords(canvasSize / 2, canvasSize / 2)

/**
 * Aktuální směr
 * @type {Coords}
 */
let direction = new Coords(0, 1)

/**
 * Aktuální score
 * @type {number}
 */
let score = 1

/**
 *Aktuální doba obnovení (ms)
 */
let refreshTime

/**
 * Pozice dílů hada
 * @type {Coords[]}
 */
let blockPositions = []

/**
 * Pozice bonusových bodů
 * @type {Point[]}
 */
let bonusPoints = []

/**
 * interval
 */
let interval

/**
 * Funkce, která se spustí při zapnutí nové hry
 * Vynuluje potřebné proměné
 */
function startGame() {
    startBtn.disabled = true
    refreshTime = originalRefreshTime
    interval = setInterval(round, refreshTime)
    position = new Coords(canvasSize / 2, canvasSize / 2)
    blockPositions = []
    bonusPoints = []
    generateNewPoint()
    score = 1
    scoreboard.innerHTML = score+""
}

function round() {
    cls()
    position.x += blockSize * direction.x
    position.y += blockSize * direction.y
    if(!isBonusPoint()) blockPositions.splice(0, 1)
    if(isOutOfCanvas(position) || containsPosition(position)) {
        stopGame()
        alert("Game over.")
    }
    blockPositions.push(new Coords(position.x, position.y))
    blockPositions.forEach((blockPosition) => drawPoint(blockPosition, 'green'))
    bonusPoints.forEach((bonusPoint) => drawPoint(bonusPoint.coords, bonusPoint.color))
}

/**
 * funkce, která se spustí při vypnutí hry
 */
function stopGame() {
    startBtn.disabled = false
    clearInterval(interval)
}

/**
 * Zjistí, zda pole pozic obsahuje pozici
 * @param p {Coords}
 * @returns {boolean}
 */
function containsPosition(p) {
    return blockPositions.some(coors => coors.x === p.x && coors.y === p.y)
}

function generateNewPoint() {
    const pos = canvasSize / blockSize
    const c = new Coords(Math.floor(Math.random() * pos) * blockSize, Math.floor(Math.random() * pos) * blockSize)
    if(containsPosition(c)) {
        generateNewPoint()
        return
    }
    bonusPoints.push(new Point(c, 'red', () => {
        generateNewPoint()
        if(refreshTime < 100) refreshTime /= 1.08
        else refreshTime /= 1.25
        clearInterval(interval)
        interval = setInterval(round, refreshTime)
    }))
}

/**
 * Zkontroluje, zda se na aktuální pozici nachází bonusový bod
 * Pokud ano, provede akci při sebrání bodu
 * @returns {boolean}
 */
function isBonusPoint() {
    const point = bonusPoints.find((bonusPoint) => bonusPoint.coords.x === position.x && bonusPoint.coords.y === position.y)
    if(point === undefined) return false
    bonusPoints = bonusPoints.filter((bonusPoint) => bonusPoint !== point)
    point.onAction()
    score++
    scoreboard.innerHTML = score+""

    return true
}

/**
 * Vykreslí bod
 * @param coords {Coords} souřadnice bodu
 * @param bg {string} barva pozadí
 * @param border {string} barva ohraničení
 */
function drawPoint(coords, bg, border= 'white') {
    context.fillStyle = bg
    context.strokeStyle = border;
    context.fillRect(coords.x, coords.y, blockSize, blockSize)
    context.strokeRect(coords.x, coords.y, blockSize, blockSize)
}

/**
 * Vyčistí plátno
 */
function cls() {
    context.fillStyle = 'white'
    context.clearRect(0, 0, canvasSize, canvasSize)
}

/**
 * Zjistí, zda se bod nachází mimo plátno
 * @param coords {Coords} souřadnice bodu
 */
function isOutOfCanvas(coords) {
    return position.x < 0 || position.x >= canvasSize || position.y < 0 || position.y >= canvasSize
}

startBtn.addEventListener('click', startGame)
stopBtn.addEventListener('click', stopGame)
window.addEventListener('keydown', (event) => {
    switch(true)  {
        case event.code === 'w' && direction.y === 0:
        case event.code === 'ArrowUp' && direction.y === 0:
            direction = new Coords(0, -1)
            break
        case event.code === 's' && direction.y === 0:
        case event.code === 'ArrowDown' && direction.y === 0:
            direction = new Coords(0, 1)
            break
        case event.code === 'a' && direction.x === 0:
        case event.code === 'ArrowLeft' && direction.x === 0:
            direction = new Coords(-1, 0)
            break
        case event.code === 'd' && direction.x === 0:
        case event.code === 'ArrowRight' && direction.x === 0:
            direction = new Coords(1, 0)
            break
    }
})