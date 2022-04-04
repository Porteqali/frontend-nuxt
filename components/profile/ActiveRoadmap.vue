<style scoped>
.board {
    border: 8px solid rgb(189, 189, 189);
}

.colored_border {
    border: 0.5rem solid orange;
}

.bundle_list_item {
    max-width: 236px;
    height: auto;
}

.dashed_line {
    top: 6.6rem;
}

@media (min-width: 768px) {
    .dashed_line {
        top: 7.2rem;
    }
}
</style>

<template>
    <section class="board flex flex-col gap-4 shadow-xl bg-warmgray-600 text-white w-full p-4 md:p-6 rounded-3xl" id="active-roadmap">
        <div class="flex flex-wrap items-start justify-between gap-2 w-full">
            <h2 class="kalameh_bold title text-2xl text-white w-max max-w-full">نقشه راه</h2>
            <div class="flex flex-col gap-1" v-if="roadmap.bundle.title && !loading">
                <div v-if="roadmap.willOpenIn > 0">
                    <span class="kalameh_bold text-sm text-orange-400" v-if="!roadmap.userOnLastCourse">دوره بعدی:</span>
                    <span class="kalameh_bold text-sm text-orange-400" v-else>قابل اتمام در:</span>
                    <b>{{ willOpenInFormated }} دیگر</b>
                </div>
                <button
                    class="flex items-center gap-1 w-max border-2 border-solid border-gray-50 rounded-xl p-2 px-4 hover:bg-white hover:bg-opacity-10"
                    :class="{ 'opacity-50 cursor-not-allowed': !roadmap.canStartNextCourse }"
                    @click="activateNextCourse()"
                    v-if="!activatingNextCourse && !roadmap.userOnLastCourse"
                >
                    <span>شروع دوره بعد</span>
                    <Icon class="w-6 h-6 bg-gray-100" size="24px" folder="icons/new" name="Play" />
                </button>
                <button
                    class="flex items-center gap-1 w-max border-2 border-solid border-gray-50 rounded-xl p-2 px-4 hover:bg-white hover:bg-opacity-10"
                    :class="{ 'opacity-50 cursor-not-allowed': !roadmap.canStartNextCourse }"
                    @click="finishRoadmap()"
                    v-if="!finishingRoadmap && roadmap.userOnLastCourse"
                >
                    <span>اتمام نقشه راه</span>
                    <Icon class="w-6 h-6 bg-gray-100" size="24px" folder="icons/new" name="Location" />
                </button>
                <Loading class="w-8 h-8" v-if="activatingNextCourse || finishingRoadmap" />
            </div>
        </div>
        <small v-if="roadmap.bundle.title">{{ roadmap.bundle.title }}</small>
        <div class="relative orange_gradient_v flex items-center gap-2 rounded-2xl p-2 -mt-4" v-if="!roadmap.bundle.title && !loading">
            <img class="absolute lg:relative flex-shrink-0 w-full max-w-screen-2xs opacity-50 lg:opacity-100" src="/pages/departments/img.png" alt="start" />
            <div class="relative flex flex-col gap-2">
                <h4 class="kalameh_bold text-xl text-gray-700">نقشه راه خودتو انتخاب کن</h4>
                <p>نمیدونی از کجا باید شروع کنی؟ میتونی رو کمک ما حساب کنی!</p>
                <nuxt-link
                    class="flex justify-center text-sm border-2 border-solid border-white rounded-2xl mt-4 p-2 px-4 w-max hover:bg-gray-100 hover:bg-opacity-20"
                    to="/where-to-start"
                >
                    انتخاب نقشه راه
                </nuxt-link>
            </div>
        </div>
        <div v-swiper:courseSwiper="bundleSwiperOptions" class="relative w-full select-none overflow-hidden" v-if="roadmap.bundle.title && !loading">
            <hr class="dashed_line absolute border-0 border-b-4 border-dashed border-gray-300 w-full" />
            <ul class="swiper-wrapper relative flex w-full h-full flex-grow text-gray-700">
                <li class="swiper-slide flex flex-col items-start md:items-center gap-1 mt-24 max-w-max flex-shrink-0 ml-2">
                    <div class="w-6 md:w-10 h-6 md:h-10 rounded-full bg-gray-300"></div>
                    <small class="text-orange-300">شروع</small>
                </li>
                <li
                    class="bundle_list_item swiper-slide flex flex-col gap-2 w-full bg-white rounded-2xl p-3 flex-shrink-0 ml-8"
                    :class="{ colored_border: item.course._id == roadmap.currentCourse._id }"
                    v-for="(item, i) in roadmap.bundle.courses"
                    :key="i"
                >
                    <div class="relative flex flex-col w-full h-36">
                        <img class="w-full h-full object-cover rounded-xl flex-shrink-0" :src="item.course.image" :alt="item.course.name" />
                        <div class="absolute bottom-1 right-1 bg-gray-700 opacity-90 p-2 rounded-xl" v-if="roadmap.finishedCourses.includes(item.course._id)">
                            <span class="kalameh_bold text-orange-400">مشاهده شده</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full flex-grow">
                        <h4 class="kalameh_bold text-sm md:text-base w-full">{{ item.course.name }}</h4>
                        <div class="flex items-center gap-1" v-if="item.course.teacher">
                            <img
                                class="w-7 h-7 object-cover rounded-full"
                                :src="item.course.teacher.image"
                                :alt="`${item.course.teacher.name} ${item.course.teacher.family}`"
                            />
                            <small class="text-sm opacity-75">{{ `${item.course.teacher.name} ${item.course.teacher.family}` }}</small>
                        </div>
                    </div>
                    <hr class="w-full" />
                    <div class="flex flex-col justify-between gap-2 w-full">
                        <nuxt-link
                            class="orange_gradient_h p-2 rounded-xl shadow-lg text-xs w-max"
                            :to="`/course/${item.course._id}/${item.course.name.replace(/ /g, '-')}`"
                            v-if="item.course && item.course.name"
                        >
                            مشاهده دوره
                        </nuxt-link>
                        <div class="flex items-center justify-between gap-1 w-full">
                            <small class="text-xs">حداقل زمان مورد نیاز</small>
                            <b>{{ item.minimumTimeNeeded }} روز</b>
                        </div>
                    </div>
                </li>
                <li class="swiper-slide flex flex-col items-start md:items-center gap-1 mt-24 max-w-max flex-shrink-0 -mr-6 ml-2">
                    <div class="w-6 md:w-10 h-6 md:h-10 rounded-full bg-gray-300"></div>
                    <small class="text-orange-300">پایان</small>
                </li>
            </ul>
        </div>

        <Loading class="w-10 h-10" v-if="loading" />

        <CouponDialog :open.sync="couponDialogState" :discountPercent="discountGift.percent" :code="discountGift.code" :expireDate="discountGift.expireDate" />
    </section>
