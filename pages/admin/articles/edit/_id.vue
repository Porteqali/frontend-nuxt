<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/articles">مقالات</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>ویرایش مطلب</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex items-center gap-4">
                        <img class="w-40 h-28 bg-gray-300 rounded-3xl object-contain" :src="image || '/icons/Document.svg'" alt="" />
                        <div class="flex flex-col items-start gap-4">
                            <button
                                type="button"
                                class="orange_gradient_h p-2 px-4 rounded-xl shadow-md text-sm"
                                @click="$refs['fileInput-image'].click()"
                                :disabled="saving"
                            >
                                انتخاب عکس (افقی)
                            </button>
                            <button type="button" class="gray_gradient p-2 px-4 rounded-xl shadow-md text-sm" @click="deleteImage(`image`)" v-if="!!image">
                                حذف
                            </button>
                        </div>
                        <input class="w-0 h-0 opacity-0" ref="fileInput-image" type="file" accept=".jpg,.jpeg,.png,.gif" @change="selectFile(`image`)" />
                    </div>
                    <div class="flex items-center gap-4">
                        <img class="w-28 h-40 bg-gray-300 rounded-3xl object-contain" :src="imageVertical || '/icons/Document.svg'" alt="" />
                        <div class="flex flex-col items-start gap-4">
                            <button
                                type="button"
                                class="orange_gradient_h p-2 px-4 rounded-xl shadow-md text-sm"
                                @click="$refs['fileInput-imageVertical'].click()"
                                :disabled="saving"
                            >
                                انتخاب عکس (عمودی)
                            </button>
                            <button
                                type="button"
                                class="gray_gradient p-2 px-4 rounded-xl shadow-md text-sm"
                                @click="deleteImage(`imageVertical`)"
                                v-if="!!imageVertical"
                            >
                                حذف
                            </button>
                        </div>
                        <input
                            class="w-0 h-0 opacity-0"
                            ref="fileInput-imageVertical"
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            @change="selectFile(`imageVertical`)"
                        />
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>عنوان</span>
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
                    <small class="opacity-75">اسلاگ برای لینک مطلب استفاده میشود و باید یکتا باشد(فقط از حروف انگیلیسی استفاده کنید)</small>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>تاریخ انتشار</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <client-only placeholder="Loading...">
                            <persian-date-picker
                                v-model="publishedAt"
                                type="datetime"
                                class="p-2 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                            ></persian-date-picker>
                        </client-only>
                        <!-- <input type="datetime-local" v-model="publishedAt" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" /> -->
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
                <hr class="w-full" />
                <label for="">تگ ها</label>
                <ul class="flex flex-wrap items-center gap-4 px-1" v-if="!!tags.length">
                    <li class="flex items-center gap-1 p-2 rounded-xl shadow-md" v-for="(tag, i) in tags" :key="i">
                        <span class="text-sm mt-1">{{ tag }}</span>
                        <button type="button" @click="addTag($event, tag)"><img src="/icons/Cancel.svg" width="16" /></button>
                    </li>
                </ul>
                <input
                    type="text"
                    v-model="newTag"
                    @keyup="addTag($event)"
                    placeholder="تگ جدید"
                    class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                />
                <hr class="w-full" />
                <label for="">گروه مقاله</label>
                <div class="flex items-center gap-2 p-2 rounded-xl shadow-md w-max" v-if="category.value">
                    <span class="text-sm">{{ category.name }}</span>
                    <button type="button" @click="unselectGroup()"><img src="/icons/Cancel.svg" width="20" /></button>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <Select :selectedOption="{ name: '', value: '' }" @update:selectedOption="selectGroup" :options="groupsOptions" placeholder="انتخاب گروه">
                        <template v-slot:option="{ option }">
                            <span :value="option.value">{{ option.name }}</span>
                        </template>
                    </Select>
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
                    <textarea v-model="description" dir="auto" rows="4" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
                </div>
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
                <button class="border-2 border-gray-500 hover:bg-gray-200 p-4 py-1.5 rounded-xl" @click="$router.back()">بازگشت</button>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import JDate from "jalali-moment";
