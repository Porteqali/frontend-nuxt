<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>بنر وبسایت</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex items-center gap-2 cursor-pointer select-none" @click="withImage = !withImage">
                    <transition name="check" mode="out-in" appear>
                        <img src="/icons/admin/TickSquare.svg" width="20" v-if="!!withImage" />
                        <img src="/icons/admin/TickSquareBox.svg" width="20" v-else />
                    </transition>
                    <span class="text-xs opacity-75">وضعیت نمایش عکس</span>
                </div>
                <div class="flex flex-col gap-4">
                    <img class="w-full h-16 bg-gray-300 rounded-2xl object-contain" :src="image" alt="" />
                    <div class="flex flex-wrap items-start gap-4">
                        <button type="button" class="orange_gradient_h p-2 px-4 rounded-xl shadow-md text-sm" @click="$refs.fileInput.click()" :disabled="saving">
                            آپلود عکس جدید
                        </button>
                        <button type="button" class="gray_gradient p-2 px-4 rounded-xl shadow-md text-sm" @click="deleteImage()" v-if="!!image">حذف</button>
                        <input class="w-0 h-0 opacity-0" ref="fileInput" type="file" accept=".jpg,.jpeg,.png,.gif" @change="selectFile()" />
                    </div>
                    <small class="opacity-75">ابعاد مناسب برای عکس 2800x100 پیکسل</small>
                </div>
                <hr class="w-full" />
                <div class="flex items-center gap-2 cursor-pointer select-none" @click="withText = !withText">
                    <transition name="check" mode="out-in" appear>
                        <img src="/icons/admin/TickSquare.svg" width="20" v-if="!!withText" />
                        <img src="/icons/admin/TickSquareBox.svg" width="20" v-else />
                    </transition>
                    <span class="text-xs opacity-75">وضعیت نمایش متن و تایمر</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>رنگ پس زمینه</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="color" v-model="bgColor" class="p-3 w-full h-14 rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>متن بنر</span>
                        </label>
                        <input type="text" v-model="text" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full max-w-screen-2xs">
                        <label class="text-sm">
                            <span>کد</span>
                        </label>
                        <input type="text" v-model="code" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>لینک</span>
                    </label>
                    <input type="text" v-model="link" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>تاریخ اتمام</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <client-only placeholder="Loading...">
                            <persian-date-picker
                                v-model="endDate"
                                type="datetime"
                                class="p-2 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                            ></persian-date-picker>
                        </client-only>
                        <!-- <input type="datetime-local" v-model="endDate" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" /> -->
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>وضعیت</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <Select :selectedOption.sync="status" :options="statusOptions">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
                    </div>
                </div>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4" v-if="checkPermissions(['admin.banner.edit'], userPermissions)">
                <button class="orange_gradient_h p-4 py-2 rounded-xl" :class="{ 'opacity-75 cursor-wait': saving }" :disabled="saving" @click="save()">
                    تایید و ثبت
                </button>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import JDate from "jalali-moment";
import permissionCheck from "~/mixins/permissionCheck";
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "admin",
    head() {
        return { title: "ویرایش بنر وبسایت - گروه آموزشی پرتقال" };
    },
    mixins: [permissionCheck],
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,
            statusOptions: {
                active: { name: "فعال", value: "active" },
                deactive: { name: "غیرفعال", value: "deactive" },
            },

            withImage: false,
            withText: false,
            image: "",
            bgColor: "",
            text: "",
            code: "",
            link: "",
            endDate: "",
            status: { name: "فعال", value: "active" },

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.loadBanner({ headers });
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
        async loadBanner(data = {}) {
            let url = `/api/admin/banner`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.withImage = response.data.withImage;
                    this.withText = response.data.withText;
                    this.image = response.data.bgImage;
                    this.bgColor = response.data.bgColor;
                    this.text = response.data.text;
                    this.code = response.data.code;
                    this.link = response.data.link;
                    this.endDate = JDate(response.data.endDate).locale("fa").format("yyyy-MM-DDThh:mm:ss");
                    this.status = this.statusOptions[response.data.status] || { name: "فعال", value: "active" };
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async selectFile() {
            this.image = this.$refs.fileInput.files[0] ? URL.createObjectURL(this.$refs.fileInput.files[0]) : "";
        },

        async deleteImage() {
            this.$refs.fileInput.files = undefined;
            this.image = "";
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            const formData = new FormData();
            if (this.$refs.fileInput.files[0]) formData.append("files", this.$refs.fileInput.files[0]);
            formData.append("image", this.image);
            formData.append("bgColor", this.bgColor);
            if (!!this.text) formData.append("text", this.text);
            if (!!this.code) formData.append("code", this.code);
            if (!!this.link) formData.append("link", this.link);
            formData.append("endDate", JDate(this.endDate).toISOString());
            formData.append("status", this.status.value);
            formData.append("withImage", this.withImage);
            formData.append("withText", this.withText);

            let url = encodeURI(`/api/admin/banner`);
            await axios
                .put(url, formData)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "بنر با موفقیت ویرایش شد" });
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
