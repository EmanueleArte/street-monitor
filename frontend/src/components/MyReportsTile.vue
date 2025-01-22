<script setup lang="ts">
import type { IReport } from "@models/reportModel";
import axios from "axios";
import { onMounted, ref } from "vue"
import ReportCard from "./ReportCard.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

const myOpenReports = ref<IReport[]>([])
const mySolvingReports = ref<IReport[]>([])
const myClosedReports = ref<IReport[]>([])
const status = ref<string>("open")

const listMyReports = async () => {
  myOpenReports.value = []
  mySolvingReports.value = []
  myClosedReports.value = []
  try {
    const data = (await axios.get("http://localhost:3000/reports/by-user/mariorossi")).data //TODO cambiare user (mariorossi) con user corrente loggato
    for (const report of data) {
      switch (report.status) {
        case "open":
          myOpenReports.value.push(report)
          break
        case "solving":
          mySolvingReports.value.push(report)
          break
        case "closed":
          myClosedReports.value.push(report)
          break
      }
    }
    myOpenReports.value.sort((a, b) => new Date(a.open_datetime).getTime() - new Date(b.open_datetime).getTime())
    mySolvingReports.value.sort((a, b) => new Date(a.open_datetime).getTime() - new Date(b.open_datetime).getTime())
    myClosedReports.value.sort((a, b) => new Date(a.open_datetime).getTime() - new Date(b.open_datetime).getTime())
  } catch (e) {
    console.error(e)
  }
}

const toggleTabList = (s: string) => {
  status.value = s
}

onMounted(listMyReports)
</script>

<template>
  <h1 class="text-xl mb-1">My reports:</h1>
  <TabGroup>
    <TabList class="w-full flex justify-around">
      <Tab :class="{ 'bg-primary-accent text-light': status=='open', 'border-2 border-primary-accent': status!='open' }" class="rounded-s-2xl w-full p-1"
          @click="toggleTabList('open')">Open</Tab>
      <Tab :class="{ 'bg-primary-accent text-light': status=='solving', 'border-2 border-primary-accent': status!='solving' }" class="w-full p-1"
          @click="toggleTabList('solving')">Solving</Tab>
      <Tab :class="{ 'bg-primary-accent text-light': status=='closed', 'border-2 border-primary-accent': status!='closed' }" class="rounded-e-2xl w-full p-1"
          @click="toggleTabList('closed')">Closed</Tab>
    </TabList>
    <TabPanels class="h-[100%]">
      <TabPanel class="overflow-y-auto max-h-[calc(100%-4.25rem)] mt-1">
        <ReportCard v-for="report in myOpenReports" :report="report" @updateTiles="listMyReports()" />
      </TabPanel>
      <TabPanel class="overflow-y-auto max-h-[calc(100%-4.25rem)] mt-1">
        <ReportCard v-for="report in mySolvingReports" :report="report" @updateTiles="listMyReports()" />
      </TabPanel>
      <TabPanel class="overflow-y-auto max-h-[calc(100%-4.25rem)] mt-1">
        <ReportCard v-for="report in myClosedReports" :report="report" @updateTiles="listMyReports()" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<style scoped lang="scss">
@use "../style/vars" as *;

</style>