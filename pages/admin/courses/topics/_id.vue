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
            <nuxt-link to="/admin/courses">لیست دوره ها</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>ویرایش سرفصل های دوره</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <div class="flex items-center gap-2" v-if="course">
                    <img class="w-20 h-16 rounded-xl object-cover shadow-md" :src="course.image" v-if="course.image" alt="" />
                    <div class="flex flex-col gap-1">
                        <b class="text-lg">{{ `${course.name}` }}</b>
                        <small class="text-sm opacity-80" v-if="course.groups[0]">{{ course.groups[0].name }}</small>
                    </div>
                </div>

                <hr class="w-full" />

                <div class="flex flex-wrap items-center justify-between gap-2">
                    <label for="">سرفصل های دوره</label>
                    <button type="button" class="border-2 border-solid border-emerald-400 hover:bg-emerald-50 text-xs p-1 px-2 rounded-lg" @click="addTopic()">
                        سرفصل جدید
                    </button>
                </div>
                <ul class="flex flex-col gap-4">
                    <Draggable class="flex flex-col gap-4" ghost-class="bg-gray-200" v-model="topics" handle=".grab_area" @start="drag = true" @end="drag = false">
                        <li class="flex items-start gap-2 p-2 shadow-md rounded-xl w-full" v-for="(item, i) in topics" :key="i" :id="`topic${i + 1}`">
                            <div class="flex flex-col items-center gap-2 h-full">
                                <span class="flex items-center justify-center w-9 h-9 py-2">{{ i + 1 }}</span>
                                <span class="grab_area flex items-center justify-center w-9 h-full">
                                    <img src="/icons/admin/Grab.svg" width="16" alt="" />
                                </span>
                                <button
                                    type="button"
                                    class="border-2 border-solid border-red-400 hover:bg-rose-50 p-1 rounded-lg flex-shrink-0"
                                    @click="removeTopic(i)"
                                >
                                    <img src="/icons/admin/Delete.svg" width="16" alt="" />
                                </button>
                            </div>
                            <div class="flex flex-col gap-2 w-full flex-grow">
                                <p class="text-xs bg-rose-50 text-red-900 p-1 rounded-md" v-if="errorTag == `topic${i}`">{{ errorMsg }}</p>
                                <div class="flex flex-wrap items-center gap-2">
                                    <input
                                        type="text"
                                        v-model="item.name"
                                        placeholder="عنوان فایل"
                                        class="p-2 flex-grow text-sm rounded-xl focus:shadow-md bg-coolgray-100"
                                    />
                                    <input
                                        type="text"
                                        v-model="item.timeRaw"
                                        v-mask="`##:##:##`"
                                        placeholder="مدت زمان"
                                        class="p-2 w-20 text-sm rounded-xl focus:shadow-md bg-coolgray-100"
                                    />
                                </div>
                                <div class="flex flex-wrap items-center gap-4">
                                    <div class="flex items-center gap-2 cursor-pointer select-none" @click="item.isFree = !item.isFree">
                                        <transition name="check" mode="out-in" appear>
                                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="!!item.isFree" />
                                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                                        </transition>
                                        <span class="text-sm opacity-75">قسمت رایگان</span>
                                    </div>
                                    <div class="flex items-center gap-2 cursor-pointer select-none" @click="item.isFreeForUsers = !item.isFreeForUsers">
                                        <transition name="check" mode="out-in" appear>
                                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="!!item.isFreeForUsers" />
                                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                                        </transition>
                                        <span class="text-sm opacity-75">رایگان برای اعضا</span>
                                    </div>
                                </div>
                                <hr class="w-full" />
                                <ul class="flex flex-wrap items-center">
                                    <li
                                        class="text-sm border-b-2 border-solid cursor-pointer w-max px-2"
                                        :class="{ 'text-orange-800 border-orange-700': item.type == 'file' }"
                                        @click="item.type = 'file'"
                                    >
                                        فایل
                                    </li>
                                    <li
                                        class="text-sm border-b-2 border-solid cursor-pointer w-max px-2"
                                        :class="{ 'text-orange-800 border-orange-700': item.type == 'link' }"
                                        @click="item.type = 'link'"
                                    >
                                        لینک
                                    </li>
                                </ul>
                                <div class="flex flex-wrap items-center gap-1" v-if="item.type == 'file'">
                                    <button
                                        type="button"
                                        class="darkblue_gradient p-1.5 px-3 rounded-lg shadow-md text-xs w-max"
                                        @click="$refs[`topicsInput-${i}`][0].click()"
                                    >
                                        انتخاب فایل
                                    </button>
                                    <input class="w-0 h-0 opacity-0" :ref="`topicsInput-${i}`" type="file" @change="selectTopicVideo(`topicsInput-${i}`, i)" />
                                    |
                                    <span>{{ item.file.split(/[\\/]/).pop() }}</span>
                                    <span class="text-xs p-1 bg-gray-100 opacity-75 rounded-lg w-max" dir="ltr" v-if="item.size">
                                        {{ `${new Intl.NumberFormat().format((item.size / 1048576).toFixed(2))} MB` }}
                                    </span>
                                </div>
                                <div class="flex flex-wrap items-center gap-1" v-if="item.type == 'link'">
                                    <input
                                        v-model="item.link"
                                        placeholder="لینک فایل ویدیو"
                                        class="p-1.5 w-full text-sm rounded-xl focus:shadow-md bg-coolgray-100"
                                    />
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
        return { title: "ویرایش سرفصل های دوره - گروه آموزشی پرتقال" };
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

            course: { image: "", name: "", groups: [] },
            topics: [],

            errorMsg: "",
            errorTag: "",
            uploadingFilesPercentage: 0,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.loadCourseTopics({ headers }, route);
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async loadCourseTopics(data = {}, route) {
            let url = `/api/admin/courses/topics/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.course = response.data.course || { image: "", name: "", groups: [] };

                    const sortedTopics = response.data.topics.sort((a, b) => a.order - b.order);
                    for (let i = 0; i < sortedTopics.length; i++) {
                        const timeRaw = `${sortedTopics[i].time.hours}:${sortedTopics[i].time.minutes}:${sortedTopics[i].time.seconds}`;
                        this.topics.push({ ...sortedTopics[i], fileRaw: null, timeRaw });
                    }
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        selectTopicVideo(ref, index) {
            if (this.$refs[ref][0].files[0]) {
                this.topics[index].fileRaw = this.$refs[ref][0].files[0];
                this.topics[index].file = this.$refs[ref][0].files[0].name;
                this.topics[index].size = this.$refs[ref][0].files[0].size;
            }
        },
        removeTopic(index) {
            this.topics.splice(index, 1);
        },
        addTopic() {
            this.topics.unshift({
                order: 0,
                name: "",
                time: { hours: "", minutes: "", seconds: "" },
                timeRaw: "",
                description: "",
                file: "",
                fileRaw: null,
                isFree: false,
                isFreeForUsers: false,
                canPlay: false,
                status: "active",
                type: "file",
                link: "",
            });
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            // verify and commit the order of topics
            for (let i = 0; i < this.topics.length; i++) {
                if (!this.topics[i].name) {
                    this.errorMsg = `عنوان سرفصل شماره ${i + 1} را مشخص کنید`;
                    this.errorTag = `topic${i}`;
                    return;
                }
                if (!this.topics[i].timeRaw) {
                    this.errorMsg = `زمان سرفصل شماره ${i + 1} را مشخص کنید`;
                    this.errorTag = `topic${i}`;
                    return;
                }
                if (this.topics[i].type == "link" && !this.topics[i].link) {
                    this.errorMsg = `لینک فایل سرفصل شماره ${i + 1} را مشخص کنید`;
                    this.errorTag = `topic${i}`;
                    return;
                }
                if (this.topics[i].type == "file" && !this.topics[i].file && !this.topics[i].fileRaw) {
                    this.errorMsg = `فایل سرفصل شماره ${i + 1} را مشخص کنید`;
                    this.errorTag = `topic${i}`;
                    return;
                }
                this.topics[i].order = i;
            }

            const formData = new FormData();
            const topicsDetails = [];
            const topicsWithFileAndNoFileRaw = [];
            const topicsWithLink = [];
            const remainedTopicsIds = [];

            for (let i = 0; i < this.topics.length; i++) {
                if (this.topics[i].type == "file" && this.topics[i].fileRaw) {
                    formData.append("files", this.topics[i].fileRaw);
                    const topicCopy = { ...this.topics[i] };
                    delete topicCopy.fileRaw;
                    topicsDetails.push(topicCopy);
                }
                if (this.topics[i].type == "file" && !this.topics[i].fileRaw) topicsWithFileAndNoFileRaw.push(this.topics[i]);
                if (this.topics[i].type == "link") topicsWithLink.push(this.topics[i]);
                if (this.topics[i]._id) remainedTopicsIds.push(this.topics[i]._id);
            }

            formData.append("topicsDetails", JSON.stringify(topicsDetails));
            formData.append("topicsWithFileAndNoFileRaw", JSON.stringify(topicsWithFileAndNoFileRaw));
            formData.append("topicsWithLink", JSON.stringify(topicsWithLink));
            formData.append("remainedTopicsIds", JSON.stringify(remainedTopicsIds));

            let url = encodeURI(`/api/admin/courses/topics/${this.$route.params.id}`);
            await axios
                .put(url, formData, {
                    onUploadProgress: (e) => (this.uploadingFilesPercentage = parseInt(Math.round((e.loaded / e.total) * 100))),
                })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "سرفصل های دوره با موفقیت ویرایش شدند" });
                    window.location.reload();
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
