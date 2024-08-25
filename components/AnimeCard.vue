<template>
    <div class="flex justify-center w-180px transition ease-in-out delay-150 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 duration-200">
        <div>
            <div class="relative">
                <img
                    class="object-cover h-80 rounded w-full shadow-sm"
                    :src="anime.image"
                    alt="Anime Thumb" 
                />
                <div v-if="anime.episodeNumber" class="absolute top-0 right-0 rounded-tr rounded-bl p-2 bg-success">
                    <p class="font-medium">EP{{ anime.episodeNumber }}</p>
                </div>
                <div v-if="anime.releaseDate" class="absolute top-0 right-0 rounded-tr rounded-bl p-2 bg-primary">
                    <p class="font-medium">{{ anime.releaseDate }}</p>
                </div>
            </div>
            <div class="text-center text-balance w-56">
                {{ anime.title }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { anime } = defineProps(['anime'])
</script>

<style scoped>

</style>