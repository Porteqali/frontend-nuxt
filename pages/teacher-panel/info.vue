<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>اطلاعات تکمیلی استاد</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-4 w-full">
                        <div class="flex flex-col gap-2 w-full">
                            <label class="text-sm">لینک توییتر</label>
                            <div class="flex items-center gap-1 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                                <Icon class="w-8 h-8 bg-lightblue-400" size="28px" folder="social" name="twitter" />
                                <input type="text" v-model="socials.twitter.link" dir="auto" class="w-full bg-coolgray-100" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="text-sm">لینک اینستاگرام</label>
                            <div class="flex items-center gap-1 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                                <Icon class="w-8 h-8 bg-rose-400" size="28px" folder="social" name="instagram" />
                                <input type="text" v-model="socials.instagram.link" dir="auto" class="w-full bg-coolgray-100" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="text-sm">لینک واتساپ</label>
                            <div class="flex items-center gap-1 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                                <Icon class="w-8 h-8 bg-green-600" size="28px" folder="social" name="whatsapp" />
                                <input type="text" v-model="socials.whatsapp.link" dir="auto" class="w-full bg-coolgray-100" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4 w-full">
                        <div class="flex flex-col gap-2 w-full">
                            <label class="text-sm">لینک لینکدین</label>
                            <div class="flex items-center gap-1 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                                <Icon class="w-8 h-8 bg-blue-500" size="28px" folder="social" name="linkedin" />
                                <input type="text" v-model="socials.linkedin.link" dir="auto" class="w-full bg-coolgray-100" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="text-sm">لینک تلگرام</label>
                            <div class="flex items-center gap-1 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                                <Icon class="w-8 h-8 bg-lightblue-400" size="28px" folder="social" name="telegram" />
                                <input type="text" v-model="socials.telegram.link" dir="auto" class="w-full bg-coolgray-100" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="text-sm">لینک گیت هاب</label>
                            <div class="flex items-center gap-1 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                                <Icon class="w-8 h-8 bg-black" size="28px" folder="social" name="github" />
                                <input type="text" v-model="socials.github.link" dir="auto" class="w-full bg-coolgray-100" />
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>متن توضیحات</span>
                    </label>
                    <textarea v-model="description" rows="12" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
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
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";

export default {
    layout: "teacherPanel",
    head() {
        return { title: "ویرایش اطلاعات تکمیلی - گروه آموزشی پرتقال" };
    },
    data() {
        return {
            loading: false,
            saving: false,

            description: "",
            socials: this.socials || {
                twitter: { name: "twitter", link: "" },
                instagram: { name: "instagram", link: "" },
                whatsapp: { name: "whatsapp", link: "" },
                linkedin: { name: "linkedin", link: "" },
                telegram: { name: "telegram", link: "" },
                github: { name: "github", link: "" },
            },

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
            let url = `/api/teacher-panel/info`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.description = response.data.user.description;
                    response.data.user.socials.forEach((item) => (this.socials[item.name] = item));
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

            const socials = [];
            for (const key in this.socials) {
                if (this.socials[key].link != "") socials.push(this.socials[key]);
            }

            let url = encodeURI(`/api/teacher-panel/info`);
            await axios
                .put(url, { description: this.description, socials })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "اطلاعات با موفقیت ویرایش شد" });
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
