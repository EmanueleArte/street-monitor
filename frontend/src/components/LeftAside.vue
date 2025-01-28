<script setup lang="ts">
import MyReportsTile from './MyReportsTile.vue';
//import ReportFilter from './ReportFilter.vue';

</script>

<template>
    <aside class="absolute w-96 bg-surface-default top-5 bottom-5 left-3 shadow-lg overflow-auto rounded-lg">
        <section>
            <!--ReportFilter /-->
        </section>
        <section class="ml-1 mt-1">
            <MyReportsTile />
        </section>
    </aside>
</template>