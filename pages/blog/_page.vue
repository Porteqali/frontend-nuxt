<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}

.top_article_card {
    background-color: #000c7880;
    font-weight: initial;
    width: 110vw;
    margin-right: 10%;
    margin-left: -10vw;
}
.article_card {
    background-color: #3f0e4780;
    color: var(--top-h1-color);
}
.article_card img {
    max-height: 16rem;
}
.article_category {
    border-radius: 0 1rem 0 1rem;
    background-color: #3f0e47bb;
}

@media (min-width: 768px) {
    .article_card img {
        max-height: initial;
    }
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <section class="relative flex flex-col lg:flex-row justify-center items-center w-full" id="top">
            <div class="flex flex-wrap-reverse items-end justify-center flex-grow w-full">
                <img class="" src="/pages/blog/SchoolMan.png" alt="porteqali-SchoolMan" style="max-height: 1920px" />
                <div class="flex flex-col gap-10 mt-28">
                    <h1 class="flex flex-col gap-4 text-7xl">
                        <span class="kalameh_bold font-bold">وبلاگ</span>
                    </h1>
                    <ul class="flex items-center gap-2 font-light">
                        <li><nuxt-link to="/">صفحه اصلی</nuxt-link></li>
                        <li>&gt;</li>
                        <li>وبلاگ</li>
                    </ul>
                </div>
            </div>
            <div class="top_article_card blur rounded-3xl p-8 ml-0 mr-auto">
                <div class="flex flex-col gap-4 max-w-xs">
                    <span class="text-blue-300">{{ topArticle.category }}</span>
                    <h3 class="font-bold text-2xl">{{ topArticle.title }}</h3>
                    <p>{{ topArticle.description }}</p>
                    <nuxt-link
                        class="flex items-center justify-center gap-2 p-3 px-6 rounded-full w-max bg-lightblue-200 text-blue-900 shadow-lg"
                        :to="topArticle.link"
                        :title="topArticle.title"
                    >
                        <span>مطالعه مقاله</span>
                        <img src="/icons/Document.orange.svg" alt="Document" />
                    </nuxt-link>
                </div>
            </div>
        </section>

        <img class="-mb-24" src="/misc/dots.svg" alt="dots" />

        <section class="relative flex flex-col gap-8 w-full" id="most-viewed-articles">
            <div class="flex flex-wrap justify-between items-center gap-8 w-full">
                <h2 class="font-bold text-4xl">محبوب ترین بلاگ ها</h2>
                <nuxt-link class="flex items-center gap-1" to="#" title="محبوب ترین بلاگ ها">
                    <span>مشاهده همه</span>
                    <img src="/icons/ArrowLeft.line.svg" alt="ArrowLeft" />
                </nuxt-link>
            </div>
            <div v-swiper="popularArticlesSwiperOptions" class="w-full max-w-screen-4xl select-none overflow-hidden p-4">
                <ul class="swiper-wrapper flex items-start">
                    <li
                        class="swiper-slide article_card shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl max-w-screen-sm"
                        v-for="(popularArticle, i) in popularArticles"
                        :key="i"
                    >
                        <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full sm:w-64">
                            <img class="max-w-screen-sm w-full sm:h-full object-cover" src="/misc/article.png" alt="course" draggable="false" />
                            <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2">جدید</span>
                        </div>
                        <div class="flex flex-col gap-6 pt-2">
                            <h3 class="font-bold text-2xl overflow-hidden overflow-ellipsis whitespace-nowrap">آموزش طراحی سایت</h3>
                            <p class="max-w-xs opacity-75">
                                دیلوت اب یگتخاس نتم موسپیا مرولاب و پاچ تعنص زا موهفمان یگداساهرگپاچ .تسا کیفارگ ناحارط زا هدافتساو نوتس رد هلجم و همانزور هکلب نوتم
                                وطیارش یارب و تسا مزال هک نانچنآرطس... یلعف
                            </p>
                            <div class="flex flex-wrap justify-between items-center gap-4">
                                <div class="flex items-start gap-2">
                                    <img src="/misc/Figma.svg" alt="Figma" width="32" height="32" />
                                    <div class="flex flex-col gap-1">
                                        <small>محمد گودرزی</small>
                                        <small class="opacity-75">آبان 1400</small>
                                    </div>
                                </div>
                                <span class="flex items-end gap-1">
                                    <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                                    <small>175</small>
                                </span>
                            </div>
                            <button class="gray_gradient flex items-center justify-center gap-4 shadow-md py-3 px-8 mt-auto mb-0 rounded-xl">مطالعه</button>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section class="relative flex flex-col gap-8 w-full" id="articles">
            <div class="flex flex-wrap justify-between items-center gap-8 w-full">
                <h2 class="font-bold text-4xl">آرشیو مقالات</h2>
                <div class="flex flex-wrap gap-4 w-max">
                    <div class="flex items-center gap-1">
                        <img src="/icons/Filter.svg" alt="Filter" width="24" height="24" />
                        <span class="flex flex-shrink-0">مرتب سازی بر اساس</span>
                        <Select :selectedOption.sync="selectedArticleOrder" :options="articleOrderOptions" placeholder="انتخاب کنید">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
                    </div>
                    <div class="flex items-center gap-1">
                        <img src="/icons/Category.black.svg" alt="Category" width="24" height="24" />
                        <span class="flex flex-shrink-0">دسته بندی</span>
                        <Select :selectedOption.sync="selectedArticleCategory" :options="articleCategoryOptions" placeholder="انتخاب کنید">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
                    </div>
                </div>
            </div>
            <ul class="flex flex-wrap justify-center md:justify-start gap-6">
                <li class="flex" v-for="(article, i) in articles" :key="i">
                    <nuxt-link class="article_card flex flex-col gap-4 p-4 rounded-xl w-full sm:max-w-xs" to="#" title="">
                        <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-64">
                            <img class="max-w-screen-sm w-full object-cover" src="/misc/course.png" alt="course" draggable="false" />
                            <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2">جدید</span>
                        </div>
                        <h3 class="font-bold text-2xl overflow-hidden overflow-ellipsis whitespace-nowrap">آموزش طراحی سایت</h3>
                        <p class="max-w-xs opacity-75">
                            دیلوت اب یگتخاس نتم موسپیا مرولاب و پاچ تعنص زا موهفمان یگداساهرگپاچ .تسا کیفارگ ناحارط زا هدافتساو نوتس رد هلجم و همانزور هکلب نوتم
                        </p>
                        <div class="flex flex-wrap justify-between items-center gap-4">
                            <div class="flex items-start gap-2">
                                <img src="/misc/Figma.svg" alt="Figma" width="32" height="32" />
                                <div class="flex flex-col gap-1">
                                    <small>محمد گودرزی</small>
                                    <small class="opacity-75">آبان 1400</small>
                                </div>
                            </div>
                            <span class="flex items-end gap-1">
                                <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                                <small>175</small>
                            </span>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
            <Pagination
                class="flex items-center justify-center w-full"
                :url="`/blog/:page?order=${selectedArticleOrder.value}&category=${selectedArticleCategory.value}`"
                :page.sync="articlesPage"
                :total="articlesTotal"
                :pageTotal="articlesPageTotal"
            />
        </section>
    </main>
</template>

<script>
import Select from "~/components/forms/Select.vue";
import Pagination from "~/components/Pagination.vue";

export default {
    head: {
        title: "وبلاگ - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: { Select, Pagination },
    data() {
        return {
            topArticle: {
                title: "نرم افزار اییوز چیست و چه کاربردی دارد؟",
                description:
                    "نرم افزار ایویوز یکی از نرم‌افزار‌های آماری و اقتصادسنجی به روز است که ابزاری تحلیلی برای کاربران فراهم می‌کند و بکارگیری آن با سهولت همراه…",
                category: "برنامه نویسی",
                link: "/article/2323/title",
            },

            popularArticles: [{}, {}, {}],
            popularArticlesSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                spaceBetween: 16,
                loop: true,
                freeMode: true,
            },

            selectedArticleOrder: { name: "", value: "" },
            articleOrderOptions: [
                { name: "جدیدترین", value: "newest" },
                { name: "قدیمی ترین", value: "oldest" },
                { name: "محبوب ترین", value: "most-popular" },
            ],
            selectedArticleCategory: { name: "", value: "" },
            articleCategoryOptions: [{ name: "همه", value: "" }],

            articles: [{}, {}, {}, {}],
            articlesPage: 1,
            articlesTotal: 0,
            articlesPageTotal: 1,
        };
    },
};
</script>
