<template>
    <div class="p-5">
        <p v-if="status === 'error'">
            {{ error.statusCode }} | {{ error.message }}
        </p>

        <div v-if="status === 'success'">
            <template v-for="anime in animes.results">
                <NuxtLink :to="`/anime/${anime.id}/watch/${anime.episodeNumber}`">
                    <div class="mb-5 flex rounded text-neutral-500 hover:text-inherit transition ease-in-out delay-150 hover:bg-base-300 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 duration-200">
                        <img 
                            class="w-44 h-20 object-cover rounded-l"
                            :src="anime.image" 
                            alt="anime thumb"
                        >
                        <div class="ms-2">
                            <p class="w-56 truncate">{{ anime.title }}</p>
                            <div class="badge badge-primary badge-outline">EP {{ anime.episodeNumber }}</div>
                        </div>
                    </div>
                </NuxtLink>
            </template>

        </div>
  
        <div v-else>
            <template v-for="skeleton in 10">
                <div class="skeleton mb-5 h-20 w-full rounded"></div>
            </template>
        </div>
        
        <div v-if="status === 'success'" class="w-full flex justify-between mt-10 items-center">
            <p v-if="animes.hasNextPage">Page {{ pageNumber }}</p>
            <div>
                <button v-if="pageNumber > 1" @click="pageNumber--" class="btn btn-warning me-4">Previous</button>
                <button v-if="animes.hasNextPage" @click="pageNumber++" class="btn btn-primary">Next</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig();

const pageNumber = ref(1)

const { status, data: animes, error } = await useFetch(`${config.public.apiBase}/anime/gogoanime/top-airing`, {
    lazy: true,
    query: {
        page: pageNumber
    }
})
</script>

<style scoped>

</style>