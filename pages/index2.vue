<style scoped>
.search_box {
    background-color: var(--search-box-bg-color);
    color: var(--search-box-color);
}
.search_box button {
    color: var(--search-box-button-color);
}

#top h1 {
    font-weight: 900;
}

#roadmap .roadmap_vision_img {
    /* background-color: var(--header-nav-container-bg-color); */
    background-color: #ffffff55;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-24 lg:gap-28 max-w-screen-2xl w-full mt-10 lg:mt-0">
        <img src="/backgrounds/Background.svg" class="absolute left-0 w-1/2 max-w-3xl hidden xl:flex" alt="Background">

        <section class="relative flex flex-wrap items-center justify-evenly gap-8 lg:gap-20" id="top">
            <div class="flex flex-col gap-10">
                <h1 class="flex flex-col gap-4 text-5xl lg:text-7xl text-orange-500">
                    <span class="kalameh_extra_bold font-bold">با پرتقال</span>
                    <span class="kalameh_extra_bold font-bold">همه جا،</span>
                    <span class="kalameh_extra_bold font-bold">آموزش ببینید</span>
                </h1>
                <form class="search_box flex items-center gap-4 p-2 rounded-xl shadow-lg" @submit="goToSearchPage($event)">
                    <img class="flex-shrink-0 mr-2 hidden md:inline-block" src="/icons/Search.duo.svg" width="24" height="24" alt="Search" />
                    <input class="flex-grow outline-none bg-transparent w-64" v-model="search" type="text" placeholder="دوست داری چی یاد بگیری؟" />
                    <button type="submit" class="orange_gradient_v flex-shrink-0 p-2 md:px-8 rounded-xl shadow-lg flex items-center justify-center">
                        <span class="hidden md:inline-block">جستجو</span>
                        <img class="flex-shrink-0 inline-block md:hidden" src="/icons/Search.svg" width="24" height="24" alt="Search" />
                    </button>
                </form>
            </div>
            <!-- <img ref="boyImg" src="/pages/home/Video Call (Man).webp" width="768px" alt="porteqali-online-learning-platform" /> -->
            <img class="boyImg w-full max-w-2xl" loading="lazy" :src="topImageList[topImageIndex]" alt="porteqali-online-learning-platform" @click="changeBoy()" />
        </section>

        <DepartmentSection />

        <MostViewedCoursesSection />

        <section class="flex flex-wrap-reverse justify-between gap-8 lg:gap-20 w-full my-12" id="roadmap">
            <img
                class="absolute w-auto right-0"
                src="/backgrounds/Background.side.svg"
                loading="lazy"
                alt="porteqali-background"
                style="max-height: 100vw; margin-bottom: -55vw"
            />
            <div class="flex flex-col gap-6 z-10 py-2">
                <h2 class="text-4xl font-bold">دوست داری تو چه حوزه ی فعالیت کنی؟</h2>
                <p class="max-w-xl text-lg flex-grow">
                    اگر نمیدونی به چی علاقه داری، کافیه جواب سوالایی که براتون میفرستیم رو بدید تا ما بگیم به چی علاقه داری و نقشه راهی بدیم بهت که کارتو خیلی جلو
                    میندازه
                </p>
                <button class="orange_gradient_h flex items-center rounded-xl shadow-lg gap-2 p-4 w-max cursor-pointer">
                    <span class="text-xl">دوست داری چی یاد بگیری؟</span>
                    <img src="/icons/Discovery.gray.svg" width="32" height="32" alt="Search" />
                </button>
            </div>
            <div class="roadmap_vision_img rounded-3xl shadow-xl py-2 blur z-10">
                <img class="" src="/pages/home/Vision&Missi.png" loading="lazy" alt="porteqali-vision" />
            </div>
        </section>

        <TestimonialSection />

        <FaqSection />

        <section class="flex flex-wrap-reverse items-end justify-between gap-8 lg:gap-20 w-full mt-16 xl:max-h-96" id="certificate">
            <div class="flex flex-col gap-6 mt-10 z-10">
                <h2 class="text-4xl font-bold">حاضری برای خودت سرمایه گذاری کنی؟</h2>
                <p class="max-w-screen-sm text-xl font-bold" style="line-height: 2.25rem">
                    دسترسی به همه دوره های آموزشی، دریافت گواهینامه های پایان دوره و خیلی امکانات دیگر را با پیشنهاد های عالی از پرتقال دریافت کن!
                </p>
                <button class="orange_gradient_h flex items-center gap-2 rounded-xl shadow-lg mt-20 p-4 w-max cursor-pointer">
                    <span class="text-xl">استعلام گواهینامه آموزشی</span>
                    <img src="/icons/Scan.svg" width="32" height="32" alt="Scan" />
                </button>
            </div>
            <img src="/pages/home/certificates.webp" alt="porteqali-certificates" style="width: 620px" />
        </section>

        <BlogSection />

        <NewsSection />
    </main>
</template>

<script>
require("~/assets/css/swiper.min.css");
import Background from "~/components/web/Background.vue";
import DepartmentSection from "~/components/web/home/Department.section";
import MostViewedCoursesSection from "~/components/web/home/MostViewedCourses.section";
import TestimonialSection from "~/components/web/home/Testimonial.section";
import FaqSection from "~/components/web/home/FAQ.section";
import BlogSection from "~/components/web/home/Blog.section";
import NewsSection from "~/components/web/home/News.section";

export default {
    layout: "default2",
    head: {
        title: "گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: {
        Background,
        DepartmentSection,
        MostViewedCoursesSection,
        TestimonialSection,
        FaqSection,
        BlogSection,
        NewsSection,
    },
    data() {
        return {
            search: "",

            topImageIndex: 0,
            topImageList: ["/pages/home/1.png", "/pages/home/3.png"],
        };
    },
    methods: {
        changeBoy() {
            this.topImageIndex = this.topImageIndex ? 0 : 1;
        },

        goToSearchPage(e) {
            e.preventDefault();
            this.$router.push(`/search/${this.search}`);
        },
    },
};
</script>
