<script setup lang="ts">
import type { IReport } from "@models/reportModel.ts"
import axios from "axios"
import { onMounted, ref, watch } from "vue"
import ReportCard from "./ReportCard.vue"
import { TabPanel } from "@headlessui/vue"
import Tabs from "@/components/utils/Tabs.vue"
import { ReportStatus } from "@/lib/vars.ts"
import { useAuthStore } from "@/stores/auth.store.ts"
import { useReportStore } from "@/stores/report.store.ts"

const myOpenReports = ref<IReport[]>([])
const mySolvingReports = ref<IReport[]>([])
const myClosedReports = ref<IReport[]>([])
const status = ref<string>("open")
const reportStore = useReportStore()

const listMyReports = async () => {
  myOpenReports.value = []
  mySolvingReports.value = []
  myClosedReports.value = []

  axios.get<IReport[]>("http://localhost:3000/reports/by-user/" + useAuthStore().get().username)
    .then(res => res.data.forEach(report => {
      switch (report.status) {
        case ReportStatus.OPEN: {
          myOpenReports.value.push(report)
          break
        }
        case ReportStatus.SOLVING: {
          mySolvingReports.value.push(report)
          break
        }
        case ReportStatus.CLOSED: {
          myClosedReports.value.push(report)
          break
        }
      }
    }))
    .then(res => {
      myOpenReports.value.sort((a, b) => new Date(b.open_datetime).getTime() - new Date(a.open_datetime).getTime())
      mySolvingReports.value.sort((a, b) => new Date(b.open_datetime).getTime() - new Date(a.open_datetime).getTime())
      myClosedReports.value.sort((a, b) => new Date(b.open_datetime).getTime() - new Date(a.open_datetime).getTime())
    })
}

watch<[IReport, string] | undefined>(() => reportStore.getReportBuffer(), (report: [IReport, string] | undefined) => {
  if (report) {
    switch(report[1]){
      case ReportStatus.OPEN:{
        myOpenReports.value.push(report[0])
        myOpenReports.value.sort((a, b) => new Date(b.open_datetime).getTime() - new Date(a.open_datetime).getTime())
        break
      }
      case ReportStatus.SOLVING: {
        mySolvingReports.value.push(report[0])
        mySolvingReports.value.sort((a, b) => new Date(b.open_datetime).getTime() - new Date(a.open_datetime).getTime())
        myOpenReports.value = myOpenReports.value.filter(r => r._id != report[0]._id)
        break
      }
      case ReportStatus.CLOSED: {
        myClosedReports.value.push(report[0])
        myClosedReports.value.sort((a, b) => new Date(b.open_datetime).getTime() - new Date(a.open_datetime).getTime())
        mySolvingReports.value = mySolvingReports.value.filter(r => r._id != report[0]._id)
        break
      }
    }
    reportStore.emptyReportBuffer()
  }
})

const toggleTabList = (s: string) => {
  status.value = s
}

onMounted(listMyReports)
</script>

<template>
  <div class="p-4 pb-0 md:p-0 h-full">
    <h2 class="text-2xl md:text-base after:content-[':'] md:after:content-['']">My reports</h2>
    <Tabs :tabs="ReportStatus" :toggleTabList="toggleTabList" :topDivClasses="`h-full !px-0`"
      :tabPanelsClasses="`h-full px-1`">
      <TabPanel class="overflow-y-auto max-h-[calc(100%-5.25rem)] md:max-h-full mt-1 px-1">
        <ol>
          <ReportCard v-for="report in myOpenReports" :report="report" />
        </ol>
        <p v-if="myOpenReports.length == 0" class="text-center w-full mt-10">You don't have open reports.</p>
      </TabPanel>
      <TabPanel class="overflow-y-auto max-h-[calc(100%-5.25rem)] md:max-h-full mt-1 px-1">
        <ol>
          <ReportCard v-for="report in mySolvingReports" :report="report" />
        </ol>
        <p v-if="mySolvingReports.length == 0" class="text-center w-full mt-10">You don't have solving reports.</p>
      </TabPanel>
      <TabPanel class="overflow-y-auto max-h-[calc(100%-5.25rem)] md:max-h-full mt-1 px-1">
        <ol>
          <ReportCard v-for="report in myClosedReports" :report="report" />
        </ol>
        <p v-if="myClosedReports.length == 0" class="text-center w-full mt-10">You don't have closed reports.</p>
      </TabPanel>
    </Tabs>
  </div>
</template>