</template>

<script>
import axios from "axios";
import Loading from "~/components/Loading.vue";
import Icon from "../Icon.vue";
import CouponDialog from "./CouponDialog.vue";
import { duration } from "jalali-moment";

export default {
    name: "ActiveRoadmap",
    components: { Loading, Icon, CouponDialog },
    data() {
        return {
            loading: false,
            roadmap: this.roadmap || { bundle: {} },
            willOpenInFormated: "",

            activatingNextCourse: false,
            finishingRoadmap: false,

            bundleSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                loop: false,
            },

            couponDialogState: false,
            discountGift: this.discountGift || { percent: "", code: "", expireDate: new Date(Date.now()) },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;
        await Promise.all([this.getActiveRoadmap({ headers })]);
    },
    mounted() {},
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async getActiveRoadmap(data = {}) {
            if (this.loading) return;
            this.loading = true;

            let url = `/api/user-roadmap/active-roadmap`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.roadmap = results.data;
                    this.willOpenInFormated = duration(this.roadmap.willOpenIn).locale("fa").humanize();
                    // find the index of current course and scroll to it
                    this.courseSwiper.slideTo(Object.keys(this.roadmap.bundle.courses).indexOf(this.roadmap.currentCourse._id), 1000, false);
                })
                .catch((e) => {})
                .finally(() => (this.loading = false));
        },

        async activateNextCourse() {
            if (!this.roadmap.canStartNextCourse) return;
            if (this.activatingNextCourse) return;
            this.activatingNextCourse = true;

            let url = `/api/user-roadmap/activate-next-course`;

            await axios
                .post(url, {})
                .then((results) => {
                    this.roadmap.finishedCourses = results.data.finishedCourses;
                    this.roadmap.currentCourse = results.data.currentCourse;
                    this.roadmap.currentCourseStartDate = results.data.currentCourseStartDate;
                    this.roadmap.canStartNextCourse = results.data.canStartNextCourse;
                    this.roadmap.willOpenIn = results.data.willOpenIn;
                    this.willOpenInFormated = duration(this.roadmap.willOpenIn).locale("fa").humanize();
                    this.courseSwiper.slideTo(Object.keys(this.roadmap.bundle.courses).indexOf(this.roadmap.currentCourse._id), 1000, false);
                })
                .catch((e) => {})
                .finally(() => (this.activatingNextCourse = false));
        },

        async finishRoadmap() {
            if (!this.roadmap.canStartNextCourse) return;
            if (this.finishingRoadmap) return;
            this.finishingRoadmap = true;

            let url = `/api/user-roadmap/finish-roadmap`;

            await axios
                .post(url, {})
                .then((results) => {
                    this.roadmap = { bundle: {} };
                    if (results.data.discountGift) {
                        this.discountGift = results.data.discountGift;
                        this.couponDialogState = true;
                    }
                })
                .catch((e) => {})
                .finally(() => (this.finishingRoadmap = false));
        },
    },
};
</script>
