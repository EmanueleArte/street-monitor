import { defineStore } from "pinia"
import type { IUser } from "@models/userModel"
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
    const user = ref<IUser>()

    function set(newUser: IUser) {
        user.value = newUser
    }

    return {user, set}
})