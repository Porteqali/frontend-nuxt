<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/faqs">سوالات متداول</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>سوال جدید</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>سوال</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="question" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>جواب</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <textarea type="text" v-model="answer" rows="5" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>گروه</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <Select :selectedOption.sync="group" :options="groupOptions">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
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
        return { title: "ایجاد سوال جدید - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,
            groupOptions: {
                education: { name: "آموزش", value: "education" },
                support: { name: "پشتیبانی", value: "support" },
                collab: { name: "همکاری", value: "collab" },
                wallet: { name: "کارت اعتباری", value: "wallet" },
            },
            statusOptions: {
                published: { name: "منتشر شده", value: "published" },
                pending: { name: "منتظر انتشار", value: "pending" },
            },

            question: "",
            answer: "",
            group: { name: "آموزش", value: "education" },
            status: { name: "منتشر شده", value: "published" },

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
        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            let url = encodeURI(`/api/admin/faqs`);
            await axios
                .post(url, {
                    question: this.question,
                    answer: this.answer,
                    group: this.group.value,
                    status: this.status.value,
                })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "سوال با موفقیت اضافه شد" });
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
