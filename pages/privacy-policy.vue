<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <!-- <Background src="/backgrounds/Background2.png" :topOffset="-30" :rightOffset="-10" :minWidth="2420" /> -->

        <section class="relative flex flex-wrap justify-evenly gap-8 lg:gap-20" id="top">
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col gap-4 text-7xl">
                    <span class="kalameh_bold font-bold">حریم خصوصی</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>حریم خصوصی</li>
                </ul>
            </div>
        </section>

        <article class="w-full min-h-screen p-8 mt-20 rounded-2xl max-w-screen-2xl shadow-2xl z-10 bg-white">
            <p></p>
        </article>
    </main>
</template>

<script>
import Background from "~/components/Background";

export default {
    scrollToTop: true,
    head: {
        title: "حریم خصوصی - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: {
        Background,
    },
    mounted() {},
};
</script>
