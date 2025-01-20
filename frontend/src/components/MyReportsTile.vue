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
    const data = (await axios.get("http://localhost:3000/reports/by-user/mariorossi")).data //TODO cambiare user (mariorossi) con user corrente loggato
    myReports.value = data
  } catch (e) {
    console.error(e)
  }
}

onMounted(listMyReports)
</script>

<template>
    <div v-show="isVisible" class="my-reports-div bg-light">
        <p class="my-reports-title">My reports:</p>
        <div class="my-reports-container">
          <ReportCard v-for="report in myReports" :report="report" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../style/vars" as *;

@mixin my-reports {
  $font-size: 16px; //1rem
  $line-height: 1.5;
  $margin: 0rem;
  $p-height: calc(#{$font-size * $line-height} + #{$margin * 2});

  font-size: $font-size;
  line-height: $line-height;
  margin: $margin;
  max-height: calc(100% - #{$p-height});
}

.my-reports-title {
  @include my-reports;
}

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

.my-reports-container {
  @include my-reports;
  overflow-y: auto;
}
</style>