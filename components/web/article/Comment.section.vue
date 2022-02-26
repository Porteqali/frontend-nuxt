<style scoped></style>

<template>
    <section class="flex flex-col gap-8 w-full max-w-screen-xl mx-auto mt-4">
        <div class="flex flex-col gap-10 my-4">
            <h4 class="font-bold text-4xl">نظرات کاربران</h4>
        </div>
        <div class="flex flex-col md:flex-row items-start gap-4 md:gap-8">
            <img class="rounded-full shadow-xl w-16 md:w-36 h-16 md:h-36" :src="user.info.image || `/misc/avatar.svg`" loading="lazy" alt="avatar" />
            <div class="flex flex-col items-end gap-4 w-full">
                <textarea
                    type="text"
                    v-model="commentText"
                    placeholder="دیدگاه خود را وارد کنید..."
                    class="p-6 w-full rounded-3xl shadow-xl resize-none"
                    rows="8"
                ></textarea>
                <span
                    class="p-2 rounded-lg"
                    :class="{ 'bg-red-100 text-red-800': messageType == 'error', 'bg-emerald-100 text-emerald-800': messageType == 'success' }"
                    v-if="!!message"
                >
                    {{ message }}
                </span>
                <button
                    class="orange_gradient_h flex items-center justify-center gap-2 py-3 px-8 w-max rounded-2xl hover:shadow-lg"
                    :class="{ 'opacity-50': sending }"
                    @click="sendComment($event)"
                >
                    <div class="flex items-center justify-center gap-2" v-if="!sending">
                        <span class="font-bold">ارسال پیام</span>
                        <img src="/icons/Send.svg" alt="Send" width="24" height="24" />
                    </div>
                    <Loading class="w-8 h-8" v-else />
                </button>
            </div>
        </div>
        <div class="flex flex-col items-start gap-8 md:gap-10">
            <Comment v-for="(comment, i) in comments" :key="i" :comment.sync="comments[i]" />
        </div>
        <button
            class="gray_gradient blur flex items-center gap-2 py-3 px-6 rounded-xl w-max"
            v-if="!commentsLoading && commentsPage <= commentsPageTotal"
            @click="getComments()"
        >
            <span>بارگذاری بیشتر</span>
        </button>
        <Loading class="w-10 h-10" v-if="commentsLoading" />
    </section>
</template>

<script>
import axios from "axios";
import Loading from "~/components/Loading";
import Comment from "~/components/web/Comment";

export default {
    name: "CommentSection",
    props: ["commentedOn"],
    components: {
        Loading,
        Comment,
    },
    data() {
        return {
            sending: false,

            commentText: "",
            message: "",
            messageType: "success",

            comments: this.comments || [],
            commentsPage: 1,
            commentsTotal: 0,
            commentsPageTotal: 1,
            commentsLoading: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        if (!!this.commentedOn) await this.getComments({ headers });
    },
    watch: {
        commentedOn(val) {
            this.comments = [];
            this.commentsPage = 1;
            this.commentsTotal = 0;
            this.commentsPageTotal = 1;
            this.getComments();
        },
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async getComments(data = {}) {
            if (this.commentsLoading || this.commentsPage > this.commentsPageTotal) return;
            this.commentsLoading = true;

            let url = `/api/comments`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.commentsPage}`, `type=article`, `commentedOn=${this.commentedOn}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    const newComments = results.data.records.map((comment) => {
                        return { ...comment, comments: [] };
                    });
                    this.comments = [...this.comments, ...newComments];

                    this.commentsPage = results.data.page + 1;
                    this.commentsTotal = results.data.total;
                    this.commentsPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.commentsLoading = false));
        },

        async sendComment(e) {
            e.preventDefault();
            if (this.sending) return;
            this.sending = true;

            this.message = "";

            await axios
                .post(`/api/comments/send`, {
                    text: this.commentText,
                    type: "article",
                    commentedOn: this.commentedOn,
                })
                .then(() => {
                    this.messageType = "success";
                    this.message = "نظر شما ثبت شد و پس از تایید منتشر میشود.";
                })
                .catch((e) => {
                    this.messageType = "error";
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (e.response.status == 401) this.message = "برای ارسال نظر ابتدا ثبت نام کنید یا وارد حساب کاربری خود شوید";
                        if (typeof e.response.data.message === "object") {
                            this.message = e.response.data.message[0].errors[0];
                        }
                    }
                })
                .finally(() => {
                    this.sending = false;
                });
        },
    },
};
</script>