import Editor from "@tinymce/tinymce-vue";
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "admin",
    head() {
        return { title: "ویرایش مطلب - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
        Editor,
    },
    data() {
        return {
            loading: false,
            saving: false,
            groupsOptions: this.groupsOptions || {},
            statusOptions: {
                published: { name: "منتشر شده", value: "published" },
                pending: { name: "منتظر انتشار", value: "pending" },
            },
            baseUrl: "",
            newTag: "",

            image: "",
            imageVertical: "",
            title: "",
            slug: "",
            publishedAt: "",
            category: { name: "", value: "" },
            status: { name: "منتظر انتشار", value: "pending" },
            description: "",
            body: "",
            tags: [],
            metadata: {
                title: "",
                description: "",
            },
            inTextImageList: [],

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await Promise.all([this.getArticleGroups({ headers })]);
        await this.loadArticle({ headers }, route);
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
        async getArticleGroups(data = {}) {
            let url = `/api/admin/article-groups?pp=50`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    response.data.records.forEach((record) => {
                        this.groupsOptions[record._id] = { name: record.name, value: record._id, icon: record.icon };
                    });
                })
                .catch((e) => {});
        },

        async loadArticle(data = {}, route) {
            let url = `/api/admin/articles/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.image = response.data.image;
                    this.imageVertical = response.data.imageVertical;
                    this.title = response.data.title;
                    this.slug = response.data.slug;
                    this.publishedAt = JDate(response.data.publishedAt).locale("fa").format("yyyy-MM-DDThh:mm:ss");
                    this.status = this.statusOptions[response.data.status];
                    this.description = response.data.description;
                    this.body = response.data.body;
                    this.tags = response.data.tags || [];
                    this.category = this.groupsOptions[response.data.category] || { name: "", value: "" };
                    this.metadata.title = response.data.metadata.title;
                    this.metadata.description = response.data.metadata.description;
                    this.inTextImageList = response.data.inTextImageList;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async selectFile(vName) {
            this[vName] = this.$refs[`fileInput-${vName}`].files[0] ? URL.createObjectURL(this.$refs[`fileInput-${vName}`].files[0]) : "";
        },

        async deleteImage(vName) {
            this.$refs[`fileInput-${vName}`].files = undefined;
            this[vName] = "";
        },

        addTag(e, tag) {
            e.preventDefault();
            if (tag != "" && this.tags.indexOf(tag) > -1) {
                this.tags.splice(this.tags.indexOf(tag), 1);
                return;
            }
            if (e.keyCode == 13 && this.newTag != "") {
                if (this.tags.indexOf(this.newTag) > -1) this.tags.splice(this.tags.indexOf(this.newTag), 1);
                else this.tags.push(this.newTag);
                this.newTag = "";
            }
        },

        selectGroup(group) {
            this.category = { ...group };
        },
        unselectGroup() {
            this.category = { name: "", value: "" };
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            const formData = new FormData();
            if (this.$refs["fileInput-image"].files[0]) formData.append("files", this.$refs["fileInput-image"].files[0]);
            if (this.$refs["fileInput-imageVertical"].files[0]) formData.append("files", this.$refs["fileInput-imageVertical"].files[0]);
            formData.append("image", this.image);
            formData.append("imageVertical", this.imageVertical);
            formData.append("title", this.title);
            formData.append("slug", this.slug);
            formData.append("publishedAt", JDate(this.publishedAt).toISOString());
            formData.append("status", this.status.value);
            formData.append("description", this.description);
            formData.append("body", this.body);
            if (!!this.tags.length) formData.append("tags", JSON.stringify(this.tags));
            if (!!this.category.value) formData.append("category", this.category.value);
            formData.append("metadataTitle", this.metadata.title);
            formData.append("metadataDescription", this.metadata.description);
            formData.append("inTextImageList", JSON.stringify(this.inTextImageList));

            let url = encodeURI(`/api/admin/articles/${this.$route.params.id}`);
            await axios
                .put(url, formData)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "مطلب با موفقیت ویرایش شد" });
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
