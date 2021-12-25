<style scoped>
.box {
    position: absolute;
    top: 1.25rem;
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

@media (min-width: 768px) {
    .box {
        top: 3.75rem;
    }
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box flex flex-col gap-4 p-6 blur rounded-3xl shadow-lg" v-show="open">
            <div class="search_box flex items-center gap-4 p-2 rounded-xl shadow-lg">
                <img class="flex-shrink-0 mr-2" src="/icons/Search.svg" width="24" height="24" alt="Search" />
                <input class="flex-grow outline-none bg-transparent" type="text" placeholder="جستجو" />
            </div>
            <div class="flex items-center gap-2">
                <h4 class="flex-shrink-0 text-lg">دوره های پیشنهادی</h4>
                <hr class="w-full opacity-50" />
            </div>
            <ul class="flex flex-col w-full" v-if="!suggestedCoursesLoading">
                <li class="flex w-full" v-for="(suggestedCourse, i) in suggestedCourses" :key="i">
                    <nuxt-link to="#" class="flex items-center justify-between gap-2 p-3 w-full">
                        <div class="flex items-center gap-2">
                            <img :src="suggestedCourse.groups[0].icon" width="28" height="28" :alt="suggestedCourse.groups[0].name" />
                            <span class="text-sm">{{ suggestedCourse.name }}</span>
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
    },
};
</script>
