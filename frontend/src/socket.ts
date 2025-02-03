import { reactive } from "vue"
import io from "socket.io-client"

export const state = reactive<{
    connected: boolean,
}>({
    connected: false,
})

const URL: string = "http://localhost:3000/"
const socket = io(URL)

socket.on("connect", () => {
    state.connected = true
    console.log('connected', socket.id)
})

socket.on("disconnect", () => {
    state.connected = false
})