<template>
    <dialog id="my_modal_2" class="modal shadow-2xl overflow-hidden">
        <div class="modal-box w-11/12 max-w-7xl overflow-hidden p-0">
            <div class="flex items-center overflow-hidden px-2 py-1 border-b-2">
                <Icon name="ph:magnifying-glass-bold" mode="svg" size="1.8rem" />
                <input
                    v-model="searchValue"
                    type="text"
                    class="flex-grow rounded mx-1 px-4 py-2 bg-inherit focus:outline-none focus:border-none"
                    placeholder="Search"
                />
                <form method="dialog">
                    <button ref="modalCloseButton" class="btn btn-sm btn-circle btn-ghost ">✕</button>
                </form>
            </div>
            <div ref="scrollableDiv" class="p-5 mt-2 pb-48 h-svh overflow-auto">
                <p v-if="status === 'error'">
                    {{ error.statusCode }} | {{ error.message }}
                </p>

                <p v-if="animes.hasNextPage" class="mb-5 text-lg font-semibold">Page {{ pageNumber }}</p>

                <div v-if="searchValue.length === 0" class="mb-5 flex justify-between items-center">
                    <p class="text-lg font-semibold">Recent Searches</p>

                    <button v-if="searchHistory.length > 0" @click="clearHistory()"  class="btn btn-outline btn-danger btn-xs ms-2">
                        <Icon name="material-symbols:delete" mode="svg" size="1rem" />
                        Clear History
                    </button>
                </div>
               
                <ClientOnly fallbackTag="span">
                    <div v-if="searchValue.length === 0" class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div v-for="anime in searchHistory">
                            <NuxtLink @click="closeModal()" :to="`/anime/${anime.id}/watch/1`">
                                <AnimeCard :anime="anime"/>
                            </NuxtLink>
                        </div>
                    </div>
                </ClientOnly>

                <div v-if="status === 'success'" class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    <div v-for="anime in animes.results">
                        <NuxtLink @click="closeModal(anime)" :to="`/anime/${anime.id}/watch/1`">
                            <AnimeCard :anime="anime"/>
                        </NuxtLink>
                    </div>
                </div>

                <div v-else class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    <template v-for="skeleton in 12">
                        <div class="skeleton w-180px h-80 rounded"> </div>
                    </template>
                </div>

                <div v-if="status === 'success'" class="w-full flex justify-end mt-10">
                    <button v-if="pageNumber > 1" @click="pageNumber--" class="btn btn-warning me-4">Previous</button>
                    <button v-if="animes.hasNextPage" @click="pageNumber++" class="btn btn-primary">Next</button>
                </div>
            </div>
        </div>
    </dialog>

</template>

<script setup lang="ts">

const { $search } = useNuxtApp() 

const config = useRuntimeConfig();
const searchValue = ref('')

const modalCloseButton: Ref<HTMLElement | null> = ref(null)
const scrollableDiv: Ref<HTMLDivElement | null> = ref(null);

const searchValueListener = ref('')
const pageNumber = ref(1)

const searchIncrement = ref(1)

const { status, data: animes, error } = await useAsyncData(`search:${searchIncrement.value}`, () => {
    return $fetch(`${config.public.apiBase}/anime/gogoanime/${searchValueListener.value}?page=${pageNumber.value}`)
}, {
    watch: [searchValueListener, pageNumber]
})

const searchHistory = ref($search.getHistory())

watch(searchValue, useDebounce(() => {
    searchValueListener.value = searchValue.value
    pageNumber.value = 1
}, 200))

function closeModal(anime) {
    if(anime) {
        searchHistory.value = $search.storeNewHistory(anime)
    }

    modalCloseButton.value!.click()
}

function clearHistory() {
    searchHistory.value = $search.clearSearchHistory()
}

watch(status, (newVal, oldVal) => {
    if(newVal === 'success') {
        scrollableDiv.value.scrollTo({
            top: 0,
            behavior: 'smooth', 
        });
    }
})

</script>

<style scoped>

</style>