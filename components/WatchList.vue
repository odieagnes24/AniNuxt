<template>
    <div class="md:col-span-4 col-span-12 bg-base-10 bg-base-200 rounded">
        <div role="tablist" class="tabs tabs-boxed">
            <a role="tab" @click="tab = 'top-airing'" :class="{ 'tab-active': tab == 'top-airing' }" class="tab">Top Airing</a>
            <a role="tab" @click="tab = 'history'" :class="{ 'tab-active': tab == 'history' }" class="tab">History</a>
        </div>

        <TopAiring v-show="tab == 'top-airing'"/>

        <div v-show="tab == 'history'">
            <ClientOnly fallbackTag="span">
                <WatchHistory />
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">

const tab = ref('top-airing')

</script>

<style scoped>

</style>