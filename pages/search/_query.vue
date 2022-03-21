<style scoped>
#top {
    background: linear-gradient(87.25deg, #ffa825 -11.51%, #ff70d7 114.56%);
    z-index: 2;
}

.search_box {
    max-height: 3.75rem;
    background-color: var(--search-box-bg-color);
    color: var(--search-box-color);
    position: absolute;
    bottom: -1.5rem;
    z-index: 10;
}

.load_more_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
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

.article_list {
    grid-template-columns: repeat(auto-fit, minmax(284px, 1fr));
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-8 max-w-screen-2xl w-full mt-28 md:mt-32 px-4 md:px-8 mb-16">
        <section class="relative flex flex-col items-center gap-6 w-full rounded-2xl" id="top">
            <div class="relative flex flex-col items-center gap-3 w-full p-8 py-16 z-10">
                <h1 class="kalameh_bold title2 text-4xl md:text-5xl text-gray-700">جستجو در پرتقال</h1>
                <p class="kalameh_bold text-sm md:text-base mt-4 text-center text-white">بیش از 2،000 ویدیو آموزشی از اساتید برتر در حوزه های مختلف</p>
            </div>
            <form class="search_box flex items-center gap-4 p-2 px-4 rounded-2xl shadow-lg w-10/12 max-w-sm md:max-w-3xl" @submit="research($event)">
                <Icon class="w-7 h-7 bg-gray-700 flex-shrink-0" size="28px" folder="icons/new" name="Search" />
                <input class="flex-grow outline-none bg-transparent w-full h-12" v-model="searchQuery" type="text" placeholder="جستجو..." />
                <span class="w-0.5 bg-gray-600 h-screen max-h-8"></span>
                <div class="relative">
                    <div class="flex items-center gap-1 flex-grow w-max" @click="searchSectionDropDown = !searchSectionDropDown">
                        <span class="kalameh_bold flex pl-4 flex-shrink-0">{{ selectedSearchSection.name }}</span>
                        <Icon class="w-5 h-5 bg-gray-700 flex-shrink-0" size="20px" folder="icons/new" name="ArrowDown2" />
                    </div>
                    <transition name="slidedown" mode="out-in" appear>
                        <ul class="absolute top-8 -right-4 flex flex-col gap-2 p-1 bg-white rounded-2xl w-full min-w-min shadow-xl" v-show="searchSectionDropDown">
                            <li
                                class="flex items-start w-full p-1 px-4 hover:bg-gray-100 rounded-lg cursor-pointer"
                                :class="{ section_selected: selectedSearchSection.value == searchSection.value }"
                                v-for="(searchSection, i) in searchSectionOptions"
                                :key="i"
                                @click="selectSection(searchSection)"
                            >
                                <span>{{ searchSection.name }}</span>
                            </li>
                        </ul>
                    </transition>
                </div>
            </form>
            <img class="absolute w-full -top-12 right-0 -z-1" src="/pages/search/bg.png" alt="Background" />
        </section>
        <strong class="kalameh_bold mt-4" v-if="resultsTotal > 0 && !resultsLoading">
            {{ resultsTotal }} نتیجه برای "{{ $route.params.query }}" در بخش {{ selectedSearchSection.name }} پیدا کردیم
        </strong>

        <span class="spacer_v w-full h-0.5"></span>

        <div class="flex flex-wrap items-center justify-start gap-8 w-full">
            <div class="w-max">
                <Select :selectedOption.sync="selectedSearchOrder" @update:selectedOption="selectOrder()" :options="searchOrderOptions" placeholder="انتخاب کنید">
                    <template v-slot:option="{ option }">
                        <span :value="option.value">{{ option.name }}</span>
                    </template>
                </Select>
            </div>
        </div>

        <section class="w-full" id="courses" v-if="selectedSearchSection.value == 'course'">
            <ul class="flex flex-wrap items-center justify-center gap-8 w-full">
                <li class="swiper-slide shadow-lg flex flex-col items-center gap-3 rounded-2xl max-w-xs p-3 bg-white" v-for="(course, i) in results" :key="i">
                    <nuxt-link
                        :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`"
                        class="relative flex items-end overflow-hidden rounded-2xl w-full h-52"
                    >
                        <img
                            class="absolute inset-0 object-cover bg-gray-200 w-full h-full"
                            :src="course.image || `/misc/course.png`"
                            loading="lazy"
                            :alt="course.name"
                            draggable="false"
                        />
                        <div class="relative flex flex-wrap justify-between gap-4 bg-gray-800 bg-opacity-80 rounded-xl p-2 w-full m-2 mt-auto">
                            <span class="flex items-end gap-1">
                                <Icon class="w-5 h-5 bg-gray-100" size="20px" folder="icons/new" name="TimeCircle" />
                                <small class="text-gray-50">{{ course.totalTime }}</small>
                            </span>
                            <span class="flex items-end gap-1">
                                <Icon class="w-5 h-5 bg-gray-100" size="20px" folder="icons/new" name="User3" />
                                <small class="text-gray-50">{{ course.buyCount }}</small>
                            </span>
                            <span class="flex items-end gap-1">
                                <Icon class="w-5 h-5 bg-gray-100" size="20px" folder="icons/new" name="Star" />
                                <small class="text-gray-50">{{ course.score.toFixed(1) }} از 8</small>
                            </span>
                        </div>
                    </nuxt-link>
                    <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="w-full">
                        <h3 class="kalameh_black text-lg text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap">{{ course.name }}</h3>
                    </nuxt-link>
                    <ul class="flex flex-wrap items-start gap-4 w-full">
                        <li class="flex items-center gap-1 text-orange-800 text-xs">
                            <i class="w-1.5 h-1.5 rounded-full bg-orange-400"></i>
                            {{ course.groups[0].name }}
                        </li>
                    </ul>
                    <p class="text-sm w-full max-w-xs h-16 overflow-hidden">
                        {{ course.description.length > 120 ? course.description.substr(0, 120) + "..." : course.description }}
                    </p>
                    <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                        <nuxt-link :to="`/teacher/${course.teacher[0]._id}`" class="flex items-center gap-2">
                            <img class="rounded-full object-cover w-8 h-8" :src="course.teacher[0].image" alt="Figma" loading="lazy" width="32" height="32" />
                            <span class="text-gray-600 text-xs">{{ `${course.teacher[0].name} ${course.teacher[0].family}` }}</span>
                        </nuxt-link>
                        <small
                            class="course_tag flex items-center gap-1 p-1 px-2 bg-red-500 text-white rounded-full text-xs"
                            v-if="course.discountInfo && course.discountInfo.tag != 'رایگان' && course.price > 0"
                        >
                            <span class="kalameh_bold">{{ course.discountInfo.tag }}</span>
                            <span class="kalameh_bold" v-if="!!course.discountInfo.discountType">تخفیف</span>
                        </small>
                    </div>
                    <hr class="w-full border-t-2 border-b-0 border-gray-200" />
                    <div class="flex items-center justify-between gap-2 w-full">
                        <nuxt-link
                            :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`"
                            class="view_topics flex items-center p-3 px-4 text-sm rounded-2xl flex-shrink-0"
                        >
                            مشاهده سرفصل ها
                        </nuxt-link>
                        <div class="flex items-end justify-center gap-4">
                            <div class="flex flex-col" v-if="course.price">
                                <span class="flex items-center gap-1">
                                    <b :class="[course.price != course.discountInfo.discountedPrice ? 'text-base line-through' : 'text-xl']">
                                        {{ new Intl.NumberFormat("fa").format(course.price) }}
                                    </b>
                                    <small>تومان</small>
                                </span>
                                <b class="text-2xl text-amber-500" v-if="course.price != course.discountInfo.discountedPrice">
                                    {{ new Intl.NumberFormat("fa").format(course.discountInfo.discountedPrice) }}
                                </b>
                            </div>
                            <span class="text-xl font-bold" v-else>رایگان</span>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <section class="w-full" id="articles" v-if="selectedSearchSection.value == 'article'">
            <ul class="flex flex-wrap items-center justify-center gap-10 w-full">
                <li class="flex w-full rounded-xl max-w-xs" v-for="(article, i) in results" :key="i">
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
                                <div class="bg-orange-400 h-1.5 rounded-full flex-grow"></div>
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
        </section>
        <section class="w-full" id="teachers" v-if="selectedSearchSection.value == 'teacher'">
            <ul class="flex flex-wrap justify-center gap-8 w-full">
                <li
                    class="flex flex-col items-start justify-start gap-4 p-4 md:p-6 mt-10 w-full max-w-xs rounded-3xl shadow-2xl bg-white"
                    v-for="(teacher, i) in results"
                    :key="i"
                >
                    <div class="flex flex-wrap md:flex-nowrap items-end gap-4 -mt-16">
                        <img class="w-28 h-28 bg-gray-200 p-2 rounded-full object-cover shadow-md" :src="teacher.image" :alt="`${teacher.name} ${teacher.family}`" />
                        <div class="flex flex-col gap-1">
                            <b class="kalameh_bold text-2xl">{{ `${teacher.name} ${teacher.family}` }}</b>
                            <small class="text-gray-500 text-xs" v-if="teacher.groups && teacher.groups[0]">مدرس دوره های {{ teacher.groups[0].name }}</small>
                        </div>
                    </div>
                    <p class="w-full text-sm opacity-75">
                        {{ teacher.description.length > 128 ? teacher.description.substr(0, 128) + "..." : teacher.description }}
                    </p>
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <ul class="flex flex-wrap items-center gap-2">
                            <li v-for="(social, j) in teacher.social" :key="j">
                                <a :href="social.link"><Icon class="w-5 h-5 bg-gray-200" folder="social" :name="social.name" /></a>
                            </li>
                        </ul>
                        <nuxt-link :to="`/teacher/${teacher._id}`" class="orange_gradient_h flex items-center justify-center w-max p-3 px-4 rounded-2xl">
                            مشاهده دوره ها
                        </nuxt-link>
                    </div>
                </li>
            </ul>
        </section>

        <div class="flex flex-col items-center justify-center gap-16 -mt-20" v-if="!resultsLoading && results.length == 0">
            <img class="w-64 h-64 object-contain rounded-3xl shadow-sm" src="/pages/search/no-results.png" alt="no-results" style="filter: grayscale(1)" />
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
            searchSectionDropDown: false,
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
            this.searchSectionDropDown = false;
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
