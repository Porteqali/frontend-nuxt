<style scoped>
.box {
    position: absolute;
    /* top: 1.25rem; */
    margin-top: 1rem;
    left: 0;
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}

.search_box {
    background-color: var(--header-nav-container-bg-color);
}

.tag {
    background-color: var(--header-nav-container-bg-color);
}

ul li:hover {
    transform: scale(1.05, 1.05);
}

.view_cart_btn {
    background-color: var(--view-cart-btn-bg-color);
}

@media (min-width: 768px) {
    .box {
        /* top: 3.75rem; */
    }
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box flex flex-col gap-4 p-6 blur rounded-3xl shadow-lg" v-show="open">
            <form class="search_box flex items-center gap-4 p-2 rounded-xl shadow-lg" @submit="search($event)">
                <img class="flex-shrink-0 mr-2" src="/icons/Search.svg" width="24" height="24" alt="Search" />
                <input class="flex-grow outline-none bg-transparent" v-model="searchQuery" type="text" placeholder="جستجو" />
                <img
                    class="flex-shrink-0 mr-2"
                    src="/icons/Cancel.white.svg"
                    width="20"
                    height="20"
                    alt="Search"
                    @click="clearSearch()"
                    v-show="!!searchResults.length"
                />
            </form>
            <transition name="fade" mode="out-in" appear>
                <div class="flex flex-col gap-4" v-if="searchResults.length == 0">
                    <div class="flex items-center gap-2">
                        <h4 class="flex-shrink-0 text-lg">دوره های پیشنهادی</h4>
                        <hr class="w-full opacity-50" />
                    </div>
                    <ul class="flex flex-col w-full" v-if="!suggestedCoursesLoading">
                        <li class="flex w-full" v-for="(suggestedCourse, i) in suggestedCourses" :key="i">
                            <nuxt-link
                                :to="`/course/${suggestedCourse._id}/${suggestedCourse.name.replace(/ /g, '-')}`"
                                class="flex items-center justify-between gap-2 p-3 w-full"
                            >
                                <div class="flex items-center gap-2">
                                    <img :src="suggestedCourse.groups[0].icon" width="28" height="28" :alt="suggestedCourse.groups[0].name" />
                                    <span class="text-sm max-w-screen-2xs">{{ suggestedCourse.name }}</span>
                                </div>
                                <span class="rounded-md p-2 px-3 text-xs tag">{{ suggestedCourse.totalTime }}</span>
                            </nuxt-link>
                        </li>
                    </ul>
                    <ul class="flex flex-col w-full" v-else>
                        <li class="flex w-full" v-for="(suggestedCourse, i) in suggestedCourses" :key="i">
                            <nuxt-link to="#" class="flex items-center gap-2 p-3">
                                <span class="skeleton w-7 h-7 rounded-full"></span>
                                <span class="skeleton w-8 h-3"></span>
                                <span class="rounded-md p-2 px-3 text-xs tag">
                                    <span class="skeleton w-4 h-2"></span>
                                </span>
                            </nuxt-link>
                        </li>
                    </ul>
                    <div class="flex items-center gap-2">
                        <h4 class="flex-shrink-0 text-lg">دسترسی سریع</h4>
                        <hr class="w-full opacity-50" />
                    </div>
                    <ul class="flex flex-col w-full">
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-3" to="/department" title="departments">
                                <img src="/icons/Category.svg" width="24" height="24" alt="Category" />
                                <span class="text-sm">دپارتمان ها</span>
                            </nuxt-link>
                        </li>
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-3" to="/blog" title="blog">
                                <img src="/icons/Document.gray.svg" width="24" height="24" alt="Document" />
                                <span class="text-sm">مقالات</span>
                            </nuxt-link>
                        </li>
                        <li class="">
                            <nuxt-link class="flex items-center gap-2 p-3" to="/where-to-start" title="where-to-start">
                                <img src="/icons/Discovery.gray.svg" width="24" height="24" alt="Discovery" />
                                <span class="text-sm">از کجا شروع کنم؟</span>
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col gap-4" v-else>
                    <div class="flex items-center gap-2">
                        <h4 class="flex-shrink-0 text-lg">دوره ها</h4>
                        <hr class="w-full opacity-50" />
                    </div>
                    <ul class="flex flex-col w-full max-h-96 overflow-auto overflow-x-hidden">
                        <li class="flex w-full" v-for="(course, i) in searchResults" :key="i">
                            <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="flex items-center justify-between gap-2 p-3 w-full">
                                <div class="flex items-center gap-2">
                                    <img :src="course.groups[0].icon" width="28" height="28" :alt="course.groups[0].name" />
                                    <div class="flex flex-col gap-2">
                                        <span class="text-sm max-w-screen-2xs text-orange-300">{{ course.name }}</span>
                                        <p class="w-full max-w-screen-2xs text-xs opacity-80">
                                            {{ course.description.length > 60 ? course.description.substr(0, 60) + "..." : course.description }}
                                        </p>
                                    </div>
                                </div>
                                <span class="rounded-md p-2 px-3 text-xs tag">{{ course.totalTime }}</span>
                            </nuxt-link>
                        </li>
                    </ul>
                    <nuxt-link :to="`/search/${searchQuery}`" class="w-full py-2 px-4 text-center view_cart_btn rounded-xl shadow-lg">مشاهده نتایج بیشتر</nuxt-link>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import axios from "axios";
import { duration } from "jalali-moment";

export default {
    name: "SearchDropdown",
    props: ["open"],
    components: {},
    data() {
        return {
            loading: false,

            suggestedCourses: [0, 0, 0, 0],
            suggestedCoursesLoading: false,

            searchQuery: "",
            searchResults: [],
            searchResultsLoading: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getSuggestedCourses({ headers })]);
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        async getSuggestedCourses(data = {}) {
            if (this.suggestedCoursesLoading) return;
            this.suggestedCoursesLoading = true;

            let url = `/api/suggested-courses`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    results.data.length = 4;
                    this.suggestedCourses = results.data.map((data) => {
                        let seconds = 0;
                        data.topics.forEach((topic) => {
                            seconds += parseInt(topic.time.hours) * 3600 + parseInt(topic.time.minutes) * 60 + parseInt(topic.time.seconds);
                        });
                        delete data.topics;
                        data.totalTime = duration(seconds * 1000)
                            .locale("fa")
                            .humanize();
                        return data;
                    });
                })
                .catch((e) => {})
                .finally(() => (this.suggestedCoursesLoading = false));
        },

        async search(e) {
            e.preventDefault();

            if (this.searchResultsLoading) return;
            this.searchResultsLoading = true;

            let url = `/api/search/${this.searchQuery}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=1`, `order=newest`, `section=course`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(encodeURI(url), { headers })
                .then((results) => {
                    if (results.data.records.length > 4) results.data.records.length = 4;
                    this.searchResults = results.data.records;
                })
                .catch((e) => {})
                .finally(() => (this.searchResultsLoading = false));
        },

        clearSearch() {
            this.searchQuery = "";
            this.searchResults = [];
        },
    },
};
</script>
