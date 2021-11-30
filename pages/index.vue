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
    <main role="main" class="flex flex-col items-center max-w-screen-4xl w-full">
        <Background />

        <section class="relative flex flex-wrap justify-evenly gap-8 lg:gap-20 px-8" id="top">
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col text-7xl">
                    <span class="kalameh_bold font-bold">با پرتقال</span>
                    <span class="kalameh_bold font-bold">همه جا،</span>
                    <span class="kalameh_bold font-bold">آموزش ببینید</span>
                </h1>
                <div class="search_box flex items-center gap-4 p-2 rounded-xl shadow-lg">
                    <img class="flex-shrink-0 mr-2 hidden md:inline-block" src="/icons/Search.black.svg" width="24" height="24" alt="Search" />
                    <input class="flex-grow outline-none bg-transparent" type="text" placeholder="دوست داری چی یاد بگیری؟" />
                    <button class="orange_gradient_v flex-shrink-0 p-2 md:px-8 rounded-xl shadow-lg flex items-center justify-center">
                        <span class="hidden md:inline-block">جستجو</span>
                        <img class="flex-shrink-0 inline-block md:hidden" src="/icons/Search.svg" width="24" height="24" alt="Search" />
                    </button>
                </div>
            </div>
            <img ref="boyImg" :src="boyImg[boyImgIndex]" width="650px" alt="porteqali-online-learning-platform" @click="boyClick()" />
        </section>

        <DepartmentSection class="my-20" />

        <section class="relative flex flex-wrap justify-evenly gap-8 lg:gap-20 px-8" id="roadmap">
            <div class="flex flex-col gap-6">
                <h2 class="text-3xl font-bold">دوست داری تو چه حوزه ی فعالیت کنی؟</h2>
                <p class="max-w-screen-sm">
                    اگر نمیدونی به چی علاقه داری، کافیه جواب سوالایی که براتون میفرستیم رو بدید تا ما بگیم به چی علاقه داری و نقشه راهی بدیم بهت که کارتو خیلی جلو
                    میندازه
                </p>
                <button class="orange_gradient_h flex items-center rounded-xl gap-2 p-4 w-max">
                    <span>دوست داری چی یاد بگیری؟</span>
                    <img class="flex-shrink-0 inline-block md:hidden" src="/icons/Search.svg" width="24" height="24" alt="Search" />
                </button>
            </div>
            <div></div>
        </section>
    </main>
</template>

<script>
require("~/assets/css/swiper.min.css");
import Background from "~/components/Background.vue";
import DepartmentSection from "~/components/home/Department.section";

export default {
    components: {
        Background,
        DepartmentSection,
    },
    data() {
        return {
            boyImg: ["/home/With a Dog (Man).png", "/home/video_call_man.png"],
            boyImgIndex: 0,
        };
    },
    methods: {
        boyClick() {
            this.boyImgIndex = this.boyImgIndex == 0 ? 1 : 0;
        },
    },
};
</script>
