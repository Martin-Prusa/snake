export default class Point {

    coords
    color
    onAction

    /**
     *
     * @param coords {Coords}
     * @param color {string}
     * @param onAction {function}
     */
    constructor(coords,color , onAction) {
        this.coords = coords
        this.color = color
        this.onAction = onAction
    }
}