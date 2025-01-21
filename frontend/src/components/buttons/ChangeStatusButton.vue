<script setup lang="ts">
import type { IReport } from '@models/reportModel';
import axios from 'axios';
import type { PropType } from 'vue';

defineProps({
    report: { type: Object as PropType<IReport>, required: true }
})

const changeStatus = async (r: IReport) => {
    try {
        console.log(r.status)
        r.status = r.status === 'open' ? 'solving' : 'closed'
        console.log(r.status)
        const response = await axios.put(`http://localhost:3000/reports/by-id/${r._id}`, r)
    } catch (e) {
        console.error(e);
    }
}

</script>

<template>
    <button class="bg-main-700 text-light text-xs rounded-lg p-1 mt-1 ms-0 border-2 border-light-600" @click="changeStatus(report)">
        Change status
    </button>
</template>