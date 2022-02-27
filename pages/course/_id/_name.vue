<style scoped>
.info_card {
    color: var(--header-nav-text-color);
    background-color: var(--header-nav-container-bg-color);
    box-shadow: 0px 8px 45px rgba(0, 0, 0, 20%);
    box-shadow: 0px 50px 100px rgba(0, 0, 0, 25%);
}

.discount_box {
    box-shadow: 0px 5px 30px rgba(255, 91, 152, 60%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.course_card {
    /* background-color: var(--department-section-title-alt-text-bg-color); */
    background: linear-gradient(154.49deg, rgba(121, 117, 131, 0.2) 5.35%, rgba(54, 53, 103, 0.2) 83.85%), rgba(49, 48, 54, 0.3);
    color: var(--department-section-title-alt-text-color);
}
.course_tag {
    background-color: var(--department-section-course-tag-bg-color);
    color: var(--department-section-course-tag-color);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="course">
        <article class="flex flex-col gap-8 max-w-screen-2xl w-full mx-auto">
            <header class="relative flex flex-col gap-6 w-full p-8 shadow-xl rounded-2xl bg-white text-black" v-if="course">
                <h1 class="font-bold text-3xl">{{ course.name }}</h1>
                <ul class="flex flex-wrap items-center gap-2 font-light text-base md:text-lg">
                    <li class="flex-shrink-0"><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                    <li class="flex-shrink-0"><img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" /></li>
                    <li class="flex-shrink-0"><nuxt-link title="دپارتمان ها" to="/department">دپارتمان ها</nuxt-link></li>
                    <li class="flex-shrink-0"><img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" /></li>
                    <li class="flex-shrink-0" v-if="course && course.groups">
                        <nuxt-link class="flex items-center gap-1" :title="course.groups[0].name" :to="`/department?group=${course.groups[0].topGroup}`">
                            <img class="w-6 h-6 rounded-full shadow-md" :src="course.groups[0].icon" alt="" />
                            {{ course.groups[0].name }}
                        </nuxt-link>
                    </li>
                    <li class="flex-shrink-0"><img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" /></li>
                    <li class="flex-shrink-0 text-lightblue-600" v-if="course">{{ course.name }}</li>
                </ul>
            </header>
            <div class="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full">
                <div class="flex flex-col gap-4 w-full md:max-w-xs xl:max-w-sm flex-shrink-0" v-if="course">
                    <div class="info_card flex flex-col gap-4 rounded-3xl p-6">
                        <h3 class="w-full text-xl">اطلاعات کلی دوره</h3>
                        <hr class="border-b border-solid border-gray-300 border-opacity-30" />
                        <ul class="flex flex-wrap items-center justify-evenly gap-6">
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/Star.orange.svg" alt="Star" />
                                    <span>امتیاز دوره</span>
                                </h5>
                                <strong class="font-normal" v-if="course.score">{{ course.score.toFixed(1) }} از 8</strong>
                            </li>
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/TimeCircle.orange.svg" alt="TimeCircle" />
                                    <span>مدت زمان دوره</span>
                                </h5>
                                <strong class="font-normal" dir="ltr">{{ course.totalTime }}</strong>
                            </li>
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/Video.orange.svg" alt="Video" />
                                    <span>تعداد جلسات</span>
                                </h5>
                                <strong class="font-normal" v-if="course.topics">{{ course.topics.length }}</strong>
                            </li>
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex items-center gap-2">
                                    <img src="/icons/Profile.orange.svg" alt="Profile" />
                                    <span>تعداد دانشجویان</span>
                                </h5>
                                <strong class="font-normal">{{ course.buyCount }}</strong>
                            </li>
                        </ul>
                        <hr class="border-b border-solid border-gray-300 border-opacity-30" />
                        <div class="redgray_background flex items-center rounded-2xl gap-4 p-4" v-if="!purchased">
                            <b class="orange_gradient_h discount_box w-16 h-16 rounded-2xl text-2xl flex-shrink-0" v-if="course.price > 0 && !!discount">
                                {{ discount }}%
                            </b>
                            <span class="flex flex-col gap-2 flex-grow">
                                <small class="line-through" v-if="course.price > 0 && !!discount">
                                    {{ new Intl.NumberFormat("fa").format(course.price) }} تومان
                                </small>
                                <strong class="font-normal text-3xl" :class="{ 'text-center': !discount }" v-if="course.price > 0">
                                    {{ new Intl.NumberFormat("fa").format(course.discountInfo.discountedPrice) }} تومان
                                </strong>
                                <strong class="font-normal text-3xl w-full text-center" v-else>رایگان</strong>
                            </span>
                        </div>
                        <div v-else>
                            <Score :courseId="course._id" :userScore="userScore" @update:score="updateScore" />
                        </div>
                        <PurchaseButton :course="course" :coursePrice="course.price" :courseName="course.name" v-if="!purchased" />
                    </div>
                    <div class="flex gap-4">
                        <div class="info_card blur flex flex-col items-center justify-center gap-4 w-64 h-auto p-4 rounded-3xl">
                            <b class="text-4xl">{{ topVotePercentage }}%</b>
                            <p class="w-full text-sm text-center flex-grow">به دوره بالاترین نمره را داده اند</p>
                            <div class="relative h-4 rounded-full bg-pink-500 bg-opacity-40 w-full">
                                <span class="absolute bg-pink-500 rounded-full h-full" :style="`width: ${topVotePercentage}%`"></span>
                            </div>
                        </div>
                        <div class="info_card blur flex flex-col items-center justify-center gap-4 w-64 h-auto p-4 rounded-3xl">
                            <b class="text-4xl">{{ numberOfVotes }}</b>
                            <p class="w-full text-sm text-center flex-grow">نفر به دوره رای داده اند</p>
                            <div class="relative h-4 rounded-full bg-orange-500 bg-opacity-40 w-full">
                                <span class="absolute bg-orange-500 rounded-full h-full" :style="`width: ${totalVotePercentage}%`"></span>
                            </div>
                        </div>
                    </div>
                    <!-- <div></div> -->
                    <div class="info_card flex flex-col items-center justify-center gap-4 w-full p-6 rounded-3xl" v-if="course.teacher">
                        <h3 class="w-full text-xl">اطلاعات مدرس</h3>
                        <hr class="border-b border-solid border-gray-300 border-opacity-30 w-full" />
                        <img class="w-28 h-28 rounded-full object-cover" :src="course.teacher.image" :alt="`${course.teacher.name} ${course.teacher.family}`" />
                        <b class="w-full text-xl text-center">{{ `${course.teacher.name} ${course.teacher.family}` }}</b>
                        <p
                            class="w-full max-w-sm"
                            :class="teacherDescHeightOpen ? 'max-h-full' : 'max-h-64'"
                            @click="teacherDescHeightOpen = !teacherDescHeightOpen"
                        >
                            {{ course.teacher.description.length > 256 ? course.teacher.description.substr(0, 256) + "..." : course.teacher.description }}
                        </p>
                        <nuxt-link :to="`/teacher/${course.teacher._id}`" class="redgray_background rounded-2xl p-4 w-full text-center">
                            مشاهده دیگر دوره های استاد
                        </nuxt-link>
                    </div>
                </div>
                <div class="flex flex-col gap-6 flex-grow w-full">
                    <VideoPlayer :src="selectedVideo.src" :type="selectedVideo.type" />
                    <div class="flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden w-full">
                        <ul class="tab_header flex w-full overflow-auto bg-gray-100">
                            <li
                                class="flex items-center justify-center p-4 w-full cursor-pointer text-center text-sm md:text-base hover:bg-gray-50"
                                :class="{ 'bg-white': tabPage == 'desc' }"
                                @click="tabPage = 'desc'"
                            >
                                توضیحات
                            </li>
                            <li
                                class="flex items-center justify-center p-4 w-full cursor-pointer text-center text-sm md:text-base hover:bg-gray-50"
                                :class="{ 'bg-white': tabPage == 'topics' }"
                                @click="tabPage = 'topics'"
                            >
                                سرفصل ها
                            </li>
                            <li
                                class="flex items-center justify-center p-4 w-full cursor-pointer text-center text-sm md:text-base hover:bg-gray-50"
                                :class="{ 'bg-white': tabPage == 'files' }"
                                @click="tabPage = 'files'"
                            >
                                فایل ها
                            </li>
                            <li
                                class="flex items-center justify-center p-4 w-full cursor-pointer text-center text-sm md:text-base hover:bg-gray-50"
                                :class="{ 'bg-white': tabPage == 'comments' }"
                                @click="tabPage = 'comments'"
                            >
                                پرسش و پاسخ
                            </li>
                        </ul>
                        <div class="tab_content w-full h-screen overflow-scroll">
                            <div class="w-full p-3 md:p-6" name="desc" v-show="tabPage == 'desc'">
                                <p class="p-6 rounded-2xl shadow-lg" v-if="course">{{ course.description }}</p>
                            </div>
                            <div class="w-full p-3 md:p-6" name="topics" v-show="tabPage == 'topics'">
                                <ul class="flex flex-col gap-4 p-2 px-4 rounded-2xl shadow-lg bg-gray-50">
                                    <li class="relative w-full" v-for="(topic, i) in course.topics" :key="i">
                                        <Topic :data="topic" :first="i == 0" :last="i == course.topics.length - 1" @selectTopic="changeTopic" />
                                    </li>
                                </ul>
                            </div>
                            <div class="w-full p-3 md:p-6" name="files" v-show="tabPage == 'files'">
                                <ul class="flex flex-col gap-4 w-full" v-if="course.exerciseFiles && course.exerciseFiles.length > 0">
                                    <li class="w-full" v-for="(exerciseFile, i) in course.exerciseFiles" :key="i">
                                        <a
                                            class="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl shadow-xl w-full"
                                            :href="exerciseFile.file"
                                            :download="exerciseFile.name"
                                        >
                                            <img class="flex-shrink-0" src="/icons/Folder.black.svg" width="24" height="24" alt="Folder" />
                                            <span class="flex-grow text-indigo-500">{{ exerciseFile.name }}</span>
                                            <img class="flex-shrink-0" src="/icons/Download.gray.svg" width="24" height="24" alt="Download" />
                                        </a>
                                    </li>
                                </ul>
                                <div class="text-red-400 w-full h-64 flex items-center justify-center" v-else>این دوره فایلی برای دانلود ندارد</div>
                            </div>
                            <div class="w-full p-3 md:p-6" name="comments" v-show="tabPage == 'comments'">
                                <CommentSection :commentedOn="course._id" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>

        <section class="relative flex flex-col gap-8 w-full max-w-screen-2xl mx-auto mt-16" id="most-viewed-articles">
            <div class="flex flex-wrap justify-between items-center gap-8 w-full">
                <h4 class="font-bold text-4xl">دوره های پیشنهادی</h4>
            </div>
            <div v-swiper="coursesSwiperOptions" class="w-full max-w-screen-4xl select-none overflow-hidden">
                <ul class="swiper-wrapper flex items-start">
                    <li
                        class="swiper-slide gray_gradient course_card shadow-lg flex flex-col gap-4 rounded-3xl max-w-sm ml-10"
                        v-for="(course, i) in similarCourses"
                        :key="i"
                    >
                        <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="relative overflow-hidden rounded-3xl w-full h-72">
                            <img class="absolute inset-0 object-cover w-full h-full" :src="course.image || `/misc/course.png`" alt="course" draggable="false" />
                            <img class="absolute top-2 right-2 rounded-full object-cover" :src="course.groups[0].icon" width="32" height="32" alt="Figma" />
                            <span class="course_tag flex items-center justify-center p-4 w-auto h-16 rounded-2xl absolute top-2 left-2">جدید</span>
                        </nuxt-link>
                        <div class="flex flex-col gap-4 p-4 pt-0">
                            <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="w-screen max-w-sm">
                                <h3 class="text-2xl max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">{{ course.name }}</h3>
                            </nuxt-link>
                            <nuxt-link :to="`/teacher/${course.teacher._id}`" class="flex items-center gap-2">
                                <img class="rounded-full object-cover w-10 h-10" :src="course.teacher.image" alt="Figma" width="40" height="40" />
                                <span>{{ `${course.teacher.name} ${course.teacher.family}` }}</span>
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
                                class="orange_gradient_h flex items-center justify-center gap-4 py-4 px-8 rounded-2xl"
                            >
                                <span v-if="course.price">
                                    <b class="text-3xl">{{ new Intl.NumberFormat("fa").format(course.price) }}</b>
                                    تومان
                                </span>
                                <span class="text-xl" v-else>رایگان</span>
                                <img src="/icons/Buy.svg" alt="Buy" width="24" height="24" />
                            </nuxt-link>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </section>
</template>

<script>
import axios from "axios";
import { duration } from "jalali-moment";
import VideoPlayer from "~/components/web/VideoPlayer.vue";
import CommentSection from "~/components/web/course/Comment.section.vue";
import Topic from "~/components/web/course/Topic.vue";
import Score from "~/components/web/course/Score.vue";
import PurchaseButton from "~/components/web/course/Purchase.button.vue";

export default {
    head() {
        return {
            title: `دوره ${this.course.name} - گروه آموزشی پرتقال`,
            meta: [
                { hid: "description", name: "description", content: this.course.description ? this.course.description.substr(0, 256) + "..." : "" },
                { hid: "language", name: "language", content: "fa" },
                { hid: "keywords", name: "keywords", content: this.course.tags ? this.course.tags.toString() : "" },
                { hid: "author", name: "author", content: this.course.teacher ? `${this.course.teacher.name} ${this.course.teacher.family}` : "" },

                { hid: "og:locale", name: "og:locale", content: "fa_IR" },
                { hid: "og:title", name: "og:title", content: `دوره ${this.course.name} - گروه آموزشی پرتقال` },
                { hid: "og:description", name: "og:description", content: this.course.description ? this.course.description.substr(0, 256) + "..." : "" },
                { hid: "og:url", name: "og:url", content: this.course.canonical },
                { hid: "og:site_name", name: "og:site_name", content: `دوره ${this.course.name} - گروه آموزشی پرتقال` },
                { hid: "og:image", name: "og:image", content: this.course.image },

                { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
                { hid: "twitter:site", name: "twitter:site", content: this.course.canonical },
                { hid: "twitter:description", name: "twitter:description", content: this.course.description ? this.course.description.substr(0, 256) + "..." : "" },
                { hid: "twitter:title", name: "twitter:title", content: `دوره ${this.course.name} - گروه آموزشی پرتقال` },
                { hid: "twitter:image", name: "twitter:image", content: this.course.image },

                { hid: "robots", name: "robots", content: "max-image-preview:large" },
                { hid: "mobile-web-app-capable", name: "mobile-web-app-capable", content: "yes" },
            ],
            link: [
                { rel: "canonical", href: this.course.canonical },
                { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.ico" },
                { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
            ],
        };
    },
    components: {
        CommentSection,
        VideoPlayer,
        Topic,
        Score,
        PurchaseButton,
    },
    data() {
        return {
            loadingCourse: false,
            course: this.course || {},
            similarCourses: this.similarCourses || [],
            coursesSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                // spaceBetween: 46,
                loop: false,
                freeMode: true,
            },

            discount: 20,
            numberOfVotes: 0,
            topVotePercentage: 0,
            totalVotePercentage: 0,
            userScore: 0,

            purchased: false,

            teacherDescHeightOpen: false,
            tabPage: "desc",

            selectedVideo: { src: "", type: "" },
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

        this.selectedVideo = { src: "", type: "" };

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

                        // get first free course and load it into player
                        if (topic.canPlay && this.selectedVideo.src == "") this.changeTopic(topic);
                    });

                    this.course = {
                        ...results.data.course,
                        topics,
                        totalTime: new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0].split(':').join(' : '),
                        // totalTime: duration(seconds * 1000).locale("fa").humanize(),
                    };

                    this.similarCourses = results.data.similarCourses.map((course) => {
                        let seconds = 0;
                        course.topics.forEach((topic) => {
                            seconds += parseInt(topic.time.hours) * 3600 + parseInt(topic.time.minutes) * 60 + parseInt(topic.time.seconds);
                        });
                        course.totalTime = duration(seconds * 1000)
                            .locale("fa")
                            .humanize();
                        return course;
                    });

                    this.numberOfVotes = results.data.numberOfVotes;
                    this.topVotePercentage = results.data.numberOfVotes <= 0 ? 0 : (results.data.numberOfTopVotes / results.data.numberOfVotes) * 100;
                    this.totalVotePercentage = results.data.course.buyCount <= 0 ? 0 : (results.data.numberOfVotes / results.data.course.buyCount) * 100;
                    this.userScore = results.data.userScore;

                    this.purchased = results.data.purchased;
                    this.discount = results.data.discountAndTag.discountAmount;
                })
                .catch((e) => {})
                .finally(() => (this.loadingCourse = false));
        },

        changeTopic(topic) {
            if (topic.canPlay) {
                this.selectedVideo = { src: topic.file, type: "video/mp4" };
            }
        },

        updateScore(newScore) {
            try {
                this.course.score = parseFloat(newScore);
            } catch (e) {}
        },
    },
};
</script>
