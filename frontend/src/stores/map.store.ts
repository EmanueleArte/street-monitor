import { defineStore } from "pinia"
import { ref } from "vue"
import { LMap } from "@vue-leaflet/vue-leaflet"

export const useMapStore = defineStore('map', () => {
    const maps = ref<typeof LMap[]>([])
    const centers = ref<[number, number][]>([])
    const length = ref<number>(0)

    function set(map: typeof LMap, center: [number, number]) {
        length.value = maps.value.push(map)
        centers.value.push(center)
    }

    function get() {
        return {
            "map": maps.value[length.value - 1],
            "center": centers.value[length.value - 1]
        }
    }

    function remove() {
        length.value--
        centers.value.pop()
        return maps.value.pop()
    }

    return {get, set, remove}
})