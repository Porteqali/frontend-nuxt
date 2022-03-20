<style scoped>
.article_img > img {
    min-height: 30vw;
    object-fit: cover;
}
.article_img > div {
    background: linear-gradient(87.25deg, #ffa825 -11.51%, #ff70d7 114.56%);
}
</style>

<template>
    <section class="relative flex flex-col items-center gap-8 w-full max-w-screen-2xl px-4 md:px-8 mt-24 md:mt-28 mb-16" id="article">
        <article class="flex flex-col gap-8 w-full max-w-screen-xl">
            <header class="relative flex flex-col gap-8 w-full" v-if="article">
                <div class="flex flex-col gap-6 w-full" v-if="!loadingArticle">
                    <div class="flex flex-wrap items-center gap-4">
                        <span class="opacity-75">
                            {{ new Date(article.publishedAt).toLocaleDateString("fa", { year: "numeric", month: "long", day: "numeric" }) }}
                        </span>
                        <meta itemprop="datePublished" :content="article.publishedAt" />
                        <div class="orange_gradient_h w-8 h-2 rounded-full"></div>
                        <span class="text-amber-500" v-if="article.category">{{ article.category.name }}</span>
                    </div>

                    <h1 class="kalameh_bold text-2xl md:text-4xl" itemprop="headline">{{ article.title }}</h1>
                    <meta itemprop="description" v-if="article.metadata" :content="article.metadata.description" />

                    <div class="flex flex-wrap justify-between items-center gap-4">
                        <div class="flex items-center gap-2">
                            <img
                                class="rounded-full object-cover w-10 h-10"
                                v-if="!!article.author"
                                :src="article.author.image"
                                :alt="`${article.author.name} ${article.author.family}`"
                            />
                            <span class="font-bold text-sm" v-if="!!article.author">{{ `${article.author.name} ${article.author.family}` }}</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="flex items-center gap-1 cursor-pointer" @click="like()">
                                <small class="kalameh_bold">{{ article.likes }}</small>
                                <Icon class="w-6 h-6 bg-rose-400" size="24px" folder="icons/new" name="Heart" v-if="!likedArticle" />
                                <Icon class="w-6 h-6 bg-rose-500" size="24px" folder="icons" name="Heart.bold.red" v-else />
                            </span>
                            <a :href="`https://telegram.me/share/url?text=${article.title}&url=${article.metadata.url}`" target="_blank">
                                <img class="w-6 h-6" src="/social/telegram.png" alt="telegram" />
                            </a>
                            <a :href="`http://twitter.com/share?text=${article.title}&url=${article.metadata.url}`" target="_blank">
                                <img class="w-6 h-6 opacity-75" src="/social/twitter.png" alt="twitter" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-8 p-8 w-full max-w-xl shadow-xl rounded-2xl" v-else>
                    <div class="skeleton w-full h-4"></div>
                    <div class="flex flex-col gap-2">
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-4/12 h-2"></span>
                    </div>
                </div>

                <div class="article_img relative mb-6">
                    <div class="absolute -left-6 -bottom-6 rounded-2xl w-11/12 h-1/3 opacity-80 -z-1"></div>
                    <img class="w-full h-64 md:h-96 object-contain shadow-xl rounded-2xl" :src="article.image" :alt="article.title" loading="lazy" />
                    <meta itemprop="thumbnailUrl" content="/misc/singleCourse.png" />
                </div>
            </header>

            <div class="flex flex-col gap-4 w-full bg-white p-4 rounded-2xl" v-if="!loadingArticle">
                <div v-html="article.body" class="flex-grow w-full"></div>
                <ul class="flex flex-wrap items-center gap-2">
                    <li class="bg-orange-100 text-amber-700 p-1 px-2 rounded-md" v-for="(tag, i) in article.tags" :key="i">
                        {{ tag }}
                    </li>
                </ul>
            </div>
            <div class="flex flex-col gap-8 w-full" v-else>
                <div class="flex-grow w-full bg-white p-4 rounded-2xl" style="min-height: 768px">
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
            </div>
        </article>

        <span class="spacer_v w-full h-0.5"></span>

        <CommentSection :commentedOn="article._id" />

        <span class="spacer_v w-full h-0.5"></span>

        <section class="relative flex flex-col gap-6 w-full" id="similar-articles">
            <div class="flex flex-wrap justify-between items-center gap-8 w-full">
                <h4 class="kalameh_bold title text-2xl">مطالب مشابه</h4>
            </div>
            <ul class="flex flex-wrap items-start justify-evenly gap-4">
                <li class="flex w-full max-w-xs bg-white shadow-xl p-4 rounded-3xl" v-for="(similarArticle, i) in popularArticles" :key="i">
                    <nuxt-link
                        class="flex flex-col gap-4 flex-grow rounded-3xl w-full sm:max-w-xs"
                        :to="`/article/${similarArticle.slug}`"
                        :title="similarArticle.title"
                    >
                        <img class="max-w-screen-xs w-full h-48 rounded-2xl object-cover" :src="similarArticle.image" :alt="similarArticle.title" loading="lazy" />
                        <h3 class="kalameh_bold text-lg w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{{ similarArticle.title }}</h3>
                        <div class="bg-orange-400 h-1.5 rounded-full w-full"></div>
                        <div class="flex flex-wrap justify-between items-center gap-4">
                            <div class="flex items-center gap-1">
                                <Icon class="w-5 h-5 bg-cyan-300" size="20px" folder="icons/new" name="Calendar" />
                                <small class="opacity-75 text-sm">{{ new Date(similarArticle.publishedAt).toLocaleDateString("fa") }}</small>
                            </div>
                            <span class="flex items-end gap-1">
                                <small class="kalameh_bold">{{ similarArticle.likes }}</small>
                                <Icon class="w-5 h-5 bg-rose-400" size="20px" folder="icons/new" name="Heart" />
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
    head() {
        return {
            title: `${this.article.title} - گروه آموزشی پرتقال`,
            meta: [
                { hid: "description", name: "description", content: this.article.metadata ? this.article.metadata.description : "" },
                { hid: "language", name: "language", content: "fa" },
                { hid: "keywords", name: "keywords", content: this.article.metadata ? this.article.metadata.keywords : "" },
                { hid: "author", name: "author", content: this.article.metadata ? this.article.metadata.author : "" },

                { hid: "og:locale", name: "og:locale", content: "fa_IR" },
                { hid: "og:title", name: "og:title", content: this.article.metadata ? this.article.metadata.title : "" },
                { hid: "og:description", name: "og:description", content: this.article.metadata ? this.article.metadata.description : "" },
                { hid: "og:url", name: "og:url", content: this.article.metadata ? this.article.metadata.url : "" },
                { hid: "og:site_name", name: "og:site_name", content: this.article.metadata ? this.article.metadata.title : "" },
                { hid: "og:image", name: "og:image", content: this.article.metadata ? this.article.metadata.thumbnail : "" },

                { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
                { hid: "twitter:site", name: "twitter:site", content: this.article.metadata ? this.article.metadata.url : "" },
                { hid: "twitter:description", name: "twitter:description", content: this.article.metadata ? this.article.metadata.description : "" },
                { hid: "twitter:title", name: "twitter:title", content: this.article.metadata ? this.article.metadata.title : "" },
                { hid: "twitter:image", name: "twitter:image", content: this.article.metadata ? this.article.metadata.thumbnail : "" },

                { hid: "robots", name: "robots", content: "max-image-preview:large" },
                { hid: "mobile-web-app-capable", name: "mobile-web-app-capable", content: "yes" },
            ],
            link: [
                { rel: "canonical", href: this.article.metadata ? this.article.metadata.url : "" },
                { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.ico" },
                { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
            ],
        };
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
