import hashPassword, { verifyPassword } from "@/lib/passwordManager";
import { router } from "@/router";
import type { IUser } from "@models/userModel";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    let user: IUser = JSON.parse(localStorage.getItem('user') || "{}")
    const backendUrl = "http://localhost:3000/users/"

    function get() {
        return user
    }

    function login(username: string, password: string) {
        return axios
            .get<IUser>(backendUrl + username.trim())
            .then(res => verifyPassword(password, res.data.password)
                    .then(match => {
                        if (!match) {
                            return Promise.reject('passwords don\'t match')
                        }
                        
                        user = res.data
                        localStorage.setItem('user', JSON.stringify(res.data))
                        router.push('/')
                        return user
                    })
            )
    }

    function logout() {
        user = JSON.parse("{}")
        localStorage.setItem('user', "{}")
        router.push("/signup")
    }

    async function register(values: any) {
        const hash: string = await hashPassword(values.password)
        return axios
            .post(backendUrl, {
                ...values,
                password: hash,
                reputation: 0,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => login(values.username, values.password))
    }

    function isLoggedIn(username: string): boolean {
        return user && username === user.username
    }

    return {login, logout, register, get, isLoggedIn}
})