<template>
    <div class=" text-zinc-200">
        <div v-for="item in notes">
            <div class="flex my-3 justify-between">
                <div class="font-bold">
                    {{ item.note }}
                </div>
                <div class="font-thin text-xs flex text-gray-500">
                    from: <a target="blank" :href="`https://mumbai.polygonscan.com/address/${item.sender}`"
                        class="truncate break-all text-purple-500 cursor-pointer" style="width:100px">
                        {{ item.sender }}
                    </a>
                    tx: <a :href="`https://mumbai.polygonscan.com/tx/${item.id}`" target="blank"
                        class="truncate break-all text-purple-500 cursor-pointer" style="width:100px">
                        {{ item.id }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useQuery } from '@urql/vue';
import { unref } from 'vue';

const res: any = await useQuery({
    query: `
        {
          sentNotes {
             id
             sender
             note
             timestamp
          }
        }
      `
})
const notes = unref(res.data).sentNotes
</script>