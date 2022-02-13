<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>اخرین اخبار سایت</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex items-end flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>عنوان</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="title" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-max flex-shrink-0">
                        <label class="text-sm">
                            <span>وضعیت</span>
                        </label>
                        <div class="flex items-center gap-2 cursor-pointer select-none" @click="status = 'active'">
                            <transition name="check" mode="out-in" appear>
                                <img src="/icons/admin/TickSquare.svg" width="20" v-if="status == 'active'" />
                                <img src="/icons/admin/TickSquareBox.svg" width="20" v-else />
                            </transition>
                            <span class="text-xs opacity-75">فعال</span>
                        </div>
                        <div class="flex items-center gap-2 cursor-pointer select-none" @click="status = 'deactive'">
                            <transition name="check" mode="out-in" appear>
                                <img src="/icons/admin/TickSquare.svg" width="20" v-if="status == 'deactive'" />
                                <img src="/icons/admin/TickSquareBox.svg" width="20" v-else />
                            </transition>
                            <span class="text-xs opacity-75">غیرفعال</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>متن</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <textarea type="text" v-model="text" rows="2" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>لینک</span>
                        </label>
                        <input type="text" v-model="link" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>عنوان لینک</span>
                        </label>
                        <input type="text" v-model="link_text" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                </div>
                <hr class="w-full" />
                <ul class="flex flex-wrap items-center">
                    <li
                        class="text-sm border-b-2 border-solid cursor-pointer w-max px-2"
                        :class="{ 'text-orange-800 border-orange-700': videoType == 'file' }"
                        @click="videoType = 'file'"
                    >
                        فایل
                    </li>
                    <li
                        class="text-sm border-b-2 border-solid cursor-pointer w-max px-2"
                        :class="{ 'text-orange-800 border-orange-700': videoType == 'link' }"
                        @click="videoType = 'link'"
                    >
                        لینک
                    </li>
                </ul>
                <div class="flex flex-wrap items-center gap-1" v-if="videoType == 'file'">
                    <button type="button" class="darkblue_gradient p-1.5 px-3 rounded-lg shadow-md text-xs w-max" @click="$refs.videoInput.click()">
                        انتخاب فایل
                    </button>
                    <input class="w-0 h-0 opacity-0" ref="videoInput" type="file" @change="selectVideo()" />
                    |
                    <span>{{ videoFileName.split(/[\\/]/).pop() }}</span>
                    <span class="text-xs p-1 bg-gray-100 opacity-75 rounded-lg w-max" dir="ltr" v-if="videoSize">
                        {{ `${new Intl.NumberFormat().format((videoSize / 1048576).toFixed(2))} MB` }}
                    </span>
                </div>
                <div class="flex flex-wrap items-center gap-1" v-if="videoType == 'link'">
                    <input v-model="videoLink" placeholder="لینک فایل ویدیو" class="p-1.5 w-full max-w-xs text-sm rounded-xl focus:shadow-md bg-coolgray-100" />
                </div>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4" v-if="checkPermissions(['admin.latest-news.edit'], userPermissions)">
                <button class="orange_gradient_h p-4 py-2 rounded-xl" :class="{ 'opacity-75 cursor-wait': saving }" :disabled="saving" @click="save()">
                    تایید و ثبت
                </button>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import permissionCheck from "~/mixins/permissionCheck";
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "admin",
    head() {
        return { title: "ویرایش اخرین اخبار سایت - گروه آموزشی پرتقال" };
    },
    mixins: [permissionCheck],
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,

            title: "",
            text: "",
            link: "",
            link_text: "",
            video: "",
            videoType: "",
            status: "",

            videoRaw: "",
            videoFileName: "",
            videoSize: "",
            videoLink: "",

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.loadInfo({ headers });
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async loadInfo(data = {}) {
            let url = `/api/admin/latest-news`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.status = response.data.status;
                    this.title = response.data.title;
                    this.text = response.data.text;
                    this.link = response.data.link;
                    this.link_text = response.data.link_text;
                    this.video = response.data.video;
                    this.videoType = response.data.videoType;
                    if (this.videoType == "link") this.videoLink = this.video;
                    if (this.videoType == "file") this.videoFileName = this.video;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        selectVideo() {
            if (this.$refs.videoInput.files[0]) {
                this.videoRaw = this.$refs.videoInput.files[0];
                this.videoFileName = this.$refs.videoInput.files[0].name;
                this.videoSize = this.$refs.videoInput.files[0].size;
            }
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            if (this.videoType == "link" && !this.videoLink) {
                this.errorMsg = `لینک فایل ویدیو را مشخص کنید`;
                return;
            }
            if (this.videoType == "file" && !this.videoFileName && !this.videoRaw) {
                this.errorMsg = `فایل سرفصل فایل ویدیو را مشخص کنید`;
                return;
            }

            const formData = new FormData();
            formData.append("title", this.title);
            formData.append("text", this.text);
            if (!!this.link) formData.append("link", this.link);
            if (!!this.link_text) formData.append("link_text", this.link_text);
            formData.append("videoType", this.videoType);
            formData.append("status", this.status);
            if (this.videoType == "file") formData.append("videoFile", this.videoRaw);
            if (this.videoType == "link") formData.append("videoLink", this.videoLink);

            let url = encodeURI(`/api/admin/latest-news`);
            await axios
                .put(url, formData)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "اخبار سایت با موفقیت ویرایش شد" });
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
