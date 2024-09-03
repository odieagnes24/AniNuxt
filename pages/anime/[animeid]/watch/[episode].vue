<template>
    <div class="p-10">
        <div class="grid grid-cols-12 gap-4">
            <div v-if="status === 'success'"  class="md:col-span-8 col-span-12">
                <Watch :url="serverUrl" />
                <div class="bg-base-200 rounded-b-lg p-4 pb-4 sm:pb-0">
                    <div class="hidden md:block">
                        <template v-for="(server, index) in anime.servers">
                            <button @click="changeServer(index)" :class="{ 'btn-success': index == serverIndex }" class="btn btn-active btn-secondary me-3 px-6 mb-4">{{ server.name }}</button>
                        </template>
                    </div>
        
                    <div class="inline-block md:hidden me-2">
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text">Server</span>
                            </div>
                            <select class="select select-bordered w-full max-w-xs" v-model="serverIndex">
                                <template v-for="(server, index) in anime.servers">
                                    <option :value="index" :selected="index == serverIndex">{{ server.name }}</option>
                                </template>
                            </select>
                        </label>
                    </div>

                    <div class="inline-block md:hidden">
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text">Episode</span>
                            </div>
                            <select class="select select-bordered w-full max-w-xs" v-model="episode">
                                <template v-for="ep in anime.info.totalEpisodes">
                                    <option :value="ep" :selected="episode == ep">{{ ep }}</option>
                                </template>
                            </select>
                        </label>
                    </div>
                </div>
            
                <div class="bg-base-200 rounded p-4 pb-0 mt-5 hidden md:block">
                    <template v-if="anime.info.totalEpisodes <= 25" v-for="ep in anime.info.totalEpisodes">
                        <button @click="episode = ep" :class="{ 'btn-success': episode == ep }" class="btn btn-active btn-secondary me-3 px-6 mb-4">{{ ep }}</button>
                    </template>

                    <div v-if="anime.info.totalEpisodes > 25" class="pb-8">
                        <label class="form-control w-full max-w-xs ">
                            <div class="label">
                                <span class="label-text">Episode</span>
                            </div>
                            <select class="select select-bordered w-full max-w-xs" v-model="episode">
                                <template v-for="ep in anime.info.totalEpisodes">
                                    <option :value="ep" :selected="episode == ep">{{ ep }}</option>
                                </template>
                            </select>
                        </label>
                    </div>
                </div>

                <AnimeInfo :anime="anime.info" class="mt-5"/>
            </div>
            
            <div v-else class="md:col-span-8 col-span-12">
                <div class="aspect-[16/9] bg-black mx-auto skeleton rounded-none"></div>
                <div class="bg-base-200 rounded-none rounded-b-lg p-4 pb-4 sm:pb-0 skeleton h-20"></div>
                <div class="bg-base-200 p-4 pb-4 sm:pb-0 skeleton h-20 mt-5"></div>
                <div class="bg-base-200 p-4 pb-4 sm:pb-0 skeleton h-72 mt-5"></div>
            </div>

            <WatchList />
        </div>
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
}, {
    lazy: true,
})

watch(status, function (newVal, oldVal) {
    if(newVal === 'success') {
        if(anime.value['servers'].length > 0)
        {
            const priorityServer =  anime.value['servers'].findIndex(server => server.name === "Streamwish")
            const priorityServer2 =  anime.value['servers'].findIndex(server => server.name === "Vidhide")

            console.log(priorityServer, priorityServer2)

            if(priorityServer != -1) {
                serverIndex.value = priorityServer
            }
            else {
                if(priorityServer2 != -1) { 
                    serverIndex.value = priorityServer2
                }
            }

            serverUrl.value = anime.value['servers'][serverIndex.value].url
        }

        useHead({
            title: anime.value.info.title + ' | Episode ' + episode.value
        })
    }
})

function changeServer(index) {
    serverIndex.value = index
    serverUrl.value = anime.value['servers'][index].url
}

watch(episode, async (newEpisode, oldEpisode) => {
    await navigateTo(`/anime/${animeId}/watch/${episode.value}`)
})

watch(serverIndex, async (newServer, oldServer) => {
    changeServer(newServer)
})


</script>

<style scoped>

</style>