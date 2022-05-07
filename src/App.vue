<template>
  <n-message-provider>
    <Suspense>
      <Home />
    </Suspense>
  </n-message-provider>
</template>
<script setup lang="ts">
import Home from "./views/index.vue"
import { NMessageProvider } from "naive-ui"
import { Suspense } from "vue"
</script>
