<template>
    <div class="px-10">
        <Watch :url="serverUrl" />
      
        <div class="bg-base-200 rounded-b-lg p-4 pb-0">
            <template v-for="(server, index) in anime.servers">
                <button @click="changeServer(index)" :class="{ 'btn-success': index == serverIndex }" class="btn btn-active btn-secondary me-3 px-6 mb-4">{{ server.name }}</button>
            </template>
        </div>
     
        <div class="bg-base-200 rounded p-4 pb-0 mt-5">
            <template v-for="ep in anime.info.totalEpisodes">
                <button @click="episode = ep" :class="{ 'btn-success': episode == ep }" class="btn btn-active btn-secondary me-3 px-6 mb-4">{{ ep }}</button>
            </template>
        </div>

        <AnimeInfo :anime="anime.info" class="mt-5"/>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig();

const episode = ref(route.params.episode)
const animeId = route.params.animeid

const serverIndex = ref(0)
const serverUrl = ref('')

const { data: anime, status, error } = await useAsyncData(`anime:${animeId}`, async () => {
  const [info, servers] = await Promise.all([
    $fetch(`${config.public.apiBase}/anime/gogoanime/info/${animeId}`, {
        pick: ['status', 'totalEpisodes', 'type', 'subOrDub', 'genres', 'image', 'description', 'title', 'otherName'],
    }),
    $fetch(`${config.public.apiBase}/anime/gogoanime/servers/${animeId}-episode-${episode.value}`)
  ])

  return { info, servers }
})

if(anime.value['servers'].length > 0)
{
    serverUrl.value = anime.value['servers'][0].url
}

function changeServer(index) {
    serverIndex.value = index
    serverUrl.value = anime.value['servers'][index].url
}

watch(episode, async (newEpisode, oldEpisode) => {
    await navigateTo(`/anime/${animeId}/watch/${episode.value}`)
})

useHead({
    title: anime.value.info.title + ' | Episode ' + episode
})

</script>

<style scoped>

</style>