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
    <section class="relative flex flex-col gap-8 mt-4 w-full" id="article">
        <article class="flex flex-col gap-8 max-w-screen-xl w-full mx-auto">
            <header class="relative w-full" v-if="article">
                <img class="article_img w-full h-64 md:h-96 object-contain shadow-lg rounded-2xl" src="/misc/singleCourse.png" :alt="article.title" loading="lazy" />
                <div class="header_card blur -bottom-20 md:-bottom-8 md:-right-8 flex flex-col gap-8 p-8 w-full max-w-xl shadow-xl rounded-2xl">
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
                            <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                            <small>{{ article.likes }}</small>
                        </span>
                    </div>
                </div>
            </header>
            <div class="mt-16 md:mt-8"></div>
            <ul class="flex flex-wrap items-center gap-2 font-light text-sm md:text-base">
                <li class="flex-shrink-0"><nuxt-link to="/">صفحه اصلی</nuxt-link></li>
                <li class="flex-shrink-0">&gt;</li>
                <li class="flex-shrink-0"><nuxt-link to="/blog">وبلاگ</nuxt-link></li>
                <li class="flex-shrink-0">&gt;</li>
                <li class="flex-shrink-0">گرافیک</li>
                <li class="flex-shrink-0">&gt;</li>
                <li class="flex-shrink-0 text-lightblue-600" v-if="article">{{ article.title }}</li>
            </ul>
            <div class="flex flex-wrap justify-between items-start gap-4">
                <div v-html="article.body" class="article_body flex-grow bg-white shadow-xl rounded-2xl p-4 max-w-4xl" v-if="article"></div>

                <div class="flex flex-col gap-8 w-full xl:max-w-xs">
                    <div class="flex flex-col gap-4">
                        <h4 class="text-2xl">مقالات مشابه</h4>
                        <ul class="flex flex-wrap flex-row xl:flex-col gap-6">
                            <li class="w-full sm:max-w-xs" v-for="(item, i) in newArticles" :key="i">
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
                    </div>
                    <div class="flex flex-col gap-4">
                        <h4 class="text-2xl">آخرین مقالات</h4>
                        <ul class="article_card blur flex flex-col gap-6 rounded-2xl p-4 w-full sm:max-w-xs">
                            <li class="w-full" v-for="(item, i) in newArticles" :key="i">
                                <nuxt-link class="w-full flex flex-wrap gap-4" :to="`/article/${item.slug}`">
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
            <div>
                <!-- author info -->
            </div>
        </article>

        <!-- comments -->

        <div>
            <!-- popular articles -->
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    head: {
        title: "وبلاگ - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    data() {
        return {
            article: this.article || {},
            newArticles: this.newArticles || [],
            similarArticles: this.similarArticles || [],
            popularArticles: this.popularArticles || [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await Promise.all([this.getArticle({ headers }, route)]);
    },
    methods: {
        async getArticle(data = {}, route) {
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
                })
                .catch((e) => {});
        },

        like() {},
    },
};
</script>
