<style scoped>
#top h1,
#top p {
    color: var(--top-h1-color);
}

#top {
    background-image: url("/backgrounds/Background.png");
    background-size: 150%;
    background-repeat: no-repeat;
    background-position: center 33%;
}

.search_box {
    background-color: var(--search-box-bg-color);
    color: var(--search-box-color);
    position: absolute;
    bottom: -1.5rem;
}

.section_selected {
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 0px 1px 3px #ff8537, var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.load_more_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
}

.courses_list {
    grid-template-columns: repeat(auto-fit, minmax(284px, 1fr));
}
.course_card {
    /* background-color: var(--department-section-title-alt-text-bg-color); */
    background: linear-gradient(154.49deg, rgba(121, 117, 131, 0.2) 5.35%, rgba(54, 53, 103, 0.2) 83.85%), rgba(49, 48, 54, 0.3);
    color: var(--department-section-title-alt-text-color);
}
.course_tag {
    background-color: var(--department-section-course-tag-bg-color);
    color: var(--department-section-course-tag-color);
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

.teacher_card {
    background-color: rgba(19, 40, 80, 0.8);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    color: #fff;
}
.teacher_card * {
    z-index: 2;
}
.teacher_card::before {
    color: #fff;
    background: linear-gradient(0deg, rgba(19, 40, 80, 0.8), rgba(19, 40, 80, 0.8));
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(15px);
    border-radius: 2rem;
}

@media (min-width: 768px) {
    #top {
        background-size: 100%;
    }
    .courses_list {
        grid-template-columns: repeat(auto-fit, minmax(384px, 1fr));
    }
    .article_card img {
        max-height: initial;
    }
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <section class="relative flex flex-col items-center gap-10 p-8 py-16 w-full rounded-3xl shadow-md" id="top">
            <h1 class="kalameh_bold font-bold text-4xl md:text-6xl">جستجو در پرتقال</h1>
            <p class="text-lg mt-4 text-center">بیش از 2،000 ویدیو آموزشی از اساتید برتر در حوزه های مختلف</p>
            <form class="search_box flex items-center gap-4 p-2 rounded-xl shadow-lg w-10/12 max-w-sm md:max-w-xl" @submit="research($event)">
                <img class="flex-shrink-0 mr-2" src="/icons/Search.black.svg" width="24" height="24" alt="Search" />
                <input class="flex-grow outline-none bg-transparent w-full h-10" v-model="searchQuery" type="text" placeholder="جستجو..." />
            </form>
        </section>
        <strong v-if="resultsTotal > 0 && !resultsLoading">
            {{ resultsTotal }} نتیجه برای "{{ $route.params.query }}" در بخش {{ selectedSearchSection.name }} پیدا کردیم
        </strong>
        <div class="flex flex-wrap items-center justify-center md:justify-between gap-8 w-full">
            <div class="flex items-center gap-1">
                <img src="/icons/Filter.svg" alt="Filter" width="24" height="24" />
                <span class="flex flex-shrink-0">مرتب سازی بر اساس</span>
                <Select :selectedOption.sync="selectedSearchOrder" @update:selectedOption="selectOrder()" :options="searchOrderOptions" placeholder="انتخاب کنید">
                    <template v-slot:option="{ option }">
                        <span :value="option.value">{{ option.name }}</span>
                    </template>
                </Select>
            </div>
            <ul class="flex items-center gap-2">
                <li
                    class="flex items-center justify-center p-2 px-4 rounded-xl shadow-sm bg-white cursor-pointer"
                    :class="{ section_selected: selectedSearchSection.value == searchSection.value }"
                    v-for="(searchSection, i) in searchSectionOptions"
                    :key="i"
                    @click="selectSection(searchSection)"
                >
                    <span>{{ searchSection.name }}</span>
                </li>
            </ul>
        </div>

        <section class="w-full" id="courses" v-if="selectedSearchSection.value == 'course'">
            <ul class="courses_list grid gap-10 w-full">
                <li
                    class="gray_gradient blur course_card shadow-lg flex flex-col gap-4 p-4 rounded-3xl max-w-md w-full mx-auto"
                    v-for="(course, i) in results"
                    :key="i"
                >
                    <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="relative overflow-hidden rounded-xl shadow-lg w-full h-72">
                        <img class="absolute inset-0 object-cover" :src="course.image || `/misc/course.png`" alt="course" draggable="false" />
                        <img class="absolute top-2 right-2" :src="course.groups[0].icon" width="32" height="32" alt="Figma" />
                        <span
                            class="course_tag flex items-center justify-center p-4 w-auto h-16 rounded-xl absolute top-2 left-2"
                            v-if="course.discountInfo && course.discountInfo.tag != ''"
                        >
                            {{ course.discountInfo.tag }}
                        </span>
                    </nuxt-link>
                    <div class="flex flex-col gap-4">
                        <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="w-full">
                            <h3 class="font-bold text-xl overflow-hidden overflow-ellipsis whitespace-nowrap">{{ course.name }}</h3>
                        </nuxt-link>
                        <nuxt-link :to="`/teacher/${course.teacher[0]._id}`" class="flex items-center gap-2">
                            <img :src="course.teacher[0].image" alt="Figma" width="40" height="40" />
                            <span>{{ `${course.teacher[0].name} ${course.teacher[0].family}` }}</span>
                        </nuxt-link>
                        <div class="flex flex-wrap justify-between gap-4">
                            <span class="flex items-end gap-1">
                                <img src="/icons/TimeCircle.line.svg" alt="TimeCircle" width="20" height="20" />
                                <small>{{ course.totalTime }}</small>
                            </span>
                            <span class="flex items-end gap-1">
                                <img src="/icons/User.line.svg" alt="User" width="20" height="20" />
                                <small>{{ course.buyCount }}</small>
                            </span>
                            <span class="flex items-end gap-1">
                                <img src="/icons/Star.line.svg" alt="Star" width="20" height="20" />
                                <small>{{ course.score.toFixed(1) }} از 8 امتیاز</small>
                            </span>
                        </div>
                        <nuxt-link
                            :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`"
                            class="orange_gradient_h flex items-center justify-center gap-4 py-4 px-8 rounded-xl"
                        >
                            <span v-if="course.price">
                                <b class="text-3xl">{{ new Intl.NumberFormat("fa").format(course.discountInfo.discountedPrice) }}</b>
                                تومان
                            </span>
                            <span class="text-xl" v-else>رایگان</span>
                            <img src="/icons/Buy.svg" alt="Buy" width="24" height="24" />
                        </nuxt-link>
                    </div>
                </li>
            </ul>
        </section>
        <section class="w-full" id="articles" v-if="selectedSearchSection.value == 'article'">
            <ul class="grid gap-10" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))">
                <li class="flex w-full shadow-lg rounded-xl mx-auto" v-for="(article, i) in results" :key="i">
                    <nuxt-link
                        class="article_card blur flex flex-col gap-4 flex-grow p-4 rounded-2xl shadow-xl w-full"
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
        </section>
        <section class="w-full" id="teachers" v-if="selectedSearchSection.value == 'teacher'">
            <ul class="flex flex-wrap justify-center gap-6">
                <li
                    class="teacher_card flex flex-col items-center justify-start gap-4 p-8 md:p-16 w-full rounded-3xl shadow-2xl max-w-md"
                    :style="`background-image: url('${teacher.image}')`"
                    v-for="(teacher, i) in results"
                    :key="i"
                >
                    <img class="w-24 h-24 rounded-full shadow-md" :src="teacher.image" :alt="`${teacher.name} ${teacher.family}`" />
                    <b class="text-2xl">{{ `${teacher.name} ${teacher.family}` }}</b>
                    <small class="text-lightblue-400">{{ teacher.title }}</small>
                    <p class="opacity-75 text-center max-w-xs">{{ teacher.description }}</p>
                    <ul class="flex flex-wrap items-center gap-2">
                        <li v-for="(social, j) in teacher.social" :key="j">
                            <a :href="social.link"><Icon class="w-8 h-8 bg-gray-200" folder="social" :name="social.name" /></a>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>

        <div class="flex flex-col items-center justify-center gap-16 -mt-20" v-if="!resultsLoading && results.length == 0">
            <img class="w-96 h-96 object-contain rounded-3xl shadow-sm" src="/pages/search/no-results.png" alt="no-results" style="filter: grayscale(1)" />
            <strong class="text-4xl">موردی پیدا نشد!</strong>
        </div>

        <Loading class="w-16 h-16" v-if="resultsLoading" />
        <button
            class="load_more_btn blur flex items-center gap-2 py-3 px-6 rounded-xl w-max"
            v-if="!resultsLoading && resultsPage <= resultsPageTotal"
            @click="search()"
        >
            <span>بارگذاری بیشتر</span>
        </button>
    </main>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/Select.vue";
import Loading from "~/components/Loading.vue";

export default {
    head() {
        return {
            title: `${this.searchQuery} - گروه آموزشی پرتقال`,
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: { Select, Loading },
    data() {
        return {
            selectedSearchOrder: this.selectedSearchOrder || { name: "جدیدترین", value: "newest" },
            searchOrderOptions: {
                newest: { name: "جدیدترین", value: "newest" },
                oldest: { name: "قدیمی ترین", value: "oldest" },
            },
            selectedSearchSection: this.selectedSearchSection || { name: "دوره ها", value: "course" },
            searchSectionOptions: {
                course: { name: "دوره ها", value: "course" },
                teacher: { name: "مدرسین", value: "teacher" },
                article: { name: "مقالات", value: "article" },
            },

            searchQuery: this.searchQuery || "",

            results: this.results || [],
            resultsPage: this.resultsPage || 1,
            resultsTotal: this.resultsTotal || 0,
            resultsPageTotal: this.resultsPageTotal || 1,
            resultsLoading: this.resultsLoading || false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;
        this.processRoute(route);

        await Promise.all([this.search({ headers })]);
    },
    async beforeRouteUpdate(to, from, next) {
        if (to.params.query) this.$route.params.query = to.params.query;
        if (to.query.order) this.$route.query.order = to.query.order;
        if (to.query.section) this.$route.query.section = to.query.section;

        this.processRoute(to);
        this.clearResults();
        await this.search({});
        next();
    },
    methods: {
        async selectSection(section) {
            this.selectedSearchSection = section;
            this.$router.push(`/search/${this.searchQuery}?order=${this.selectedSearchOrder.value}&section=${this.selectedSearchSection.value}`);
            this.clearResults();
            await this.search();
        },

        async selectOrder() {
            this.$router.push(`/search/${this.searchQuery}?order=${this.selectedSearchOrder.value}&section=${this.selectedSearchSection.value}`);
            this.clearResults();
            await this.search();
        },

        async research(e) {
            e.preventDefault();
            this.$router.push(`/search/${this.searchQuery}?order=${this.selectedSearchOrder.value}&section=${this.selectedSearchSection.value}`);
        },

        async search(data = {}) {
            if (this.resultsLoading || this.resultsPage > this.resultsPageTotal) return;
            this.resultsLoading = true;

            let url = `/api/search/${this.searchQuery}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.resultsPage}`, `order=${this.selectedSearchOrder.value}`, `section=${this.selectedSearchSection.value}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(encodeURI(url), { headers })
                .then((results) => {
                    this.results = [...this.results, ...results.data.records];
                    this.resultsPage = results.data.page + 1;
                    this.resultsTotal = results.data.total;
                    this.resultsPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.resultsLoading = false));
        },

        processRoute(route) {
            if (route.params.query) this.searchQuery = route.params.query;
            if (route.query.order && !!this.searchOrderOptions[route.query.order]) {
                this.selectedSearchOrder = this.searchOrderOptions[route.query.order];
            }
            if (route.query.section && !!this.searchSectionOptions[route.query.section]) {
                this.selectedSearchSection = this.searchSectionOptions[route.query.section];
            }
        },

        clearResults() {
            this.results = [];
            this.resultsPage = 1;
            this.resultsTotal = 0;
            this.resultsPageTotal = 1;
        },
    },
};
</script>
