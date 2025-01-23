<script setup lang="ts">
import ChangeStatusButton from './buttons/ChangeStatusButton.vue';
import type { IReport } from '@models/reportModel';
import type { PropType } from 'vue';

const emit = defineEmits(["updateTiles"])

defineProps({
    report: { type: Object as PropType<IReport>, required: true }
})

const updateTiles = () => {
    emit("updateTiles")
}

const reportTypeTextConverter = (t: string): string => {
    return t.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const datetimeConverter = (datetime: Date): string => {
    return datetime.toString().split('T').join(' ').split('.')[0].replace('Z', '').split(':')[0]
        + ':' + datetime.toString().split(':')[1];
}

</script>

<template>
    <article class="flex items-center p-2 m-2 rounded-2xl bg-primary-600 border-2 border-primary-700">
        <section class="w-4/12">
            <img :src="report.picture ? `http://localhost:3000/${report.picture}` : 'http://localhost:3000/not-found-report-picture.jpg'" alt="report image" class="report-image" />
        </section>
        <section class="w-8/12 pl-3 text-start text-black">
            <h2 class="text-lg">{{ reportTypeTextConverter(report.type) }}</h2>
            <p class="text-xs">{{ datetimeConverter(report.open_datetime) }}</p>
            <p v-if="report.status == 'closed'" class="text-xs">{{ datetimeConverter(report.close_datetime) }}</p>
            <p v-if="report.description" class="bg-primary-700 text-light rounded-sm p-1 mt-1 mb-1 text-xs max-h-[60px] overflow-y-auto">{{ report.description }}</p>
            <ChangeStatusButton v-show="report.status!='closed'" :report="report" @changeStatus="updateTiles" />
        </section>
    </article>
</template>

<style scoped lang="scss">
@use "../style/vars" as *;

</style>