<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>ویرایش صفحه حریم خصوصی</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <Editor
                    :init="{ relative_urls: false, remove_script_host: true, automatic_uploads: true, images_upload_handler: this.images_upload_handler }"
                    initial-value=""
                    plugins="advlist autolink link image lists charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking table emoticons template paste help"
                    toolbar="insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor"
                    v-model="body"
                    style="min-height: 768px"
                />
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
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Editor from "@tinymce/tinymce-vue";

export default {
    layout: "admin",
    head() {
        return { title: "ویرایش صفحه حریم خصوصی - گروه آموزشی پرتقال" };
    },
    components: {
        Editor,
    },
    data() {
        return {
            loading: false,
            saving: false,

            body: "",
            inTextImageList: [],

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.loadInfo({ headers });
    },
    methods: {
        async loadInfo(data = {}) {
            let url = `/api/admin/staticPages/privacy_policy`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.body = response.data.text || "";
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            let url = encodeURI(`/api/admin/staticPages/privacy_policy`);
            await axios
                .put(url, {
                    text: this.body,
                })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "صفحه با موفقیت ویرایش شد" });
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

        // ========================

        async images_upload_handler(blobInfo, success, failure) {
            const formData = new FormData();
            formData.append("files", blobInfo.blob());
            axios
                .post("/api/admin/articles/image-upload", formData)
                .then((response) => {
                    if (typeof response.data.location != "string") {
                        failure("Invalid JSON: " + response.data);
                        return;
                    }
                    // // save link in a variable and send it back to server
                    this.inTextImageList.push(response.data.location);
                    success(response.data.location);
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                        this.errorMsg = e.response.data.message[0].errors[0];
                        this.errorTag = e.response.data.message[0].property;
                        failure(e.response.data.message[0].errors[0]);
                    }
                });
        },
    },
};
</script>
