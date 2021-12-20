<style scoped>
.article_card {
    background-color: #3f0e4780;
    color: var(--top-h1-color);
    box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25);
}
.article_card img {
    max-height: 16rem;
}

.article_category {
    border-radius: 0 1rem 0 1rem;
    background-color: #3f0e47bb;
}

.more_courses_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
}

@media (min-width: 768px) {
    .article_card img {
        max-height: initial;
    }
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="blog">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <h3 class="font-bold text-4xl">آخرین مقالات</h3>
        </div>
        <div class="flex flex-col items-center justify-center w-full gap-8" v-if="!articlesLoading">
            <div class="flex flex-wrap justify-center w-full gap-8">
                <div class="article_card blur shadow-xl flex flex-col sm:flex-row gap-4 p-4 rounded-2xl w-full sm:max-w-screen-sm">
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full sm:w-64">
                        <img class="max-w-screen-sm w-full sm:h-full object-cover" src="/misc/article.png" alt="course" loading="lazy" />
                        <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!articles[0].category[0]">
                            {{ articles[0].category[0].name }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-6 pt-2">
                        <h3 class="font-bold text-2xl max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ articles[0].title }}</h3>
                        <p class="max-w-xs flex-grow opacity-75">{{ articles[0].description }}</p>
                        <div class="flex flex-wrap justify-between items-center gap-4">
                            <div class="flex items-start gap-2">
                                <img
                                    class="w-8 h-8 rounded-full shadow-md"
                                    :src="articles[0].author[0].image"
                                    :alt="`${articles[0].author[0].name} ${articles[0].author[0].family}`"
                                    v-if="!!articles[0].author[0]"
                                />
                                <div class="flex flex-col gap-1">
                                    <small v-if="!!articles[0].author[0]">{{ `${articles[0].author[0].name} ${articles[0].author[0].family}` }}</small>
                                    <small class="opacity-75">{{ new Date(articles[0].publishedAt).toLocaleDateString("fa") }}</small>
                                </div>
                            </div>
                            <span class="flex items-end gap-1">
                                <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                                <small>{{ articles[0].likes }}</small>
                            </span>
                        </div>
                        <nuxt-link
                            :to="`/article/${articles[0].slug}`"
                            :title="articles[0].title"
                            class="gray_gradient flex items-center justify-center gap-4 shadow-md py-3 px-8 mt-auto mb-0 rounded-xl"
                        >
                            مطالعه
                        </nuxt-link>
                    </div>
                </div>
                <nuxt-link
                    class="article_card blur flex flex-col gap-4 flex-grow p-4 rounded-2xl shadow-xl w-full sm:max-w-xs"
                    :to="`/article/${articles[1].slug}`"
                    :title="articles[1].title"
                >
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-48">
                        <img class="max-w-screen-sm w-full object-cover" src="/misc/course.png" alt="course" loading="lazy" />
                        <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!articles[1].category[0]">
                            {{ articles[1].category[0].name }}
                        </span>
                    </div>
                    <h3 class="font-bold text-2xl max-w-screen-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ articles[1].title }}</h3>
                    <p class="max-w-xs opacity-75 flex-grow max-h-24 overflow-hidden">{{ articles[1].description }}</p>
                    <div class="flex flex-wrap justify-between items-center gap-4">
                        <div class="flex items-start gap-2">
                            <img
                                class="w-8 h-8 rounded-full shadow-md"
                                :src="articles[1].author[0].image"
                                :alt="`${articles[1].author[0].name} ${articles[1].author[0].family}`"
                                v-if="!!articles[1].author[0]"
                            />
                            <div class="flex flex-col gap-1">
                                <small v-if="!!articles[1].author">{{ `${articles[1].author[0].name} ${articles[1].author[0].family}` }}</small>
                                <small class="opacity-75">{{ new Date(articles[1].publishedAt).toLocaleDateString("fa") }}</small>
                            </div>
                        </div>
                        <span class="flex items-end gap-1">
                            <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                            <small>{{ articles[1].likes }}</small>
                        </span>
                    </div>
                </nuxt-link>
                <nuxt-link
                    class="article_card blur flex flex-col gap-4 flex-grow p-4 rounded-2xl shadow-xl w-full sm:max-w-xs"
                    :to="`/article/${articles[2].slug}`"
                    :title="articles[2].title"
                >
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-48">
                        <img class="max-w-screen-sm w-full object-cover" src="/misc/course.png" alt="course" loading="lazy" />
                        <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!articles[2].category[0]">
                            {{ articles[2].category[0].name }}
                        </span>
                    </div>
                    <h3 class="font-bold text-2xl max-w-screen-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ articles[2].title }}</h3>
                    <p class="max-w-xs opacity-75 flex-grow max-h-24 overflow-hidden">{{ articles[2].description }}</p>
                    <div class="flex flex-wrap justify-between items-center gap-4">
                        <div class="flex items-start gap-2">
                            <img
                                class="w-8 h-8 rounded-full shadow-md"
                                :src="articles[2].author[0].image"
                                :alt="`${articles[2].author[0].name} ${articles[2].author[0].family}`"
                                v-if="!!articles[2].author[0]"
                            />
                            <div class="flex flex-col gap-1">
                                <small v-if="!!articles[2].author">{{ `${articles[2].author[0].name} ${articles[2].author[0].family}` }}</small>
                                <small class="opacity-75">{{ new Date(articles[2].publishedAt).toLocaleDateString("fa") }}</small>
                            </div>
                        </div>
                        <span class="flex items-end gap-1">
                            <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                            <small>{{ articles[2].likes }}</small>
                        </span>
                    </div>
                </nuxt-link>
            </div>
            <div class="flex flex-wrap justify-center w-full gap-8">
                <nuxt-link
                    class="article_card blur flex flex-col gap-4 flex-grow p-4 rounded-2xl shadow-xl w-full sm:max-w-xs"
                    :to="`/article/${articles[3].slug}`"
                    :title="articles[3].title"
                >
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-48">
                        <img class="max-w-screen-sm w-full object-cover" src="/misc/course.png" alt="course" loading="lazy" />
                        <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!articles[3].category[0]">
                            {{ articles[3].category[0].name }}
                        </span>
                    </div>
                    <h3 class="font-bold text-2xl max-w-screen-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ articles[3].title }}</h3>
                    <p class="max-w-xs opacity-75 flex-grow max-h-24 overflow-hidden">{{ articles[3].description }}</p>
                    <div class="flex flex-wrap justify-between items-center gap-4">
                        <div class="flex items-start gap-2">
                            <img
                                class="w-8 h-8 rounded-full shadow-md"
                                :src="articles[3].author[0].image"
                                :alt="`${articles[3].author[0].name} ${articles[3].author[0].family}`"
                                v-if="!!articles[3].author[0]"
                            />
                            <div class="flex flex-col gap-1">
                                <small v-if="!!articles[3].author">{{ `${articles[3].author[0].name} ${articles[3].author[0].family}` }}</small>
                                <small class="opacity-75">{{ new Date(articles[3].publishedAt).toLocaleDateString("fa") }}</small>
                            </div>
                        </div>
                        <span class="flex items-end gap-1">
                            <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                            <small>{{ articles[3].likes }}</small>
                        </span>
                    </div>
                </nuxt-link>
                <nuxt-link
                    class="article_card blur flex flex-col gap-4 flex-grow p-4 rounded-2xl shadow-xl w-full sm:max-w-xs"
                    :to="`/article/${articles[4].slug}`"
                    :title="articles[4].title"
                >
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full h-48">
                        <img class="max-w-screen-sm w-full object-cover" src="/misc/course.png" alt="course" loading="lazy" />
                        <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!articles[4].category[0]">
                            {{ articles[4].category[0].name }}
                        </span>
                    </div>
                    <h3 class="font-bold text-2xl max-w-screen-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ articles[4].title }}</h3>
                    <p class="max-w-xs opacity-75 flex-grow max-h-24 overflow-hidden">{{ articles[4].description }}</p>
                    <div class="flex flex-wrap justify-between items-center gap-4">
                        <div class="flex items-start gap-2">
                            <img
                                class="w-8 h-8 rounded-full shadow-md"
                                :src="articles[4].author[0].image"
                                :alt="`${articles[4].author[0].name} ${articles[4].author[0].family}`"
                                v-if="!!articles[4].author[0]"
                            />
                            <div class="flex flex-col gap-1">
                                <small v-if="!!articles[4].author">{{ `${articles[4].author[0].name} ${articles[4].author[0].family}` }}</small>
                                <small class="opacity-75">{{ new Date(articles[4].publishedAt).toLocaleDateString("fa") }}</small>
                            </div>
                        </div>
                        <span class="flex items-end gap-1">
                            <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                            <small>{{ articles[4].likes }}</small>
                        </span>
                    </div>
                </nuxt-link>
                <div class="article_card blur shadow-xl flex flex-col sm:flex-row gap-4 p-4 rounded-2xl w-full sm:max-w-screen-sm">
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full sm:w-64">
                        <img class="max-w-screen-sm w-full sm:h-full object-cover" src="/misc/article.png" alt="course" loading="lazy" />
                        <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 right-2" v-if="!!articles[5].category[0]">
                            {{ articles[5].category[0].name }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-6 pt-2">
                        <h3 class="font-bold text-2xl max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ articles[5].title }}</h3>
                        <p class="max-w-xs flex-grow opacity-75">{{ articles[5].description }}</p>
                        <div class="flex flex-wrap justify-between items-center gap-4">
                            <div class="flex items-start gap-2">
                                <img
                                    class="w-8 h-8 rounded-full shadow-md"
                                    :src="articles[5].author[0].image"
                                    :alt="`${articles[5].author[0].name} ${articles[5].author[0].family}`"
                                    v-if="!!articles[5].author[0]"
                                />
                                <div class="flex flex-col gap-1">
                                    <small v-if="!!articles[5].author[0]">{{ `${articles[5].author[0].name} ${articles[5].author[0].family}` }}</small>
                                    <small class="opacity-75">{{ new Date(articles[5].publishedAt).toLocaleDateString("fa") }}</small>
                                </div>
                            </div>
                            <span class="flex items-end gap-1">
                                <img src="/icons/Heart.svg" alt="Heart" width="20" height="20" />
                                <small>{{ articles[5].likes }}</small>
                            </span>
                        </div>
                        <nuxt-link
                            :to="`/article/${articles[5].slug}`"
                            :title="articles[5].title"
                            class="gray_gradient flex items-center justify-center gap-4 shadow-md py-3 px-8 mt-auto mb-0 rounded-xl"
                        >
                            مطالعه
                        </nuxt-link>
                    </div>
                </div>
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
                <div class="article_card blur flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-xl">
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
                </div>
                <div class="article_card blur flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-xl">
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
                </div>
            </div>
            <div class="flex flex-wrap justify-center w-full gap-8">
                <div class="article_card blur flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-xl">
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
                </div>
                <div class="article_card blur flex flex-col gap-4 p-4 w-full sm:max-w-xs shadow-lg rounded-xl">
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

        <div class="flex items-center justify-center w-full">
            <nuxt-link title="مقالات" to="/blog" class="more_courses_btn blur flex items-center gap-2 py-3 px-6 rounded-xl w-max">
                <img src="/icons/BookOpenOutlineColor.orange.svg" width="24" height="24" alt="BookOpenOutlineColor" />
                <span>همه مقالات</span>
            </nuxt-link>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "BlogSection",
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
