<template>
    <div class="flex gap-4">
        <n-button v-if="!mainStore.account" @click="login" color="#8a2be2" round size="large" style="width: 120px;">
            Connect
        </n-button>
        <n-button v-else-if="!isHover" style="width: 120px;" color="#8a2be2" round size="large"
            class="truncate break-all w-10" @mouseenter="isHover = true">
            <div class="flex flex-col">
                <div>{{ `${mainStore.account.slice(0, 10)}...` }}</div>
                <div v-if="balance" class="text-sm text-green-400">{{ `💰${balance}` }}</div>
            </div>
        </n-button>
        <n-button v-else @click="logout" style="width: 120px;" @mouseleave="isHover = false" color="red" round
            size="large" class="w-10">
            Disconnect
        </n-button>
        <n-button v-if="!mainStore.chainId" style="width: 120px;" color="#ff69b4" round size="large"
            @click="connentNetWork">
            NetWork
        </n-button>
        <n-button v-else color="#ff69b4" style="width: 120px;" round size="large" class="shadow-lg shadow-red-500">
            {{ NRTWORKS.get(mainStore.chainId) || mainStore.chainId }}
        </n-button>
    </div>
</template>
<script lang="ts" setup>
import { NButton, useMessage } from "naive-ui";
import { ref, watch } from "vue";
import useMainStore from "../../store/main";
import { NRTWORKS } from "../../utils/network"
import { utils } from "ethers"
const message = useMessage()
const mainStore = useMainStore()
const isHover = ref<boolean>(false)
const balance = ref<string>()
function login() {
    if (typeof window.ethereum === "undefined") {
        message.error("Please install MetaMask first")
        return
    }
    window.ethereum?.enable().then((res: string[]) => {
        if (!res || res.length === 0) {
            message.info('Please install MetaMask')
            return
        }
        mainStore.setAccount(res[0])
    }).catch((err: any) => message.error("Check MetaMask", err))
}
function getBalance() {
    window.ethereum?.request({ method: "eth_getBalance", params: [mainStore.account] }).then((res: string) => {
        if (!res || res.length === 0) return
        balance.value = parseFloat(utils.formatUnits(res)).toFixed(3).toString()
    })

}
mainStore.account && getBalance()
watch(() => mainStore.account, () => {
    getBalance()
})
function logout() {
    mainStore.setAccount('')
}

async function connentNetWork() {
    const connencted = window.ethereum?.isConnected()
    if (!connencted) {
        message.info("Please connect to the network in MetaMask")
        return
    }
    const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
    chainId && mainStore.setChainId(parseInt(chainId, 16))

}
connentNetWork()

window.ethereum?.on("connect", (e: { chainId: string; }) => {
    if (!e || !e.chainId) return
    mainStore.setChainId(parseInt(e.chainId, 16))
})
window.ethereum?.on('accountsChanged', (accounts: string[]) => {
    if (!accounts || accounts.length === 0) return
    mainStore.setAccount(accounts[0])
})
</script>