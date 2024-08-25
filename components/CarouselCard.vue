<template>
    <p v-if="status === 'error'">
        {{ error.statusCode }} | {{ error.message }}
    </p>

    <Carousel :wrapAround=true :autoplay="5000" v-if="status === 'success'" class="grow">
        <Slide v-for="anime in animes.results" :key="anime.id">
            <div 
                class="carousel__item rounded h-96 p-10 bg-gradient-to-r from-cyan-500 to-blue-500" 
            >
                <div class="flex self-center">
                    <div class="flex-none w-56 self-center">
                        <img
                            class="w-52 mx-auto rounded shadow-sm"
                            :src="anime.image"
                            alt="Anime Thumb" 
                        />
                    </div>
                    <div class="flex-initial w-full text-start px-5">
                        <p class="text-6xl">{{ anime.title }}</p>
                        <p class="mt-4">Episode {{ anime.episodeNumber }}</p>
                        <div>
                            <template v-for="genre in anime.genres">
                                <span class="badge badge-white badge-outline me-2">{{ genre }}</span>
                            </template>
                        </div>
                        
                        <NuxtLink :to="`/anime/${anime.id}/watch/${anime.episodeNumber}`">
                            <button class="btn btn-primary mt-4">Watch</button>
                        </NuxtLink>
                        
                    </div>
                </div>
            </div>
        </Slide>

        <template #addons>
            <Navigation />
        </template>
    </Carousel>

    <div v-else class="skeleton h-96 w-full rounded"></div>

</template>

<script setup lang="ts">

const config = useRuntimeConfig();
const { status, data: animes, error } = await useFetch(`${config.public.apiBase}/anime/gogoanime/top-airing`, {
    lazy: true,
})

</script>

<style scoped>
.carousel__viewport {
    width: 100% !important;
}
.carousel__item {
    font-size: 20px;
    /* border-radius: 8px; */
    width: 100% !important;
}

/* .carousel__slide {
  
} */

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>