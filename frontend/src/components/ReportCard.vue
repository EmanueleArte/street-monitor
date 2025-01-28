<script setup lang="ts">
import type { IReport } from '@models/reportModel';
import type { PropType } from 'vue';
import SimpleButton from './buttons/SimpleButton.vue';
import axios from 'axios';

const emit = defineEmits(["updateTiles"])

const props = defineProps({
    report: { type: Object as PropType<IReport>, required: true }
})

const changeStatus = async () => {
    if (props["report"].status != 'closed') {
        try {
            props["report"].status = props["report"].status === 'open' ? 'solving' : 'closed'
            if (props["report"].status === 'closed') {
                props["report"].close_datetime = new Date()
            }
            const response = await axios.put(`http://localhost:3000/reports/by-id/${props["report"]._id}`, props["report"])
            if (response.status === 200) {
                emit("updateTiles")
            }
        } catch (e) {
            console.error(e);
        }
    }
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
    <article class="flex items-center p-2 m-2 rounded-lg bg-surface-component shadow-xl">
        <section class="w-4/12">
            <img :src="report.picture ? `http://localhost:3000/${report.picture}` : 'http://localhost:3000/not-found-report-picture.jpg'" alt="report image" class="report-image" />
        </section>
        <section class="w-8/12 pl-3 text-start text-black">
            <h2 class="text-lg">{{ reportTypeTextConverter(report.type) }}</h2>
            <p class="text-xs">{{ datetimeConverter(report.open_datetime) }}</p>
            <p v-if="report.status == 'closed'" class="text-xs">{{ datetimeConverter(report.close_datetime) }}</p>
            <p v-if="report.description" class="bg-surface-default border-2 border-surface-divider text-dark rounded-sm p-1 mt-1 mb-1 text-xs max-h-[60px] overflow-y-auto">{{ report.description }}</p>
            <SimpleButton v-show="report.status!='closed'" @click="changeStatus" classes="!bg-light !text-primary-600 border border-primary-600 hover:!bg-primary-100 hover:border-primary-700 hover:!text-primary-700 text-[0.7rem] !px-2 !py-1 mr-1 !rounded-lg">Change status</SimpleButton>
        </section>
    </article>
</template>

<style scoped lang="scss">
@use "../style/vars" as *;

</style>