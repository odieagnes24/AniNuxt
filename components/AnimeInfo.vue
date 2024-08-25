<template>
     <div class="bg-base-200 rounded p-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div class="md:col-span-1">
                <img
                    class="w-52 mx-auto rounded shadow-sm"
                    :src="anime.image"
                    alt="Anime Thumb" 
                />
            </div>
            <div class="md:col-span-3">
                <p class="text-4xl">{{ anime.title }}</p>
                <p class="text-gray-400">{{ anime.otherName }}</p>
                
                <p class="mt-5 text-gray-400">{{ anime.description }}</p>

                <div class=" mt-8">
                    <p class="text-gray-400">Status: <span class="ms-2 font-bold">{{ anime.status }}</span></p>
                    <p class="text-gray-400">Episodes: <span class="ms-2 font-bold">{{ anime.totalEpisodes }}</span></p>
                    <p class="text-gray-400">Type: <span class="ms-2 font-bold">{{ anime.type }}</span></p>
                    <p class="text-gray-400">SUB/DUB: <span class="uppercase ms-2 font-bold">{{ anime.subOrDub }}</span></p>
                    <p class="text-gray-400">Genres: 
                        <template v-for="genre in anime.genres">
                            <span class="badge badge-white badge-outline ms-2">{{ genre }}</span>
                        </template>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { anime } = defineProps(['anime'])
</script>

<style scoped>

</style>