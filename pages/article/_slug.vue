<style scoped>
.header_card {
    background-color: var(--header-nav-container-bg-color);
    position: absolute;
}
.article_img {
    min-height: 30vw;
    object-fit: cover;
}

.article_body {
    min-height: 500px;
    text-shadow: none;
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

.author_card {
    background-color: rgba(19, 40, 80, 0.8);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    color: #fff;
}
.author_card * {
    z-index: 2;
}
.author_card::before {
    color: #fff;
    background: linear-gradient(0deg, rgba(19, 40, 80, 0.8), rgba(19, 40, 80, 0.8));
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(15px);
    border-radius: 2rem;
}

@media (min-width: 768px) {
    .article_card img {
        max-height: initial;
    }
}
</style>

<template>
    <section class="relative flex flex-col gap-8 mt-4 w-full" id="article">
        <article class="flex flex-col gap-8 max-w-screen-xl w-full mx-auto">
            <header class="relative w-full" v-if="article">
                <img class="article_img w-full h-64 md:h-96 object-contain shadow-lg rounded-2xl" :src="article.image" :alt="article.title" loading="lazy" />
                <meta itemprop="thumbnailUrl" content="/misc/singleCourse.png" />

                <div
                    class="header_card blur -bottom-20 md:-bottom-8 md:-right-8 flex flex-col gap-8 p-8 w-full max-w-xl shadow-xl rounded-2xl"
                    v-if="!loadingArticle"
                >
                    <h1 class="font-bold text-xl md:text-3xl" itemprop="headline">{{ article.title }}</h1>
                    <meta itemprop="description" v-if="article.metadata" :content="article.metadata.description" />
                    <p class="hidden md:flex">{{ article.description }}</p>
                    <div class="flex flex-wrap justify-between items-center gap-4">
                        <div class="flex items-start gap-2">
                            <img src="/misc/Figma.svg" alt="Figma" width="32" height="32" />
                            <div class="flex flex-col gap-1">
                                <small v-if="!!article.author">{{ `${article.author.name} ${article.author.family}` }}</small>
                                <small class="opacity-75">{{ new Date(article.publishedAt).toLocaleDateString("fa") }}</small>
                            </div>
                            <meta itemprop="datePublished" :content="article.publishedAt" />
                        </div>
                        <span class="flex items-end gap-1 cursor-pointer" @click="like()">
                            <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" v-if="!likedArticle" />
                            <img src="/icons/Heart.bold.red.svg" alt="Heart" width="20" height="20" v-else />
                            <small>{{ article.likes }}</small>
                        </span>
                    </div>
                </div>
                <div class="header_card blur -bottom-20 md:-bottom-8 md:-right-8 flex flex-col gap-8 p-8 w-full max-w-xl shadow-xl rounded-2xl" v-else>
                    <div class="skeleton w-full h-4"></div>
                    <div class="flex flex-col gap-2">
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-4/12 h-2"></span>
                    </div>
                </div>
            </header>
            <div class="mt-16 md:mt-8"></div>
            <ul class="flex flex-wrap items-center gap-2 font-light text-sm md:text-base">
                <li class="flex-shrink-0"><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                <li class="flex-shrink-0">&gt;</li>
                <li class="flex-shrink-0"><nuxt-link title="وبلاگ" to="/blog">وبلاگ</nuxt-link></li>
                <li class="flex-shrink-0">&gt;</li>
                <li class="flex-shrink-0" v-if="article && article.category">{{ article.category.name }}</li>
                <li class="flex-shrink-0">&gt;</li>
                <li class="flex-shrink-0 text-lightblue-600" v-if="article">{{ article.title }}</li>
            </ul>
            <div class="flex flex-wrap justify-between items-start gap-4">
                <div class="flex flex-col gap-8" v-if="!loadingArticle">
                    <div v-html="article.body" class="article_body flex-grow bg-white shadow-xl rounded-2xl p-4 max-w-4xl"></div>
                    <div
                        class="author_card flex flex-col items-center justify-start gap-4 p-8 md:p-16 w-full rounded-3xl shadow-2xl max-w-4xl"
                        :style="`background-image: url('/misc/Figma.svg')`"
                        v-if="!!article.author"
                    >
                        <img class="w-24 h-24 rounded-full shadow-md" src="/misc/Figma.svg" :alt="`${article.author.name} ${article.author.family}`" />
                        <b class="text-2xl">{{ `${article.author.name} ${article.author.family}` }}</b>
                        <small class="text-lightblue-400">{{ article.author.title }}</small>
                        <p class="opacity-75 text-center max-w-xs">{{ article.author.description }}</p>
                        <ul class="flex flex-wrap items-center gap-2">
                            <li v-for="(social, j) in article.author.social" :key="j">
                                <a :href="social.link"><Icon class="w-8 h-8 bg-gray-200" folder="social" :name="social.name" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex flex-col gap-8 w-full max-w-4xl" v-else>
                    <div class="article_body flex flex-col gap-4 flex-grow bg-white shadow-xl rounded-2xl p-4" style="min-height: 768px">
                        <div class="skeleton w-8/12 h-8"></div>
                        <div class="flex flex-col gap-2">
                            <span class="skeleton w-full h-2"></span>
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
                    <div class="author_card flex flex-col items-center justify-start gap-4 p-8 md:p-16 w-full rounded-3xl shadow-2xl max-w-4xl">
                        <div class="skeleton w-full h-4"></div>
                        <div class="flex flex-col gap-2 w-full">
                            <span class="skeleton w-full h-2"></span>
                            <span class="skeleton w-full h-2"></span>
                            <span class="skeleton w-full h-2"></span>
                            <span class="skeleton w-4/12 h-2"></span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-8 w-full xl:max-w-xs">
                    <div class="flex flex-col gap-4">
                        <h4 class="text-2xl">مقالات مشابه</h4>
                        <ul class="flex flex-wrap flex-row xl:flex-col gap-6" v-if="!loadingArticle">
                            <li class="w-full sm:max-w-xs" v-for="(item, i) in similarArticles" :key="i">
                                <nuxt-link
                                    class="article_card blur flex flex-col gap-4 flex-grow p-4 rounded-2xl shadow-xl"
                                    :to="`/article/${item.slug}`"
                                    :title="item.title"
                                >
                                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-48">
                                        <img class="max-w-screen-sm w-full object-cover" src="/misc/course.png" alt="course" loading="lazy" />
                                        <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!item.category">
                                            {{ item.category.name }}
                                        </span>
                                    </div>
                                    <h3 class="font-bold text-2xl max-w-screen-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ item.title }}</h3>
                                    <p class="max-w-xs opacity-75 flex-grow max-h-24 overflow-hidden">{{ item.description }}</p>
                                    <div class="flex flex-wrap justify-between items-center gap-4">
                                        <div class="flex items-start gap-2">
                                            <img src="/misc/Figma.svg" alt="Figma" width="32" height="32" />
                                            <div class="flex flex-col gap-1">
                                                <small v-if="!!item.author">{{ `${item.author.name} ${item.author.family}` }}</small>
                                                <small class="opacity-75">{{ new Date(item.publishedAt).toLocaleDateString("fa") }}</small>
                                            </div>
                                        </div>
                                        <span class="flex items-end gap-1">
                                            <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                                            <small>{{ item.likes }}</small>
                                        </span>
                                    </div>
                                </nuxt-link>
                            </li>
                        </ul>
                        <ul class="flex flex-wrap flex-row xl:flex-col gap-6" v-else>
                            <li class="flex flex-col gap-4 w-full sm:max-w-xs" v-for="(item, i) in articleSkeleton" :key="i">
                                <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-48">
                                    <img class="max-w-screen-sm w-full object-cover" src="/misc/course.png" alt="course" loading="lazy" />
                                    <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2">
                                        <span class="skeleton w-6"></span>
                                    </span>
                                </div>
                                <h3 class="skeleton w-full h-4"></h3>
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
                    </div>
                    <div class="flex flex-col gap-4">
                        <h4 class="text-2xl">آخرین مقالات</h4>
                        <ul class="article_card blur flex flex-col gap-6 rounded-2xl p-4 w-full sm:max-w-xs">
                            <li class="w-full" v-for="(item, i) in newArticles" :key="i">
                                <nuxt-link class="w-full flex flex-wrap gap-4" :to="`/article/${item.slug}`" :title="item.title">
                                    <img class="w-20 h-20 rounded-xl object-cover" src="/misc/course.png" :alt="item.title" loading="lazy" />
                                    <div class="flex flex-wrap flex-col gap-2">
                                        <h3 class="max-w-screen-2xs">{{ item.title }}</h3>
                                        <span class="text-lightblue-300">بیشتر</span>
                                    </div>
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </article>

        <!-- comments -->
        <CommentSection :commentedOn="article._id" />

        <section class="relative flex flex-col gap-8 w-full max-w-screen-2xl mx-auto mt-16" id="most-viewed-articles">
            <div class="flex flex-wrap justify-between items-center gap-8 w-full">
                <h4 class="font-bold text-4xl">محبوب ترین بلاگ ها</h4>
            </div>
            <ul class="flex flex-wrap items-start justify-evenly gap-4">
                <li class="flex w-full sm:max-w-xs shadow-lg rounded-xl" v-for="(popularArticle, i) in popularArticles" :key="i">
                    <nuxt-link
                        class="article_card blur flex flex-col gap-4 flex-grow p-4 rounded-2xl shadow-xl w-full sm:max-w-xs"
                        :to="`/article/${popularArticle.slug}`"
                        :title="popularArticle.title"
                    >
                        <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-48">
                            <img class="max-w-screen-sm w-full object-cover" :src="popularArticle.image" :alt="popularArticle.title" loading="lazy" />
                            <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!popularArticle.category">
                                {{ popularArticle.category.name }}
                            </span>
                        </div>
                        <h3 class="font-bold text-2xl max-w-screen-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ popularArticle.title }}</h3>
                        <p class="max-w-xs opacity-75 flex-grow max-h-24 overflow-hidden">{{ popularArticle.description }}</p>
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
                    </nuxt-link>
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
import axios from "axios";
import CommentSection from "~/components/web/article/Comment.section";

export default {
    head: {
        title: "وبلاگ - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: {
        CommentSection,
    },
    data() {
        return {
            loadingArticle: false,
            articleSkeleton: [0, 0],
            article: this.article || {},
            newArticles: this.newArticles || [],
            similarArticles: this.similarArticles || [],
            popularArticles: this.popularArticles || [],
            likedArticle: this.likedArticle || false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;
        const route = this.$nuxt.context.route;
        await Promise.all([this.getArticle({ headers }, route)]);
    },
    async beforeRouteUpdate(to, from, next) {
        if (to.params.slug) this.$route.params.slug = to.params.slug;
        await this.getArticle({}, to);
        if (typeof window !== "undefined") window.scrollTo({ top: 0 });
        next();
    },
    methods: {
        async getArticle(data = {}, route) {
            if (this.loadingArticle) return;
            this.loadingArticle = true;
            let url = `/api/article/${route.params.slug}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }
            await axios
                .get(url, { headers })
                .then((results) => {
                    this.article = results.data.article;
                    this.newArticles = results.data.newArticles;
                    this.similarArticles = results.data.similarArticles;
                    this.popularArticles = results.data.popularArticles;
                    this.likedArticle = results.data.likedArticle;
                })
                .catch((e) => {})
                .finally(() => (this.loadingArticle = false));
        },

        async like() {
            this.likedArticle = !this.likedArticle;
            await axios
                .post(`/api/like-article/${this.$route.params.slug}`)
                .then((results) => {
                    this.likedArticle = results.data.likedArticle;
                    this.article.likes = results.data.likeCount;
                })
                .catch((e) => {});
        },
    },
};
</script>
