<template>
    <p v-if="!hasMetaMask" class="text-white text-center">Please Install <a href="https://metamask.io"
            class="underline text-purple-500">MetaMask</a>
        Extension first</p>
    <div class="flex justify-center items-center">
        <div class="flex flex-1 flex-wrap relative mx-20 my-20 gap-4 items-center px-10 text-slate-400 py-40 bg-slate-800 rounded-2xl anim-ring"
            style="max-width: 1000px">
            <div class="flex-1 text-center font-medium">
                <div>
                    <p>Post some text</p>
                    <p>Subscribe some address</p>
                </div>
            </div>
            <div class="flex-1 text-center">
                <n-button quaternary type="success" @click="store.setIsOldUser('true')">
                    <span class="text-6xl font-black text-purple-500">
                        GET START
                    </span>
                </n-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { NButton } from "naive-ui";
import useStore from "../../store/main"
const store = useStore()
const hasMetaMask = typeof window.ethereum !== "undefined"

</script>
<style scoped>
.anim-ring::before {
    content: '';
    position: absolute;
    border-radius: 1rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #8a2be2;
    clip-path: inset(0 0 95% 0);
    clip-path: inset(0 95% 0 0);
    clip-path: inset(95% 0 0 0);
    clip-path: inset(0 0 0 95%);
    animation: clippath 3s infinite linear;
}

@keyframes clippath {

    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }

    25% {
        clip-path: inset(0 95% 0 0);
    }

    50% {
        clip-path: inset(95% 0 0 0);
    }

    75% {
        clip-path: inset(0 0 0 95%);
    }
}
</style>