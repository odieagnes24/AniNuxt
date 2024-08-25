<template>
    <div class="aspect-[16/9] bg-black mx-auto">
        <iframe class="w-full h-full" :src="url"  frameborder="0" allowfullscreen></iframe>
    </div>
</template>

<script setup lang="ts">
const { url } = defineProps(['url'])
</script>

<style scoped>

</style>