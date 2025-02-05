import { defineStore } from "pinia"
import { ref } from "vue"
import type { IReport } from "@models/reportModel.ts"
import { ReportStatus } from "@/lib/vars.ts"

export const useMapStore = defineStore("map", () => {
    const reports = ref<IReport[]>([])
    const filteredReports = ref<IReport[]>([])
    const currentFilter = ref<Record<string, boolean | string>>({})

    function setReports(data: IReport[]): void {
        reports.value = data
        filterReports(currentFilter.value)
    }

    function filterReports(filter: Record<string, boolean | string>): void {
        Object.keys(filter).forEach(key => {
            if (!filter[key]) {
                delete currentFilter.value[key]
            } else {
                currentFilter.value[key] = filter[key]
            }
        })
        const statusKeys = Object.keys(currentFilter.value).filter(key => Object.values(ReportStatus).includes(key as ReportStatus))
        const typeKeys = Object.keys(currentFilter.value).filter(key => !Object.values(ReportStatus).includes(key as ReportStatus))
        const filteredStatus = reports.value.filter(report => statusKeys.includes(report.status))
        filteredReports.value = typeKeys.length ? filteredStatus.filter(report => typeKeys.includes(report.type)) : filteredStatus
    }

    return { reports, filteredReports, setReports, filterReports }
})