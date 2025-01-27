import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { IReport } from "@models/reportModel.ts"
import { ReportStatus } from "@/lib/vars.ts"

export const useMapStore = defineStore('map', () => {
    const reports = ref<IReport[]>([])
    const filteredReports = ref<IReport[]>([])
    const currentFilter = ref<Record<string, boolean | string>>({})

    function setReports(data: IReport[]) {
        reports.value = data
        filterReports(currentFilter.value)
    }

    function filterReports(filter: Record<string, boolean | string>) {
        for (let key in filter) {
            if (!filter[key]) {
                delete currentFilter.value[key]
            } else {
                currentFilter.value[key] = filter[key]
            }
        }
        let filteredStatus: IReport[] = []
        let filteredType: IReport[] = []
        for (let key in currentFilter.value) {
            if (Object.values(ReportStatus).includes(key as ReportStatus)) {
                filteredStatus = filteredStatus.concat(filterByStatus(reports.value, key))
            } else {
                filteredType = filteredType.concat(filterByType(filteredStatus, key))
            }
        }
        filteredReports.value = filteredType.length > 0 ? filteredType : filteredStatus
    }

    function filterByStatus(reportList: IReport[], status: string): IReport[] {
        return reportList.filter((report) => report.status === status)
    }

    function filterByType(reportList: IReport[], type: string): IReport[] {
        return reportList.filter((report) => report.type.name === type)
    }

    return { reports, filteredReports, setReports, filterReports }
})