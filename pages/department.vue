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
            <div v-if="!newCoursesLoading">
                <ul class="flex flex-wrap items-center justify-evenly gap-6">
                    <li class="top_course_cart shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl max-w-screen-sm" v-for="(course, i) in newCourses" :key="i">
                        <div class="relative overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-full sm:w-64">
                            <img class="max-w-screen-sm w-full sm:h-full object-cover" src="/misc/article.png" alt="course" draggable="false" />
                            <span class="article_category flex items-center justify-center py-1 p-4 w-max absolute top-2 left-2">category</span>
                            <div class="absolute flex flex-col gap-2 top-2 right-2">
                                <span class="w-10 h-10 rounded-full" title="department">
                                    <img class="w-full h-full object-cover" src="/misc/Figma.svg" alt="department" />
                                </span>
                                <span class="w-10 h-10 rounded-full" title="teacher">
                                    <img class="w-full h-full object-cover" src="/misc/Figma.svg" alt="teacher" />
                                </span>
                            </div>
                            <div class="gray_gradient absolute bottom-0 flex flex-col gap-4 p-6">
                                <h3 class="text-2xl">دوره آموزشی موشن گرافیک</h3>
                                <span class="text-lightblue-300">20 ساعت آموزش - 20 ویدیو</span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-6 pt-2 w-full">
                            <ul class="topics flex flex-col justify-between items-stretch gap-7 w-full">
                                <li class="flex items-start gap-4 w-full" v-for="(topic, i) in topics" :key="i">
                                    <span class="flex items-center justify-center flex-shrink-0 w-8 h-8 p-2 bg-indigo-100 text-indigo-800 rounded-full">
                                        {{ i + 1 }}
                                    </span>
                                    <div class="flex flex-wrap items-start justify-between gap-2 w-full">
                                        <div class="flex flex-col gap-1 flex-grow">
                                            <strong class="overflow-hidden overflow-ellipsis whitespace-nowrap" style="max-width: 210px">name</strong>
                                            <span class="relative w-full h-1 bg-indigo-100"><b class="absolute w-8/12 h-1 bg-indigo-800"></b></span>
                                        </div>
                                        <small class="bg-indigo-100 text-indigo-800 py-1 p-2 rounded-md">10:09</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="w-full max-w-screen-4xl select-none overflow-hidden p-4" v-else></div>
        </section>

        <Nuxt nuxt-child-key="department" />

        <section class="relative flex flex-col gap-8 w-full mt-10" id="top-teachers">
            <div class="flex flex-wrap items-center justify-between gap-8 w-full">
                <h2 class="font-bold text-4xl">اساتید برتر</h2>
            </div>
            <div v-if="!topTeachersLoading">
                <ul class="flex flex-wrap items-center justify-evenly gap-6">
                    <li
                        class="top_course_cart shadow-lg flex flex-col sm:flex-row gap-4 p-4 rounded-2xl max-w-screen-sm"
                        v-for="(teacher, i) in topTeachers"
                        :key="i"
                    >
                        <div
                            class="teacher_card relative flex flex-col items-center justify-center gap-4 flex-shrink-0 p-8 w-full sm:w-64 rounded-2xl shadow-lg max-w-md"
                            :style="`background-image: url('/misc/Figma.svg')`"
                        >
                            <img class="w-24 h-24 rounded-full shadow-md" src="/misc/Figma.svg" :alt="`tset test`" />
                            <b class="text-2xl">{{ `سید احمد عباسی` }}</b>
                            <small class="text-lightblue-400">{{ `مدیرمحصول` }}</small>
                            <p class="opacity-75 text-center max-w-xs">{{ `لحظات و خاطرات آینده ساز و آرامش بخشی را با آموزش های ما تجربه کنید!` }}</p>
                            <!-- <ul class="flex flex-wrap items-center gap-2">
                                <li v-for="(social, j) in teacher.social" :key="j">
                                    <a :href="social.link"><Icon class="w-8 h-8 bg-gray-200" folder="social" :name="social.name" /></a>
                                </li>
                            </ul> -->
                        </div>
                        <div class="flex flex-col gap-6 pt-2 w-full">
                            <span class="font-light opacity-60">3 دوره آموزشی - 30 ساعت آموزش</span>
                            <ul class="topics flex flex-col justify-between items-stretch gap-7 w-full">
                                <li class="flex items-start gap-4 w-full" v-for="(topic, i) in topTeacherCourses" :key="i">
                                    <span class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full">
                                        <img class="w-full h-full object-cover" src="/misc/Figma.svg" alt="" />
                                    </span>
                                    <div class="flex flex-wrap items-start justify-between gap-2 w-full">
                                        <div class="flex flex-col gap-1 flex-grow">
                                            <strong class="overflow-hidden overflow-ellipsis whitespace-nowrap" style="max-width: 210px">name</strong>
                                            <span class="relative w-full h-1 bg-indigo-100"><b class="absolute w-8/12 h-1 bg-indigo-800"></b></span>
                                            <p>لحظات و خاطرات آینده ساز و آرامش بخشی را با آموزش های ما تجربه کنید!</p>
                                        </div>
                                        <small class="bg-indigo-100 text-indigo-800 py-1 p-2 rounded-md">3 ساعت</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="w-full max-w-screen-4xl select-none overflow-hidden p-4" v-else></div>
        </section>
    </main>
</template>

<script>
import axios from "axios";

export default {
    head: {
        title: "دپارتمان ها - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: {},
    data() {
        return {
            newCoursesLoading: false,
            newCourses: [{}, {}],
            topics: [{}, {}, {}, {}, {}, {}],

            topTeachersLoading: false,
            topTeachers: [{}, {}],
            topTeacherCourses: [{}, {}, {}],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        // await Promise.all([this.getMostPopularArticles({ headers })]);
    },
    methods: {
        async getMostPopularArticles(data = {}) {
            if (this.newCoursesLoading) return;
            this.newCoursesLoading = true;

            let url = `/api/most-populars-articles`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.newCourses = results.data))
                .catch((e) => {})
                .finally(() => (this.newCoursesLoading = false));
        },
    },
};
</script>
