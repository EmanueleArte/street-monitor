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
  <h1 class="my-reports-title">My reports:</h1>
  <TabGroup>
    <TabList class="my-reports-tablist w-full flex justify-around">
      <Tab :class="{ 'bg-main-700 text-light': status=='open', 'border-2 border-main-600': status!='open' }" class="rounded-s-2xl w-full p-1"
          @click="toggleTabList('open')">Open</Tab>
      <Tab :class="{ 'bg-main-700 text-light': status=='solving', 'border-2 border-main-600': status!='solving' }" class="w-full p-1"
          @click="toggleTabList('solving')">Solving</Tab>
      <Tab :class="{ 'bg-main-700 text-light': status=='closed', 'border-2 border-main-600': status!='closed' }" class="rounded-e-2xl w-full p-1"
          @click="toggleTabList('closed')">Closed</Tab>
    </TabList>
    <TabPanels class="h-[100%]">
      <TabPanel class="overflow-y-auto max-h-[calc(100%-4.25rem)] mt-1">
        <ReportCard v-for="report in myOpenReports" :report="report" />
      </TabPanel>
      <TabPanel>
        <ReportCard v-for="report in mySolvingReports" :report="report" />
      </TabPanel>
      <TabPanel>
        <ReportCard v-for="report in myClosedReports" :report="report" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<style scoped lang="scss">
@use "../style/vars" as *;

.my-reports-div {
  padding: 0.8rem;
  border: solid 2px white;
  border-bottom : none;
  border-radius: 18px 18px 0 0;
}
</style>