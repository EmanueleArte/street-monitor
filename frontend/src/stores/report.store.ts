import type { IReport } from "@models/reportModel";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useReportStore = defineStore('report', () => {
    const currentReport = ref<IReport>()
    const _reports = ref<IReport[]>()

    function getCurrentReport() {
        return currentReport.value
    }

    function setCurrentReport(report: IReport) {
        currentReport.value = report
    }

    function getReports() {
        return _reports.value
    }

    function setReports(reports: IReport[]) {
        _reports.value = reports
    }

    function getPreviousReport(report: IReport) {
        if (!_reports.value) return undefined
        const previousIndex: number = _reports.value.indexOf(report) - 1
        return previousIndex < 0 ? _reports.value[_reports.value.length - 1] : _reports.value[previousIndex]
    }

    function getNextReport(report: IReport) {
        if (!_reports.value) return undefined
        const nextIndex: number = _reports.value.indexOf(report) + 1
        return _reports.value[nextIndex % _reports.value.length]
    }

    return {getCurrentReport, setCurrentReport, getReports, setReports, getPreviousReport, getNextReport}
})