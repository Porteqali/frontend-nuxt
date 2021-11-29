<style>
.search_box {
    background-color: var(--search-box-bg-color);
}
.search_box button {
    color: var(--search-box-button-color);
}

#top h1 {
    color: var(--top-h1-color);
    font-weight: 900;
}
</style>

<template>
    <div class="flex flex-col items-center max-w-screen-2xl w-full">
        <!-- <img class="absolute top_img 2xl" src="/backgrounds/Background.png" alt="porteqali-background" /> -->
        <Background />

        <section class="relative flex flex-wrap justify-evenly gap-8 px-8" id="top">
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col text-7xl">
                    <span>با پرتقال</span>
                    <span>همه جا،</span>
                    <span>آموزش ببینید</span>
                </h1>
                <div class="search_box flex items-center gap-4 p-2 rounded-xl shadow-lg">
                    <img class="flex-shrink-0 mr-2" src="/icons/Search.black.svg" width="24" height="24" alt="Search" />
                    <input class="flex-grow outline-none bg-transparent" type="text" placeholder="دوست داری چی یاد بگیری؟" />
                    <button class="orange_gradient_v flex-shrink-0 p-2 px-8 rounded-xl shadow-lg">جستجو</button>
                </div>
            </div>
            <img src="/home/video_call_man.png" width="650px" alt="porteqali-online-learning-platform" />
        </section>
    </div>
</template>

<script>
import Background from "~/components/Background.vue";

export default {
    components: {
        Background,
    },
};
</script>
