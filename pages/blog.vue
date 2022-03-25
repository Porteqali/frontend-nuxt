<style scoped>
.top_article > img {
    height: 100vw;
    max-height: 320px;
}

.most_viewed_article_slide {
    max-width: 286px;
}

.view_topics {
    --color-bg: #fff;
    background: linear-gradient(var(--color-bg), var(--color-bg)) padding-box, linear-gradient(273.67deg, #ff8537 -20.26%, #ff51b1 114.54%) border-box;
    border: 2px solid transparent;
    transition: all 0.1s;
}
.view_topics:hover {
    background: linear-gradient(273.67deg, #ff8537 -20.26%, #ff51b1 114.54%);
    color: #fff;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-2xl w-full mt-28 md:mt-32 px-4 md:px-8">
        <img class="absolute -z-1 -left-28 top-52 opacity-25" src="/misc/path.svg" alt="path" />
        <section class="relative flex flex-col lg:flex-row justify-center items-center w-full">
            <div class="top_article flex flex-col md:flex-row gap-6 w-full" v-if="!topArticleLoading">
                <img class="w-full max-w-lg rounded-3xl object-cover bg-warmgray-100 shadow-xl" :src="topArticle.image" :alt="topArticle.title" />
                <div class="flex flex-col gap-6 flex-grow">
                    <h3 class="kalameh_bold font-bold text-3xl md:text-4xl">{{ topArticle.title }}</h3>
                    <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                        <div class="flex items-center gap-2" v-if="topArticle.author">
                            <img
                                class="w-10 h-10 rounded-full object-cover"
                                :src="topArticle.author.image"
                                :alt="`${topArticle.author.name} ${topArticle.author.family}`"
                            />
                            <span class="font-bold">{{ `${topArticle.author.name} ${topArticle.author.family}` }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Icon class="w-6 h-6 bg-cyan-300" size="24px" folder="icons/new" name="Calendar" />
                            <small class="opacity-75 text-base">{{ new Date(topArticle.publishedAt).toLocaleDateString("fa") }}</small>
                        </div>
                    </div>
                    <p>{{ topArticle.description }}</p>
                    <nuxt-link
                        class="view_topics flex items-center p-3 px-4 font-bold rounded-2xl w-max"
                        :to="`/article/${topArticle.slug}`"
                        :title="topArticle.title"
                    >
                        <span>مطالعه مقاله</span>
                    </nuxt-link>
                </div>
            </div>
            <div class="top_article flex flex-col md:flex-row gap-6 w-full" v-else>
                <div class="skeleton w-full max-w-lg h-80 rounded-3xl shadow-xl" />
                <div class="flex flex-col gap-4 w-full flex-grow">
                    <div class="skeleton w-full h-8"></div>
                    <div class="flex flex-col gap-2">
                        <span class="skeleton w-full h-2"></span>
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
                    <div class="flex flex-col gap-2">
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-4/12 h-2"></span>
                    </div>
                </div>
            </div>
        </section>

        <span class="spacer_v w-10/12 h-0.5 -my-6"></span>

        <section class="relative flex flex-col items-center justify-center gap-8 w-full" id="most-viewed-articles">
            <h2 class="kalameh_bold title2 text-2xl md:text-3xl w-max max-w-full">پربازدیدترین مطالب</h2>
            <div v-swiper="popularArticlesSwiperOptions" class="w-full max-w-screen-xl select-none overflow-hidden" v-if="!popularArticlesLoading">
                <ul class="swiper-wrapper flex items-start p-8 pt-0">
                    <li
                        class="most_viewed_article_slide swiper-slide flex w-screen flex-shrink-0 bg-white shadow-xl p-4 rounded-3xl ml-6"
                        v-for="(popularArticle, i) in popularArticles"
                        :key="i"
                    >
                        <nuxt-link
                            class="flex flex-col gap-4 flex-grow rounded-3xl w-full sm:max-w-xs"
                            :to="`/article/${popularArticle.slug}`"
                            :title="popularArticle.title"
                        >
                            <img
                                class="max-w-xs w-full h-40 md:h-48 rounded-2xl object-cover"
                                :src="popularArticle.image"
                                :alt="popularArticle.title"
                                loading="lazy"
                            />
                            <h3 class="kalameh_bold md:text-lg w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{{ popularArticle.title }}</h3>
                            <div class="bg-orange-400 h-1.5 rounded-full w-full"></div>
                            <div class="flex flex-wrap justify-between items-center gap-4">
                                <div class="flex items-center gap-1">
                                    <Icon class="w-5 h-5 bg-cyan-300" size="20px" folder="icons/new" name="Calendar" />
                                    <small class="opacity-75 text-sm">{{ new Date(popularArticle.publishedAt).toLocaleDateString("fa") }}</small>
                                </div>
                                <span class="flex items-end gap-1">
                                    <small class="kalameh_bold">{{ popularArticle.likes }}</small>
                                    <Icon class="w-5 h-5 bg-rose-400" size="20px" folder="icons/new" name="Heart" />
                                </span>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="md:absolute -mt-6 md:-mt-12 orange_gradient_v flex items-center justify-between px-6 w-full h-4 rounded-full">
                <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-prev">
                    <img src="/icons/new/ArrowRight3.svg" width="24" />
                </button>
                <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-next">
                    <img src="/icons/new/ArrowLeft3.svg" width="24" />
                </button>
            </div>
        </section>

        <section class="relative flex flex-col items-center justify-center gap-8 w-full">
            <h4 class="kalameh_bold text-xl opacity-65">مطالب ما رو تو شبکه های اجتماعی دنبال کنید</h4>
            <div class="flex flex-wrap items-center justify-center gap-8 w-full max-w-screen-xl">
                <div class="orange_gradient_v flex items-center gap-4 w-full max-w-lg rounded-3xl p-4" v-if="contact_info.socials && contact_info.socials.telegram">
                    <img class="w-16 h-16" src="/social/instagram.png" alt="instagram" />
                    <span class="kalameh_bold text-xl md:text-2xl">پرتقال در اینستاگرام</span>
                    <a
                        :href="contact_info.socials.telegram"
                        class="border-2 border-solid border-white rounded-2xl p-3 px-5 text-sm mr-auto"
                        title="پرتقال در اینستاگرام"
                    >
                        مشاهده
                    </a>
                </div>
                <div
                    class="bg-lightblue-400 text-white flex items-center gap-4 w-full max-w-lg rounded-3xl p-4"
                    v-if="contact_info.socials && contact_info.socials.instagram"
                >
                    <img class="w-16 h-16" src="/social/telegram.png" alt="telegram" />
                    <span class="kalameh_bold text-xl md:text-2xl">پرتقال در تلگرام</span>
                    <a
                        :href="contact_info.socials.instagram"
                        class="border-2 border-solid border-white rounded-2xl p-3 px-5 text-sm mr-auto"
                        title="پرتقال در تلگرام"
                    >
                        مشاهده
                    </a>
                </div>
            </div>
        </section>

        <span class="spacer_v w-8/12 h-0.5"></span>

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
                image: "",
                title: "نرم افزار اییوز چیست و چه کاربردی دارد؟",
                description:
                    "نرم افزار ایویوز یکی از نرم‌افزار‌های آماری و اقتصادسنجی به روز است که ابزاری تحلیلی برای کاربران فراهم می‌کند و بکارگیری آن با سهولت همراه…",
                slug: "article-title",
            },

            popularArticlesLoading: false,
            popularArticles: [{}, {}, {}],
            popularArticlesSwiperOptions: {
                // autoplay: false,
                slidesPerView: "auto",
                initialSlide: 1,
                // spaceBetween: 32,
                prevButton: ".swiper-prev",
                nextButton: ".swiper-next",
                loop: true,
                // freeMode: true,
            },

            contact_info: this.contact_info || {},
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMetadata("blog"), this.getTopArticle({ headers }), this.getMostPopularArticles({ headers }), this.getContactInfo({ headers })]);
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

        async getContactInfo(data = {}) {
            let url = `/api/contact-info`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.contact_info = results.data))
                .catch((e) => {});
        },
    },
};
</script>
