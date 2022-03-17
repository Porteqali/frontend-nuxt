<style scoped>
.board {
    border: 0.9rem solid #c7c4c1;
    border-radius: 2rem;
    /* box-shadow: 0px 0px 0px 1.25rem #c7c4c1, 0px 15px 15px rgba(0, 0, 0, 7%); */
}

.portal {
    filter: drop-shadow(0px 0px 105px rgba(30, 0, 30, 40%));
}

.spacer {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, #e0af8b 49.48%, rgba(255, 255, 255, 0.13) 100%);
}

@media (min-width: 768px) {
    .board {
        border-width: 1.25rem;
        border-radius: 3rem;
    }
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 lg:gap-24 max-w-screen-2xl w-full mt-24 md:mt-28">
        <section class="relative flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-8 px-4 md:px-8 w-full">
            <div class="board w-full max-w-screen-lg bg-warmgray-600 flex flex-col gap-6 md:gap-10 p-6 md:p-12 md:pl-52 flex-shrink-0">
                <strong class="text-xs text-warmgray-50 font-normal -mb-8 md:-mb-12">حاضری برای خودت سرمایه گذاری کنی؟</strong>
                <h1 class="flex flex-col gap-2 md:gap-4 text-warmgray-100 w-full max-w-screen-lg">
                    <div class="flex items-center gap-4">
                        <span class="kalameh_black text-4xl lg:text-6xl font-bold">با</span>
                        <span class="orange_text_gradient kalameh_black text-5xl lg:text-7xl font-bold">پرتقال</span>
                    </div>
                    <span class="kalameh_black text-4xl lg:text-6xl font-bold">آموزش خودت رو شروع کن!</span>
                </h1>
                <p class="kalameh_bold text-sm md:text-base text-warmgray-300">
                    این روزها بازار آموزش های مجازی داغ است و همه از فرصت ایجاد شده نهایت استفاده را انجام می دهند و وقت را تلف نمی کنند.
                </p>
                <form class="search_box flex items-center gap-4 p-1 md:p-2 rounded-2xl shadow-lg bg-white" @submit="goToSearchPage($event)">
                    <input class="flex-grow outline-none bg-transparent w-64 text-sm mr-2" v-model="search" type="text" placeholder="دوست داری چی یاد بگیری؟" />
                    <button type="submit" class="orange_gradient_h flex-shrink-0 p-2 rounded-2xl shadow-lg flex items-center justify-center">
                        <Icon class="w-7 h-7 bg-gray-100" size="28px" folder="icons/new" name="Search" />
                    </button>
                </form>
                <ul class="flex flex-wrap items-center justify-around gap-3 md:gap-8">
                    <li class="flex flex-col items-center justify-center gap-4">
                        <Icon class="w-10 h-10 bg-orange-400" size="40px" folder="icons/new" name="User3" />
                        <strong class="kalameh_bold text-orange-400 opacity-90 text-xl md:text-4xl" dir="ltr">50,000+</strong>
                        <b class="kalameh_bold md:text-lg text-warmgray-200">کاربر فعال</b>
                    </li>
                    <li class="flex flex-col items-center justify-center gap-4">
                        <Icon class="w-10 h-10 bg-orange-400" size="40px" folder="icons/new" name="Voice3" />
                        <strong class="kalameh_bold text-orange-400 opacity-90 text-xl md:text-4xl" dir="ltr">23</strong>
                        <b class="kalameh_bold md:text-lg text-warmgray-200">مدرس برتر</b>
                    </li>
                    <li class="flex flex-col items-center justify-center gap-4">
                        <Icon class="w-10 h-10 bg-orange-400" size="40px" folder="icons/new" name="Play" />
                        <strong class="kalameh_bold text-orange-400 opacity-90 text-xl md:text-4xl" dir="ltr">2,000+</strong>
                        <b class="kalameh_bold md:text-lg text-warmgray-200">ویدیو آموزشی</b>
                    </li>
                </ul>
            </div>
            <div class="relative flex items-center justify-center flex-shrink -mt-16 md:-mt-0 -mr-0 md:-mr-96">
                <img
                    class="portalGirl relative w-screen max-w-3xl md:max-w-2xl xl:max-w-3xl z-10"
                    loading="lazy"
                    src="/pages/home/gal.png"
                    alt="porteqali-online-learning-platform"
                />
                <img class="portal absolute -left-1/4 w-screen max-w-3xl" src="/backgrounds/Background.home2.svg" alt="Background" />
            </div>
        </section>

        <DepartmentSection />

        <section class="flex flex-col items-center justify-between gap-8 px-4 md:px-8 w-full max-w-screen-2xl">
            <div class="flex flex-col items-center gap-4">
                <h2 class="kalameh_bold text-4xl text-center">آموزش خودت رو همین الان شروع کن</h2>
                <span class="kalameh_bold opacity-75 text-lg">دوست داری تو چه حوزه ای فعالیت کنی؟</span>
            </div>
            <p class="w-full max-w-screen-md text-center">
                اگر نمیدونی به چی علاقه داری، کافیه جواب سوالایی که براتون میفرستیم رو بدید تا ما بگیم به چی علاقه داری و نقشه راهی بدیم بهت که کارتو خیلی جلو
                میندازه!
            </p>
            <nuxt-link class="orange_gradient_h p-4 px-8 rounded-xl text-sm md:text-lg shadow-lg" to="/where-to-start">شروع پرسش و پاسخ</nuxt-link>
            <img class="-mt-36" src="/misc/start.png" loading="lazy" alt="where-to-start" />
        </section>

        <TestimonialSection />

        <span class="spacer w-0.5 h-24 -my-12"></span>

        <NewsSection />

        <BlogSection />

        <NewsletterSection />
    </main>
</template>

<script>
require("~/assets/css/swiper.min.css");
import Icon from "~/components/Icon.vue";
import Background from "~/components/web/Background.vue";
import DepartmentSection from "~/components/web/home/Department.section";
import MostViewedCoursesSection from "~/components/web/home/MostViewedCourses.section";
import TestimonialSection from "~/components/web/home/Testimonial.section";
import BlogSection from "~/components/web/home/Blog.section";
import NewsSection from "~/components/web/home/News.section";
import NewsletterSection from "~/components/web/home/Newsletter.section";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: {
        Icon,
        Background,
        DepartmentSection,
        MostViewedCoursesSection,
        TestimonialSection,
        BlogSection,
        NewsSection,
        NewsletterSection,
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([await this.getMetadata("home")]);
    },
    data() {
        return {
            search: "",
        };
    },
    methods: {
        goToSearchPage(e) {
            e.preventDefault();
            this.$router.push(`/search/${this.search}`);
        },
    },
};
</script>
