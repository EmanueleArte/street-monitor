<script setup lang="ts">
import MyReportsTile from "@/components/reports/MyReportsTile.vue"
import ReportFilter from "@/components/map/ReportFilter.vue"
import { WIDTH_MD } from "@/lib/vars.ts"

const isMobile: boolean = window.innerWidth <= WIDTH_MD
</script>

<template>
  <section class="flex md:absolute top-0 h-full w-[25%] z-20 md:p-3">
    <aside
        class="hidden p-4 md:flex md:flex-col z-10 h-full w-full bg-surface-default overflow-hidden rounded-lg shadow-lg gap-y-2"
    >
      <h1 class="text-2xl text-primary-600 font-medium">StreetMonitor</h1>
      <section v-if="!isMobile">
        <h2>Map filters</h2>
        <ReportFilter statusFilterId="status-filter-id" reportTypeFilterId="report-type-filter-id"/>
      </section>
      <section class="max-h-[70%] ml-1 mt-1 hidden md:block">
        <MyReportsTile/>
      </section>
    </aside>
  </section>
</template>