import { reactive } from "vue"
import io from "socket.io-client"
import { useAuthStore } from "./stores/auth.store"
import type { INotification } from "@models/notificationModel"
import axios from "axios"
import { SocketEvents } from "./socket"
export { SocketEvents } from '../../backend/src/lib/socket'

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

socket.on(SocketEvents.NOTIFY, (ids: string[], notifications: INotification[]) => {
    const authStore = useAuthStore()
    if (socket.id && ids.includes(socket.id)) {
        authStore.setNotifications(notifications)
    }
})