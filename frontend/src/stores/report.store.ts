import type { IReport } from "@models/reportModel"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useReportStore = defineStore("report", () => {
    const _currentReport = ref<IReport>()
    const _reports = ref<IReport[]>([])
    const _reportBuffer = ref<[IReport, string] | undefined>(undefined)

    function getReport(): IReport | undefined {
        return _currentReport.value
    }

    function setReport(report: IReport | undefined): void {
        _currentReport.value = report
    }

    function getReports(): IReport[] {
        return _reports.value
    }

    function setReports(reports: IReport[]): void {
        _reports.value = reports
    }

    function getPreviousReport(report: IReport): IReport | undefined {
        if (!_reports.value) return undefined
        const reportIndex: number = getIndexOfReport(report)
        const previousIndex: number = reportIndex - 1 >= 0 ? reportIndex - 1 : _reports.value.length - 1
        if (reportIndex == -1 || previousIndex == reportIndex) return undefined
        return _reports.value[previousIndex]
    }

    function getNextReport(report: IReport): IReport | undefined {
        if (!_reports.value) return undefined
        const reportIndex: number = getIndexOfReport(report)
        const nextIndex: number = (reportIndex + 1) % _reports.value.length
        if (reportIndex == -1 || nextIndex == reportIndex) return undefined
        return _reports.value[nextIndex]
    }

    function getIndexOfReport(report: IReport): number {
        return _reports.value.map(r => JSON.stringify(r)).indexOf(JSON.stringify(report))
    }
    
    function getReportBuffer(): [IReport, string] | undefined {
        return _reportBuffer.value
    }

    function setReportBuffer(report: [IReport, string]): void {
        _reportBuffer.value = report
    }

    function emptyReportBuffer(): void {
        _reportBuffer.value = undefined
    }

    return { getReport, setReport, getReports, setReports, getPreviousReport, getNextReport, getReportBuffer, setReportBuffer, emptyReportBuffer }
})