<template>
    <div class="flex justify-center">
        <n-input v-model:value="text" class="flex-1" size="large" round placeholder="send text"
            style="max-width: 700px;" @keyup.enter="submit"></n-input>

    </div>

    <n-modal :show="loading">
        <n-card title="processing..." class="flex justify-center items-center" style="width: 600px" size="huge"
            :bordered="false" role="dialog" aria-modal="true">
            <n-spin size="large" />
        </n-card>
    </n-modal>
    <div class="flex mt-20 justify-center">
        <Suspense>
            <View class="flex-1" style="max-width: 700px;" />
        </Suspense>
    </div>
</template>
<script setup lang="ts">
import { NInput, NModal, NSpin, NCard, useMessage } from "naive-ui";
import { ref, Suspense } from "vue";
import useStore from "../../store/main"
import View from "./view.vue"
import { ABI, ADDRESS } from "../../contract"
const store = useStore()
const text = ref<string>('')
const contract = new store.web3.eth.Contract(ABI, ADDRESS)
const loading = ref(false)
const message = useMessage()
function submit() {
    if (!text.value) return
    if (!store.account) {
        message.warning('Please connect first')
        return
    }
    loading.value = true
    contract.methods.addNote(text.value).send({ from: store.account }).then(() => {
        text.value = ''
        loading.value = false
        message.success('success')
    }).catch(() => {
        message.error('faild, please try again')
        loading.value = false
    })
}
</script>