<style scoped>
.toggle_btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--department-section-toggle-btn-border-color);
    background-color: var(--department-section-toggle-btn-bg-color);
    color: var(--department-section-toggle-btn-border-color);
}
.toggle_btn.fill {
    background-color: var(--department-section-toggle-btn-fill-bg-color);
    color: var(--department-section-toggle-btn-fill-color);
}

.group_selected {
    border: 5px solid var(--department-section-toggle-btn-fill-bg-color);
    padding: 2px;
    border-radius: 50%;
}
.title_alt_text {
    display: none;
    position: absolute !important;
    z-index: 2;
    opacity: 0;
    top: -3rem;
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
    border-radius: 1rem;
    padding: 0.5rem 1rem;
}
.title_alt:hover + .title_alt_text {
    opacity: 1;
    display: inline-block;
}

.more_courses_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
    box-shadow: 0px 20px 40px rgba(144, 219, 255, 0.3);
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
    <section class="relative flex flex-col gap-8 w-full" id="department">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <div class="flex flex-wrap items-center gap-4">
                <button class="toggle_btn rounded-full" :class="{ fill: order == 'most-popular' }" @click="orderChanged('most-popular')">
                    <img src="/icons/FavouriteOutlineColor.purple.svg" width="24" height="24" alt="FavouriteOutlineColor" />
                    <span>محبوب ها</span>
                </button>
                <button class="toggle_btn rounded-full" :class="{ fill: order == 'newest' }" @click="orderChanged('newest')">
                    <img src="/icons/BookOpenOutlineColor.purple.svg" width="24" height="24" alt="BookOpenOutlineColor" />
                    <span>جدیدترین ها</span>
                </button>
            </div>
            <ul class="flex flex-wrap gap-4">
                <li
                    class="relative flex items-center justify-center"
                    :class="{ group_selected: group.slug == department.slug }"
                    v-for="(department, i) in departments"
                    :key="i"
                    @click="groupChanged(department._id)"
                >
                    <img class="title_alt cursor-pointer rounded-full" :src="department.icon" width="48" height="48" loading="lazy" :alt="department.slug" />
                    <span class="blur title_alt_text w-max">{{ department.name }}</span>
                </li>
            </ul>
        </div>
        <div v-swiper="coursesSwiperOptions" class="w-full max-w-screen-4xl select-none overflow-hidden">
            <ul class="swiper-wrapper flex items-start">
                <li
                    class="swiper-slide gray_gradient course_card shadow-lg flex flex-col gap-4 p-4 rounded-3xl max-w-sm ml-10"
                    v-for="(course, i) in courses"
                    :key="i"
                >
                    <nuxt-link :to="`/course/${course._id}/${course.name.replace(/ /g, '-')}`" class="relative overflow-hidden rounded-xl shadow-lg w-full h-72">
                        <img
                            class="absolute inset-0 object-cover w-full h-full"
                            :src="course.image || `/misc/course.png`"
                            loading="lazy"
                            alt="course"
                            draggable="false"
                        />
                        <img class="absolute top-2 right-2 rounded-full object-cover" :src="course.groups[0].icon" width="32" height="32" loading="lazy" />
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
                        <nuxt-link :to="`/teacher/${course.teacher[0]._id}`" class="flex items-center gap-2">
                            <img class="rounded-full object-cover w-10 h-10" :src="course.teacher[0].image" alt="Figma" loading="lazy" width="40" height="40" />
                            <span>{{ `${course.teacher[0].name} ${course.teacher[0].family}` }}</span>
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
            <nuxt-link to="/department" class="more_courses_btn blur flex items-center gap-2 py-3 px-6 rounded-xl w-max">
                <img src="/icons/BookOpenOutlineColor.orange.svg" width="24" height="24" alt="BookOpenOutlineColor" />
                <span>مشاهده همه دوره ها</span>
            </nuxt-link>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "DepartmentSection",
    data() {
        return {
            departments: {
                network: { name: "امنیت شبکه", slug: "network", icon: "/misc/Figma.svg" },
                languages: { name: "زبان های خارجی", slug: "languages", icon: "/misc/Figma.svg" },
                graphic: { name: "طراحی گرافیک", slug: "graphic", icon: "/misc/Figma.svg" },
                university: { name: "دروس دانشگاهی", slug: "university", icon: "/misc/Figma.svg" },
                programming: { name: "برنامه نویسی", slug: "programming", icon: "/misc/Figma.svg" },
                "web-design": { name: "طراحی وب", slug: "web-design", icon: "/misc/Figma.svg" },
                business: { name: "کسب و کار", slug: "business", icon: "/misc/Figma.svg" },
                free: { name: "دوره های رایگان", slug: "free", icon: "/misc/Figma.svg" },
            },

            search: this.search || "",
            order: this.order || "newest", // newest | most-popular
            group: this.group || { name: "", slug: "" },

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

        await Promise.all([this.getCourses({ headers }), this.getCourseGroups({ headers })]);
    },
    methods: {
        searchSubmit(e) {
            e.preventDefault();
            this.clearCourses();
            this.getCourses();
        },
        orderChanged(order) {
            if (this.coursesLoading) return;
            this.order = order;
            this.clearCourses();
            this.getCourses();
        },
        groupChanged(group) {
            if (this.coursesLoading) return;

            if (this.group._id === group) this.group = { name: "", slug: "" };
            else this.group = this.departments[group];

            this.clearCourses();
            this.getCourses();
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

            let params = [`page=${this.coursesPages}`, `search=${this.search}`, `order=${this.order}`, `group=${this.group.slug}`];
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
