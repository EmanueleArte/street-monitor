import { defineStore } from "pinia"
import { ref } from "vue"

export const usePositionStore = defineStore('position', () => {
    const position = ref<[number, number]>([0, 0])

    function set(newPosition: [number, number]) {
        position.value = newPosition
    }

    return {position, set}
})