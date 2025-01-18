<script setup lang="ts">

const props = defineProps({
    report: { type: Object, required: true }
})

const reportTypeTextConverter = (t: string): string => {
    return t.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const datetimeConverter = (datetime: string): string => {
    return datetime.split('T').join(' ').split('.')[0].replace('Z', '');
}

</script>

<template>
    <article class="report-card bg-gray-400">
        <section class="w-4/12">
            <img :src="report.picture" alt="report image" class="report-image" />
        </section>
        <section class="w-8/12 pl-3 text-start">
            <h3>{{ reportTypeTextConverter(report.type) }}</h3>
            <p class="text-xs">{{ datetimeConverter(report.open_datetime) }}</p>
            <p class="text-xs">{{ report.description }}</p>    
        </section>
    </article>
</template>

<style lang="scss">
@use "../style/vars" as *;

.report-card {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    margin: 0.5rem;
    border: solid 2px white;
    border-radius: 18px;
    margin-bottom: 0.4rem;
}

</style>