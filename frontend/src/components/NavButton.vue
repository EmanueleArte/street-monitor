<script setup>
import {ref} from "vue";

const props = defineProps(["routeName", "route"])
const emit = defineEmits(["counterClicked"])

const count = ref(0)
const onClicked = () => {
  count.value++
  emit("counterClicked")
}
</script>

<template>
    <li class="nav-item">
      <RouterLink class="nav-link" @click.prevent="onClicked" :to="props.route">
        {{ props.routeName }} (Count: {{ count }})
      </RouterLink>
    </li>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>
