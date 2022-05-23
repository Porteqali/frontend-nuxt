<style scoped>
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

.load_more_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
}

.path_img {
    transform: rotateY(180deg);
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-10 max-w-screen-2xl w-full mt-28 md:mt-32 px-4 md:px-8 mb-16">
        <img class="path_img absolute -right-20 top-40 w-96" src="/misc/path.svg" />
        <section class="flex flex-col justify-evenly gap-8 w-full max-w-screen-lg flex-shrink-0">
            <div class="relative flex flex-col gap-4 p-8 rounded-2xl shadow-2xl w-full max-w-screen-lg bg-white" v-if="!teacherLoading">
                <div class="orange_gradient_v absolute -z-1 w-11/12 h-3/4 -left-6 -bottom-6 rounded-3xl"></div>
                <div class="flex flex-wrap items-start justify-between gap-4 w-full">
                    <div class="flex items-center gap-4 -mt-16">
                        <img class="w-32 h-32 bg-gray-200 p-2 rounded-full shadow-md object-cover" :src="teacher.image" :alt="`${teacher.name} ${teacher.family}`" />
                        <div class="flex flex-col gap-2">
                            <b class="kalameh_bold text-2xl">{{ `${teacher.name} ${teacher.family}` }}</b>
                            <small class="flex items-center gap-1 text-orange-400" v-if="teacher.groups && teacher.groups[0]">
                                <div class="w-2 h-2 rounded-full bg-gray-400"></div>
                                مدرس دوره های {{ teacher.groups[0].name }}
                            </small>
                        </div>
                    </div>
                    <div class="flex items-center justify-center gap-4 md:gap-8">
                        <div class="flex items-center justify-center gap-2">
                            <Icon class="w-6 h-6 bg-gray-400" size="24px" folder="icons/new" name="User3" />
                            <h6 class="flex items-center gap-1">
                                <b>{{ new Intl.NumberFormat("fa").format(teacher.studentCount) }}</b>
                                <span>دانشجو</span>
                            </h6>
                        </div>
                        <span class="orange_gradient_h h-2 w-8 rounded-full"></span>
                        <div class="flex items-center justify-center gap-2">
                            <Icon class="w-6 h-6 bg-gray-400" size="24px" folder="icons/new" name="Video" />
                            <h6 class="flex items-center gap-1">
                                <b>{{ teacher.courseCount }}</b>
                                <span>دوره</span>
                            </h6>
                        </div>
                    </div>
                </div>
                <p class="opacity-75 w-full break-words">{{ teacher.description }}</p>
                <ul class="flex flex-wrap items-center gap-2">
                    <li v-for="(social, j) in teacher.socials" :key="j">
                        <a :href="`tel:${social.link}`" :title="social.name" v-if="social.name == 'whatsapp'">
                            <Icon class="w-5 h-5 bg-gray-400" folder="social" :name="social.name" />
                        </a>
                        <a :href="social.link" :title="social.name" v-else>
                            <Icon class="w-5 h-5 bg-gray-400" folder="social" :name="social.name" />
                        </a>
                    </li>
                </ul>
            </div>
            <div class="relative flex flex-col gap-4 p-8 rounded-2xl shadow-2xl w-full max-w-screen-lg bg-white" v-else>
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

        <span class="spacer_v w-full h-0.5 mt-8"></span>

        <section class="relative flex flex-col items-start justify-between gap-8 flex-grow w-full">
            <div class="flex items-start">
                <h4 class="kalameh_bold title text-2xl md:text-3xl">دوره ها</h4>
            </div>
            <ul class="flex flex-wrap items-center justify-center gap-8 w-full">
                <li class="swiper-slide shadow-lg flex flex-col items-center gap-3 rounded-2xl max-w-xs p-3 bg-white" v-for="(course, i) in courses" :key="i">
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
                        <small
                            class="course_tag flex items-center gap-1 p-1 px-2 bg-red-500 text-white rounded-full text-xs"
                            v-if="course.discountInfo && course.discountInfo.tag != 'رایگان' && course.price > 0"
                        >
                            <span class="kalameh_bold">{{ course.discountInfo.tag }}</span>
                            <span
                                class="kalameh_bold"
                                v-if="!!course.discountInfo.discountType && course.discountInfo.tag != 'رایگان' && course.discountInfo.tag != 'جدید'"
                            >
                                تخفیف
                            </span>
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
                .then((results) => (this.teacher = { ...results.data.teacher, courseCount: results.data.courseCount, studentCount: results.data.studentCount }))
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
