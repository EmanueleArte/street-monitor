<script setup lang="ts">
import { useReportStore } from '@/stores/report.store';
import ReportCard from './ReportCard.vue';
import type { IReport } from '@models/reportModel';
import { ref, watch } from 'vue'
import NavButton from './NavButton.vue';

const reportStore = useReportStore()
const currentReport = ref<IReport | undefined>(reportStore.getReport())
const previousReport = ref<IReport | undefined>()
const nextReport = ref<IReport | undefined>()

if (currentReport.value) previousReport.value = reportStore.getPreviousReport(currentReport.value)
if (currentReport.value) nextReport.value = reportStore.getNextReport(currentReport.value)

watch(() => reportStore.getReport(), (newReport: IReport | undefined) => {
    currentReport.value = newReport
    if (newReport) {
        updateCarosel(newReport)
    }
}, { deep: true })

watch(() => reportStore.getReports(), (newReports: IReport[], oldReports: IReport[]) => {
    if (JSON.stringify(newReports) === JSON.stringify(oldReports)) return
    
    const _currentReport: IReport | undefined = reportStore.getReport()
    if (_currentReport) {
        if (
            _currentReport !== currentReport.value ||
            !newReports.map(report => JSON.stringify(report)).includes(JSON.stringify(_currentReport)) // perform "includes" operation on array of objects
        ) {
            currentReport.value = undefined
        } else {
            updateCarosel(_currentReport)
        }
    }
})

const previousReportHandler = () => {
    console.log(previousReport.value)
    if (!previousReport.value) {
        currentReport.value = undefined
        return
    }
    reportStore.setReport(previousReport.value)
}

const nextReportHandler = () => {
    if (!nextReport.value) {
        currentReport.value = undefined
        return
    }
    reportStore.setReport(nextReport.value)
}

const updateCarosel = (report: IReport) => {
    currentReport.value = report
    previousReport.value = reportStore.getPreviousReport(report)
    nextReport.value = reportStore.getNextReport(report)
}
</script>

<template>
    <section
        v-if="currentReport"
        class="z-10 absolute bottom-2 left-0 flex w-full md:content-center justify-center md:justify-start overflow-x-hidden md:w-96 md:gap-1 md:rounded-none md:border-0 md:left-1/4">
        
        <ReportCard
            v-if="previousReport"
            :report="previousReport"
            :previousOrNext="true"
            @click="previousReportHandler"
            class="scale-95 shrink-0 md:hidden" />

        <ReportCard :report="currentReport" class="shrink-0 basis-4/5 md:basis-auto md:w-4/5" />

        <ReportCard
            v-if="nextReport"
            :report="nextReport"
            :previousOrNext="true"
            @click="nextReportHandler"
            class="scale-95 shrink-0 md:hidden" />

        <div class="flex-col justify-center gap-y-2 hidden md:flex">
            <NavButton screen-reader-label="previous report" @click="previousReportHandler">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-7 m-auto">
                    <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                </svg>
            </NavButton>
            
            <NavButton screen-reader-label="next report" @click="nextReportHandler">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-7 m-auto">
                    <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </NavButton>
        </div>
        
    </section>

</template>