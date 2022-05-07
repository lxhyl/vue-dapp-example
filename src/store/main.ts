import { defineStore } from 'pinia'
import detectEthereumProvider from '@metamask/detect-provider';
const { Web3 } = window

interface TMain {
    account: string | null,
    chainId: number | null,
    isOldUser: string | null,
    web3: any,
}

export default defineStore("main", {
    state: (): TMain => ({
        account: localStorage.getItem("account") || null,
        chainId: null,
        isOldUser: localStorage.getItem("isOldUser") || null,
        web3: new Web3()
    }),
    actions: {
        setAccount(account: string) {
            localStorage.setItem("account", account)
            this.account = account
        },
        setChainId(chainId: number) {
            this.chainId = chainId
        },
        setIsOldUser(isOldUser: string) {
            localStorage.setItem("isOldUser", isOldUser)
            this.isOldUser = isOldUser
        },
        async setWeb3() {
            this.web3 = new Web3(await detectEthereumProvider())
        }
    }
})