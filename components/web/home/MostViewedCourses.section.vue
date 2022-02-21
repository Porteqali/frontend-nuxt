<style scoped>
.more_courses_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
    box-shadow: 0px 20px 40px rgba(144, 219, 255, 0.3);
}

.course_card {
    background-color: var(--department-section-title-alt-text-bg-color);
    background: linear-gradient(154.49deg, rgba(121, 117, 131, 0.2) 5.35%, rgba(54, 53, 103, 0.2) 83.85%), rgba(49, 48, 54, 0.3);
    color: var(--department-section-title-alt-text-color);
}
.course_tag {
    background-color: var(--department-section-course-tag-bg-color);
    color: var(--department-section-course-tag-color);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="most-viewed-courses">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <h2 class="font-bold text-4xl">دوره های پر مخاطب</h2>
        </div>
        <div v-swiper="coursesSwiperOptions" class="w-full max-w-screen-4xl select-none overflow-hidden">
            <ul class="swiper-wrapper flex items-start">
                <li
                    class="swiper-slide gray_gradient course_card shadow-lg flex flex-col gap-4 p-4 rounded-3xl max-w-sm ml-10"
                    v-for="(course, i) in mostViewedCourses"
                    :key="i"
                >
                    <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="relative overflow-hidden rounded-xl shadow-lg w-full h-72">
                        <img class="absolute inset-0 object-cover w-full h-full" :src="course.image || `/misc/course.png`" alt="course" draggable="false" />
                        <img class="absolute top-2 right-2 rounded-full object-cover" :src="course.groups[0].icon" width="32" height="32" alt="Figma" />
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
                                <b class="text-3xl">{{ new Intl.NumberFormat("fa").format(course.discountInfo.discountedPrice) }}</b>
                                تومان
                            </span>
                            <span class="text-xl" v-else>رایگان</span>
                            <img src="/icons/Buy.svg" alt="Buy" width="24" height="24" />
                        </nuxt-link>
                    </div>
                </li>
            </ul>
            <div class="flex justify-center mt-8 swiper-pagination2 swiper-pagination-bullets"></div>
        </div>
        <div class="flex items-center justify-center w-full">
            <nuxt-link to="/department?order=most-popular" class="more_courses_btn blur flex items-center gap-2 py-3 px-6 rounded-xl w-max">
                <img src="/icons/BookOpenOutlineColor.orange.svg" width="24" height="24" alt="BookOpenOutlineColor" />
                <span>مشاهده همه دوره ها</span>
            </nuxt-link>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "MostViewedCoursesSection",
    data() {
        return {
            mostViewedCoursesLoading: false,
            mostViewedCourses: [],
            mostViewedCoursesSkeletonTopic: [{}, {}, {}, {}, {}, {}],

            coursesSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                // spaceBetween: 46,
                loop: false,
                freeMode: true,
                pagination: ".swiper-pagination2",
            },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMostviewedCourses({ headers })]);
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
                    this.mostViewedCourses = results.data.map((course) => {
                        let seconds = 0;
                        course.topics.forEach((topic) => {
                            seconds += parseInt(topic.time.hours) * 3600 + parseInt(topic.time.minutes) * 60 + parseInt(topic.time.seconds);
                        });
                        course.totalTime = new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
                        course.topics.length = 0;
                        return course;
                    });
                })
                .catch((e) => {})
                .finally(() => (this.mostViewedCoursesLoading = false));
        },
    },
};
</script>
