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
                            <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!popularArticle.category">
                                {{ popularArticle.category.name }}
                            </span>
                        </div>
                        <div class="flex flex-col gap-6 pt-2">
                            <h3 class="font-bold text-2xl max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ popularArticle.title }}</h3>
                            <p class="max-w-xs opacity-75">{{ popularArticle.description }}</p>
                            <div class="flex flex-wrap justify-between items-center gap-4">
                                <div class="flex items-start gap-2">
                                    <img src="/misc/Figma.svg" alt="Figma" width="32" height="32" />
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
            <ul class="flex flex-wrap justify-center md:justify-start gap-12">
                <li class="flex shadow-lg rounded-xl" v-for="(article, i) in articles" :key="i">
                    <nuxt-link
                        class="article_card flex flex-col gap-4 flex-grow p-4 rounded-xl w-full sm:max-w-xs"
                        :to="`/article/${article.slug}`"
                        :title="article.title"
                    >
                        <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-64">
                            <img class="max-w-screen-sm w-full object-cover" src="/misc/course.png" alt="course" draggable="false" />
                            <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!article.category">
                                {{ article.category.name }}
                            </span>
                        </div>
                        <h3 class="font-bold text-2xl max-w-screen-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ article.title }}</h3>
                        <p class="max-w-xs opacity-75">{{ article.description }}</p>
                        <div class="flex flex-wrap justify-between items-center gap-4">
                            <div class="flex items-start gap-2">
                                <img src="/misc/Figma.svg" alt="Figma" width="32" height="32" />
                                <div class="flex flex-col gap-1">
                                    <small v-if="!!article.author">{{ `${article.author[0].name} ${article.author[0].family}` }}</small>
                                    <small class="opacity-75">{{ new Date(article.publishedAt).toLocaleDateString("fa") }}</small>
                                </div>
                            </div>
                            <span class="flex items-end gap-1">
                                <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                                <small>{{ article.likes }}</small>
                            </span>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
            <ul class="flex items-center gap-4">
                <li>
                    <nuxt-link
                        class="flex items-center justify-center p-3 w-8 h-8 rounded-full"
                        :to="`${`/blog/:page?order=${selectedArticleOrder.value}&category=${selectedArticleCategory.value}`.replace(
                            ':page',
                            Math.max(articlesPage - 1, 1),
                        )}`"
                    >
                        &lt;
                    </nuxt-link>
                </li>
                <li v-for="(item, i) in articlesPages" :key="i">
                    <nuxt-link
                        class="flex items-center justify-center p-3 w-8 h-8 rounded-full"
                        :class="articlesPage == item ? 'bg-lightblue-300' : 'bg-indigo-100'"
                        :to="`${`/blog/:page?order=${selectedArticleOrder.value}&category=${selectedArticleCategory.value}`.replace(':page', item)}`"
                        v-if="item > 0"
                    >
                        {{ item }}
                    </nuxt-link>
                    <span class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-indigo-100" v-else>...</span>
                </li>
                <li>
                    <nuxt-link
                        class="flex items-center justify-center p-3 w-8 h-8 rounded-full"
                        :to="`${`/blog/:page?order=${selectedArticleOrder.value}&category=${selectedArticleCategory.value}`.replace(
                            ':page',
                            Math.min(articlesPage + 1, articlesPageTotal),
                        )}`"
                    >
                        &gt;
                    </nuxt-link>
                </li>
            </ul>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/Select.vue";

export default {
    head: {
        title: "وبلاگ - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: { Select },
    data() {
        return {
            topArticle: {
                title: "نرم افزار اییوز چیست و چه کاربردی دارد؟",
                description:
                    "نرم افزار ایویوز یکی از نرم‌افزار‌های آماری و اقتصادسنجی به روز است که ابزاری تحلیلی برای کاربران فراهم می‌کند و بکارگیری آن با سهولت همراه…",
                category: { name: "برنامه نویسی" },
                slug: "article-title",
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
            articleOrderOptions: {
                newest: { name: "جدیدترین", value: "newest" },
                oldest: { name: "قدیمی ترین", value: "oldest" },
                "most-popular": { name: "محبوب ترین", value: "most-popular" },
            },
            selectedArticleCategory: { name: "", value: "" },
            articleCategoryOptions: {
                "": { name: "همه", value: "" },
            },

            articles: this.articles || [],
            articlesPages: this.articlesPages || [],
            articlesPage: this.articlesPage || 1,
            articlesTotal: this.articlesTotal || 0,
            articlesPageTotal: this.articlesPageTotal || 1,
            articlesLoading: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        let page = 1;
        if (route.params.page && !isNaN(parseInt(route.params.page))) page = parseInt(route.params.page);

        console.log(1);

        await Promise.all([this.getTopArticle({ headers }), this.getMostPopularArticles({ headers }), this.getArticles({ headers }, page)]);
    },
    async beforeRouteUpdate(to, from, next) {
        this.$route.params.page = to.params.page;
        // let page = this.$route.params.page ? this.$route.params.page : 1;
        // await this.getArticles({}, page);
        next();
    },
    watch: {
        articles(val) {
            console.log(val);
        },
    },
    methods: {
        async getTopArticle(data = {}) {
            let url = `/api/top-article`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.topArticle = results.data))
                .catch((e) => {});
        },

        async getMostPopularArticles(data = {}) {
            let url = `/api/most-populars-articles`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.popularArticles = results.data))
                .catch((e) => {});
        },

        async getArticles(data = {}, page) {
            if (this.articlesLoading || this.articlesPage > this.articlesPageTotal) return;
            this.articlesLoading = true;

            let url = `/api/articles`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            // let params = [`page=${page}`, `order=${this.selectedArticleOrder.value}`, `category=${this.selectedArticleCategory.value}`];
            let params = [`page=${page}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.articles = [];
                    this.articles = results.data.records;
                    this.articlesPage = results.data.page;
                    this.articlesTotal = results.data.total;
                    this.articlesPageTotal = results.data.pageTotal;
                    this.articlesPages = this.getPageList(this.articlesPageTotal, this.articlesPage, 7);
                    if (typeof document !== "undefined") {
                        document.getElementById("articles").scrollIntoView();
                    }
                })
                .catch((e) => {})
                .finally(() => (this.articlesLoading = false));
        },

        getPageList(totalPages, page, maxLength) {
            if (maxLength < 5) throw "maxLength must be at least 5";

            const range = (start, end) => Array.from(Array(end - start + 1), (_, i) => i + start);

            var sideWidth = maxLength < 9 ? 1 : 2;
            var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
            var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
            if (totalPages <= maxLength) return range(1, totalPages);

            if (page <= maxLength - sideWidth - 1 - rightWidth) {
                return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
            }
            if (page >= totalPages - sideWidth - 1 - rightWidth) {
                return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
            }

            return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
        },
    },
};
</script>
