<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Search />
</template>

<script setup lang="ts">
const { $locally } = useNuxtApp()

await useHead({
    htmlAttrs: [{
        'data-theme': $locally.getItem('theme') || ''
    }]
})
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
</style>
