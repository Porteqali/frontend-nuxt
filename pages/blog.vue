<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}

.top_article_card {
    background-color: #000c7880;
    font-weight: initial;
    width: 90vw;
    margin-right: 20%;
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
                        <li><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                        <li>&gt;</li>
                        <li>وبلاگ</li>
                    </ul>
                </div>
            </div>
            <div class="top_article_card blur rounded-3xl p-8 ml-0 mr-auto" v-if="!topArticleLoading">
                <div class="flex flex-col gap-4 max-w-xs">
                    <span class="text-blue-300" v-if="!!topArticle.category">{{ topArticle.category.name }}</span>
                    <h3 class="font-bold text-2xl">{{ topArticle.title }}</h3>
                    <p>{{ topArticle.description }}</p>
                    <nuxt-link
                        class="flex items-center justify-center gap-2 p-3 px-6 rounded-full w-max bg-lightblue-200 text-blue-900 shadow-lg"
                        :to="`/article/${topArticle.slug}`"
                        :title="topArticle.title"
                    >
                        <span>مطالعه مقاله</span>
                        <img src="/icons/Document.orange.svg" alt="Document" />
                    </nuxt-link>
                </div>
            </div>
            <div class="top_article_card blur rounded-3xl p-8 ml-0 mr-auto" v-else>
                <div class="flex flex-col gap-4 max-w-xs">
                    <div class="skeleton w-full h-4"></div>
                    <div class="flex flex-col gap-2">
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-4/12 h-2"></span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-4/12 h-2"></span>
                    </div>
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
            <div v-if="!popularArticlesLoading">
                <div v-swiper="popularArticlesSwiperOptions" class="w-full max-w-screen-4xl select-none overflow-hidden">
                    <ul class="swiper-wrapper flex items-start">
                        <li
                            class="swiper-slide article_card shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl w-full max-w-screen-sm ml-4"
                            v-for="(popularArticle, i) in popularArticles"
                            :key="i"
                        >
                            <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full sm:w-64">
                                <img class="max-w-screen-sm w-full sm:h-full object-cover" :src="popularArticle.image" alt="course" draggable="false" />
                                <span
                                    class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2"
                                    v-if="!!popularArticle.category"
                                >
                                    {{ popularArticle.category.name }}
                                </span>
                            </div>
                            <div class="flex flex-col gap-6 pt-2 w-full">
                                <h3 class="font-bold text-2xl w-full md:w-screen max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {{ popularArticle.title }}
                                </h3>
                                <p class="max-w-xs opacity-75 h-28 overflow-hidden">{{ popularArticle.description }}</p>
                                <div class="flex flex-wrap justify-between items-center gap-4">
                                    <div class="flex items-start gap-2">
                                        <img
                                            :src="popularArticle.author.image"
                                            :alt="`${popularArticle.author.name} ${popularArticle.author.family}`"
                                            width="32"
                                            height="32"
                                        />
                                        <div class="flex flex-col gap-1">
                                            <small v-if="!!popularArticle.author">{{ `${popularArticle.author.name} ${popularArticle.author.family}` }}</small>
                                            <small class="opacity-75">{{ new Date(popularArticle.publishedAt).toLocaleDateString("fa") }}</small>
                                        </div>
                                    </div>
                                    <span class="flex items-end gap-1">
                                        <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                                        <small>{{ popularArticle.likes }}</small>
                                    </span>
                                </div>
                                <nuxt-link
                                    :to="`/article/${popularArticle.slug}`"
                                    :title="popularArticle.title"
                                    class="gray_gradient flex items-center justify-center gap-4 shadow-md py-3 px-8 mt-auto mb-0 rounded-xl"
                                >
                                    مطالعه
                                </nuxt-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="w-full max-w-screen-4xl select-none overflow-hidden p-4" v-else>
                <ul class="flex flex-col md:flex-row items-start gap-4 w-full">
                    <li
                        class="article_card shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl w-full max-w-screen-sm"
                        v-for="(popularArticle, i) in popularArticles"
                        :key="i"
                    >
                        <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full sm:w-64">
                            <img class="max-w-screen-sm w-full sm:h-full object-cover" src="/misc/article.png" alt="course" draggable="false" />
                            <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2">
                                <span class="skeleton w-4/12 h-2"></span>
                            </span>
                        </div>
                        <div class="flex flex-col gap-6 pt-2 w-full max-w-sm">
                            <h3 class="skeleton w-full h-4"></h3>
                            <div class="flex flex-col gap-2">
                                <span class="skeleton w-full h-2"></span>
                                <span class="skeleton w-full h-2"></span>
                                <span class="skeleton w-4/12 h-2"></span>
                            </div>
                            <div class="flex flex-col gap-2">
                                <span class="skeleton w-full h-2"></span>
                                <span class="skeleton w-full h-2"></span>
                                <span class="skeleton w-4/12 h-2"></span>
                            </div>
                            <div class="flex items-start gap-2 w-full">
                                <span class="skeleton w-10 h-10 rounded-full"></span>
                                <span class="skeleton w-8 h-2"></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <Nuxt nuxt-child-key="blog" />
    </main>
</template>

<script>
import axios from "axios";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: {},
    data() {
        return {
            topArticleLoading: false,
            topArticle: {
                title: "نرم افزار اییوز چیست و چه کاربردی دارد؟",
                description:
                    "نرم افزار ایویوز یکی از نرم‌افزار‌های آماری و اقتصادسنجی به روز است که ابزاری تحلیلی برای کاربران فراهم می‌کند و بکارگیری آن با سهولت همراه…",
                category: { name: "برنامه نویسی" },
                slug: "article-title",
            },

            popularArticlesLoading: false,
            popularArticles: [{}, {}, {}],
            popularArticlesSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                // spaceBetween: 16,
                loop: true,
                freeMode: true,
            },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMetadata("blog"), this.getTopArticle({ headers }), this.getMostPopularArticles({ headers })]);
    },
    methods: {
        async getTopArticle(data = {}) {
            if (this.topArticleLoading) return;
            this.topArticleLoading = true;

            let url = `/api/top-article`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.topArticle = results.data))
                .catch((e) => {})
                .finally(() => (this.topArticleLoading = false));
        },

        async getMostPopularArticles(data = {}) {
            if (this.popularArticlesLoading) return;
            this.popularArticlesLoading = true;

            let url = `/api/most-populars-articles`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.popularArticles = results.data))
                .catch((e) => {})
                .finally(() => (this.popularArticlesLoading = false));
        },
    },
};
</script>
