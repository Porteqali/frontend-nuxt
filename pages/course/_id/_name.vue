<style scoped>
.info_card {
    color: var(--header-nav-text-color);
    background-color: var(--header-nav-container-bg-color);
}

.discount_box {
    box-shadow: 0px 5px 30px rgba(255, 91, 152, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
}

.buy_btn {
    border-radius: 0 0 1rem 1rem;
}
</style>

<template>
    <section class="relative flex flex-col gap-8 mt-4 w-full" id="course">
        <article class="flex flex-col gap-8 max-w-screen-2xl w-full mx-auto">
            <header class="relative flex flex-col gap-6 w-full p-8 shadow-xl rounded-2xl bg-white text-black" v-if="course">
                <h1 class="font-bold text-3xl">{{ course.name }}</h1>
                <ul class="flex flex-wrap items-center gap-2 font-light text-base md:text-lg">
                    <li class="flex-shrink-0"><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                    <li class="flex-shrink-0">&gt;</li>
                    <li class="flex-shrink-0"><nuxt-link title="دپارتمان ها" to="/department">دپارتمان ها</nuxt-link></li>
                    <li class="flex-shrink-0">&gt;</li>
                    <li class="flex-shrink-0" v-if="course && course.group">{{ course.group.name }}</li>
                    <li class="flex-shrink-0">&gt;</li>
                    <li class="flex-shrink-0 text-lightblue-600" v-if="course">{{ course.name }}</li>
                </ul>
            </header>
            <div class="flex gap-6 w-full">
                <div class="flex flex-col gap-4 w-full max-w-sm flex-shrink-0" v-if="course">
                    <div class="info_card flex flex-col gap-4 rounded-3xl shadow-lg p-6">
                        <h3 class="w-full text-xl">اطلاعات کلی دوره</h3>
                        <hr class="border-b border-solid border-gray-300 border-opacity-30" />
                        <ul class="flex flex-wrap items-center justify-evenly gap-6">
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/Star.orange.svg" alt="Star" />
                                    <span>امتیاز دوره</span>
                                </h5>
                                <strong v-if="course.score">{{ course.score.toFixed(1) }} از 8</strong>
                            </li>
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/TimeCircle.orange.svg" alt="TimeCircle" />
                                    <span>مدت زمان دوره</span>
                                </h5>
                                <strong>{{ course.totalTime }}</strong>
                            </li>
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/Video.orange.svg" alt="Video" />
                                    <span>تعداد جلسات</span>
                                </h5>
                                <strong v-if="course.topics">{{ course.topics.length }}</strong>
                            </li>
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/Profile.orange.svg" alt="Profile" />
                                    <span>تعداد دانشجویان</span>
                                </h5>
                                <strong>{{ course.buyCount }}</strong>
                            </li>
                        </ul>
                        <hr class="border-b border-solid border-gray-300 border-opacity-30" />
                        <div class="gray_gradient flex items-center rounded-2xl gap-4 p-4">
                            <b class="orange_gradient_h discount_box w-16 h-16 rounded-2xl text-2xl flex-shrink-0" v-if="course.price > 0 && !!discount">
                                {{ discount }}%
                            </b>
                            <span class="flex flex-col gap-2 flex-grow">
                                <small class="line-through" v-if="course.price > 0 && !!discount">
                                    {{ new Intl.NumberFormat("fa").format(course.price) }} تومان
                                </small>
                                <strong class="font-normal text-3xl" v-if="course.price > 0">{{ new Intl.NumberFormat("fa").format(course.price) }} تومان</strong>
                                <strong class="font-normal text-3xl w-full text-center" v-else>رایگان</strong>
                            </span>
                        </div>
                        <button class="buy_btn flex items-center justify-center gap-2 text-xl p-4 -m-6 mt-0 shadow-lg bg-bluegray-100 text-black">
                            <img src="/icons/Buy.black.svg" alt="Buy" />
                            <span>افزودن به سبد خرید</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-4">
                        <div></div>
                        <div></div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div class="flex-grow">
                    <VideoPlayer class="w-full" src="" type="" />
                </div>
            </div>
        </article>
    </section>
</template>

<script>
import axios from "axios";
import { duration } from "jalali-moment";
import VideoPlayer from "~/components/VideoPlayer.vue";
import CommentSection from "~/components/course/Comment.section.vue";

export default {
    head() {
        return {
            title: `دوره ${this.course.name} - گروه آموزشی پرتقال`,
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: {
        CommentSection,
        VideoPlayer,
    },
    data() {
        return {
            loadingCourse: false,
            course: this.course || {},
            similarCourses: this.similarCourses || [],

            discount: 20,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await Promise.all([this.getCourse({ headers }, route)]);
    },
    async beforeRouteUpdate(to, from, next) {
        if (to.params.id) this.$route.params.id = to.params.id;
        if (to.params.name) this.$route.params.name = to.params.name;

        await this.getCourse({}, to);
        if (typeof window !== "undefined") window.scrollTo({ top: 0 });
        next();
    },
    methods: {
        async getCourse(data = {}, route) {
            if (this.loadingCourse) return;
            this.loadingCourse = true;
            let url = `/api/course/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }
            await axios
                .get(url, { headers })
                .then((results) => {
                    const topics = results.data.course.topics.sort((a, b) => a.order - b.order);

                    let seconds = 0;
                    results.data.course.topics.forEach((topic) => {
                        seconds += parseInt(topic.time.hours) * 3600 + parseInt(topic.time.minutes) * 60 + parseInt(topic.time.seconds);
                    });

                    this.course = {
                        ...results.data.course,
                        topics,
                        totalTime: duration(seconds * 1000)
                            .locale("fa")
                            .humanize(),
                    };
                    this.similarCourses = results.data.similarCourses;
                })
                .catch((e) => {})
                .finally(() => (this.loadingCourse = false));
        },
    },
};
</script>
