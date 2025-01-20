import { defineStore } from "pinia"
import { ref } from "vue"

export const usePositionStore = defineStore('position', () => {
    const position = ref<[number, number]>([0, 0])
    const positionToMove = ref<[number, number]>([0, 0])

    function set(newPosition: [number, number]) {
        position.value = newPosition
    }

    function move(newPosition: [number, number]) {
        positionToMove.value = newPosition
    }

    return {position, positionToMove, set, move}
})