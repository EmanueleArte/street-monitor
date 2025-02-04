import { reactive } from "vue"
import io from "socket.io-client"
import { useAuthStore } from "./stores/auth.store"
import type { INotification } from "@models/notificationModel"

export const state = reactive<{
    connected: boolean,
}>({
    connected: false,
})

const URL: string = "http://localhost:3000/"
export const socket = io(URL)

socket.on("connect", () => {
    state.connected = true
    console.log('connected', socket.id)
})

socket.on("disconnect", () => {
    state.connected = false
})

socket.on('notify', (ids: string[], notification: INotification) => {
    console.log('notify event', socket.id)
    if (socket.id && ids.includes(socket.id)) {
        console.log('new notification for me :)', notification)
        useAuthStore().get().notifications?.push(notification)
    }
})