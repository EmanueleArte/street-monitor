<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store"
import type { IReport } from "@models/reportModel"
import { ref, watch, type PropType } from "vue"
import { formatDate, formatUnderscoredString } from "@/lib/stringUtility"
import { Popover, PopoverButton } from "@headlessui/vue"
import PopoverPanelWrapper from "./utils/PopoverPanelWrapper.vue"
import SimpleButton from "./buttons/SimpleButton.vue"
import axios from "axios"
import { usePositionStore } from "@/stores/position.store"
import type { IUser } from "@models/userModel"
import { OperationResults, ReportStatus } from "@/lib/vars.ts"
import { socket, SocketEvents } from "@/socket"

// Values set only for the project presentation.
// In a real scenario higher values are suggested.
enum ReputationThreashold {
  LOW = 2,
  HIGH = 5
}

const props = defineProps({
  report: { type: Object as PropType<IReport>, required: true },
  previousOrNext: { type: Boolean, required: false }
})

const emit = defineEmits<{
  (e: "updateTiles"): void
}>()

const authStore = useAuthStore()
const positionStore = usePositionStore()
const user = ref<IUser>()
const isOwnerLoggedIn = ref<boolean>(authStore.isLoggedIn(props.report.user))
const results = ref<{ success: boolean, title: string, content: string }[]>([])
const reputationColor = ref<string>(computeReputationColor(user.value))

// border-primary-600
// border-red-500
// border-amber-500
// border-emerald-600
function computeReputationColor(user: IUser | undefined): string {
  if (!user || !user.reputation || authStore.isLoggedIn(user.username)) return "primary-600"
  if (user.reputation < ReputationThreashold.LOW) return "red-500"
  if (user.reputation < ReputationThreashold.HIGH) return "amber-500"
  return "emerald-600"
}


function getNewReportStatus(status: string): ReportStatus {
  return status === ReportStatus.OPEN ? ReportStatus.SOLVING : ReportStatus.CLOSED
}


function addResult(success: boolean, title: string, content: string): void {
  results.value.push({ success, title, content })
}

const changeStatus = async () => {
  if (props.report.status === ReportStatus.CLOSED) return

  if (authStore.isLoggedIn(props.report.user) || authStore.isAdmin()) {
    props.report.status = getNewReportStatus(props.report.status)
    if (props.report.status === ReportStatus.CLOSED) {
      props.report.close_datetime = new Date()
    }
    props.report.pending_request = false

    axios.put<IUser>(`http://localhost:3000/reports/by-id/${props.report._id}`, props.report)
      .then(res => {
        if (res.status !== 200) return
        emit('updateTiles')
      })
      .catch(err => addResult(false, OperationResults.FAILURE, 'Failed to change the status of the report'))

    return
  }

  props.report.pending_request = true
  axios.put<IUser>(`http://localhost:3000/reports/by-id/${props.report._id}`, props.report)
    .then(res => {
      if (res.status !== 200) return
      emit('updateTiles')
      socket.emit(SocketEvents.REPORT_UPDATE, props.report, props.report.user, authStore.get(), getNewReportStatus(props.report.status))
      addResult(true, OperationResults.SUCCESS, `Notification of status change sent to ${props.report.user}`)
    })
    .catch(err => addResult(false, OperationResults.FAILURE, 'Failed to change the status of the report'))
}

const upvote = async () => {
  axios.get<IUser>(`http://localhost:3000/users/${props.report.user}`)
    .then(res => {
      if (res.status !== 200) return
      user.value = res.data
      props.report.upvotes?.push(authStore.get()?.username)
      axios.put<IUser>(`http://localhost:3000/reports/by-id/${props.report._id}`, props.report)
    })
    .then(res => {
      if (!user.value) return
      user.value.reputation = user.value.reputation + 1
      axios.put<IUser>(`http://localhost:3000/users/${props.report.user}`, user.value)
    })
    .catch(err => console.error(err))
}

watch(() => props.report.user, async (reportUser) => {
  if (!reportUser) return

  axios.get<IUser>(`http://localhost:3000/users/${reportUser}`)
    .then(response => {
      if (response.status !== 200) return
      user.value = response.data
      reputationColor.value = computeReputationColor(user.value)
    })
    .catch(err => console.error(err))
}, { immediate: true })

const moveToReport = () => {
  positionStore.setFlyMainMap(true)
  positionStore.move(props.report.coordinates)
}

const coordinatesConverter = (coordinates: [number, number]): string => {
  const roundedCoords: number[] = coordinates.map(coord => roundNumber(coord, 6))
  return roundedCoords.toString().replace(",", ", ")
}

function roundNumber(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals)
  return Math.round((num + Number.EPSILON) * factor) / factor
}
</script>

