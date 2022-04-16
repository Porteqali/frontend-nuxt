<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/teacher-panel/comments">نظرات کاربران</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>مشاهده و ویرایش نظر</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <div class="flex items-center gap-2" v-if="commentedOn == 'course'">
                    <img class="w-20 h-20 rounded-xl shadow-md object-cover" :src="on.image" v-if="on.image" alt="" />
                    <div class="flex flex-col gap-2">
                        <span>{{ on.name }}</span>
                        <small class="p-1 px-2 bg-bluegray-200 rounded-lg text-xs w-max">دوره</small>
                    </div>
                </div>
                <div class="flex items-center gap-2" v-if="commentedOn == 'article'">
                    <img class="w-20 h-20 rounded-xl shadow-md object-cover" :src="on.image" v-if="on.image" alt="" />
                    <div class="flex flex-col gap-2">
                        <span>{{ on.title }}</span>
                        <small class="p-1 px-2 bg-warmgray-200 rounded-lg text-xs w-max">مقاله</small>
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <img class="w-12 h-12 rounded-full object-cover" :src="user.image" v-if="user.image" alt="" />
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">{{ `${user.name} ${user.family}` }}</label>
                        <textarea
                            type="text"
                            v-model="comment"
                            dir="auto"
                            class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                            rows="6"
                        ></textarea>
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
                    ویرایش دیدگاه
                </button>
            </div>
        </section>
        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">پاسخ شما</label>
                    <textarea type="text" v-model="answer" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" rows="4"></textarea>
                </div>
                <hr class="w-full" />
                <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="answerErrorMsg">
                    <img src="/icons/admin/Danger.svg" width="20" />
                    <span>{{ answerErrorMsg }}</span>
                </small>
                <div class="flex flex-wrap items-center gap-4">
                    <button
                        class="orange_gradient_h p-4 py-2 rounded-xl"
                        :class="{ 'opacity-75 cursor-wait': answering }"
                        :disabled="answering"
                        @click="submitReply()"
                    >
                        تایید و ثبت
                    </button>
                    <button class="border-2 border-gray-500 hover:bg-gray-200 p-4 py-1.5 rounded-xl" @click="$router.back()">بازگشت</button>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "teacherPanel",
    head() {
        return { title: "مشاهده نظر - گروه آموزشی پرتقال" };
    },
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
                waiting_for_review: { name: "درحال بررسی", value: "waiting_for_review" },
            },

            user: this.user || {},
            commentedOn: this.commentedOn || {},
            on: this.on || {},
            comment: this.comment || "",
            status: this.status || { name: "فعال", value: "active" },

            answering: false,
            answer: "",

            replies: this.replies || [],
            repliesPage: 1,
            repliesTotal: 0,
            repliesPageTotal: 1,
            loadingReplies: false,

            errorMsg: "",
            errorTag: "",
            answerErrorMsg: "",
            answerErrorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.loadComment({ headers }, route);
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async loadComment(data = {}, route) {
            let url = `/api/teacher-panel/comments/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.user = response.data.user;
                    this.commentedOn = response.data.commentedOn;
                    this.on = response.data.on;
                    this.comment = response.data.text;
                    this.status = this.statusOptions[response.data.status];
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

            let url = encodeURI(`/api/teacher-panel/comments/${this.$route.params.id}`);
            await axios
                .put(url, {
                    comment: this.comment,
                    status: this.status.value,
                })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "دیدگاه با موفقیت ویرایش شد" });
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

        async submitReply() {
            if (this.answering) return;
            this.answering = true;

            this.answerErrorMsg = this.answerErrorTag = "";

            let url = encodeURI(`/api/teacher-panel/comments/${this.$route.params.id}/reply`);
            await axios
                .post(url, { comment: this.answer })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "پاسخ شما ثبت شد" });
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                        this.answerErrorMsg = e.response.data.message[0].errors[0];
                        this.answerErrorTag = e.response.data.message[0].property;
                    }
                })
                .finally(() => {
                    this.answering = false;
                });
        },
    },
};
</script>
