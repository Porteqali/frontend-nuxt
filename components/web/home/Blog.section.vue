<style scoped>
.article_card {
    background-color: #494949;
    color: #fff;
    box-shadow: 0px 15px 15px rgba(0, 0, 0, 7%);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full max-w-screen-xl bg-white rounded-2xl px-4 md:px-8 py-12" id="blog">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <h3 class="kalameh_bold title font-bold text-4xl md:text-5xl">مقالات</h3>
        </div>
        <div class="flex flex-wrap-reverse lg:flex-nowrap items-center justify-center w-full gap-8" v-if="!articlesLoading">
            <div class="flex flex-col justify-center w-full gap-8 flex-grow">
                <nuxt-link
                    class="article_card flex flex-col gap-2 flex-grow rounded-3xl shadow-xl w-full p-4"
                    :to="`/article/${articles[0].slug}`"
                    :title="articles[0].title"
                    v-if="articles[0]"
                >
                    <div class="flex flex-wrap items-center gap-2 w-full">
                        <h3 class="kalameh_bold text-lg w-max max-w-full flex-shrink-0">{{ articles[0].title }}</h3>
                        <div class="bg-orange-400 h-1.5 rounded-full flex-grow"></div>
                    </div>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <div class="flex items-center gap-1">
                            <img
                                class="w-8 h-8 rounded-full shadow-md"
                                loading="lazy"
                                :src="articles[0].author[0].image"
                                :alt="`${articles[0].author[0].name} ${articles[0].author[0].family}`"
                                v-if="!!articles[0].author[0]"
                            />
                            <small v-if="!!articles[0].author">{{ `${articles[0].author[0].name} ${articles[0].author[0].family}` }}</small>
                        </div>
                        <div class="flex flex-wrap items-center gap-4">
                            <div class="flex items-center gap-1">
                                <small class="kalameh_bold">{{ articles[0].likes }}</small>
                                <Icon class="w-6 h-6 bg-rose-400" size="24px" folder="icons/new" name="Heart" />
                            </div>
                            <div class="flex items-center gap-1 opacity-75">
                                <small class="opacity-75 text-sm">{{ new Date(articles[0].publishedAt).toLocaleDateString("fa") }}</small>
                                <Icon class="w-5 h-5 bg-cyan-200" size="20px" folder="icons/new" name="Calendar" />
                            </div>
                        </div>
                    </div>
                    <p class="w-full text-sm opacity-75 max-h-20 overflow-hidden">
                        {{ articles[0].description.length > 240 ? articles[0].description.substr(0, 240) + "..." : articles[0].description }}
                    </p>
                </nuxt-link>
                <nuxt-link
                    class="article_card flex flex-col gap-2 flex-grow rounded-3xl shadow-xl w-full p-4"
                    :to="`/article/${articles[1].slug}`"
                    :title="articles[1].title"
                    v-if="articles[1]"
                >
                    <div class="flex flex-wrap items-center gap-2 w-full">
                        <h3 class="kalameh_bold text-lg w-max max-w-full flex-shrink-0">{{ articles[1].title }}</h3>
                        <div class="bg-orange-400 h-1.5 rounded-full flex-grow"></div>
                    </div>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <div class="flex items-center gap-1">
                            <img
                                class="w-8 h-8 rounded-full shadow-md"
                                loading="lazy"
                                :src="articles[1].author[0].image"
                                :alt="`${articles[1].author[0].name} ${articles[1].author[0].family}`"
                                v-if="!!articles[1].author[0]"
                            />
                            <small v-if="!!articles[1].author">{{ `${articles[1].author[0].name} ${articles[1].author[0].family}` }}</small>
                        </div>
                        <div class="flex flex-wrap items-center gap-4">
                            <div class="flex items-center gap-1">
                                <small class="kalameh_bold">{{ articles[1].likes }}</small>
                                <Icon class="w-6 h-6 bg-rose-400" size="24px" folder="icons/new" name="Heart" />
                            </div>
                            <div class="flex items-center gap-1 opacity-75">
                                <small class="opacity-75 text-sm">{{ new Date(articles[1].publishedAt).toLocaleDateString("fa") }}</small>
                                <Icon class="w-5 h-5 bg-cyan-200" size="20px" folder="icons/new" name="Calendar" />
                            </div>
                        </div>
                    </div>
                    <p class="w-full text-sm opacity-75 max-h-20 overflow-hidden">
                        {{ articles[1].description.length > 240 ? articles[1].description.substr(0, 240) + "..." : articles[1].description }}
                    </p>
                </nuxt-link>
                <nuxt-link title="مقالات" to="/blog" class="orange_gradient_h flex items-center justify-center gap-2 p-3 rounded-2xl w-full">
                    <span>مشاهده همه مطالب</span>
                    <Icon class="w-6 h-6 bg-gray-100" size="24px" folder="icons/new" name="ArrowLeft3" />
                </nuxt-link>
            </div>
            <div class="flex flex-wrap md:flex-nowrap justify-center w-full md:w-max max-w-3xl gap-8 flex-shrink-0">
                <nuxt-link
                    class="article_card flex flex-col gap-2 rounded-3xl w-full xs:max-w-xs p-4"
                    :to="`/article/${articles[2].slug}`"
                    :title="articles[2].title"
                    v-if="articles[2]"
                >
                    <img class="w-full h-52 object-cover rounded-2xl" :src="articles[2].image" alt="course" loading="lazy" />
                    <h3 class="kalameh_bold text-lg w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{{ articles[2].title }}</h3>
                    <div class="flex flex-col items-center gap-2">
                        <div class="flex items-center gap-4 w-full">
                            <div class="bg-orange-400 h-1.5 rounded-full flex-grow"></div>
                            <span class="flex items-end gap-1 flex-shrink-0">
                                <small class="kalameh_bold">{{ articles[2].likes }}</small>
                                <Icon class="w-6 h-6 bg-rose-400" size="24px" folder="icons/new" name="Heart" />
                            </span>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                            <div class="flex items-center gap-1">
                                <img
                                    class="w-8 h-8 rounded-full shadow-md"
                                    loading="lazy"
                                    :src="articles[2].author[0].image"
                                    :alt="`${articles[2].author[0].name} ${articles[2].author[0].family}`"
                                    v-if="!!articles[2].author[0]"
                                />
                                <small v-if="!!articles[2].author">{{ `${articles[2].author[0].name} ${articles[2].author[0].family}` }}</small>
                            </div>
                            <div class="flex items-center gap-1">
                                <Icon class="w-5 h-5 bg-cyan-200" size="20px" folder="icons/new" name="Calendar" />
                                <small class="opacity-75 text-sm">{{ new Date(articles[2].publishedAt).toLocaleDateString("fa") }}</small>
                            </div>
                        </div>
                    </div>
                    <p class="w-full text-sm max-w-xs opacity-75 h-20 overflow-hidden">
                        {{ articles[2].description.length > 240 ? articles[2].description.substr(0, 240) + "..." : articles[2].description }}
                    </p>
                </nuxt-link>
                <nuxt-link
                    class="article_card flex flex-col gap-2 rounded-3xl w-full xs:max-w-xs p-4"
                    :to="`/article/${articles[3].slug}`"
                    :title="articles[3].title"
                    v-if="articles[3]"
                >
                    <img class="w-full h-52 object-cover rounded-2xl" :src="articles[3].image" alt="course" loading="lazy" />
                    <h3 class="kalameh_bold text-lg w-full overflow-hidden overflow-ellipsis whitespace-nowrap">{{ articles[3].title }}</h3>
                    <div class="flex flex-col items-center gap-2">
                        <div class="flex items-center gap-4 w-full">
                            <div class="bg-orange-400 h-1.5 rounded-full flex-grow"></div>
                            <span class="flex items-end gap-1 flex-shrink-0">
                                <small class="kalameh_bold">{{ articles[3].likes }}</small>
                                <Icon class="w-6 h-6 bg-rose-400" size="24px" folder="icons/new" name="Heart" />
                            </span>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                            <div class="flex items-center gap-1">
                                <img
                                    class="w-8 h-8 rounded-full shadow-md"
                                    loading="lazy"
                                    :src="articles[3].author[0].image"
                                    :alt="`${articles[3].author[0].name} ${articles[3].author[0].family}`"
                                    v-if="!!articles[3].author[0]"
                                />
                                <small v-if="!!articles[3].author">{{ `${articles[3].author[0].name} ${articles[3].author[0].family}` }}</small>
                            </div>
                            <div class="flex items-center gap-1">
                                <Icon class="w-5 h-5 bg-cyan-200" size="20px" folder="icons/new" name="Calendar" />
                                <small class="opacity-75 text-sm">{{ new Date(articles[3].publishedAt).toLocaleDateString("fa") }}</small>
                            </div>
                        </div>
                    </div>
                    <p class="w-full text-sm max-w-xs opacity-75 h-20 overflow-hidden">
                        {{ articles[3].description.length > 240 ? articles[3].description.substr(0, 240) + "..." : articles[3].description }}
                    </p>
                </nuxt-link>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center w-full gap-8" v-else>
            <div class="flex flex-wrap justify-center w-full gap-8">
                <div class="article_card shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl w-full max-w-screen-sm">
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
                </div>
                <div class="article_card flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-xl">
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-52">
                        <span class="skeleton flex max-w-screen-sm w-full h-52"></span>
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
                </div>
                <div class="article_card flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-xl">
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-52">
                        <span class="skeleton flex max-w-screen-sm w-full h-52"></span>
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
                </div>
            </div>
            <div class="flex flex-wrap justify-center w-full gap-8">
                <div class="article_card flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-xl">
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-52">
                        <span class="skeleton flex max-w-screen-sm w-full h-52"></span>
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
                </div>
                <div class="article_card flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-xl">
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-52">
                        <span class="skeleton flex max-w-screen-sm w-full h-52"></span>
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
                </div>
                <div class="article_card shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl w-full max-w-screen-sm">
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
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";

export default {
    name: "BlogSection",
    components: {
        Icon,
    },
    data() {
        return {
            articlesLoading: false,
            articles: this.articles || [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getArticles({ headers })]);
    },
    methods: {
        async getArticles(data = {}) {
            if (this.articlesLoading || this.articlesPage > this.articlesPageTotal) return;
            this.articlesLoading = true;

            let url = `/api/articles`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=1`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.articles = results.data.records;
                })
                .catch((e) => {})
                .finally(() => (this.articlesLoading = false));
        },
    },
};
</script>
