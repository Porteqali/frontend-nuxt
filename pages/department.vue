<style scoped>
.most_viewed_courses_image {
    transform: scale(1.07);
}

.slider {
    max-width: 1320px;
}
.bundle_slider {
    max-width: 1364px;
}

.bundle_list {
    scrollbar-width: thin !important;
}
.bundle_list::-webkit-scrollbar-thumb {
    background: #8b8884;
}
.bundle_tag {
    position: absolute;
    top: -0.5rem;
    right: -0.75rem;
    transform: rotate(25deg);
    box-shadow: 0px 0px 15px rgba(245, 15, 21, 40%);
}

#where-to-start p {
    text-shadow: 0px 0px 1px black;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-2xl w-full mt-24 md:mt-24 px-4 md:px-8 mb-16">
        <img class="absolute -left-16 top-52 opacity-65" src="/misc/path.svg" alt="path" />

        <!-- <section class="relative flex flex-col items-center justify-center w-full" id="most-viewed-courses">
            <div v-swiper="coursesSwiperOptions" class="slider w-full select-none overflow-hidden pb-6" v-if="!mostViewedCoursesLoading">
                <ul class="swiper-wrapper flex w-full">
                    <li
                        class="swiper-slide flex flex-col overflow-hidden rounded-3xl shadow-lg w-full max-w-xs md:max-w-screen-sm h-64 sm:h-96 flex-shrink-0 ml-8"
                        v-for="(course, i) in mostViewedCourses"
                        :key="i"
                    >
                        <nuxt-link
                            :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`"
                            :title="course.name"
                            class="relative flex flex-col items-center m-2"
                        >
                            <img class="most_viewed_courses_image w-full h-64 sm:h-96 object-cover" :src="course.image" :alt="course.name" draggable="false" />
                            <span class="absolute right-0 w-10 h-10 bg-orange-400 p-1 rounded-full" :title="course.groups[0].name">
                                <img class="w-full h-full object-cover rounded-full" :src="course.groups[0].icon" :alt="course.groups[0].name" />
                            </span>
                            <strong
                                class="absolute left-0 flex items-center justify-center bg-white shadow-xl rounded-2xl py-1 px-2 w-max"
                                v-if="course.discountInfo"
                            >
                                <span class="kalameh_bold text-xl md:text-2xl text-rose-500">{{ course.discountInfo.tag || "" }}</span>
                            </strong>
                            <div class="absolute bottom-0 flex items-start md:items-center gap-2 bg-warmgray-600 bg-opacity-95 p-2 md:mx-2 w-full rounded-3xl">
                                <div class="flex flex-col gap-3 flex-grow text-white">
                                    <h3 class="kalameh_bold text-lg md:text-xl">{{ course.name }}</h3>
                                    <div class="flex flex-wrap items-center gap-2">
                                        <div class="flex items-center gap-1">
                                            <img
                                                class="w-10 h-10 object-cover rounded-full"
                                                :src="course.teacher.image"
                                                :alt="`${course.teacher.name} ${course.teacher.family}`"
                                            />
                                            <small class="text-sm">{{ `${course.teacher.name} ${course.teacher.family}` }}</small>
                                        </div>
                                        <span class="w-8 h-1 bg-gray-400 rounded-full"></span>
                                        <span class="kalameh_bold text-sm md:text-base text-amber-500">
                                            {{ `${course.totalTime} آموزش - ${course.topicsTotal} ویدیو` }}
                                        </span>
                                    </div>
                                </div>
                                <button class="orange_gradient_h p-1 md:p-3 rounded-2xl flex-shrink-0">
                                    <Icon class="w-8 md:w-16 h-8 md:h-16 bg-gray-100 hover:bg-yellow-300" size="64px" folder="icons/new" name="Play" />
                                </button>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="relative flex items-center justify-center gap-8">
                <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-prev">
                    <img src="/icons/new/ArrowRight3.svg" width="24" />
                </button>
                <div class="flex justify-center gap-2 swiper-pagination2 swiper-pagination-bullets"></div>
                <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-next">
                    <img src="/icons/new/ArrowLeft3.svg" width="24" />
                </button>
            </div>
        </section> -->

        <section class="orange_gradient_v flex items-center justify-center rounded-3xl p-4 md:p-6 w-full max-w-screen-2xl shadow-2xl" id="where-to-start">
            <div class="flex items-center justify-center w-full max-w-screen-xl">
                <img class="absolute lg:relative flex-shrink-0 w-max opacity-50 lg:opacity-100" src="/pages/departments/img.png" alt="start" />
                <div class="relative flex flex-col items-start gap-4 flex-grow">
                    <h2 class="kalameh_bold text-white text-3xl md:text-4xl lg:-mr-8">نمیدونی از کجا باید شروع کنی؟</h2>
                    <h4 class="kalameh_bold text-lg text-gray-600">دوست داری تو چه حوزه ای فعالیت کنی؟</h4>
                    <p class="text-white font-bold w-full">
                        اگر نمیدونی به چی علاقه داری، کافیه جواب سوالایی که براتون میفرستیم رو بدید تا ما بگیم به چی علاقه داری و نقشه راهی بدیم بهت که کارتو خیلی
                        جلو میندازه
                    </p>
                    <div class="flex w-full mt-auto">
                        <nuxt-link
                            class="flex justify-center mr-auto border-4 border-solid border-white rounded-2xl font-bold p-4 w-full max-w-xs hover:bg-gray-100 hover:bg-opacity-20"
                            to="/where-to-start"
                        >
                            شروع پرسش و پاسخ
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </section>

        <section class="relative flex flex-col gap-4 w-full" id="course-bundles">
            <h2 class="kalameh_bold title text-2xl md:text-3xl w-max">باندل های نقشه راه</h2>
            <p>بیشتر اوقات یادگیری یه دوره کافی نیست. اینجا ما دوره ها رو برات گروه بندی کردیم که خیلی راحت مجموعه مهارت های لازم تو یه حوزه رو یاد بگیری.</p>
            <div v-swiper:d="courseBundleSwiperOptions" class="bundle_slider w-full select-none overflow-hidden pb-8 mx-auto">
                <ul class="swiper-wrapper flex text-white">
                    <li
                        class="swiper-slide flex flex-col gap-4 shadow-xl border-8 border-solid border-gray-300 bg-warmgray-600 rounded-3xl flex-shrink-0 w-full max-w-xs p-4 ml-7"
                        v-for="(courseBundle, i) in courseBundles"
                        :key="i"
                    >
                        <h4 class="kalameh_bold text-xl md:text-2xl w-full">{{ courseBundle.title }}</h4>
                        <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                            <div class="relative flex items-center justify-center gap-1 bg-white rounded-xl p-1 px-4 flex-grow">
                                <span
                                    class="bundle_tag kalameh_bold bg-rose-500 text-white text-sm p-0.5 px-2 font-bold rounded-2xl"
                                    v-if="courseBundle.discountPercent > 0"
                                >
                                    {{ courseBundle.discountPercent }}%
                                </span>
                                <b class="orange_text_gradient kalameh_black text-2xl">
                                    {{ new Intl.NumberFormat("fa").format(courseBundle.discountedPrice) }}
                                </b>
                                <small class="text-gray-600 text-sm">تومان</small>
                            </div>
                            <button class="orange_gradient_h flex items-center gap-1 p-2 rounded-xl w-max flex-shrink-0">
                                <span class="">خرید</span>
                                <Icon class="w-7 h-7 bg-gray-100" size="28px" folder="icons/new" name="Buy" />
                            </button>
                        </div>
                        <ul class="bundle_list flex flex-col gap-4 w-full h-full max-h-56 overflow-auto flex-grow">
                            <li class="flex items-start gap-2 w-full" v-for="(course, j) in courseBundle.courses" :key="j">
                                <img class="w-24 h-20 object-cover rounded-xl flex-shrink-0" :src="course.image" :alt="course.title" />
                                <div class="flex flex-col gap-2 flex-grow">
                                    <h5 class="kalameh_bold text-xs md:text-sm w-full opacity-75">{{ course.title }}</h5>
                                    <div class="flex items-center gap-1">
                                        <img
                                            class="w-7 h-7 object-cover rounded-full"
                                            :src="course.teacher.image"
                                            :alt="`${course.teacher.name} ${course.teacher.family}`"
                                        />
                                        <small class="text-xs opacity-75">{{ `${course.teacher.name} ${course.teacher.family}` }}</small>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button
                            class="flex items-center justify-center gap-1 border-2 border-solid border-white rounded-2xl p-2 w-full hover:bg-white hover:bg-opacity-10"
                        >
                            <Icon class="w-7 h-7 bg-gray-100" size="28px" folder="icons/new" name="Location" />
                            <span>انتخاب و شروع نقشه راه</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="relative xl:absolute xl:top-1/2 flex items-center justify-between gap-8 -mt-8 mx-auto w-max xl:w-full">
                <div class="absolute -z-1 orange_gradient_v h-3 rounded-full w-full"></div>
                <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-prev-bundle">
                    <img src="/icons/new/ArrowRight3.svg" width="24" />
                </button>
                <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-next-bundle">
                    <img src="/icons/new/ArrowLeft3.svg" width="24" />
                </button>
            </div>
        </section>

        <span class="spacer_v w-full h-0.5 -my-4"></span>

        <Nuxt nuxt-child-key="department" />

        <!-- <span class="spacer_v w-full h-0.5 -my-4"></span> -->
    </main>
</template>

<script>
import axios from "axios";
import moment from "jalali-moment";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: {},
    data() {
        return {
            mostViewedCoursesLoading: false,
            mostViewedCourses: [{}, {}],
            mostViewedCoursesSkeletonTopic: [0, 0, 0, 0, 0, 0],
            coursesSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                loop: true,
                pagination: ".swiper-pagination2",
                prevButton: ".swiper-prev",
                nextButton: ".swiper-next",
            },

            courseBundles: this.courseBundles || [
                {
                    _id: "",
                    title: "نقشه راه فول استک MERN",
                    price: "430000",
                    discountPercent: "10",
                    discountedPrice: "230000",
                    courses: [
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/62.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/63.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/64.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/65.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                    ],
                },
                {
                    _id: "",
                    title: "نقشه راه فول استک MERN",
                    price: "430000",
                    discountPercent: "10",
                    discountedPrice: "230000",
                    courses: [
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/62.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/63.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/64.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/65.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                    ],
                },
                {
                    _id: "",
                    title: "نقشه راه فول استک MERN",
                    price: "430000",
                    discountPercent: "10",
                    discountedPrice: "230000",
                    courses: [
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/62.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/63.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/64.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/65.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                    ],
                },
                {
                    _id: "",
                    title: "نقشه راه فول استک MERN",
                    price: "430000",
                    discountPercent: "10",
                    discountedPrice: "230000",
                    courses: [
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/62.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/63.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/64.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/65.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                    ],
                },
                {
                    _id: "",
                    title: "نقشه راه فول استک MERN",
                    price: "430000",
                    discountPercent: "10",
                    discountedPrice: "230000",
                    courses: [
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/62.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/63.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/64.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                        {
                            _id: "",
                            image: "https://porteqali.com/img/courses/65.jpg",
                            title: "شروع امنیت با Security Plus یک",
                            teacher: { image: "https://porteqali.com/img/teachers/15.jpg", name: "عرفان", family: "محمدی" },
                            price: "430000",
                            discountedPrice: "230000",
                        },
                    ],
                },
            ],
            courseBundleSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                loop: true,
                prevButton: ".swiper-prev-bundle",
                nextButton: ".swiper-next-bundle",
            },

            topTeachersLoading: false,
            topTeachers: [0, 0],
            topTeacherSkeletonCourses: [0, 0, 0],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([
            this.getMetadata("department"),
            // this.getMostviewedCourses({ headers })
        ]);
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
                    results.data.length = 8;
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
