<template>
    <div class="p-5">
        <template v-for="anime in watchHistory">
            <NuxtLink :to="`/anime/${anime.id}/watch/${anime.ep}`">
                <div class="mb-5 flex rounded text-neutral-500 hover:text-inherit transition ease-in-out delay-150 hover:bg-base-300 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 duration-200">
                    <img 
                        class="w-44 h-20 object-cover rounded-l"
                        :src="anime.image" 
                        alt="anime thumb"
                    >
                    <div class="ms-2">
                        <p class="w-56 truncate">{{ anime.title }}</p>
                        <div class="badge badge-primary badge-outline">EP {{ anime.ep }}</div>
                    </div>
                </div>
            </NuxtLink>
        </template>
    </div>
</template>

<script setup lang="ts">

const { $watchHistory } = useNuxtApp() 

const watchHistory = ref($watchHistory.getHistory())

</script>

<style scoped>

</style>