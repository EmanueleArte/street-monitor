import { reactive } from "vue"
import io from "socket.io-client"
import { useAuthStore } from "./stores/auth.store"
import type { INotification } from "@models/notificationModel"
import axios from "axios"


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

socket.on('notify', (ids: string[]) => {
    const authStore = useAuthStore()
    if (socket.id && ids.includes(socket.id)) {
        console.log('new notification for me :)')
        // update notifications array inside user
        axios.get<INotification[]>(`http://localhost:3000/users/${authStore.get().username}/notifications`)
            .then(res => {
                authStore.setNotifications(res.data)
                console.log('update notifications array from socket.ts')
            })

        // useAuthStore().get().notifications?.push(notification)
    }
})