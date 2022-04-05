<style scoped></style>

<template>
    <section class="relative flex flex-col gap-10 w-full mb-16" id="articles">
        <h2 class="kalameh_bold title text-3xl md:text-5xl w-max max-w-full">آرشیو مقالات</h2>
        <div class="flex flex-wrap items-center justify-between gap-4 w-full">
            <div class="flex items-center gap-1">
                <Select :selectedOption.sync="selectedArticleOrder" @update:selectedOption="getArticles" :options="articleOrderOptions" placeholder="ترتیب نمایش">
                    <template v-slot:option="{ option }">
                        <span :value="option.value">{{ option.name }}</span>
                    </template>
                </Select>
            </div>
            <div class="flex items-center gap-1 w-full max-w-3xl">
                <button class="flex items-center justify-center swiper-prev-cat">
                    <img src="/icons/new/ArrowRight2.svg" width="24" />
                </button>
                <div v-swiper="categorySwiperOptions" class="w-full select-none overflow-hidden pb-4 -mb-4">
                    <ul class="swiper-wrapper flex items-start">
                        <li
                            class="swiper-slide flex w-max max-w-max bg-white shadow-lg p-3 px-4 rounded-2xl ml-4 cursor-pointer flex-shrink-0"
                            :class="{ orange_gradient_v: selectedArticleCategory.value == opt.value }"
                            v-for="(opt, i) in articleCategoryOptions"
                            :key="i"
                            @click="categoryChanged(opt)"
                        >
                            {{ opt.name }}
                        </li>
                    </ul>
                </div>
                <button class="flex items-center justify-center swiper-next-cat">
                    <img src="/icons/new/ArrowLeft2.svg" width="24" />
                </button>
            </div>
        </div>

        <ul class="flex flex-wrap items-center justify-center gap-10 w-full" v-if="!articlesLoading">
            <li class="flex w-full rounded-2xl max-w-xs" v-for="(article, i) in articles" :key="i">
                <nuxt-link
                    class="flex flex-col gap-2 rounded-3xl w-full xs:max-w-xs p-4 bg-gray-700 text-white shadow-xl"
                    :to="`/article/${article.slug}`"
                    :title="article.title"
                    v-if="article"
                >
                    <img class="w-full h-52 object-cover rounded-2xl" :src="article.image" alt="course" loading="lazy" />
                    <h3 class="kalameh_bold text-lg w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{{ article.title }}</h3>
                    <div class="flex flex-col items-center gap-2">
                        <div class="flex items-center gap-4 w-full">
                            <div class="orange_gradient_v h-1.5 rounded-full flex-grow"></div>
                            <span class="flex items-end gap-1 flex-shrink-0">
                                <small class="kalameh_bold">{{ article.likes }}</small>
                                <Icon class="w-6 h-6 bg-rose-400" size="24px" folder="icons/new" name="Heart" />
                            </span>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                            <div class="flex items-center gap-1">
                                <img
                                    class="w-8 h-8 rounded-full shadow-md"
                                    loading="lazy"
                                    :src="article.author[0].image"
                                    :alt="`${article.author[0].name} ${article.author[0].family}`"
                                    v-if="!!article.author[0]"
                                />
                                <small v-if="!!article.author">{{ `${article.author[0].name} ${article.author[0].family}` }}</small>
                            </div>
                            <div class="flex items-center gap-1">
                                <Icon class="w-5 h-5 bg-cyan-200" size="20px" folder="icons/new" name="Calendar" />
                                <small class="opacity-75 text-sm">{{ new Date(article.publishedAt).toLocaleDateString("fa") }}</small>
                            </div>
                        </div>
                    </div>
                    <p class="w-full text-sm max-w-xs opacity-75 h-20 overflow-hidden">
                        {{ article.description.length > 240 ? article.description.substr(0, 240) + "..." : article.description }}
                    </p>
                </nuxt-link>
            </li>
        </ul>
        <ul class="flex flex-wrap justify-center md:justify-start gap-4 2xl:gap-12" v-else>
            <li class="flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-3xl bg-gray-700" v-for="(item, i) in articlesSkeleton" :key="i">
                <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-48">
                    <span class="skeleton flex max-w-screen-sm w-full h-48"></span>
                    <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2">
                        <span class="skeleton w-8 h-2"></span>
                    </span>
                </div>
                <h3 class="skeleton w-full h-6"></h3>
                <div class="flex flex-wrap justify-between items-center gap-4">
                    <div class="flex items-start gap-2">
                        <div class="skeleton rounded-full w-8 h-8"></div>
                        <span class="skeleton w-8"></span>
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-4/12 h-2"></span>
                </div>
            </li>
        </ul>

        <ul class="flex items-center justify-center gap-2 md:gap-6">
            <li>
                <nuxt-link
                    class="flex items-center justify-center rounded-full"
                    :to="`${`/blog/:page?order=${selectedArticleOrder.value}&category=${selectedArticleCategory.value}`.replace(
                        ':page',
                        Math.max(articlesPage - 1, 1),
                    )}`"
                >
                    <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="ArrowRight3" />
                </nuxt-link>
            </li>
            <li v-for="(item, i) in articlesPages" :key="i">
                <nuxt-link
                    class="flex items-center justify-center p-3 w-8 md:w-10 h-8 md:h-10 shadow-lg rounded-xl"
                    :class="articlesPage == item ? 'bg-gray-700 text-white' : 'bg-white'"
                    :to="`${`/blog/:page?order=${selectedArticleOrder.value}&category=${selectedArticleCategory.value}`.replace(':page', item)}`"
                    v-if="item > 0"
                >
                    {{ item }}
                </nuxt-link>
                <span class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-gray-100" v-else>...</span>
            </li>
            <li>
                <nuxt-link
                    class="flex items-center justify-center rounded-full"
                    :to="`${`/blog/:page?order=${selectedArticleOrder.value}&category=${selectedArticleCategory.value}`.replace(
                        ':page',
                        Math.min(articlesPage + 1, articlesPageTotal),
                    )}`"
                >
                    <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="ArrowLeft3" />
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
            categorySwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                prevButton: ".swiper-prev-cat",
                nextButton: ".swiper-next-cat",
                loop: false,
                freeMode: true,
            },

            articles: this.articles || [],
            articlesPages: this.articlesPages || [],
            articlesPage: this.articlesPage || 1,
            articlesTotal: this.articlesTotal || 0,
            articlesPageTotal: this.articlesPageTotal || 1,
            articlesLoading: false,
            articlesSkeleton: [0, 0, 0, 0],
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
            // if (this.articlesLoading || this.articlesPage > this.articlesPageTotal) return;
            if (this.articlesLoading) return;
            this.articlesLoading = true;

            let url = `/api/articles`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.articlesPage}`, `order=${this.selectedArticleOrder.value}`, `category=${this.selectedArticleCategory.value}`];
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

        async categoryChanged(opt) {
            this.selectedArticleCategory = opt;
            this.articlesPage = 1;
            await this.getArticles();
        },

        processRoute(route) {
            if (route.params.page && !isNaN(parseInt(route.params.page))) this.articlesPage = parseInt(route.params.page);
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
