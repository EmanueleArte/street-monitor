<script setup lang="ts">
import type { IReport } from '@models/reportModel';
import axios from 'axios';
import type { PropType } from 'vue';

const emit = defineEmits(["changeStatus"])

defineProps({
    report: { type: Object as PropType<IReport>, required: true }
})

const changeStatus = async (r: IReport) => {
    if (r.status != 'closed') {
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
}

</script>

<template>
    <button class="bg-primary-700 text-light text-xs rounded-lg p-1 mt-1 ms-0 border-2 border-surface-component" @click="changeStatus(report)">
        Change status
    </button>
</template>