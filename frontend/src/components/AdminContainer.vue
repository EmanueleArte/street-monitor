<script setup lang="ts">
import axios from "axios"
import FormInput from "@/components/inputs/FormInput.vue"
import SimpleButton from "@/components/buttons/SimpleButton.vue"
import { onMounted, ref } from "vue"
import { formatToUnderscored, formatUnderscoredString } from "@/lib/stringUtility.ts"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue"
import SimpleLabel from "@/components/utils/SimpleLabel.vue"
import type { IReportType } from "@models/reportTypeModel.ts"
import DialogWrapper from "@/components/utils/DialogWrapper.vue"
import { OperationResults } from "@/lib/vars.ts"

const reportTypes = ref<IReportType[]>([])
const newReportType = ref<string>("")
const updatedReportType = ref<{ old: IReportType | null, new: string }>({ old: null, new: "" })
const deletedReportType = ref<IReportType | null>(null)
const results = ref<{ success: boolean, title: string, content: string }[]>([])

const fetchReportTypes = () => {
  axios.get<IReportType[]>(`http://localhost:3000/report-types`)
      .then((res) => {
        reportTypes.value = res.data
        updatedReportType.value.old = reportTypes.value[0]
        deletedReportType.value = reportTypes.value[0]
      })
      .catch((e) => console.error(e))
}

function addResult(success: boolean, title: string, content: string): void {
  results.value.push({ success, title, content })
}

const addReportType = () => {
  axios.post<IReportType>(`http://localhost:3000/report-types`, { name: formatToUnderscored(newReportType.value) })
      .then((res) => {
        fetchReportTypes()
        newReportType.value = ""
        addResult(true, "Report type added successfully", OperationResults.SUCCESS)
      })
      .catch((e) => {
        console.error(e)
        addResult(false, "Report type could not be added", OperationResults.FAILURE)
      })
}

const updateReportType = () => {
  axios.put<IReportType>(`http://localhost:3000/report-types/update/${updatedReportType.value.old?.name}`, { name: formatToUnderscored(updatedReportType.value.new) })
      .then((res) => {
        fetchReportTypes()
        updatedReportType.value.new = ""
        addResult(true, "Report type updated successfully", OperationResults.SUCCESS)
      })
      .catch((e) => {
        console.error(e)
        addResult(false, "Report type could not be updated", OperationResults.FAILURE)
      })
}

const deleteReportType = () => {
  axios.delete<IReportType>(`http://localhost:3000/report-types/delete/${deletedReportType.value?.name}`)
      .then((res) => {
        fetchReportTypes()
        addResult(true, "Report type deleted successfully", OperationResults.SUCCESS)
      })
      .catch((e) => {
        console.error(e)
        addResult(false, "Report type could not be deleted", OperationResults.FAILURE)
      })
}

onMounted(fetchReportTypes)
</script>

<template>
  <section class="p-4 mt-10 pt-7  h-full md:m-0 md:pt-4">
    <DialogWrapper v-for="dialog in results" :key="dialog.content">
      <template v-slot:title>
        <div :class="[dialog.success ? 'text-green-600' : 'text-red-600']">
          {{ dialog.title }}
        </div>
      </template>
      <template v-slot:content>
        {{ dialog.content }}
      </template>
    </DialogWrapper>
    <h1 class="text-xl mb-3">Administrator panel</h1>

    <section class="space-y-2">
      <h2 class="text-lg">Manage report types</h2>
      <div class="space-y-1">
        <h3>Add</h3>
        <div class="flex flex-row items-end justify-between">
          <FormInput label="new report type" fieldName="new-report-type" :modelValue="newReportType"
                     @input="newReportType = $event.target.value"
                     class="w-full mr-2"/>
          <SimpleButton @click="addReportType" class="border border-primary-600 hover:border-primary-700">Add
          </SimpleButton>
        </div>
      </div>

      <div class="space-y-1">
        <h3>Edit</h3>
        <Listbox v-model="updatedReportType.old" class="z-20">
          <div class="relative">
            <SimpleLabel attachTo="report-type">Report type</SimpleLabel>
            <ListboxButton
                id="report-type"
                class="relative w-full cursor-pointer rounded-xl text-light bg-primary-600 mt-0.5 py-2 pl-3 pr-10 text-left
            focus:outline-none focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-white/75
            focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 hover:bg-primary-700 duration-300">
          <span class="block truncate">
            {{ formatUnderscoredString(updatedReportType.old?.name) }}
          </span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="white" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
            </svg>
          </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
              <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-light py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                <ListboxOption v-slot="{ active, selected }" v-for="reportType in reportTypes" :key="reportType.name"
                               :value="reportType">
                  <li :class="[active ? 'bg-primary-100' : 'text-gray-800', 'relative cursor-pointer select-none py-2 pl-10 pr-4',]">
                <span :class="[selected ? 'font-medium' : 'font-normal','block truncate',]">
                  {{ formatUnderscoredString(reportType?.name) }}
                </span>
                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                  </svg>
                </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        <FormInput label="new report type name" fieldName="new-report-type-name" :modelValue="updatedReportType.new"
                   @input="updatedReportType.new = $event.target.value"
                   class="w-full"/>
        <div class="flex justify-end">
          <SimpleButton @click="updateReportType" class="mt-1 border border-primary-600 hover:border-primary-700">Update
          </SimpleButton>
        </div>
      </div>
    </section>

    <section>
      <h3>Delete</h3>
      <div class="space-y-1">
        <h3>Edit</h3>
        <Listbox v-model="deletedReportType" class="z-10">
          <div class="relative">
            <SimpleLabel attachTo="report-type">Report type</SimpleLabel>
            <ListboxButton
                id="report-type"
                class="relative w-full cursor-pointer rounded-xl text-light bg-primary-600 mt-0.5 py-2 pl-3 pr-10 text-left
            focus:outline-none focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-white/75
            focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 hover:bg-primary-700 duration-300">
          <span class="block truncate">
            {{ formatUnderscoredString(deletedReportType?.name) }}
          </span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="white" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
            </svg>
          </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
              <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-light py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                <ListboxOption v-slot="{ active, selected }" v-for="reportType in reportTypes" :key="reportType.name"
                               :value="reportType">
                  <li :class="[active ? 'bg-primary-100' : 'text-gray-800', 'relative cursor-pointer select-none py-2 pl-10 pr-4',]">
                <span :class="[selected ? 'font-medium' : 'font-normal','block truncate',]">
                  {{ formatUnderscoredString(reportType?.name) }}
                </span>
                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                  </svg>
                </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        <div class="flex justify-end">
          <SimpleButton @click="deleteReportType"
                        class="mt-1 mb-4 bg-red-600 hover:bg-red-700 border border-red-600 hover:border-red-700">Delete
          </SimpleButton>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">

</style>