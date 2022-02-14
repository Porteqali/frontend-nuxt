<style scoped>
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

.courses_list {
    grid-template-columns: repeat(auto-fit, minmax(284px, 1fr));
}
.course_tag {
    background-color: var(--department-section-course-tag-bg-color);
    color: var(--department-section-course-tag-color);
}

.load_more_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
}
</style>

<template>
    <main role="main" class="flex flex-col lg:flex-row items-start gap-10 max-w-screen-4xl w-full">
        <section class="relative flex flex-col justify-evenly gap-8 w-full lg:w-auto flex-shrink-0">
            <div
                class="teacher_card flex flex-col items-center justify-start gap-4 p-8 w-full rounded-3xl shadow-2xl lg:max-w-md"
                :style="`background-image: url('${teacher.image}')`"
                v-if="!teacherLoading"
            >
                <img class="w-24 h-24 rounded-full shadow-md" :src="teacher.image" :alt="`${teacher.name} ${teacher.family}`" />
                <b class="text-2xl">{{ `${teacher.name} ${teacher.family}` }}</b>
                <small class="text-lightblue-400">{{ teacher.title }}</small>
                <div class="flex flex-col gap-4 w-full">
                    <h5 class="text-xl border-b border-solid border-gray-300 border-opacity-30 py-2 w-full">فعالیت های مدرس</h5>
                    <ul class="flex items-center justify-center gap-8">
                        <li class="flex flex-col items-center justify-center gap-2">
                            <h6 class="flex items-center gap-1">
                                <img src="/icons/Users.svg" width="24" height="24" alt="Users" />
                                <span>تعداد دانشجو</span>
                            </h6>
                            <b>N/A</b>
                        </li>
                        <li class="flex flex-col items-center justify-center gap-2">
                            <h6 class="flex items-center gap-1">
                                <img src="/icons/Video.svg" width="24" height="24" alt="Video" />
                                <span>تعداد دوره</span>
                            </h6>
                            <b>{{ teacher.courseCount }}</b>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col gap-4 w-full">
                    <h5 class="text-xl border-b border-solid border-gray-300 border-opacity-30 py-2 w-full">درباره مدرس</h5>
                    <p class="opacity-75 max-w-xs">{{ teacher.description }}</p>
                </div>
                <ul class="flex flex-wrap items-center gap-2">
                    <li v-for="(social, j) in teacher.social" :key="j">
                        <a :href="social.link"><Icon class="w-8 h-8 bg-gray-200" folder="social" :name="social.name" /></a>
                    </li>
                </ul>
            </div>
            <div class="teacher_card flex flex-col items-center justify-start gap-4 p-8 md:p-16 w-full rounded-3xl shadow-2xl max-w-md" v-else>
                <span class="skeleton w-24 h-24 rounded-full shadow-md"></span>
                <small class="skeleton w-20 h-2 text-lightblue-400"></small>
                <div class="flex flex-col gap-2 w-full">
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-4/12 h-2"></span>
                </div>
            </div>
        </section>
        <section class="relative flex flex-col justify-center gap-8 flex-grow w-full">
            <ul class="courses_list grid gap-10 w-full">
                <li class="gray_gradient course_card shadow-lg flex flex-col gap-4 p-4 rounded-3xl max-w-md w-full mx-auto" v-for="(course, i) in courses" :key="i">
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
            <Loading class="w-12 h-12" v-if="coursesLoading" />
            <button
                class="load_more_btn blur flex items-center gap-2 py-3 px-6 rounded-xl w-max"
                v-if="!coursesLoading && coursesPage <= coursesPageTotal"
                @click="getCourses()"
            >
                <span>بارگذاری بیشتر</span>
            </button>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";
import Loading from "~/components/Loading.vue";

export default {
    head() {
        return {
            title: `${this.teacher.name} ${this.teacher.family} - گروه آموزشی پرتقال`,
            meta: [
                { hid: "description", name: "description", content: this.teacher.description ? this.teacher.description.substr(0, 256) + "..." : "" },
                { hid: "language", name: "language", content: "fa" },

                { hid: "og:locale", name: "og:locale", content: "fa_IR" },
                { hid: "og:title", name: "og:title", content: `${this.teacher.name} ${this.teacher.family} - گروه آموزشی پرتقال` },
                { hid: "og:description", name: "og:description", content: this.teacher.description ? this.teacher.description.substr(0, 256) + "..." : "" },
                { hid: "og:url", name: "og:url", content: this.teacher.canonical },
                { hid: "og:site_name", name: "og:site_name", content: `${this.teacher.name} ${this.teacher.family} - گروه آموزشی پرتقال` },
                { hid: "og:image", name: "og:image", content: this.teacher.image },

                { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
                { hid: "twitter:site", name: "twitter:site", content: this.teacher.canonical },
                {
                    hid: "twitter:description",
                    name: "twitter:description",
                    content: this.teacher.description ? this.teacher.description.substr(0, 256) + "..." : "",
                },
                { hid: "twitter:title", name: "twitter:title", content: `${this.teacher.name} ${this.teacher.family} - گروه آموزشی پرتقال` },
                { hid: "twitter:image", name: "twitter:image", content: this.teacher.image },

                { hid: "robots", name: "robots", content: "max-image-preview:large" },
                { hid: "mobile-web-app-capable", name: "mobile-web-app-capable", content: "yes" },
            ],
            link: [
                { rel: "canonical", href: this.teacher.canonical },
                { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.ico" },
                { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
            ],
        };
    },
    components: { Icon, Loading },
    data() {
        return {
            teacherLoading: false,
            teacher: this.teacher || {},

            courses: [],
            coursesPage: 1,
            coursesTotal: 0,
            coursesPageTotal: 1,
            coursesLoading: false,
            coursesSkeleton: [0, 0, 0, 0, 0, 0],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getTeacher({ headers }), this.getCourses({ headers })]);
    },
    methods: {
        async getTeacher(data = {}) {
            if (this.teacherLoading) return;
            this.teacherLoading = true;

            let url = `/api/teachers/${this.$route.params.id}/info`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.teacher = { ...results.data.teacher, courseCount: results.data.courseCount }))
                .catch((e) => {})
                .finally(() => (this.teacherLoading = false));
        },

        async getCourses(data = {}) {
            if (this.coursesLoading) return;
            this.coursesLoading = true;

            let url = `/api/teachers/${this.$route.params.id}/courses`;
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
