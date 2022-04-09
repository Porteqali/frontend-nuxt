<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/users">مدیریت کاربران</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>دریافت خروجی از کاربران</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-y-auto" @submit="$event.preventDefault()">
                <div class="flex flex-wrap items-center gap-2 cursor-pointer select-none w-max max-w-full" @click="applyDateFilter = !applyDateFilter">
                    <transition name="check" mode="out-in" appear>
                        <img src="/icons/admin/TickSquare.svg" width="24" v-if="applyDateFilter" />
                        <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                    </transition>
                    <span class="text-sm opacity-75">اعمال تاریخ</span>
                    <small class="text-xs opacity-60">(کاربرانی که در بازه تاریخ زیر ثبت نام کرده اند)</small>
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>از تاریخ</span>
                        </label>
                        <client-only placeholder="Loading...">
                            <persian-date-picker
                                v-model="startDate"
                                type="date"
                                class="p-2 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                            ></persian-date-picker>
                        </client-only>
                        <!-- <input type="date" v-model="startDate" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" /> -->
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>تا تاریخ</span>
                        </label>
                        <client-only placeholder="Loading...">
                            <persian-date-picker
                                v-model="endDate"
                                type="date"
                                class="p-2 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                            ></persian-date-picker>
                        </client-only>
                        <!-- <input type="date" v-model="endDate" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" /> -->
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap items-center gap-2 cursor-pointer select-none w-max max-w-full" @click="applyCourseFilter = !applyCourseFilter">
                    <transition name="check" mode="out-in" appear>
                        <img src="/icons/admin/TickSquare.svg" width="24" v-if="applyCourseFilter" />
                        <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                    </transition>
                    <span class="text-sm opacity-75">اعمال فیلتر دوره</span>
                    <small class="text-xs opacity-60">(کاربرانی که در دوره های انتخاب شده زیر ثبت نام کرده اند)</small>
                </div>
                <ul class="flex flex-wrap gap-4" v-if="Object.keys(selectedCourses).length">
                    <li class="flex items-center gap-2 p-2 rounded-xl shadow-md" v-for="(course, i) in selectedCourses" :key="i">
                        <img class="w-14 shadow-md object-cover rounded-xl" :src="course.image" alt="" />
                        <span class="text-sm">{{ course.name }}</span>
                        <button type="button" @click="selectCourse(course)"><img src="/icons/Cancel.svg" width="24" /></button>
                    </li>
                </ul>
                <div class="relative flex flex-col w-full">
                    <div class="flex flex-col gap-2 w-full z-20">
                        <label class="text-sm">
                            <span>جستجوی دوره</span>
                        </label>
                        <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                            <input type="text" v-model="courseSearchQuery" class="w-full flex-grow bg-transparent" @input="courseSearchTimeoutCheck()" />
                            <button type="button" @click="courseSearchQuery = ''" v-if="!!courseSearchQuery"><img src="/icons/Cancel.svg" width="24" /></button>
                        </div>
                    </div>
                    <ul
                        class="absolute top-16 flex flex-col gap-2 p-2 pt-6 rounded-xl w-full bg-white shadow-lg z-10 max-h-64 overflow-auto"
                        v-if="!!courseSearchQuery"
                    >
                        <li
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 cursor-pointer"
                            v-for="(course, i) in courses"
                            :key="i"
                            @click="selectCourse(course)"
                        >
                            <img class="w-14 shadow-md object-cover rounded-xl" :src="course.image" alt="" />
                            <span class="text-sm">{{ course.name }}</span>
                        </li>
                        <li v-if="!courses.length"><small class="text-rose-800">نتیجه ای پیدا نشد!</small></li>
                    </ul>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <label for="">انتخاب فیلد :</label>
                    <div class="flex items-center gap-2 cursor-pointer select-none flex-shrink-0" @click="mobileField = !mobileField">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="mobileField" />
                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                        </transition>
                        <span class="text-sm opacity-75">شماره موبایل</span>
                    </div>
                    <div class="flex items-center gap-2 cursor-pointer select-none flex-shrink-0" @click="emailField = !emailField">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="emailField" />
                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                        </transition>
                        <span class="text-sm opacity-75">آدرس ایمیل</span>
                    </div>
                </div>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4">
                <button class="orange_gradient_h p-4 py-2 rounded-xl" :class="{ 'opacity-75 cursor-wait': saving }" :disabled="saving" @click="save()">
                    تایید و دریافت خروجی
                </button>
                <button class="border-2 border-gray-500 hover:bg-gray-200 p-4 py-1.5 rounded-xl" @click="$router.back()">بازگشت</button>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/admin/Select.vue";
import JDate from "jalali-moment";

export default {
    layout: "admin",
    head() {
        return { title: "دریافت خروجی از کاربران - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,

            applyDateFilter: false,
            applyCourseFilter: false,
            courseSearchQuery: "",
            courseSearchTimeout: null,
            courses: [],

            startDate: "",
            endDate: "",
            selectedCourses: {},
            mobileField: true,
            emailField: true,

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;
    },
    mounted() {
        this.baseUrl = window.location.origin;
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async courseSearchTimeoutCheck() {
            if (this.courseSearchTimeout) clearTimeout(this.courseSearchTimeout);
            this.courseSearchTimeout = setTimeout(async () => {
                await this.courseSearch();
                this.courseSearchTimeout = null;
            }, 2000);
        },
        async courseSearch() {
            let url = `/api/search/${this.courseSearchQuery}?section=course`;
            await axios
                .get(encodeURI(url))
                .then((results) => {
                    this.courses = results.data.records;
                    if (this.courses.length > 5) this.courses.length = 5;
                })
                .catch((e) => {});
        },
        selectCourse(course) {
            if (typeof this.selectedCourses[course._id] !== "undefined") delete this.selectedCourses[course._id];
            else this.selectedCourses[course._id] = course;
            this.selectedCourses = { ...this.selectedCourses };
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            let url = `/api/admin/users/export?`;
            if (this.applyDateFilter) url = `${url}startDate=${JDate(this.startDate).toISOString()}&`;
            if (this.applyDateFilter) url = `${url}endDate=${JDate(this.endDate).toISOString()}&`;
            if (this.applyCourseFilter) url = `${url}selectedCourses=${Object.keys(this.selectedCourses).join(",")}&`;
            url = `${url}mobileField=${this.mobileField}&`;
            url = `${url}emailField=${this.emailField}&`;

            await axios
                .get(encodeURI(url))
                .then((response) => {
                    window.location.href = `${window.location.origin}/${response.data.link}`;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                        this.errorMsg = e.response.data.message[0].errors[0];
                        this.errorTag = e.response.data.message[0].property;
                    }
                })
                .finally(() => {
                    this.saving = false;
                });
        },
    },
};
</script>
