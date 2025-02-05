import { defineStore } from "pinia"
import { ref } from "vue"

export const usePositionStore = defineStore("position", () => {
    const position = ref<[number, number]>([0, 0])
    const positionToMove = ref<[number, number]>([0, 0])
    const flyMainMap = ref<boolean>(false)

    function set(newPosition: [number, number]): void {
        position.value = newPosition
    }

    function move(newPosition: [number, number]): void {
        positionToMove.value = newPosition
    }

    function setFlyMainMap(fly: boolean): void {
        flyMainMap.value = fly
    }

    return {position, positionToMove, flyMainMap, set, move, setFlyMainMap}
})