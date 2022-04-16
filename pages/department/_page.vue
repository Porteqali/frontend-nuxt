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
.course_tag {
    box-shadow: 0px 0px 10px rgba(255, 49, 49, 0.25);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="courses">
        <h2 class="kalameh_bold title text-3xl md:text-4xl w-max max-w-full">دوره های آموزشی</h2>
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <div class="flex flex-wrap items-center gap-4">
                <Select :selectedOption.sync="selectedOrder" @update:selectedOption="orderChanged()" :options="orderOptions" placeholder="ترتیب نمایش">
                    <template v-slot:option="{ option }">
                        <span :value="option.value">{{ option.name }}</span>
                    </template>
                </Select>
            </div>
            <div class="flex items-center gap-1 w-full max-w-3xl">
                <button class="flex items-center justify-center swiper-prev-cat">
                    <img src="/icons/new/ArrowRight2.svg" width="24" />
                </button>
                <div v-swiper:categorySwiper="categorySwiperOptions" class="w-full select-none overflow-hidden pb-4 -mb-4">
                    <ul class="swiper-wrapper flex items-center">
                        <li
                            class="swiper-slide flex items-center gap-2 w-max max-w-max bg-white shadow-lg p-2 px-3 rounded-2xl ml-4 cursor-pointer flex-shrink-0"
                            :class="{ orange_gradient_v: group.slug == department.slug }"
                            v-for="(department, i) in departments"
                            :key="i"
                            @click="groupChanged(department._id)"
                        >
                            <img class="w-8 h-8 rounded-full object-cover" :src="department.icon" width="48" height="48" :alt="department.slug" />
                            <span class="w-max">{{ department.name }}</span>
                        </li>
                    </ul>
                </div>
                <button class="flex items-center justify-center swiper-next-cat">
                    <img src="/icons/new/ArrowLeft2.svg" width="24" />
                </button>
            </div>
        </div>

        <ul class="flex flex-wrap items-center justify-center gap-8 w-full" v-if="!coursesLoading">
            <li class="flex flex-col items-center gap-3 rounded-2xl shadow-xl w-full max-w-xs p-3 flex-shrink-0" v-for="(course, i) in courses" :key="i">
                <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="relative flex items-end overflow-hidden rounded-2xl w-full h-52">
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
        <ul class="flex flex-wrap items-center justify-center gap-8 w-full" v-else>
            <li class="flex flex-col items-start gap-3 rounded-2xl shadow-xl w-full max-w-xs p-3 flex-shrink-0" v-for="(course, i) in coursesSkeleton" :key="i">
                <div class="skeleton w-full h-64 rounded-2xl"></div>
                <h3 class="skeleton w-full h-8 rounded-lg"></h3>
                <div class="flex flex-col gap-2 w-full">
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-full h-2"></span>
                    <span class="skeleton w-4/12 h-2"></span>
                </div>
                <div class="flex flex-wrap justify-between items-center gap-4">
                    <div class="flex items-start gap-2">
                        <div class="skeleton rounded-full w-8 h-8"></div>
                        <span class="skeleton w-8"></span>
                    </div>
                </div>
                <hr class="w-full border-t-2 border-b-0 border-gray-200" />
                <div class="skeleton w-full h-10 rounded-2xl"></div>
            </li>
        </ul>

        <ul class="flex items-center justify-center gap-2 md:gap-6">
            <li>
                <nuxt-link
                    class="flex items-center justify-center rounded-full"
                    :to="`/department/:page?order=${selectedOrder.value}&group=${group.slug}&search=${search}`.replace(':page', Math.max(coursesPage - 1, 1))"
                >
                    <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="ArrowRight3" />
                </nuxt-link>
            </li>
            <li v-for="(item, i) in coursesPages" :key="i">
                <nuxt-link
                    class="flex items-center justify-center p-3 w-8 md:w-10 h-8 md:h-10 shadow-lg rounded-xl"
                    :class="coursesPage == item ? 'bg-gray-700 text-white' : 'bg-white'"
                    :to="`/department/:page?order=${selectedOrder.value}&group=${group.slug}&search=${search}`.replace(':page', item)"
                    v-if="item > 0"
                >
                    {{ item }}
                </nuxt-link>
                <span class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-gray-100" v-else>...</span>
            </li>
            <li>
                <nuxt-link
                    class="flex items-center justify-center rounded-full"
                    :to="
                        `/department/:page?order=${selectedOrder.value}&group=${group.slug}&search=${search}`.replace(
                            ':page',
                            Math.min(coursesPage + 1, coursesPageTotal),
                        )
                    "
                >
                    <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="ArrowLeft3" />
                </nuxt-link>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/Select.vue";

export default {
    name: "DepartmentSection",
    components: { Select },
    data() {
        return {
            departments: this.departments || {},

            categorySwiperOptions: {
                // autoplay: false,
                slidesPerView: "auto",
                // initialSlide: 0,
                prevButton: ".swiper-prev-cat",
                nextButton: ".swiper-next-cat",
                loop: false,
                freeMode: true,
                observeParents: true,
            },

            orderOptions: [
                { name: "جدید ترین", value: "newest" },
                { name: "محبوب ترین", value: "most-popular" },
                { name: "پرفروش ترین", value: "most-sold" },
            ],
            selectedOrder: { name: "جدید ترین", value: "newest" },
            search: this.search || "",
            group: this.group || { name: "", slug: "" },

            courses: this.courses || [],
            coursesPages: this.coursesPages || [],
            coursesPage: this.coursesPage || 1,
            coursesTotal: this.coursesTotal || 0,
            coursesPageTotal: this.coursesPageTotal || 1,
            coursesLoading: false,
            coursesSkeleton: [0, 0, 0, 0, 0, 0, 0, 0],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.getCourseGroups({ headers });

        const route = this.$nuxt.context.route;
        this.processRoute(route);

        await this.getCourses({ headers });
    },
    async beforeRouteUpdate(to, from, next) {
        if (to.params.page) this.$route.params.page = to.params.page;
        if (to.query.search) this.$route.query.search = to.query.search;
        if (to.query.order) this.$route.query.order = to.query.order;
        if (to.query.group) this.$route.query.group = to.query.group;

        this.processRoute(to);
        await this.getCourses({});
        if (typeof document !== "undefined") {
            document.getElementById("courses").scrollIntoView();
        }
        next();
    },
    methods: {
        searchSubmit(e) {
            e.preventDefault();
            this.clearCourses();
            this.getCourses();
        },
        orderChanged(order) {
            if (this.coursesLoading) return;
            this.clearCourses();
            this.getCourses();
        },
        async groupChanged(group) {
            if (this.coursesLoading) return;

            if (this.group._id === group) this.group = { name: "", slug: "" };
            else this.group = this.departments[group];

            this.clearCourses();
            await this.getCourses();

            this.categorySwiper.slideTo(Object.keys(this.departments).indexOf(group), 1000, false);
        },

        async getCourseGroups(data = {}) {
            let url = `/api/course-groups`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.departments = {};
                    results.data.records.forEach((record) => (this.departments[record._id] = { ...record, slug: record.topGroup }));
                })
                .catch((e) => {});
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

            let params = [`page=${this.coursesPages}`, `search=${this.search}`, `order=${this.selectedOrder.value}`, `group=${this.group.slug}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.courses = results.data.records;
                    this.coursesPage = results.data.page;
                    this.coursesTotal = results.data.total;
                    this.coursesPageTotal = results.data.pageTotal;
                    this.coursesPages = this.getPageList(this.coursesPageTotal, this.coursesPage, 7);
                })
                .catch((e) => {})
                .finally(() => (this.coursesLoading = false));
        },

        clearCourses() {
            this.courses = [];
            this.coursesPages = [];
            this.coursesPage = 1;
            this.coursesTotal = 0;
            this.coursesPageTotal = 1;
        },

        processRoute(route) {
            if (route.params.page && !isNaN(parseInt(route.params.page))) this.coursesPages = parseInt(route.params.page);
            if (route.query.order) this.selectedOrder = this.orderOptions[route.query.order] || { name: "", value: "" };
            if (route.query.group) {
                const _id = Object.keys(this.departments).find((key) => this.departments[key]["slug"] == route.query.group);
                if (!!this.departments[_id]) this.group = this.departments[_id];
            }
            if (route.query.search) this.search = route.query.search;
        },

        getPageList(totalPages, page, maxLength) {
            if (maxLength < 5) throw "maxLength must be at least 5";

            const range = (start, end) => Array.from(Array(end - start + 1), (_, i) => i + start);

            var sideWidth = maxLength < 9 ? 1 : 2;
            var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
            var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
            if (totalPages <= maxLength) return range(1, totalPages);

            if (page <= maxLength - sideWidth - 1 - rightWidth) {
                return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
            }
            if (page >= totalPages - sideWidth - 1 - rightWidth) {
                return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
            }

            return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
        },
    },
};
</script>
