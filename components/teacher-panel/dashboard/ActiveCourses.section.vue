<style scoped>
h3::after {
    content: "";
    position: absolute;
    left: 5%;
    bottom: -2px;
    display: inline-block;
    width: 80%;
    height: 1rem;
    background-color: #ffc8a2;
    z-index: 0;
}
</style>

<template>
    <section class="w-full flex flex-col gap-6 p-4 md:p-6">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <h3 class="relative text-2xl"><b class="relative z-10">دورس فعال</b></h3>
            <nuxt-link class="hover:underline text-cyan-600 text-xs" :to="`/marketer-panel/courses`">تمام دوره ها</nuxt-link>
        </header>
        <ul class="flex flex-col gap-6 w-full overflow-x-auto overflow-y-hidden">
            <li class="flex items-center justify-between gap-2 p-2 w-full" style="min-width: 720px" v-for="(record, i) in courses" :key="i">
                <div class="flex items-center gap-2" v-if="!!record.course">
                    <img class="w-20 h-16 shadow-md object-cover rounded-xl flex-shrink-0" :src="record.course[0].image" alt="" />
                    <span class="flex text-sm w-screen max-w-screen-2xs" v-if="record.course[0].name">{{ record.course[0].name }}</span>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs">مقدار کمیسیون:</span>
                    <div class="flex items-center gap-1">
                        {{ new Intl.NumberFormat("fa").format(record.commissionAmount) }}
                        <small v-if="record.commissionType == 'percent'">%</small>
                        <small v-if="record.commissionType == 'number'">تومان</small>
                    </div>
                </div>
                <div>
                    <span class="p-1 px-2 text-xs rounded-md bg-emerald-100 text-emerald-700" v-if="record.status == 'active'">فعال</span>
                    <span class="p-1 px-2 text-xs rounded-md bg-rose-100 text-rose-700" v-if="record.status == 'deactive'">غیرفعال</span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "ActiveCoursesSection",
    components: {},
    data() {
        return {
            isDataLoading: false,
            courses: [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getCourses({ headers })]);
    },
    methods: {
        async getCourses(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/teacher-panel/courses`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`pp=6`];
            url = encodeURI(`${url}?${params.join("&")}`);

            await axios
                .get(url, { headers })
                .then((response) => {
                    this.courses = response.data.records;
                })
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));
        },
    },
};
</script>
