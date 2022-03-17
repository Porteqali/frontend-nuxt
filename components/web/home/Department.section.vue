<style scoped>
#department::before {
    content: "";
    width: 100%;
    height: 65%;
    position: absolute;
    top: -0.25rem;
    border-radius: 2rem;
    background-color: #f5f5f4;
}

.toggle_btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background-color: #fff;
    color: #333;
}
.toggle_btn.fill {
    background: var(--main-bg-gradient);
    color: #fff;
}

.course_card {
    background: #fff;
    color: #333;
}
.course_tag {
    box-shadow: 0px 0px 10px rgba(255, 49, 49, 0.25);
}
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
</style>

<template>
    <section class="relative flex flex-col items-center gap-8 w-full py-8 px-4 md:px-8" id="department">
        <div class="relative flex flex-wrap items-center justify-between gap-4 w-full">
            <h2 title="دوره های آموزشی" class="title kalameh_bold text-gray-700 text-3xl">دوره های آموزشی</h2>
            <nuxt-link to="/department" class="flex items-center gap-1 text-sm md:text-base" title="دوره های آموزشی">
                مشاهده همه دوره ها
                <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="ArrowLeft3" />
            </nuxt-link>
        </div>
        <div class="relative flex flex-wrap justify-between gap-8">
            <div class="flex flex-wrap items-center gap-2 md:gap-4">
                <button class="toggle_btn text-sm md:text-base rounded-2xl" :class="{ fill: order == 'most-popular' }" @click="orderChanged('most-popular')">
                    محبوب ترین
                </button>
                <button class="toggle_btn text-sm md:text-base rounded-2xl" :class="{ fill: order == 'most-sold' }" @click="orderChanged('most-sold')">
                    پرفروش ترین
                </button>
                <button class="toggle_btn text-sm md:text-base rounded-2xl" :class="{ fill: order == 'newest' }" @click="orderChanged('newest')">جدید ترین</button>
            </div>
        </div>
        <div class="relative flex items-center justify-between gap-8">
            <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-prev">
                <img src="/icons/new/ArrowRight3.svg" width="24" />
            </button>
            <div class="flex justify-center gap-2 swiper-pagination2 swiper-pagination-bullets"></div>
            <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-next">
                <img src="/icons/new/ArrowLeft3.svg" width="24" />
            </button>
        </div>
        <div v-swiper="coursesSwiperOptions" class="w-full max-w-screen-2xl select-none overflow-hidden pb-8">
            <ul class="swiper-wrapper flex items-start">
                <li
                    class="swiper-slide course_card shadow-lg flex flex-col items-center gap-3 rounded-2xl max-w-xs p-3 ml-8"
                    v-for="(course, i) in courses"
                    :key="i"
                >
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
                        <nuxt-link :to="`/teacher/${course.teacher[0]._id}`" class="flex items-center gap-2">
                            <img class="rounded-full object-cover w-8 h-8" :src="course.teacher[0].image" alt="Figma" loading="lazy" width="32" height="32" />
                            <span class="text-gray-600 text-xs">{{ `${course.teacher[0].name} ${course.teacher[0].family}` }}</span>
                        </nuxt-link>
                        <small
                            class="course_tag flex items-center gap-1 p-1 px-2 bg-red-500 text-white rounded-full text-xs"
                            v-if="course.discountInfo && course.discountInfo.tag != 'رایگان' && course.price > 0"
                        >
                            <span class="kalameh_bold">{{ course.discountInfo.tag }}</span>
                            <span class="kalameh_bold" v-if="!!course.discountInfo.discountType">تخفیف</span>
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
        </div>
    </section>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";

export default {
    name: "DepartmentSection",
    components: {
        Icon,
    },
    data() {
        return {
            order: this.order || "newest", // newest | most-popular

            courses: this.courses || [],
            coursesPage: this.coursesPage || 1,
            coursesTotal: this.coursesTotal || 0,
            coursesPageTotal: this.coursesPageTotal || 1,
            coursesLoading: false,
            coursesSkeleton: [0, 0, 0, 0, 0, 0, 0, 0],

            coursesSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                loop: false,
                freeMode: true,
                pagination: ".swiper-pagination2",
                prevButton: ".swiper-prev",
                nextButton: ".swiper-next",
            },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getCourses({ headers })]);
    },
    methods: {
        orderChanged(order) {
            if (this.coursesLoading) return;
            this.order = order;
            this.clearCourses();
            this.getCourses();
        },

        async getCourses(data = {}) {
            if (this.coursesLoading || this.coursesPage > this.coursesPageTotal) return;
            this.coursesLoading = true;

            let url = `/api/courses`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.coursesPages}`, `order=${this.order}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.courses = results.data.records;
                    this.coursesPage = results.data.page;
                    this.coursesTotal = results.data.total;
                    this.coursesPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.coursesLoading = false));
        },

        clearCourses() {
            this.courses = [];
            this.coursesPage = 1;
            this.coursesTotal = 0;
            this.coursesPageTotal = 1;
        },
    },
};
</script>
