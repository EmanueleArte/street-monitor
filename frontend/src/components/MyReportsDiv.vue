<script setup lang="ts">
import type { IReport } from "@models/reportModel";
import axios from "axios";
import { defineProps, onMounted, ref } from "vue"
import ReportCard from "./ReportCard.vue";

const myReports = ref<IReport[]>([])

const props = defineProps({
  isVisible: { type: Boolean, required: true }
})

const listMyReports = async () => {
  try {
    const data = (await axios.get("http://localhost:3000/reports/by-user/mariorossi")).data //TODO cambiare user (mariorossi)
    data.forEach((report: IReport) => {
      console.log(report)
    })
    myReports.value = data
  } catch (e) {
    console.error(e)
  }
}

onMounted(listMyReports)
</script>

<template>
    <div v-show="isVisible" class="my-reports-div bg-blue-400">
        <p>My reports:</p>
        <ReportCard v-for="report in myReports" :report="report" />
    </div>
</template>

<style lang="scss">
@use "../style/vars" as *;

.my-reports-div {
    position: absolute;
    bottom: 0;
    left: 0.4rem;
    right: 0.4rem;
    height: 60%;
    z-index: $home_page_divs_z_index;
    padding: 0.8rem;
    border: solid 2px white;
    border-bottom : none;
    border-radius: 18px 18px 0 0;
}

</style>