<style scoped>
.path {
    transform: rotateY(180deg);
}

.course_image {
    height: 246px;
}

.discount_box {
    box-shadow: 0px 0px 15px rgba(255, 12, 21, 40%);
    display: flex;
    align-items: center;
    justify-content: center;
}
.discount_box > span {
    transform: rotate(-45deg);
}

@media (min-width: 480px) {
    .course_image {
        height: 360px;
    }
}
</style>

<template>
    <section class="flex flex-col items-center gap-8 w-full max-w-screen-2xl mt-20 md:mt-28 px-4 md:px-8 mb-16" id="course">
        <img class="path absolute right-1 top-28 opacity-75 -z-1" src="/misc/path.svg" alt="" />
        <article class="flex flex-col gap-8 max-w-screen-2xl w-full mx-auto">
            <header class="relative flex flex-col gap-6 w-full rounded-2xl lg:mb-12" v-if="course">
                <div class="relative flex flex-col-reverse lg:flex-row items-start gap-4 z-0 mb-10 lg:mb-0">
                    <div class="absolute right-4 -bottom-12 flex items-center gap-4">
                        <a class="flex items-center gap-2 p-3 pt-6 rounded-xl shadow-xl bg-white" href="#description">
                            <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Document" />
                            <span class="text-xs md:text-base">توضیحات دوره</span>
                        </a>
                        <a class="flex items-center gap-2 p-3 pt-6 rounded-xl shadow-xl bg-white" href="#comments">
                            <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Chat" />
                            <span class="text-xs md:text-base">پرسش و پاسخ</span>
                        </a>
                    </div>
                    <img class="course_image w-full max-w-lg object-cover bg-gray-800 p-2 rounded-2xl z-10" :src="course.image" :alt="course.name" />
                    <ul class="flex flex-wrap items-center gap-3 mt-4">
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
                    </ul>
                </div>
                <div class="lg:absolute top-16 left-0 flex flex-col gap-4 md:gap-6 bg-white shadow-xl rounded-2xl p-4 md:p-8 w-full max-w-5xl mr-auto">
                    <div class="flex flex-wrap items-center gap-4 w-full">
                        <h1 class="kalameh_bold text-2xl md:text-3xl w-max max-w-full flex-shrink-0">{{ course.name }}</h1>
                        <div class="bg-orange-400 h-2 rounded-full flex-grow"></div>
                    </div>
                    <div class="flex flex-wrap items-start sm:items-center gap-4">
                        <div class="flex items-center gap-2 pl-4 border-l-2 border-solid border-gray-400" v-if="course.teacher">
                            <img
                                class="orange_gradient_v p-1.5 w-12 md:w-16 h-12 md:h-16 object-cover rounded-full"
                                :src="course.teacher.image"
                                :alt="`${course.teacher.name} ${course.teacher.family}`"
                            />
                            <div class="flex flex-col">
                                <span>{{ `${course.teacher.name} ${course.teacher.family}` }}</span>
                                <nuxt-link class="text-indigo-400 text-xs underline" :to="`/teacher/${course.teacher._id}`">پروفایل استاد</nuxt-link>
                            </div>
                        </div>
                        <ul class="grid grid-cols-2 sm:flex flex-wrap items-center justify-between gap-4 md:gap-6 flex-grow max-w-xl">
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex flex-col md:flex-row items-center gap-2">
                                    <!-- <img src="/icons/Star.orange.svg" alt="Star" /> -->
                                    <Icon
                                        class="w-6 h-6 bg-orange-400"
                                        size="22px"
                                        folder="icons/stars"
                                        v-if="course.score"
                                        :name="`star${course.score.toFixed(0)}`"
                                    />
                                    <small>امتیاز دوره</small>
                                </h5>
                                <strong class="text-sm" v-if="course.score">{{ course.score.toFixed(1) }} از 8</strong>
                            </li>
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex flex-col md:flex-row items-center gap-2">
                                    <img src="/icons/TimeCircle.orange.svg" alt="TimeCircle" />
                                    <small>مدت زمان دوره</small>
                                </h5>
                                <strong class="text-sm" dir="ltr">{{ course.totalTime }}</strong>
                            </li>
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex flex-col md:flex-row items-center gap-2">
                                    <img src="/icons/Video.orange.svg" alt="Video" />
                                    <small>تعداد جلسات</small>
                                </h5>
                                <strong class="text-sm" v-if="course.topics">{{ course.topics.length }}</strong>
                            </li>
                            <li class="flex flex-col items-center gap-2">
                                <h5 class="flex flex-col md:flex-row items-center gap-2">
                                    <img src="/icons/Profile.orange.svg" alt="Profile" />
                                    <small>تعداد دانشجویان</small>
                                </h5>
                                <strong class="text-sm">{{ course.buyCount }}</strong>
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-wrap items-center gap-4 w-full">
                        <div class="flex items-center gap-4 pl-4 border-l-2 border-solid border-gray-400">
                            <div class="flex flex-col items-center justify-center gap-2 p-2 rounded-xl bg-warmgray-100">
                                <b class="text-sm">{{ topVotePercentage.toFixed(2) }}%</b>
                                <p class="w-full text-xs text-center flex-grow">به دوره بالاترین نمره را داده اند</p>
                                <div class="relative h-2 rounded-full bg-gray-400 bg-opacity-40 w-full">
                                    <span class="absolute bg-pink-500 rounded-full h-full" :style="`width: ${topVotePercentage}%`"></span>
                                </div>
                            </div>
                            <div class="flex flex-col items-center justify-center gap-2 p-2 rounded-xl bg-warmgray-100">
                                <b class="text-sm">{{ numberOfVotes }}</b>
                                <p class="w-full text-xs text-center flex-grow">نفر به دوره رای داده اند</p>
                                <div class="relative h-2 rounded-full bg-gray-400 bg-opacity-40 w-full">
                                    <span class="absolute bg-orange-500 rounded-full h-full" :style="`width: ${totalVotePercentage}%`"></span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap sm:flex-nowrap items-start justify-start gap-6 rounded-3xl flex-grow">
                            <div class="flex items-center rounded-2xl gap-4 p-2 md:px-4 bg-truegray-200 flex-shrink-0" v-if="!purchased">
                                <span class="flex flex-col gap-2 flex-grow">
                                    <b class="kalameh_bold" v-if="course.price > 0 && !!discount">
                                        <small class="text-base line-through">{{ new Intl.NumberFormat("fa").format(course.price) }}</small>
                                        <small class="font-bold">تومان</small>
                                    </b>
                                    <strong class="kalameh_bold font-normal text-3xl" :class="{ 'text-center': !discount }" v-if="course.price > 0">
                                        {{ new Intl.NumberFormat("fa").format(course.discountInfo.discountedPrice) }}
                                        <small class="text-lg font-bold">تومان</small>
                                    </strong>
                                    <strong class="kalameh_bold font-normal text-3xl w-full text-center" v-else>رایگان</strong>
                                </span>
                                <b class="discount_box bg-rose-500 w-16 h-16 rounded-2xl text-2xl flex-shrink-0 -ml-6" v-if="course.price > 0 && !!discount">
                                    <span class="kalameh_bold text-white">{{ discount }}%</span>
                                </b>
                            </div>
                            <div class="flex flex-wrap items-center gap-2" v-else>
                                <span class="kalameh_bold opacity-50">به این دوره امتیاز بده</span>
                                <Score :courseId="course._id" :userScore="userScore" @update:score="updateScore" />
                            </div>
                            <PurchaseButton :course="course" :coursePrice="course.price" :courseName="course.name" v-if="!purchased" />
                        </div>
                    </div>
                </div>
            </header>

            <div class="flex flex-col xl:flex-row items-start gap-6 flex-grow w-full">
                <div class="flex flex-col gap-2 flex-grow w-full">
                    <VideoPlayer class="bg-gray-400 p-2" :src="selectedVideo.src" :type="selectedVideo.type" />
                    <div class="flex items-center gap-2 md:text-lg bg-white rounded-3xl shadow-md p-3 pt-11 -mt-11" v-if="!!selectedTopic.name">
                        <div class="orange_gradient_v w-3 h-3 rounded-full"></div>
                        <span class="kalameh_bold">{{ selectedTopic.name }}</span>
                    </div>
                </div>
                <div class="flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden w-full">
                    <ul class="tab_header flex w-full overflow-auto bg-gray-100">
                        <li
                            class="flex items-center justify-center p-4 w-full cursor-pointer text-center text-sm md:text-base border-b-4 border-solid hover:bg-gray-50"
                            :class="{ 'bg-white border-orange-400': tabPage == 'topics' }"
                            @click="tabPage = 'topics'"
                        >
                            سرفصل ها
                        </li>
                        <li
                            class="flex items-center justify-center p-4 w-full cursor-pointer text-center text-sm md:text-base border-b-4 border-solid hover:bg-gray-50"
                            :class="{ 'bg-white border-orange-400': tabPage == 'files' }"
                            @click="tabPage = 'files'"
                        >
                            فایل ها
                        </li>
                    </ul>
                    <div class="tab_content w-full h-96 overflow-scroll">
                        <div class="w-full p-3 md:p-6" name="topics" v-show="tabPage == 'topics'">
                            <ul class="flex flex-col gap-4">
                                <li class="relative w-full" v-for="(topic, i) in course.topics" :key="i">
                                    <Topic :data="topic" :first="i == 0" :last="i == course.topics.length - 1" @selectTopic="changeTopic" />
                                </li>
                            </ul>
                        </div>
                        <div class="flex flex-col gap-2 w-full p-3 md:p-6" name="files" v-show="tabPage == 'files'">
                            <small v-if="course.exerciseFiles && course.exerciseFiles.length > 0">برای دریافت فایل ها باید دوره را خریداری کرده باشید</small>
                            <ul class="flex flex-col gap-4 w-full" v-if="course.exerciseFiles && course.exerciseFiles.length > 0">
                                <li class="w-full" v-for="(exerciseFile, i) in course.exerciseFiles" :key="i">
                                    <a
                                        class="flex items-center gap-4 bg-warmgray-100 p-4 rounded-2xl w-full"
                                        :href="exerciseFile.file"
                                        :download="exerciseFile.name"
                                        v-if="purchased"
                                    >
                                        <img class="flex-shrink-0" src="/icons/Folder.black.svg" width="24" height="24" alt="Folder" />
                                        <span class="flex-grow text-indigo-500">{{ exerciseFile.name }}</span>
                                        <div class="bg-white p-1 rounded-lg hover:shadow-md flex-shrink-0">
                                            <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Download" />
                                        </div>
                                    </a>
                                    <span class="flex items-center gap-4 bg-warmgray-100 p-4 rounded-2xl w-full" v-else>
                                        <img class="flex-shrink-0" src="/icons/Folder.black.svg" width="24" height="24" alt="Folder" />
                                        <span class="flex-grow text-indigo-500">{{ exerciseFile.name }}</span>
                                    </span>
                                </li>
                            </ul>
                            <div class="text-red-400 w-full h-64 flex items-center justify-center" v-else>این دوره فایلی برای دانلود ندارد</div>
                        </div>
                    </div>
                </div>
            </div>
        </article>

        <div class="flex flex-col gap-6 w-full" id="description">
            <div class="flex items-center gap-2">
                <Icon class="w-7 h-7 bg-gray-700" size="28px" folder="icons/new" name="Document" />
                <h3 class="kalameh_bold title text-2xl md:text-3xl w-max max-w-full">توضیحات دوره</h3>
            </div>
            <div class="w-full" v-if="course" v-html="course.description"></div>
        </div>

        <span class="spacer_v w-10/12 h-0.5"></span>

        <div class="w-full max-w-screen-2xl bg-white shadow-xl rounded-2xl p-3 md:p-6" id="comments">
            <CommentSection :commentedOn="course._id" />
        </div>

        <!-- <section class="relative flex flex-col gap-8 w-full max-w-screen-2xl mx-auto mt-16" id="most-viewed-articles" v-if="!!similarCourses.length">
            <div class="flex flex-wrap justify-between items-center gap-8 w-full">
                <h4 class="kalameh_bold title font-bold text-2xl md:text-3xl">دوره های پیشنهادی</h4>
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
        </section> -->
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
import nl2br from "~/mixins/nl2br";

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
    mixins: [nl2br],
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
            tabPage: "topics",

            selectedVideo: { src: "", type: "" },
            selectedTopic: { name: "" },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await Promise.all([this.getCourse({ headers }, route)]);
    },
    async mounted() {
        if (this.$route.params.code) {
            await axios.post(`/set-marketer-code/${this.$route.params.code}`).catch((e) => {});
        }
    },
    // async beforeRouteUpdate(to, from, next) {
    //     if (to.params.id) this.$route.params.id = to.params.id;
    //     if (to.params.name) this.$route.params.name = to.params.name;

    //     this.selectedVideo = { src: "", type: "" };

    //     await this.getCourse({}, to);
    //     if (typeof window !== "undefined") window.scrollTo({ top: 0 });
    //     next();
    // },
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
                        totalTime: new Date(seconds * 1000)
                            .toUTCString()
                            .match(/(\d\d:\d\d:\d\d)/)[0]
                            .split(":")
                            .join(" : "),
                        // totalTime: duration(seconds * 1000).locale("fa").humanize(),
                    };
                    this.course.description = this.nl2br(this.course.description);

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
                this.selectedTopic = topic;
            } else {
                this.$store.dispatch("toast/makeToast", { type: "error", title: "خرید دوره", message: "برای مشاهده کامل سرفصل ها، ابتدا دوره را خریداری نمایید" });
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
