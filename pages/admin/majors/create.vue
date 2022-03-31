<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/majors">لیست تخصص ها</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>تخصص جدید</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <div class="flex items-center gap-4">
                    <img class="w-40 h-28 bg-gray-300 rounded-3xl object-contain" :src="image || '/icons/Document.svg'" alt="" />
                    <div class="flex flex-col items-start gap-4">
                        <button
                            type="button"
                            class="orange_gradient_h p-2 px-4 rounded-xl shadow-md text-sm"
                            @click="$refs['fileInput-image'].click()"
                            :disabled="saving"
                        >
                            انتخاب عکس
                        </button>
                        <button type="button" class="gray_gradient p-2 px-4 rounded-xl shadow-md text-sm" @click="deleteImage(`image`)" v-if="!!image">حذف</button>
                    </div>
                    <input class="w-0 h-0 opacity-0" ref="fileInput-image" type="file" accept=".jpg,.jpeg,.png,.gif" @change="selectFile(`image`)" />
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>عنوان تخصص</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="title" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>اسلاگ</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <div class="flex items-center gap-1 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                        <input type="text" v-model="slug" dir="auto" class="w-full bg-transparent" />
                        <span class="opacity-75" dir="ltr">{{ `${baseUrl}/` }}</span>
                    </div>
                    <small class="opacity-75">اسلاگ برای لینک مطلب استفاده میشود و باید یکتا باشد</small>
                </div>

                <hr class="w-full" />

                <label for="">متادیتا</label>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>عنوان در متادیتا</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="metadata.title" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>توضیحات متادیتا</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="metadata.description" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>

                <hr class="w-full" />

                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>خلاصه توضیح</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <textarea v-model="desc" dir="auto" rows="2" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>متن آشنایی با تخصص</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <textarea v-model="text" dir="auto" rows="8" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
                </div>

                <hr class="w-full" />
                <small class="opacity-75 w-max max-w-full bg-amber-100 p-2 py-1 rounded-lg text-amber-900">
                    *باندل های تخصص پس از ایجاد تخصص قابل افزودن و ویرایش میباشند
                </small>
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
import JDate from "jalali-moment";
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "admin",
    head() {
        return { title: "ایجاد تخصص جدید - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,

            baseUrl: "",

            image: "",
            title: "",
            slug: "",
            desc: "",
            text: "",
            metadata: {
                title: "",
                description: "",
            },

            errorMsg: "",
            errorTag: "",
            uploadingFilesPercentage: 0,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;
    },
    mounted() {
        this.baseUrl = `${window.location.origin}/major`;
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async selectFile(vName) {
            this[vName] = this.$refs[`fileInput-${vName}`].files[0] ? URL.createObjectURL(this.$refs[`fileInput-${vName}`].files[0]) : "";
        },

        async deleteImage(vName) {
            this.$refs[`fileInput-${vName}`].files = undefined;
            this[vName] = "";
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            const formData = new FormData();
            if (this.$refs["fileInput-image"].files[0]) formData.append("files", this.$refs["fileInput-image"].files[0]);
            formData.append("title", this.title);
            formData.append("slug", this.slug);
            formData.append("desc", this.desc);
            formData.append("text", this.text);
            formData.append("metadataTitle", this.metadata.title);
            formData.append("metadataDescription", this.metadata.description);

            let url = encodeURI(`/api/admin/majors`);
            await axios
                .post(url, formData, { onUploadProgress: (e) => (this.uploadingFilesPercentage = parseInt(Math.round((e.loaded / e.total) * 100))) })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "تخصص با موفقیت اضافه شد" });
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
