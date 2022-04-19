<style scoped>
.bundle_list {
    scrollbar-width: thin !important;
    color: #fff;
}
.bundle_list::-webkit-scrollbar-thumb {
    background: #8b8884;
}
</style>

<template>
    <section class="relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl bg-white w-full max-w-screen-lg flex-grow">
        <div class="flex items-center gap-2">
            <img src="/icons/Location.gray.svg" width="32" height="32" alt="Play" />
            <h2 class="kalameh_bold title text-2xl">آرشیو نقشه های راه</h2>
        </div>
        <ul class="flex flex-col gap-4 w-full">
            <li
                class="flex flex-col gap-4 shadow-xl border-8 border-solid border-gray-300 bg-warmgray-600 rounded-3xl flex-shrink-0 w-full max-w-xs p-4 ml-7"
                v-for="(roadmap, i) in roadmaps"
                :key="i"
            >
                <h4 class="kalameh_bold text-xl md:text-2xl w-full text-white">{{ roadmap.bundle.title }}</h4>
                <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                    <span class="kalameh_bold bg-green-400 text-white p-1 px-2 font-bold rounded-xl" v-if="roadmap.status == 'active'">فعال</span>
                    <span class="kalameh_bold bg-blue-400 text-white p-1 px-2 font-bold rounded-xl" v-if="roadmap.status == 'finished'">به پایان رسانده</span>
                    <span class="kalameh_bold bg-rose-400 text-white p-1 px-2 font-bold rounded-xl" v-if="roadmap.status == 'canceled'">متوقف شده</span>
                    <button
                        class="flex items-center justify-center gap-1 border-2 border-solid border-white rounded-2xl p-2 hover:bg-white hover:bg-opacity-10 flex-grow"
                        @click="startRoadMap(roadmap._id)"
                        v-if="roadmap.status == 'canceled'"
                    >
                        <span class="text-white">شروع ادامه نقشه راه</span>
                        <Icon class="w-7 h-7 bg-gray-100" size="28px" folder="icons/new" name="Location" />
                    </button>
                </div>
                <ul class="bundle_list flex flex-col gap-4 w-full h-full max-h-56 overflow-auto flex-grow">
                    <li class="flex items-start gap-2 w-full" v-for="(item, j) in roadmap.bundle.courses" :key="j">
                        <img class="w-24 h-20 object-cover rounded-xl flex-shrink-0" :src="item.course.image" :alt="item.course.name" />
                        <div class="flex flex-col gap-2 flex-grow">
                            <h5 class="kalameh_bold text-xs md:text-sm w-full opacity-75">{{ item.course.name }}</h5>
                            <div class="flex items-center gap-1" v-if="item.course.teacher">
                                <img
                                    class="w-7 h-7 object-cover rounded-full"
                                    :src="item.course.teacher.image"
                                    :alt="`${item.course.teacher.name} ${item.course.teacher.family}`"
                                />
                                <small class="text-xs opacity-75">{{ `${item.course.teacher.name} ${item.course.teacher.family}` }}</small>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        <button class="gray_gradient p-3 px-4 w-max rounded-2xl" v-if="!roadmapsLoading && roadmapsPage <= roadmapsPageTotal" @click="getRoadmaps()">
            بارگذاری بیشتر
        </button>
        <Loading class="w-8 h-8" v-if="roadmapsLoading" />
    </section>
</template>

<script>
import axios from "axios";
import Loading from "~/components/Loading.vue";

export default {
    head() {
        return {
            title: "آرشیو نقشه های راه - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: {
        Loading,
    },
    data() {
        return {
            roadmaps: [],
            roadmapsPage: 1,
            roadmapsTotal: 0,
            roadmapsPageTotal: 1,
            roadmapsLoading: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getRoadmaps({ headers })]);
    },
    methods: {
        async getRoadmaps(data = {}) {
            if (this.roadmapsLoading || this.roadmapsPage > this.roadmapsPageTotal) return;
            this.roadmapsLoading = true;

            let url = `/api/user-roadmap/roadmaps`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.roadmapsPage}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.roadmaps = [...this.roadmaps, ...results.data.records];
                    this.roadmapsPage = results.data.page + 1;
                    this.roadmapsTotal = results.data.total;
                    this.roadmapsPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.roadmapsLoading = false));
        },

        async startRoadMap(roadmapId) {
            // TODO
            // if user currently has no active roadmap activate this roadmap and re-calc the currentCourseStartDate
        },
    },
};
</script>
