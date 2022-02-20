<style scoped>
.card {
    background-color: #ffffff77;
}
.cart_item {
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
</style>

<template>
    <section class="card relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl w-full max-w-screen-lg flex-grow">
        <div class="flex items-center gap-2">
            <img src="/icons/Play.gray.svg" width="32" height="32" alt="Play" />
            <h2 class="text-2xl">دوره های خریداری شده</h2>
        </div>
        <ul class="flex flex-col gap-4 w-full">
            <transition-group class="flex flex-col gap-4" name="slideleft" appear>
                <li class="flex w-full" v-for="item in courses" :key="item._id">
                    <nuxt-link
                        :to="`/course/${item.course[0]._id}/${item.course[0].name.replace(/ /g, '-')}`"
                        class="cart_item flex flex-wrap md:flex-nowrap items-center gap-4 p-4 rounded-2xl w-full"
                    >
                        <img class="w-24 h-auto rounded-xl shadow-md flex-shrink-0" :src="item.course[0].image" width="100" :alt="item.course[0].name" />
                        <div class="flex flex-col gap-2 w-full">
                            <h4>{{ item.course[0].name }}</h4>
                            <div class="flex items-center gap-2">
                                <img class="rounded-full object-cover" :src="item.teacher[0].image" alt="Figma" width="32" height="32" />
                                <span class="text-sm opacity-75">{{ `${item.teacher[0].name} ${item.teacher[0].family}` }}</span>
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center justify-between md:justify-evenly gap-4 w-full">
                            <div class="flex flex-col items-center gap-4">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/TimeCircle.orange.svg" alt="TimeCircle" />
                                    <span>مدت زمان دوره</span>
                                </h5>
                                <strong>{{ item.course[0].totalTime }}</strong>
                            </div>
                            <div class="flex flex-col items-center gap-4">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/Video.orange.svg" alt="Video" />
                                    <span>تعداد جلسات</span>
                                </h5>
                                <strong v-if="item.course[0].topics">{{ item.course[0].topics.length }}</strong>
                            </div>
                        </div>
                    </nuxt-link>
                </li>
            </transition-group>
        </ul>
        <button class="gray_gradient p-3 px-4 w-max rounded-2xl" v-if="!coursesLoading && coursesPage <= coursesPageTotal" @click="getCourses()">
            بارگذاری بیشتر
        </button>
        <Loading class="w-8 h-8" v-if="coursesLoading" />
    </section>
</template>

<script>
import axios from "axios";
import Loading from "~/components/Loading.vue";

export default {
    head() {
        return {
            title: "دوره های خریداری شده - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: {
        Loading,
    },
    data() {
        return {
            courses: [],
            coursesPage: 1,
            coursesTotal: 0,
            coursesPageTotal: 1,
            coursesLoading: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getCourses({ headers })]);
    },
    methods: {
        async getCourses(data = {}) {
            if (this.coursesLoading || this.coursesPage > this.coursesPageTotal) return;
            this.coursesLoading = true;

            let url = `/api/user-profile/courses`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.coursesPage}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.courses = [...this.courses, ...results.data.records];
                    this.coursesPage = results.data.page + 1;
                    this.coursesTotal = results.data.total;
                    this.coursesPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.coursesLoading = false));
        },
    },
};
</script>
