<script setup lang="ts">
import { useReportStore } from '@/stores/report.store';
import ReportCard from './ReportCard.vue';
import type { IReport } from '@models/reportModel';
import { ref, watch } from 'vue'

const reportStore = useReportStore()
const currentReport = ref<IReport | undefined>(reportStore.getCurrentReport())
const previousReport = ref<IReport | undefined>()
const nextReport = ref<IReport | undefined>()

if (currentReport.value) previousReport.value = reportStore.getPreviousReport(currentReport.value)
if (currentReport.value) nextReport.value = reportStore.getNextReport(currentReport.value)

watch(() => reportStore.getCurrentReport(), (newReport: IReport | undefined) => {
    console.log('new report')
    if (newReport) {
        updateCarosel(newReport)
    }
}, { deep: true })

watch(() => reportStore.getReports(), (newReports: IReport[], oldReports: IReport[]) => {
    if (JSON.stringify(newReports) === JSON.stringify(oldReports)) return
    console.log('reports change')

    const _currentReport: IReport | undefined = reportStore.getCurrentReport()
    if (_currentReport) {

        if (_currentReport !== currentReport.value) {
            currentReport.value = undefined
        } else {
            updateCarosel(_currentReport)
        }
    }
})

const previousReportHandler = () => {
    if (!previousReport.value) return
    reportStore.setCurrentReport(previousReport.value)
}

const nextReportHandler = () => {
    if (!nextReport.value) return
    reportStore.setCurrentReport(nextReport.value)
}

const updateCarosel = (report: IReport) => {
    currentReport.value = report
    previousReport.value = reportStore.getPreviousReport(report)
    nextReport.value = reportStore.getNextReport(report)
}
</script>

<template>
    <!-- Carosel container -->
    <!-- <div v-if="currentReport" class="absolute bottom-2 w-96 min-h-64 z-10 flex flex-col justify-items-center flex-wrap">
        <div class="flex justify-between">
            <NavButton screen-reader-label="previous report" @click="previousReportHandler">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-12">
                    <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                </svg>
            </NavButton>
            <NavButton screen-reader-label="previous report" @click="nextReportHandler">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-12">
                    <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </NavButton>
        </div>
        <ReportCard :report="currentReport" />
    </div> -->
    <section
        v-if="currentReport"
        class="z-10 absolute bottom-2 left-0 flex w-full content-center justify-center overflow-x-hidden md:w-lg md:gap-1 md:rounded-none md:border-0">
        <!-- <article class="h-60 w-lg shrink-0 scale-90 rounded-md bg-red-300 text-center shadow-sm md:hidden">Previous card</article>

        <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-10">
            <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
            </svg>
        </button> -->

        <!-- <article class="h-60 w-md shrink-0 rounded-md bg-red-300 text-center shadow-sm">Main card</article> -->
        <ReportCard
            v-if="previousReport"
            :report="previousReport"
            @click="previousReportHandler"
            class="scale-95 shrink-0" />

        <ReportCard :report="currentReport" class="shrink-0 basis-4/5" />

        <ReportCard
            v-if="nextReport"
            :report="nextReport"
            @click="nextReportHandler"
            class="scale-95 shrink-0" />


        <!-- <article class="h-60 w-96 shrink-0 scale-90 rounded-md bg-red-300 text-center shadow-sm md:hidden">Next card</article>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-10">
            <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
        </button> -->

    </section>

</template>