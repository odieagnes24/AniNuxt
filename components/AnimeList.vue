<template>
    <p v-if="status === 'error'">
        {{ error.statusCode }} | {{ error.message }}
    </p>

    <div v-if="status === 'success'" class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
        <div v-for="anime in animes.results">
            <NuxtLink :to="`/anime/${anime.id}/watch/${anime.episodeNumber}`">
                <AnimeCard :anime="anime"/>
            </NuxtLink>
        </div>
    </div>

    <div v-else class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
        <template v-for="skeleton in 12">
            <div class="skeleton w-180px h-80 rounded"> </div>
        </template>
    </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();
const { status, data: animes, error } = await useFetch(`${config.public.apiBase}/anime/gogoanime/recent-episodes`, {
    lazy: true,
})

</script>

<style scoped>

</style>