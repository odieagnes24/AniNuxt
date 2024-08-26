<template>
    <div class="navbar bg-base-100 px-10">
        <div class="container mx-auto">
            <div class="flex-1">
                <NuxtLink to="/" class="btn btn-ghost text-xl">
                    <img src="/static/logo.webp" alt="App Logo" class="w-32">
                </NuxtLink>
            </div>
            <div class="flex justify-center align-middle">
                <a href="https://github.com/odieagnes24/AniNuxt" target="_blank" class="btn btn-ghost btn-circle">
                    <Icon name="akar-icons:github-fill" mode="svg" size="1.8rem" />
                </a>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <Icon name="mdi:theme" mode="svg" size="1.8rem" />
                    </div>
                    <ul
                        tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <template v-for="theme in appConfig.themes">
                            <li>
                                <a @click="setTheme(theme)">
                                    {{ theme }}
                                </a>
                            </li>
                        </template>
                    </ul>
                </div>
                
                <a href="#" onclick="my_modal_2.showModal()" class="btn btn-ghost btn-circle">
                    <Icon name="ph:magnifying-glass-bold" mode="svg" size="1.8rem" />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $locally } = useNuxtApp()
const appConfig  = useAppConfig()

function setTheme(theme) {

    $locally.setItem('theme', theme)

    useHead({
        htmlAttrs: [{
            'data-theme': theme
        }]
    })
}
</script>

<style scoped>

</style>