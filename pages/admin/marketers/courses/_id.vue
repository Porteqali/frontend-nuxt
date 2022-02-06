<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/marketers">مدیریت بازاریابان</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>سطوح بازاریابی</b></h1>
        </div>

        <section class="flex items-center gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg p-4">
            <img class="w-14 h-14 rounded-full object-cover shadow-md" :src="marketer.image" v-if="marketer.image" alt="" />
            <div class="flex flex-col">
                <span class="text-lg">{{ `${marketer.name} ${marketer.family}` }}</span>
                <small class="opacity-75">{{ marketer.email }}</small>
            </div>
        </section>

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg p-4">
            <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>سطوح بازاریابی بر روی</span>
                    </label>
                    <Select :selectedOption.sync="emmitTo" @update:selectedOption="selectSearchedItem({})" :options="emmitToOptions">
                        <template v-slot:option="{ option }">
                            <span :value="option.value">{{ option.name }}</span>
                        </template>
                    </Select>
                </div>
                <div class="relative flex flex-col w-full" v-if="emmitTo.value != 'allCourses'">
                    <div class="flex flex-col gap-2 w-full z-20">
                        <label class="text-sm">
                            <span>جستجوی {{ emmitTo.name }}</span>
                        </label>
                        <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                            <input type="text" v-model="searchQuery" class="w-full flex-grow bg-transparent" @input="searchTimeoutCheck()" />
                            <button type="button" @click="searchQuery = ''" v-if="!!searchQuery"><img src="/icons/Cancel.svg" width="24" /></button>
                        </div>
                    </div>
                    <ul class="absolute top-16 flex flex-col gap-2 p-2 pt-6 rounded-xl w-full bg-white shadow-lg z-10 max-h-64 overflow-auto" v-if="!!searchQuery">
                        <li
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 cursor-pointer"
                            v-for="(item, i) in searchResults"
                            :key="i"
                            @click="selectSearchedItem(item)"
                        >
                            <img class="w-14 shadow-md object-cover rounded-xl" v-if="item.image" :src="item.image" alt="" />
                            <img class="w-14 shadow-md object-cover rounded-xl" v-if="item.icon" :src="item.icon" alt="" />
                            <span class="text-sm" v-if="item.name">{{ item.name }}</span>
                            <span class="text-sm" v-if="item.fullname">{{ item.fullname }}</span>
                        </li>
                        <li v-if="!searchResults.length"><small class="text-rose-800">نتیجه ای پیدا نشد!</small></li>
                    </ul>
                </div>
            </div>
            <div class="flex items-center gap-2 p-2 rounded-xl shadow-md flex-shrink-0 w-max" v-if="!!selectedSearchItem.name || !!selectedSearchItem.fullname">
                <img class="w-14 shadow-md object-cover rounded-xl" v-if="!!selectedSearchItem.image" :src="selectedSearchItem.image" alt="" />
                <img class="w-14 shadow-md object-cover rounded-xl" v-if="!!selectedSearchItem.icon" :src="selectedSearchItem.icon" alt="" />
                <span class="text-sm" v-if="selectedSearchItem.name">{{ selectedSearchItem.name }}</span>
                <span class="text-sm" v-if="selectedSearchItem.fullname">{{ selectedSearchItem.fullname }}</span>
                <button class="flex-shrink-0" type="button" @click="selectSearchedItem({})"><img src="/icons/Cancel.svg" width="24" /></button>
            </div>
            <hr class="w-full" />
            <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                <div class="flex flex-col gap-2 w-max flex-shrink-0">
                    <label for=""></label>
                    <div class="flex items-center gap-2 cursor-pointer select-none" @click="bulkAmountType = 'percent'">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="bulkAmountType == 'percent'" />
                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                        </transition>
                        <span class="text-sm opacity-75">درصد</span>
                    </div>
                    <div class="flex items-center gap-2 cursor-pointer select-none" @click="bulkAmountType = 'number'">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="bulkAmountType == 'number'" />
                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                        </transition>
                        <span class="text-sm opacity-75">مبلغ ثابت</span>
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>مقدار</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                        <input type="number" v-model="bulkAmount" dir="ltr" class="w-full bg-transparent" />
                        <small class="font-bold" v-if="bulkAmountType == 'percent'">%</small>
                        <small class="font-bold" v-if="bulkAmountType == 'number'">تومان</small>
                    </div>
                </div>
            </div>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4">
                <button
                    class="orange_gradient_v p-4 py-2 rounded-xl"
                    :class="{ 'opacity-75 cursor-wait': addingBulkCourses }"
                    :disabled="addingBulkCourses"
                    @click="bulkAddCourses()"
                >
                    ثبت
                </button>
                <button
                    class="border-2 border-rose-500 hover:bg-rose-100 p-4 py-1.5 rounded-xl"
                    :class="{ 'opacity-75 cursor-wait': removingBulkCourses }"
                    :disabled="removingBulkCourses"
                    @click="bulkDeleteCourses()"
                >
                    حذف
                </button>
            </div>
        </section>

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <label for="">سطوح بازاریابی</label>
                    <button
                        type="button"
                        class="border-2 border-solid border-gray-400 hover:bg-gray-50 text-xs p-1 px-2 rounded-lg"
                        @click="reloadMarketerCourses()"
                    >
                        <span v-if="!loading">به روز رسانی</span>
                        <span v-else>...</span>
                    </button>
                </div>
                <ul class="flex flex-col gap-4 w-full p-1">
                    <li class="flex flex-wrap lg:flex-nowrap items-center gap-2 p-2 shadow-md rounded-xl w-full" v-for="(record, i) in courses" :key="i">
                        <div class="flex items-center gap-2 p-2 rounded-xl shadow-md flex-shrink-0 w-max" v-if="!!record.course">
                            <img class="w-20 h-16 shadow-md object-cover rounded-xl flex-shrink-0" :src="record.course[0].image" alt="" />
                            <span class="flex text-sm w-screen max-w-screen-2xs" v-if="record.course[0].name">{{ record.course[0].name }}</span>
                        </div>
                        <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                            <div class="flex flex-col gap-2 w-max flex-shrink-0">
                                <label for=""></label>
                                <div class="flex items-center gap-2 cursor-pointer select-none" @click="record.commissionType = 'percent'">
                                    <img src="/icons/admin/TickSquare.svg" width="24" v-if="record.commissionType == 'percent'" />
                                    <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                                    <span class="text-sm opacity-75">درصد</span>
                                </div>
                                <div class="flex items-center gap-2 cursor-pointer select-none" @click="record.commissionType = 'number'">
                                    <img src="/icons/admin/TickSquare.svg" width="24" v-if="record.commissionType == 'number'" />
                                    <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                                    <span class="text-sm opacity-75">مبلغ ثابت</span>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label class="text-sm">
                                    <span>مقدار</span>
                                    <b class="text-red-500">*</b>
                                </label>
                                <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                                    <input type="number" v-model="record.commissionAmount" dir="ltr" class="w-full bg-transparent" />
                                    <small class="font-bold" v-if="record.commissionType == 'percent'">%</small>
                                    <small class="font-bold" v-if="record.commissionType == 'number'">تومان</small>
                                </div>
                            </div>
                            <button
                                type="button"
                                class="border-2 border-solid border-red-400 hover:bg-rose-50 p-1 rounded-lg flex-shrink-0"
                                @click="deleteMarketerCourse(record._id, i)"
                            >
                                <img src="/icons/admin/Delete.svg" width="24" />
                            </button>
                        </div>
                    </li>
                </ul>
                <button
                    type="button"
                    class="gray_gradient hover:shadow-md p-3 py-2 rounded-xl text-sm w-max"
                    @click="loadMarketerCourses()"
                    v-if="!loading && coursesPage <= coursesPageTotal"
                >
                    بارگذاری بیشتر
                </button>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4">
                <button class="orange_gradient_h p-4 py-2 rounded-xl" :class="{ 'opacity-75 cursor-wait': saving }" :disabled="saving" @click="save()">
                    تایید و ثبت
                </button>
                <button class="border-2 border-gray-500 hover:bg-gray-200 p-4 py-1.5 rounded-xl" @click="$router.back()">بازگشت</button>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "admin",
    head() {
        return { title: "سطوح بازاریابی - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,
            addingBulkCourses: false,
            removingBulkCourses: false,
            emmitToOptions: {
                allCourses: { name: "همه دوره ها", value: "allCourses" },
                course: { name: "دوره خاص", value: "course" },
                courseGroup: { name: "گروه دوره", value: "courseGroup" },
            },
            searchQuery: "",
            searchTimeout: null,
            searchResults: [],
            selectedSearchItem: {},

            marketer: { image: "", name: "", family: "", email: "" },
            marketer_id: "",
            coursesToDelete: [],
            courses: this.courses || [],
            coursesPage: 1,
            coursesTotal: 0,
            coursesPageTotal: 1,

            bulkAmountType: "percent",
            bulkAmount: "",
            emmitTo: { name: "همه دوره ها", value: "allCourses" },

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;
        this.marketer_id = route.params.id;

        await this.loadMarketerCourses({ headers });
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
        async loadMarketerCourses(data = {}) {
            if (this.loading || this.coursesPage > this.coursesPageTotal) return;
            this.loading = true;

            let url = `/api/admin/marketers/courses/${this.marketer_id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.coursesPage}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(encodeURI(url), { headers })
                .then((response) => {
                    this.marketer = response.data.user;
                    this.courses = [...this.courses, ...response.data.records];
                    this.coursesPage = response.data.page + 1;
                    this.coursesTotal = response.data.total;
                    this.coursesPageTotal = response.data.pageTotal;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                })
                .finally(() => (this.loading = false));
        },
        async reloadMarketerCourses() {
            this.courses = [];
            this.coursesPage = 1;
            this.coursesTotal = 0;
            this.coursesPageTotal = 1;
            await this.loadMarketerCourses();
        },

        async searchTimeoutCheck() {
            if (this.searchTimeout) clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(async () => {
                await this.search();
                this.searchTimeout = null;
            }, 2000);
        },
        async search() {
            let url = `/api/admin/discounts/search/${this.searchQuery}?section=${this.emmitTo.value}`;
            await axios
                .get(encodeURI(url))
                .then((results) => {
                    this.searchResults = results.data.records;
                    if (this.searchResults.length > 5) this.searchResults.length = 5;
                })
                .catch((e) => {});
        },
        selectSearchedItem(item) {
            this.selectedSearchItem = { ...item };
        },

        // ==================================

        async bulkAddCourses() {
            if (this.addingBulkCourses) return;
            this.addingBulkCourses = true;

            let url = encodeURI(`/api/admin/marketers/courses-bulk/${this.$route.params.id}`);
            await axios
                .post(url, {
                    bulkAmountType: this.bulkAmountType,
                    bulkAmount: this.bulkAmount,
                    emmitTo: this.emmitTo.value,
                    emmitToId: this.selectedSearchItem._id || "",
                })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "سطوح بازاریابی جدید اضافه شدند" });
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                })
                .finally(() => (this.addingBulkCourses = false));
        },

        async bulkDeleteCourses() {
            if (this.removingBulkCourses) return;
            this.removingBulkCourses = true;

            let url = `/api/admin/marketers/courses-bulk/${this.$route.params.id}`;
            url = `${url}?emmitTo=${this.emmitTo.value}&emmitToId=${this.selectedSearchItem._id || ""}`;

            await axios
                .delete(encodeURI(url))
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "سطوح بازاریابی حذف شدند" });
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                })
                .finally(() => (this.removingBulkCourses = false));
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            let url = encodeURI(`/api/admin/marketers/courses/${this.$route.params.id}`);
            await axios
                .put(url, { courses: this.courses, coursesToDelete: this.coursesToDelete })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "سطوح بازاریابی با موفقیت ویرایش شد" });
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

        deleteMarketerCourse(recordId, index) {
            this.coursesToDelete.push(recordId);
            this.courses.splice(index, 1);
        },
    },
};
</script>
