<template>
    <dialog id="my_modal_2" class="modal shadow-2xl overflow-hidden">
        <div class="modal-box w-11/12 max-w-7xl overflow-hidden">
            <div class="flex items-center overflow-hidden">
                <Icon name="ph:magnifying-glass-bold" mode="svg" size="1.8rem" />
                <input
                    v-model="searchValue"
                    type="text"
                    class="flex-grow rounded ms-2 px-4 py-2"
                    placeholder="Search"
                />
                <form method="dialog">
                    <button ref="modalCloseButton" class="btn btn-sm btn-circle btn-ghost ms-2">✕</button>
                </form>
            </div>
            <div ref="scrollableDiv" class="p-5 mt-2 pb-48 h-svh overflow-auto">
                <p v-if="status === 'error'">
                    {{ error.statusCode }} | {{ error.message }}
                </p>

                <p v-if="animes.hasNextPage" class="mb-5">Page {{ pageNumber }}</p>

                <div v-if="status === 'success'" class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    <div v-for="anime in animes.results">
                        <NuxtLink @click="closeModal" :to="`/anime/${anime.id}/watch/1`">
                            <AnimeCard :anime="anime"/>
                        </NuxtLink>
                    </div>
                </div>

                <div v-else class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
                    <div class="skeleton w-180px h-80 rounded"> </div>
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

watch(searchValue, useDebounce(() => {
    searchValueListener.value = searchValue.value
    pageNumber.value = 1
}, 200))

function closeModal() {
    modalCloseButton.value!.click()
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