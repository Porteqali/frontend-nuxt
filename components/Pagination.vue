<style></style>

<template>
    <ul class="flex items-center gap-4">
        <li><nuxt-link class="flex items-center justify-center p-3 w-8 h-8 rounded-full" to="#">&lt;</nuxt-link></li>
        <li><nuxt-link class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-indigo-100" to="#">1</nuxt-link></li>
        <li><nuxt-link class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-indigo-100" to="#">2</nuxt-link></li>
        <li><nuxt-link class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-indigo-100" to="#">3</nuxt-link></li>
        <li><nuxt-link class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-indigo-100" to="#">...</nuxt-link></li>
        <li><nuxt-link class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-indigo-100" to="#">8</nuxt-link></li>
        <li><nuxt-link class="flex items-center justify-center p-3 w-8 h-8 rounded-full" to="#">&gt;</nuxt-link></li>
    </ul>
</template>

<script>
export default {
    name: "Pagination",
    props: ["url", "page", "total", "pageTotal"],
};
</script>
