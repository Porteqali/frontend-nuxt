<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>اطلاعات تماس</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>شماره تلفن</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="tel" class="p-3 w-full h-14 rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>پست اکترونیک</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="email" class="p-3 w-full h-14 rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>کدپستی</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="post_code" class="p-3 w-full h-14 rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>آدرس</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="address" class="p-3 w-full h-14 rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <hr class="w-full" />
                <div class="flex flex-col gap-2 w-full" v-for="(social, socialName) in socials" :key="socialName">
                    <label class="text-sm">
                        <span>{{ socialName }}</span>
                    </label>
                    <input type="text" v-model="socials[socialName]" class="p-3 w-full h-14 rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <hr class="w-full" />
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4" v-if="checkPermissions(['admin.contact-info.edit'], userPermissions)">
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
        return { title: "ویرایش اطلاعات تماس - گروه آموزشی پرتقال" };
    },
    mixins: [permissionCheck],
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,

            tel: "",
            email: "",
            post_code: "",
            address: "",
            socials: {
                instagram: "",
                telegram: "",
            },

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
            let url = `/api/admin/contact-info`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.tel = response.data.tel;
                    this.email = response.data.email;
                    this.post_code = response.data.post_code;
                    this.address = response.data.address;
                    this.socials = response.data.socials;
                })
                .catch((e) => {
                    console.log(e);
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

            let url = encodeURI(`/api/admin/contact-info`);
            await axios
                .put(url, {
                    tel: this.tel,
                    email: this.email,
                    post_code: this.post_code,
                    address: this.address,
                    socials: this.socials,
                })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "اطلاعات تماس با موفقیت ویرایش شد" });
                })
                .catch((e) => {
                    console.log(e);
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
