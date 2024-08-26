<template>
    <div class="aspect-[16/9] bg-black mx-auto">
        <iframe class="w-full h-full" :src="url" sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation"  frameborder="0" allowfullscreen></iframe>
    </div>
</template>

<script setup lang="ts">
const { url } = defineProps(['url'])
</script>

<style scoped>

</style>