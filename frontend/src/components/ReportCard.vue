<script setup lang="ts">
// border-primary-600 shadow-primary-600/60
// border-red-600 shadow-red-600/60
// border-amber-600 shadow-amber-600/60
// border-emerald-600 shadow-emerald-600/60
import { useAuthStore } from '@/stores/auth.store';
import type { IReport } from '@models/reportModel';
import { ref, type PropType } from 'vue';
import { formatDate } from '@/lib/stringUtility';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import PopoverPanelWrapper from './utils/PopoverPanelWrapper.vue';
import SimpleButton from './buttons/SimpleButton.vue';
import axios from 'axios';
import { usePositionStore } from '@/stores/position.store';

const emit = defineEmits(["updateTiles"])
const authStore = useAuthStore()
const positionStore = usePositionStore()

const props = defineProps({
    report: { type: Object as PropType<IReport>, required: true }
})

/*
Se l'utente che preme il <button> è lo stesso della segnalazione, cambia stato direttamente.
Altrimenti, notifica il proprietario del report
*/
const changeStatus = async () => {
    if (props.report.status === 'closed') return

    if (authStore.isLoggedIn(props.report.user)) {
        try {
            props.report.status = props.report.status === 'open' ? 'solving' : 'closed'
            if (props.report.status === 'closed') {
                props.report.close_datetime = new Date()
            }
            const response = await axios.put(`http://localhost:3000/reports/by-id/${props.report._id}`, props.report)
            if (response.status === 200) {
                emit("updateTiles")
            }
        } catch (e) {
            console.error(e);
        }
    } else {
        // send notification
        console.log(`sending notification to ${props.report.user}...`)
    }
}

const moveToReport = () => {
    positionStore.setFlyMainMap(true)
    positionStore.move(props.report.coordinates)
}

const reportTypeTextConverter = (t: string): string => {
    return t.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const coordinatesConverter = (coordinates: [number, number]): string => {
    const roundedCoords: number[] = coordinates.map(coord => roundNumber(coord, 6))
    return roundedCoords.toString().replace(',', ', ')
}

function roundNumber(num: number, decimals: number): number {
    const factor = Math.pow(10, decimals)
    return Math.round((num + Number.EPSILON) * factor) / factor
}

function computeReputationColor(reputation: number | undefined): string {
    return "primary-600"
}

const userReputation = ref<number | undefined>(props.report.user == authStore.get()?.username ? undefined : 0)
const reputationColor = ref<string>(computeReputationColor(userReputation.value))

</script>

<template>
    <article
        class="flex aspect-3/2 rounded-md border-2 bg-surface-default shadow-md my-2 overflow-hidden max-w-80"
        :class="`border-${reputationColor} shadow-${reputationColor}/60`"    
    >
        <img
            :src="report.picture ? `http://localhost:3000/${report.picture}` : 'http://localhost:3000/not-found-report-picture.jpg'"
            alt="report image"
            class="w-1/3"
        />

        <section class="w-full px-3 py-2 text-sm shadow-md shadow-black/40 flex flex-col gap-2">
            <h2 class="text-base font-medium capitalize">{{ reportTypeTextConverter(report.type) }}</h2>

            <!-- username -->
            <p v-if="props.report.user != authStore.get()?.username" class="text-black/60">
                {{ props.report.user }}
                <span class="ps-1 text-black/40 before:content-['\('] after:content-['\)']">{{ userReputation }}</span>
            </p>

            <div class="flex flex-col">
                <div class="grid grid-cols-3 grid-rows-3 text-xs">
                    <!-- coords -->
                    <div
                        :class="props.report.close_datetime ? 'col-span-3' : 'col-span-2 row-span-2'"
                        class="w-full text-slate-600 col-span-2  flex gap-2 lowercase">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-5 my-auto">
                            <path fill-rule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd" />
                        </svg>
                        <p @click="moveToReport" class="cursor-pointer text-primary-600 my-auto">
                            {{ coordinatesConverter(props.report.coordinates) }}
                        </p>
                    </div>
                    <!-- <ChangeStatusButton v-if="report.status!='closed'" :report="report" @changeStatus="changeStatus" /> -->
                    <SimpleButton
                        v-if="report.status!='closed'"
                        :report="report"
                        @click="changeStatus"
                        :outline="true"
                        size="small"
                        :class="props.report.close_datetime ? 'row-span-2' : 'row-span-3'"
                        class="my-auto text-xs py-2 font-medium"
        
                    >
                        {{ props.report.status === 'open' ? 'Resolve' : 'Close' }}
                    </SimpleButton>
                    <!-- dates -->
                    <div class="flex gap-x-3 lowercase flex-wrap text-slate-600" :class="props.report.close_datetime ? 'col-span-3' : 'col-span-2'">
                        <!-- open -->
                        <Popover class="relative inline-grid">
                            <PopoverButton>
                                <div class="flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clip-rule="evenodd" />
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="my-auto size-4">
                                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
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

                <p v-if="report.description" class="max-h-14 mt-2 w-full overflow-auto rounded-sm bg-slate-200 px-2 py-1 text-slate-800">
                    {{ report.description }}
                </p>
            </div>

        </section>
    </article>
</template>

<style scoped lang="scss">
</style>