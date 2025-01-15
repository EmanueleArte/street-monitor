<script setup>
import NavButton from "@/components/NavButton.vue";
import { useCounterStore } from "@/counter.js";
import { ref } from "vue";

const emit = defineEmits(["selectedPage"])

const counter = useCounterStore()
const onChildClicked = (page) => {
  emit("selectedPage", page)
  counter.increment()
}
</script>

<template>
  <nav class="navbar navbar-light bg-light navbar-expand-lg">
    <div class="container container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <NavButton route-name="Home" route="/" @counter-clicked="onChildClicked('/')" />
          <NavButton route-name="Movies" route="/movies" @counter-clicked="onChildClicked('/movies')" />
        </ul>
        <div>Total click: {{ counter.count }}</div>
      </div>
    </div>
  </nav>
</template>