<template>
  <li>
    <article
      class="h-fit aspect-3/2 w-full md:shrink-0 flex flex-row shadow-md rounded-lg border-2 bg-surface-default my-2 overflow-hidden"
      :class="'border-' + reputationColor">
      <section class="max-w-[40%] shrink-0">
        <img :src="report.picture ? `${report.picture}` : 'http://localhost:3000/not-found-report-picture.jpg'"
          alt="report image" class="w-full h-40 object-cover" />
      </section>

      <section class="max-h-40 overflow-y-auto px-3 py-2 text-sm flex flex-col gap-2 w-full">
        <!-- title and upvote button in current report and other user report and not in closed reports -->
        <div v-if="!previousOrNext && !authStore.isLoggedIn(report.user) && report.status != 'closed'"
          class="flex flex-row">
          <h2 class="text-base font-medium capitalize basis-[80%]">{{ formatUnderscoredString(report.type) }}</h2>

          <!-- upvote -->
          <div class="basis-[20%] flex justify-center">
            <!-- button if not upvoted yet -->
            <SimpleButton v-if="!props.report.upvotes?.includes(authStore.get()?.username)" @click="upvote"
              class="!p-0 size-7 flex items-center justify-center">
              <!--img src="@/assets/icons/arrow_up.svg" alt="up arrow" class="up-arrow-img" /-->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4">
                <path d="M12 2l-10 10h6v10h8v-10h6z" />
              </svg>
            </SimpleButton>

            <!-- only svg if already upvoted -->
            <svg v-if="props.report.upvotes?.includes(authStore.get()?.username)" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" class="fill-primary-600 w-4 h-4 mt-2 mb-1">
              <path d="M12 2l-10 10h6v10h8v-10h6z" />
            </svg>
          </div>
        </div>

        <!-- only title if previous or next report or current user reports or closed reports -->
        <h2 v-if="previousOrNext || authStore.isLoggedIn(report.user) || report.status == 'closed'"
          class="text-base font-medium capitalize">
          {{ formatUnderscoredString(report.type) }}
        </h2>

        <!-- username -->
        <p v-if="props.report.user != authStore.get()?.username" class="text-black/60">
          {{ props.report.user }}
          <span class="ps-1 text-black/40 before:content-['\('] after:content-['\)']">{{ user?.reputation || 0 }}</span>
        </p>

        <div class="flex flex-col">
          <div class="grid grid-cols-3 grid-rows-3 text-xs">
            <!-- coords -->
            <div :class="props.report.close_datetime ? 'col-span-3' : 'col-span-2 row-span-2'"
              class="w-full text-slate-600 col-span-2  flex gap-2 lowercase">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-5 my-auto">
                <path fill-rule="evenodd"
                  d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                  clip-rule="evenodd" />
              </svg>
              <p @click="moveToReport" class="cursor-pointer text-primary-600 my-auto">
                {{ coordinatesConverter(props.report.coordinates) }}
              </p>
            </div>
            <SimpleButton v-if="report.status != 'closed'" :report="report" @click="changeStatus" :outline="true"
              size="small" :class="props.report.close_datetime ? 'row-span-2' : 'row-span-3'"
              class="my-auto text-xs py-2 font-medium" :disabled="report.pending_request && !isOwnerLoggedIn">
              {{ props.report.status === 'open' ? 'Resolve' : 'Close' }}
            </SimpleButton>
            <!-- dates -->
            <div class="flex gap-x-3 lowercase flex-wrap text-slate-600"
              :class="props.report.close_datetime ? 'col-span-3' : 'col-span-2'">
              <!-- open -->
              <Popover class="relative inline-grid">
                <PopoverButton>
                  <div class="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                      <path fill-rule="evenodd"
                        d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z"
                        clip-rule="evenodd" />
                    </svg>
                    <p>{{ formatDate(new Date(report.open_datetime)) }}</p>
                  </div>
                </PopoverButton>

                <PopoverPanelWrapper>
                  Open date of the report
                </PopoverPanelWrapper>
              </Popover>

              <!-- close -->
              <Popover class="relative inline-grid">
                <PopoverButton>
                  <div v-if="report.close_datetime" class="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                      class="my-auto size-4">
                      <path
                        d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                    </svg>
                    <p>{{ formatDate(new Date(report.close_datetime)) }}</p>
                  </div>
                </PopoverButton>

                <PopoverPanelWrapper>
                  Close date of the report
                </PopoverPanelWrapper>
              </Popover>
            </div><!-- /dates -->
          </div>

          <p v-if="report.description"
            class="max-h-14 mt-2 max-w-[50vw] overflow-auto rounded-sm bg-slate-200 px-2 py-1 text-slate-800">
            {{ report.description }}
          </p>
        </div>

      </section>
    </article>
  </li>
</template>

<style scoped lang="scss">
.up-arrow-img {
  filter: invert(1);
}
</style>