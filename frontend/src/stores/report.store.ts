import type { IReport } from "@models/reportModel";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useReportStore = defineStore('report', () => {
    const _currentReport = ref<IReport>()
    const _reports = ref<IReport[]>([])

    function getCurrentReport(): IReport | undefined {
        return _currentReport.value
    }

    function setCurrentReport(report: IReport | undefined) {
        _currentReport.value = report
    }

    function getReports(): IReport[] {
        return _reports.value
    }

    function setReports(reports: IReport[]) {
        _reports.value = reports
    }

    function getPreviousReport(report: IReport): IReport | undefined {
        if (!_reports.value) return undefined
        const reportIndex: number = _reports.value.map(r => JSON.stringify(r)).indexOf(JSON.stringify(report))
        const previousIndex: number = reportIndex - 1 >= 0 ? reportIndex - 1 : _reports.value.length - 1
        // console.log(_reports.value.map(r => JSON.stringify(r)), JSON.stringify(report))
        // console.log(reportIndex, previousIndex)
        if (reportIndex == -1 || previousIndex == reportIndex) return undefined
        return _reports.value[previousIndex]
    }

    function getNextReport(report: IReport): IReport | undefined {
        if (!_reports.value) return undefined
        const reportIndex: number = _reports.value.map(r => JSON.stringify(r)).indexOf(JSON.stringify(report))
        const nextIndex: number = (reportIndex + 1) % _reports.value.length
        // console.log(reportIndex, nextIndex)
        if (reportIndex == -1 || nextIndex == reportIndex) return undefined
        return _reports.value[nextIndex]
    }

    return {getCurrentReport, setCurrentReport, getReports, setReports, getPreviousReport, getNextReport}
})