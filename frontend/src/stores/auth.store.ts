import hashPassword, { verifyPassword } from "@/lib/passwordManager";
import { router } from "@/router";
import type { IUser } from "@models/userModel";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser>()
    const backendUrl = "http://localhost:3000/users/"

    function get() {
        return user.value
    }

    function login(username: string, password: string) {
        console.log('login')
        return axios
            .get<IUser>(backendUrl + username.trim())
            .then(res => verifyPassword(password, res.data.password)
                    .then(match => {
                        if (!match) {
                            return Promise.reject('passwords don\'t match')
                        }
                        
                        user.value = res.data
                        localStorage.setItem('user', JSON.stringify(res.data))
                        router.push('/')
                        return user.value
                    })
            )
    }

    function logout() {
        user.value = undefined
        router.push("/signup")
    }

    async function register(values: any) {
        const hash: string = await hashPassword(values.password)
        return axios
            .post(backendUrl, {
                ...values,
                password: hash,
                reputation: 0
            })
            .then(() => login(values.username, values.password))
    }

    return {login, logout, register, get}
})