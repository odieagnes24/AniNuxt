<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Search />
</template>

<script setup lang="ts">

const currentTheme = useCookie('theme')

await useHead({
    htmlAttrs: [{
        'data-theme': currentTheme || ''
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
