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
    <section class="relative flex flex-col gap-8 w-full" id="articles">
        <div class="flex flex-wrap justify-between items-center gap-8 w-full">
            <h2 class="font-bold text-4xl">آرشیو مقالات</h2>
            <div class="flex flex-wrap gap-4 w-max">
                <div class="flex items-center gap-1">
                    <img src="/icons/Filter.svg" alt="Filter" width="24" height="24" />
                    <span class="flex flex-shrink-0">مرتب سازی بر اساس</span>
                    <Select
                        :selectedOption.sync="selectedArticleOrder"
                        @update:selectedOption="getArticles"
                        :options="articleOrderOptions"
                        placeholder="انتخاب کنید"
                    >
                        <template v-slot:option="{ option }">
                            <span :value="option.value">{{ option.name }}</span>
                        </template>
                    </Select>
                </div>
                <div class="flex items-center gap-1">
                    <img src="/icons/Category.black.svg" alt="Category" width="24" height="24" />
                    <span class="flex flex-shrink-0">دسته بندی</span>
                    <Select
                        :selectedOption.sync="selectedArticleCategory"
                        @update:selectedOption="getArticles"
                        :options="articleCategoryOptions"
                        placeholder="انتخاب کنید"
                    >
                        <template v-slot:option="{ option }">
                            <span :value="option.value">{{ option.name }}</span>
                        </template>
                    </Select>
                </div>
            </div>
        </div>
        <ul class="grid gap-10" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))" v-if="!articlesLoading">
            <li class="flex w-full shadow-lg rounded-xl mx-auto" v-for="(article, i) in articles" :key="i">
                <nuxt-link
                    class="article_card flex flex-col gap-4 flex-grow p-4 rounded-2xl shadow-xl w-full"
                    :to="`/article/${article.slug}`"
                    :title="article.title"
                >
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-64">
                        <img class="max-w-screen-sm w-full object-cover" :src="article.image" alt="course" loading="lazy" />
                        <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!article.category[0]">
                            {{ article.category[0].name }}
                        </span>
                    </div>
                    <h3 class="font-bold text-2xl max-w-screen-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ article.title }}</h3>
                    <p class="max-w-xs opacity-75 flex-grow">{{ article.description }}</p>
                    <div class="flex flex-wrap justify-between items-center gap-4">
                        <div class="flex items-start gap-2">
                            <img
                                v-if="!!article.author"
                                :src="article.author[0].image"
                                :alt="`${article.author[0].name} ${article.author[0].family}`"
                                width="32"
                                height="32"
                            />
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
        <ul class="flex flex-wrap justify-center md:justify-start gap-4 2xl:gap-12" v-else>
            <li class="article_card flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-xl" v-for="(item, i) in articlesSkeleton" :key="i">
                <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-48">
                    <span class="skeleton flex max-w-screen-sm w-full h-48"></span>
                    <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2">
                        <span class="skeleton w-8 h-2"></span>
                    </span>
                </div>
                <h3 class="skeleton w-full h-6"></h3>
                <div class="flex flex-col gap-2 w-full">
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-4/12 h-2"></span>
                </div>
                <div class="flex flex-wrap justify-between items-center gap-4">
                    <div class="flex items-start gap-2">
                        <div class="skeleton rounded-full w-8 h-8"></div>
                        <span class="skeleton w-8"></span>
                    </div>
                </div>
            </li>
        </ul>

        <ul class="flex items-center justify-center gap-4">
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
                    class="flex items-center justify-center p-3 w-8 h-8 shadow-sm rounded-full"
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
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/Select.vue";
import Loading from "~/components/Loading.vue";

export default {
    components: { Select, Loading },
    data() {
        return {
            selectedArticleOrder: this.selectedArticleOrder || { name: "", value: "" },
            articleOrderOptions: {
                newest: { name: "جدیدترین", value: "newest" },
                oldest: { name: "قدیمی ترین", value: "oldest" },
                "most-popular": { name: "محبوب ترین", value: "most-popular" },
            },
            selectedArticleCategory: this.selectedArticleCategory || { name: "", value: "" },
            articleCategoryOptions: this.articleCategoryOptions || { "": { name: "همه", value: "" } },

            articles: this.articles || [],
            articlesPages: this.articlesPages || [],
            articlesPage: this.articlesPage || 1,
            articlesTotal: this.articlesTotal || 0,
            articlesPageTotal: this.articlesPageTotal || 1,
            articlesLoading: false,
            articlesSkeleton: [0, 0, 0, 0, 0],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;
        this.processRoute(route);

        await Promise.all([this.getArticles({ headers }), this.getAllCategories({ headers })]);
    },
    async beforeRouteUpdate(to, from, next) {
        if (to.params.page) this.$route.params.page = to.params.page;
        if (to.query.order) this.$route.query.order = to.query.order;
        if (to.query.category) this.$route.query.category = to.query.category;

        this.processRoute(to);
        await this.getArticles({});
        if (typeof document !== "undefined") {
            document.getElementById("articles").scrollIntoView();
        }
        next();
    },
    methods: {
        async getAllCategories(data = {}) {
            let url = `/api/article-categories`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }
            await axios
                .get(url, { headers })
                .then((results) => {
                    this.articleCategoryOptions = { "": { name: "همه", value: "" }, ...results.data };
                })
                .catch((e) => {});
        },

        async getArticles(data = {}) {
            if (this.articlesLoading || this.articlesPage > this.articlesPageTotal) return;
            this.articlesLoading = true;

            let url = `/api/articles`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.articlesPages}`, `order=${this.selectedArticleOrder.value}`, `category=${this.selectedArticleCategory.value}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.articles = results.data.records;
                    this.articlesPage = results.data.page;
                    this.articlesTotal = results.data.total;
                    this.articlesPageTotal = results.data.pageTotal;
                    this.articlesPages = this.getPageList(this.articlesPageTotal, this.articlesPage, 7);
                })
                .catch((e) => {})
                .finally(() => (this.articlesLoading = false));
        },

        processRoute(route) {
            if (route.params.page && !isNaN(parseInt(route.params.page))) this.articlesPages = parseInt(route.params.page);
            if (route.query.order && !!this.articleOrderOptions[route.query.order]) {
                this.selectedArticleOrder = this.articleOrderOptions[route.query.order];
            }
            if (route.query.category && !!this.articleCategoryOptions[route.query.category]) {
                this.selectedArticleCategory = this.articleCategoryOptions[route.query.category];
            }
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
