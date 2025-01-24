<script setup lang="ts">
import { useReportStore } from '@/stores/report.store';
import ReportCard from './ReportCard.vue';
import type { IReport } from '@models/reportModel';
import NavButton from './NavButton.vue';
import { ref, watch } from 'vue';

const reportStore = useReportStore()
const currentReport = ref<IReport | undefined>(reportStore.getCurrentReport())

watch(() => useReportStore().getCurrentReport(), (newReport: IReport | undefined) => {
    console.log('new report')
    if (newReport) {
        currentReport.value = newReport
    }
}, { deep: true })

const previousReportHandler = () => {
    if (!currentReport.value) return
    const previousReport = reportStore.getPreviousReport(currentReport.value)
    currentReport.value = previousReport
}

const nextReportHandler = () => {
    if (!currentReport.value) return
    const nextReport = reportStore.getNextReport(currentReport.value)
    currentReport.value = nextReport
}
</script>

<template>
    <!-- Carosel container -->
    <div v-if="currentReport" class="absolute bottom-2 w-screen min-h-64 z-10 flex flex-col justify-items-center flex-wrap">
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
    </div>
</template>