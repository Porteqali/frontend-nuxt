<style scoped>
.grab_area {
    cursor: grab;
}
.grab_area:active {
    cursor: grabbing;
}
</style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/bundles">لیست باندل ها</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>ویرایش دوره های باندل</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg p-4">
            <div class="flex items-center gap-2 p-2 rounded-xl shadow-md flex-shrink-0 w-max" v-if="!!selectedSearchItem.name">
                <img class="w-14 shadow-md object-cover rounded-xl" v-if="!!selectedSearchItem.image" :src="selectedSearchItem.image" alt="" />
                <span class="text-sm" v-if="selectedSearchItem.name">{{ selectedSearchItem.name }}</span>
                <button class="flex-shrink-0" type="button" @click="selectSearchedItem({})"><img src="/icons/Cancel.svg" width="24" /></button>
            </div>
            <div class="relative flex flex-col w-full">
                <div class="flex flex-col gap-2 w-full z-20">
                    <label class="text-sm">
                        <span>جستجوی دوره</span>
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
            <hr class="w-full" />
            <div class="flex flex-col gap-2 w-full">
                <label class="text-sm">
                    <span>حداقل زمان لازم برا گذراندن دوره</span>
                    <b class="text-red-500">*</b>
                </label>
                <div class="flex items-center gap-2 p-3 w-max rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                    <input type="number" v-model="minimumTimeNeeded" dir="ltr" class="w-32 bg-transparent" />
                    <small class="font-bold">روز</small>
                </div>
            </div>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4">
                <button class="orange_gradient_v p-4 py-2 rounded-xl" @click="addCourses()">افزودن</button>
            </div>
        </section>

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <b class="text-lg">{{ `${bundle.title}` }}</b>
                <hr class="w-full" />

                <ul class="flex flex-col gap-4">
                    <Draggable class="flex flex-col gap-4" ghost-class="bg-gray-200" v-model="courses" handle=".grab_area" @start="drag = true" @end="drag = false">
                        <li class="flex items-start gap-2 p-2 shadow-md rounded-xl w-full" v-for="(item, i) in courses" :key="i" :id="`course${i + 1}`">
                            <div class="flex flex-col items-center gap-2 h-full">
                                <span class="flex items-center justify-center w-9 h-9 py-2">{{ i + 1 }}</span>
                                <span class="grab_area flex items-center justify-center w-9 h-full">
                                    <img src="/icons/admin/Grab.svg" width="16" alt="" />
                                </span>
                                <button
                                    type="button"
                                    class="border-2 border-solid border-red-400 hover:bg-rose-50 p-1 rounded-lg flex-shrink-0"
                                    @click="removeCourse(i)"
                                >
                                    <img src="/icons/admin/Delete.svg" width="16" alt="" />
                                </button>
                            </div>
                            <div class="flex flex-col gap-2 w-full flex-grow">
                                <p class="text-xs bg-rose-50 text-red-900 p-1 rounded-md" v-if="errorTag == `course${i}`">{{ errorMsg }}</p>
                                <div class="flex flex-wrap items-center gap-2 p-3 rounded-xl font-bold bg-coolgray-100">{{ item.course.name }}</div>
                                <hr class="w-full" />
                                <div class="flex flex-col gap-2 w-full">
                                    <label class="text-sm">
                                        <span>حداقل زمان لازم برا گذراندن دوره</span>
                                        <b class="text-red-500">*</b>
                                    </label>
                                    <div class="flex items-center gap-2 p-3 w-max rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                                        <input type="number" v-model="item.minimumTimeNeeded" dir="ltr" class="w-32 bg-transparent" />
                                        <small class="font-bold">روز</small>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </Draggable>
                </ul>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex items-center flex-wrap gap-2" v-show="saving">
                <small class="opacity-75">درحال آپلود فایل...</small>
                <div class="progress_bar bg-gray-50 w-40 h-max rounded-full shadow-inner">
                    <div class="h-2 bg-secondary-400 rounded-full" :style="`width:${uploadingFilesPercentage}%`"></div>
                </div>
                <b class="text-xs opacity-60">{{ `${uploadingFilesPercentage}%` }}</b>
            </div>
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
import Draggable from "vuedraggable";
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "admin",
    head() {
        return { title: "ویرایش دوره های باندل - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
        Draggable,
    },
    data() {
        return {
            loading: false,
            saving: false,
            drag: false,

            searchQuery: "",
            searchTimeout: null,
            searchResults: [],
            selectedSearchItem: {},
            minimumTimeNeeded: "",

            bundle: { title: "" },
            courses: [],

            errorMsg: "",
            errorTag: "",
            uploadingFilesPercentage: 0,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.loadBundleCourses({ headers }, route);
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async loadBundleCourses(data = {}, route) {
            let url = `/api/admin/bundles/courses/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.bundle = response.data.bundle || { title: "" };

                    const sortedCourses = response.data.courses.sort((a, b) => a.order - b.order);
                    for (let i = 0; i < sortedCourses.length; i++) {
                        this.courses.push({ ...sortedCourses[i] });
                    }
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async searchTimeoutCheck() {
            if (this.searchTimeout) clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(async () => {
                await this.search();
                this.searchTimeout = null;
            }, 2000);
        },
        async search() {
            let url = `/api/admin/discounts/search/${this.searchQuery}?section=course`;
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

        removeCourse(index) {
            this.courses.splice(index, 1);
        },
        addCourses() {
            if (!!this.selectedSearchItem.name) {
                for (let i = 0; i < this.courses.length; i++) {
                    if (this.courses[i].course._id == this.selectedSearchItem._id) {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "", message: "دوره در باندل وجود دارد" });
                        return;
                    }
                }

                this.courses.unshift({
                    order: 0,
                    course: this.selectedSearchItem,
                    minimumTimeNeeded: this.minimumTimeNeeded,
                });
            }
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            // verify and commit the order of courses
            for (let i = 0; i < this.courses.length; i++) {
                this.courses[i].order = i;
            }

            let url = encodeURI(`/api/admin/bundles/courses/${this.$route.params.id}`);
            await axios
                .put(url, { courses: this.courses }, { onUploadProgress: (e) => (this.uploadingFilesPercentage = parseInt(Math.round((e.loaded / e.total) * 100))) })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "دوره های باندل با موفقیت ویرایش شدند" });
                    // window.location.reload();
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
