<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}

.top_course_cart {
    background-color: #fff;
}
.top_course_cart img {
    /* max-height: 16rem; */
}
.top_course_cart .topics {
    /* height: 20rem; */
    min-width: 20rem;
    overflow: auto;
}
.article_category {
    border-radius: 1rem 0 1rem 0;
    background-color: #3f0e47bb;
    color: #e04ca5;
}

.most_viewed_courses_list {
    grid-template-columns: repeat(auto-fit, minmax(640px, 1fr));
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
    border-radius: 1.5rem;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <section class="relative flex flex-col lg:flex-row justify-center items-center w-full" id="top">
            <div class="flex flex-wrap items-start justify-center gap-10 flex-grow w-full">
                <div class="flex flex-col gap-10 mt-28">
                    <h1 class="flex flex-col gap-4 text-7xl">
                        <span class="kalameh_bold font-bold">دپارتمان ها</span>
                    </h1>
                    <ul class="flex items-center gap-2 font-light">
                        <li><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                        <li>&gt;</li>
                        <li>دپارتمان ها</li>
                    </ul>
                </div>
                <img src="/pages/departments/PresentationMan.png" class="w-full" alt="porteqali-PresentationMan" style="max-width: 560px" />
            </div>
        </section>

        <section class="relative flex flex-col gap-8 w-full mb-10" id="most-viewed-courses">
            <div class="flex flex-wrap justify-between items-center gap-8 w-full">
                <h2 class="font-bold text-4xl">پربازدیدترین دوره ها</h2>
            </div>
            <div v-if="!mostViewedCoursesLoading">
                <ul class="most_viewed_courses_list md:grid flex flex-col gap-6">
                    <li
                        class="top_course_cart shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl w-full max-w-2xl xl:max-w-full mx-auto"
                        v-for="(course, i) in mostViewedCourses"
                        :key="i"
                    >
                        <nuxt-link
                            :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`"
                            class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full sm:w-64"
                        >
                            <img
                                class="max-w-screen-sm w-full sm:h-full object-cover"
                                :src="course.image ? course.image : `/misc/article.png`"
                                :alt="course.name"
                                draggable="false"
                            />
                            <span
                                class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 left-2"
                                v-if="course.discountInfo && course.discountInfo.tag != ''"
                            >
                                {{ course.discountInfo.tag }}
                            </span>
                            <div class="absolute flex flex-col gap-2 top-2 right-2">
                                <span class="w-10 h-10 rounded-full" :title="course.groups[0].name">
                                    <img class="w-full h-full object-cover" :src="course.groups[0].icon || `/misc/Figma.svg`" :alt="course.groups[0].name" />
                                </span>
                                <span class="w-10 h-10 rounded-full" :title="`${course.teacher.name} ${course.teacher.family}`">
                                    <img class="w-full h-full object-cover" :src="course.teacher.image" :alt="`${course.teacher.name} ${course.teacher.family}`" />
                                </span>
                            </div>
                            <div class="gray_gradient absolute bottom-0 flex flex-col gap-4 p-6 w-full">
                                <h3 class="text-2xl">{{ course.name }}</h3>
                                <span class="text-lightblue-300">{{ `${course.totalTime} آموزش - ${course.topicsTotal} ویدیو` }}</span>
                            </div>
                        </nuxt-link>
                        <div class="flex flex-col gap-6 pt-2 w-full">
                            <ul class="topics flex flex-col justify-between items-stretch gap-7 w-full">
                                <li class="flex items-start gap-4 w-full" v-for="(topic, i) in course.topics" :key="i">
                                    <span class="flex items-center justify-center flex-shrink-0 w-8 h-8 p-2 bg-indigo-100 text-indigo-800 rounded-full">
                                        {{ i + 1 }}
                                    </span>
                                    <div class="flex flex-wrap items-start justify-between gap-2 w-full">
                                        <div class="flex flex-col gap-1 flex-grow">
                                            <strong class="overflow-hidden overflow-ellipsis whitespace-nowrap">{{ topic.name }}</strong>
                                            <span class="relative w-full h-1 bg-indigo-100"><b class="absolute w-8/12 h-1 bg-indigo-800"></b></span>
                                        </div>
                                        <small class="bg-indigo-100 text-indigo-800 py-1 p-2 rounded-md">
                                            {{ `${topic.time.hours}:${topic.time.minutes}:${topic.time.seconds}` }}
                                        </small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="flex flex-wrap items-center justify-evenly gap-6" v-else>
                <li
                    class="top_course_cart shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl max-w-screen-sm"
                    v-for="(course, i) in mostViewedCourses"
                    :key="i"
                >
                    <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full sm:w-64">
                        <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 left-2">
                            <span class="skeleton w-20 h-2"></span>
                        </span>
                        <div class="absolute flex flex-col gap-2 top-2 right-2">
                            <span class="skeleton w-10 h-10 rounded-full"></span>
                            <span class="skeleton w-10 h-10 rounded-full"></span>
                        </div>
                        <div class="gray_gradient absolute bottom-0 flex flex-col gap-4 p-6 w-full">
                            <h3 class="skeleton w-10/12 h-4"></h3>
                            <span class="skeleton w-full h-2"></span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-6 pt-2 w-full">
                        <ul class="topics flex flex-col justify-between items-stretch gap-7 w-full">
                            <li class="flex items-start gap-4 w-full" v-for="(topic, i) in mostViewedCoursesSkeletonTopic" :key="i">
                                <span class="flex items-center justify-center flex-shrink-0 w-8 h-8 p-2 bg-indigo-100 text-indigo-800 rounded-full">
                                    {{ i + 1 }}
                                </span>
                                <div class="flex flex-wrap items-start justify-between gap-2 w-full">
                                    <div class="flex flex-col gap-1 flex-grow">
                                        <strong class="skeleton w-full h-6" style="max-width: 210px"></strong>
                                        <span class="relative w-full h-1 bg-indigo-100"><b class="absolute w-8/12 h-1 bg-indigo-800"></b></span>
                                    </div>
                                    <small class="skeleton w-8 h-3"></small>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>

        <Nuxt nuxt-child-key="department" />

        <section class="relative flex flex-col gap-8 w-full mt-10" id="top-teachers">
            <div class="flex flex-wrap items-center justify-between gap-8 w-full">
                <h2 class="font-bold text-4xl">اساتید برتر</h2>
            </div>
            <div v-if="!topTeachersLoading">
                <ul class="flex flex-wrap justify-evenly gap-6">
                    <li
                        class="top_course_cart shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl max-w-screen-sm"
                        v-for="(teacher, i) in topTeachers"
                        :key="i"
                    >
                        <div
                            class="teacher_card relative flex flex-col items-center justify-center gap-4 flex-shrink-0 p-8 w-full sm:w-64 rounded-2xl shadow-lg max-w-md"
                            :style="`background-image: url('${teacher.image}')`"
                        >
                            <img class="w-24 h-24 rounded-full shadow-md" :src="teacher.image" :alt="`${teacher.name} ${teacher.family}`" />
                            <b class="text-2xl text-center">{{ `${teacher.name} ${teacher.family}` }}</b>
                            <small class="text-lightblue-400">{{ teacher.title }}</small>
                            <p class="opacity-75 text-center max-w-xs">{{ teacher.description }}</p>
                            <ul class="flex flex-wrap items-center gap-2">
                                <li v-for="(social, j) in teacher.social" :key="j">
                                    <a :href="social.link"><Icon class="w-8 h-8 bg-gray-200" folder="social" :name="social.name" /></a>
                                </li>
                            </ul>
                        </div>
                        <div class="flex flex-col gap-6 pt-2 w-full">
                            <span class="font-light opacity-60">{{ teacher.courseCount }} دوره آموزشی</span>
                            <ul class="topics flex flex-col justify-between items-stretch gap-7 w-full">
                                <li class="w-full" v-for="(course, i) in teacher.courses" :key="i">
                                    <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="flex items-start gap-4 w-full">
                                        <span class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full">
                                            <img class="w-full h-full object-cover" :src="course.groups[0].icon || `/misc/Figma.svg`" :alt="course.groups[0].name" />
                                        </span>
                                        <div class="flex flex-wrap items-start justify-between gap-2 w-full">
                                            <div class="flex flex-col gap-1 flex-grow">
                                                <strong class="overflow-hidden overflow-ellipsis whitespace-nowrap" style="max-width: 210px">
                                                    {{ course.name }}
                                                </strong>
                                                <span class="relative w-full h-1 bg-indigo-100"><b class="absolute w-8/12 h-1 bg-indigo-800"></b></span>
                                                <p>{{ course.description.length > 60 ? course.description.substr(0, 60) + "..." : course.description }}</p>
                                            </div>
                                            <small class="bg-indigo-100 text-indigo-800 py-1 p-2 rounded-md">{{ course.totalTime }}</small>
                                        </div>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import moment from "jalali-moment";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: "دپارتمان ها - گروه آموزشی پرتقال", meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: {},
    data() {
        return {
            mostViewedCoursesLoading: false,
            mostViewedCourses: [{}, {}],
            mostViewedCoursesSkeletonTopic: [{}, {}, {}, {}, {}, {}],

            topTeachersLoading: false,
            topTeachers: [{}, {}],
            topTeacherSkeletonCourses: [{}, {}, {}],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMetadata("department"), this.getMostviewedCourses({ headers }), this.getTopTeachers({ headers })]);
    },
    methods: {
        async getMostviewedCourses(data = {}) {
            if (this.mostViewedCoursesLoading) return;
            this.mostViewedCoursesLoading = true;

            let url = `/api/most-viewed-courses`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    results.data.length = 2;
                    this.mostViewedCourses = results.data.map((course) => {
                        let seconds = 0;
                        course.topics.forEach((topic) => {
                            seconds += parseInt(topic.time.hours) * 3600 + parseInt(topic.time.minutes) * 60 + parseInt(topic.time.seconds);
                        });
                        course.totalTime = moment
                            .duration(seconds * 1000)
                            .locale("fa")
                            .humanize();
                        course.topicsTotal = course.topics.length;
                        course.topics.length = 6;
                        return course;
                    });
                })
                .catch((e) => {})
                .finally(() => (this.mostViewedCoursesLoading = false));
        },

        async getTopTeachers(data = {}) {
            if (this.topTeachersLoading) return;
            this.topTeachersLoading = true;

            let url = `/api/top-teachers`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.topTeachers = results.data.map((teacher) => {
                        return teacher;
                    });
                })
                .catch((e) => {})
                .finally(() => (this.topTeachersLoading = false));
        },
    },
};
</script>
