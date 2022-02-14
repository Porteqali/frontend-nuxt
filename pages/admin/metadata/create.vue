<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/metadata">متادیتا ها</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>متادیتا جدید</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>صفحه</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="page" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <hr class="w-full" />
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>title</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="title" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>description</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <textarea rows="3" v-model="description" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>keywords</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="keywords" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>themeColor</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="color" v-model="themeColor" dir="auto" class="p-3 w-full h-12 rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>site</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="site" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>canonical</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="canonical" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>language</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="language" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
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
        return { title: "ایجاد متادیتا جدید - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,

            image: "",
            page: "",
            title: "",
            description: "",
            keywords: "",
            canonical: "",
            themeColor: "#ff7952",
            site: "",
            language: "fa",

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

            let url = encodeURI(`/api/admin/metadata`);
            await axios
                .post(url, {
                    page: this.page,
                    title: this.title,
                    description: this.description,
                    keywords: this.keywords,
                    canonical: this.canonical,
                    themeColor: this.themeColor,
                    site: this.site,
                    language: this.language,
                })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "متادیتا با موفقیت اضافه شد" });
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
