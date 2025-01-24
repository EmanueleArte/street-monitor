<script setup lang="ts">
import type { IReport } from '@models/reportModel';
import axios from 'axios';
import { ref, type PropType } from 'vue';

const emit = defineEmits(["changeStatus"])

const props = defineProps({
    report: { type: Object as PropType<IReport>, required: true }
})

const changeStatus = async (r: IReport) => {
    if (r.status === 'closed') return
    try {
        r.status = r.status === 'open' ? 'solving' : 'closed'
        if (r.status === 'closed') {
            r.close_datetime = new Date()
        }
        const response = await axios.put(`http://localhost:3000/reports/by-id/${r._id}`, r)
        if (response.status === 200) {
            emit("changeStatus")
        }
    } catch (e) {
        console.error(e);
    }
}

const buttonText = ref<string>(props.report.status === 'open' ? 'Resolve' : 'Close')

</script>

<template>
    <button
        :class="props.report.close_datetime ? 'row-span-2' : 'row-span-3'"
        class="my-auto bg-surface-component text-primary-600 text-xs rounded-md py-2 font-medium border border-primary-600 hover:bg-primary-100 hover:border-primary-700" @click="changeStatus(report)">
        {{ buttonText }}
    </button>
</template>