<script setup lang="ts">
import type { IReport } from "@models/reportModel.ts"
import { onMounted, onUnmounted, reactive, ref, watch } from "vue"
import SlideFromTop from "@/components/transitions/SlideFromTop.vue"
import Checkbox from "@/components/inputs/Checkbox.vue"
import { ReportStatus } from "@/lib/vars.ts"
import { formatUnderscoredString } from "@/lib/stringUtility.ts"

const show = ref<boolean>(true)
const observer = ref<MutationObserver | null>(null)

const observeTile = () => {
  observer.value = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const element = document.querySelector<HTMLElement>(".tile")
        show.value = !element;
      }
    })
  })

  observer.value.observe(document.body, { childList: true, subtree: true })
}

const statusToShow = reactive<Record<ReportStatus, boolean>>(
    Object.values(ReportStatus).reduce((acc, status) => {
      acc[status] = true
      return acc
    }, {} as Record<ReportStatus, boolean>)
)
statusToShow[ReportStatus.CLOSED] = false
watch(statusToShow, () => {
  console.log(statusToShow)
})

const typesToShow = {}
const getReportTypes = () => {
}
// const getReportTypes = () => {
//   axios.get<string[]>("http://localhost:3000/reports/types")
//       .then((res) => {
//         res.data.forEach((type) => {
//           typesToShow[type] = true
//         })
//       })
//       .catch((e) => {
//         console.error(e)
//       })
// }

onMounted(() => {
  observeTile()
  getReportTypes()
})
onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <SlideFromTop>
    <div v-if="show" class="absolute w-screen top-10 p-4">
      <div class="w-full bg-surface-default shadow-lg rounded-xl p-4">
        <section class="flex flex-row justify-around">
          <Checkbox v-for="(value, key) in statusToShow" :checked="value"
                    @click="statusToShow[key] = !statusToShow[key]">
            {{ formatUnderscoredString(key) }}
          </Checkbox>
        </section>
      </div>
    </div>
  </SlideFromTop>
</template>

<style scoped lang="scss">

</style>