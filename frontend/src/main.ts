import { createApp } from "vue"
import App from "@/App.vue"
import { router } from "@/router"
import { createPinia } from "pinia"
import Camera from "simple-vue-camera"

createApp(App)
    .use(router)
    .use(createPinia())
    .component("camera", Camera)
    .mount("#app")
