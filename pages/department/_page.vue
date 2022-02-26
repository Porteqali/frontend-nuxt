<style scoped>
.search_box {
    background-color: var(--search-box-bg-color);
    color: var(--search-box-color);
}
.search_box button {
    color: var(--search-box-button-color);
}

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

.courses_list {
    grid-template-columns: repeat(auto-fit, minmax(284px, 1fr));
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

@media (min-width: 768px) {
    .courses_list {
        grid-template-columns: repeat(auto-fit, minmax(384px, 1fr));
    }
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="courses">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <div class="flex flex-wrap items-center gap-4">
                <form class="search_box flex items-center gap-4 p-3 rounded-3xl shadow-lg" @submit="searchSubmit($event)">
                    <input class="flex-grow outline-none bg-transparent w-64" v-model="search" type="text" placeholder="جستجو" />
                    <button type="submit" class="flex-shrink-0 flex items-center justify-center">
                        <img class="flex-shrink-0 inline-block" src="/icons/Search.purple.svg" width="24" height="24" alt="Search" />
                    </button>
                </form>
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
                    <img class="title_alt cursor-pointer rounded-full" :src="department.icon" width="48" height="48" :alt="department.slug" />
                    <span class="blur title_alt_text w-max">{{ department.name }}</span>
                </li>
            </ul>
        </div>
        <ul class="courses_list grid gap-10 w-full" v-if="!coursesLoading">
            <li class="gray_gradient course_card shadow-lg flex flex-col gap-4 p-4 rounded-3xl max-w-md w-full mx-auto" v-for="(course, i) in courses" :key="i">
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
                    <nuxt-link :to="`/teacher/${course.teacher[0]._id}`" class="flex items-center gap-2">
                        <img class="rounded-full object-cover w-10 h-10" :src="course.teacher[0].image" alt="Figma" width="40" height="40" />
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
        <ul class="courses_list grid gap-10 w-full" v-else>
            <li
                class="gray_gradient blur course_card shadow-lg flex flex-col gap-4 p-4 rounded-3xl max-w-md w-full mx-auto"
                v-for="(course, i) in coursesSkeleton"
                :key="i"
            >
                <div class="relative overflow-hidden rounded-xl w-full h-72">
                    <span class="skeleton absolute inset-0"></span>
                    <span class="skeleton w-8 h-8 rounded-full"></span>
                </div>
                <div class="flex flex-col gap-4">
                    <h3 class="skeleton w-full h-6"></h3>
                    <div class="flex items-center gap-2">
                        <span class="skeleton w-10 h-10 rounded-full"></span>
                        <span class="skeleton w-8 h-3"></span>
                    </div>
                    <div class="flex flex-wrap justify-between gap-4">
                        <img src="/icons/TimeCircle.line.svg" alt="TimeCircle" width="20" height="20" />
                        <img src="/icons/User.line.svg" alt="User" width="20" height="20" />
                        <img src="/icons/Star.line.svg" alt="Star" width="20" height="20" />
                    </div>
                    <button class="orange_gradient_h flex items-center justify-center gap-4 py-4 px-8 rounded-2xl">
                        <span class="skeleton w-8/12 h-4"></span>
                        <img src="/icons/Buy.svg" alt="Buy" width="24" height="24" />
                    </button>
                </div>
            </li>
        </ul>

        <ul class="flex items-center justify-center gap-4">
            <li>
                <nuxt-link
                    class="flex items-center justify-center rounded-full"
                    :to="`/department/:page?order=${order}&group=${group.slug}&search=${search}`.replace(':page', Math.max(coursesPage - 1, 1))"
                >
                    <img src="/icons/ArrowRight.line.svg" width="24" height="24" alt="ArrowRight" />
                </nuxt-link>
            </li>
            <li v-for="(item, i) in coursesPages" :key="i">
                <nuxt-link
                    class="flex items-center justify-center p-3 w-8 h-8 shadow-sm rounded-full"
                    :class="coursesPage == item ? 'bg-lightblue-300' : 'bg-indigo-100'"
                    :to="`/department/:page?order=${order}&group=${group.slug}&search=${search}`.replace(':page', item)"
                    v-if="item > 0"
                >
                    {{ item }}
                </nuxt-link>
                <span class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-indigo-100" v-else>...</span>
            </li>
            <li>
                <nuxt-link
                    class="flex items-center justify-center rounded-full"
                    :to="`/department/:page?order=${order}&group=${group.slug}&search=${search}`.replace(':page', Math.min(coursesPage + 1, coursesPageTotal))"
                >
                    <img src="/icons/ArrowLeft.line.svg" width="24" height="24" alt="ArrowLeft" />
                </nuxt-link>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "DepartmentSection",
    data() {
        return {
            departments: this.departments || {},

            search: this.search || "",
            order: this.order || "newest", // newest | most-popular
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
            if (route.query.order) this.order = route.query.order;
            if (route.query.group) {
                const _id = Object.keys(this.departments).find((key) => this.departments[key]['slug'] == route.query.group);
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
