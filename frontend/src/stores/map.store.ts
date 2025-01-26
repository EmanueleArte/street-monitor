import { defineStore } from "pinia"
import { ref } from "vue"
import type { IReport } from "@models/reportModel.ts"

export const useMapStore = defineStore('map', () => {
    const reports = ref<IReport[]>([])

    function setReports(data: IReport[]) {
        reports.value = data
    }

    return {reports, setReports}
})