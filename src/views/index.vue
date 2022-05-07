<template>
    <div class="my-10 mx-5 flex justify-end">
        <Suspense>
            <Connect />
        </Suspense>
    </div>
    <Note v-if="store.isOldUser" />
    <About v-else />

</template>
<script setup lang="ts" >
import Connect from "../components/Connect/index.vue"
import About from "./About/index.vue"
import Note from "./Note/index.vue"
import { Suspense } from "vue"
import useStore from "../store/main"
const store = useStore()
await store.setWeb3()
</script>
