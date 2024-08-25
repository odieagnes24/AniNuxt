<template>
    <div class="navbar bg-base-100 px-10">
        <div class="container mx-auto">
            <div class="flex-1">
                <NuxtLink to="/" class="btn btn-ghost text-xl">
                    <img src="/static/logo.webp" alt="App Logo" class="w-32">
                </NuxtLink>
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal p-0">
                    <li>
                        <a href="#" onclick="my_modal_2.showModal()" class="rounded-full p-1">
                            <Icon name="ph:magnifying-glass-bold" mode="svg" size="1.8rem" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>