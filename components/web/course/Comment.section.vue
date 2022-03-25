<style scoped>
.toggle_comment {
    --color-bg: #fff;
    background: linear-gradient(var(--color-bg), var(--color-bg)) padding-box, linear-gradient(273.67deg, #ff8537 -20.26%, #ff51b1 114.54%) border-box;
    border: 2px solid transparent;
    transition: all 0.1s;
}
.toggle_comment:hover {
    background: linear-gradient(273.67deg, #ff8537 -20.26%, #ff51b1 114.54%);
    color: #fff;
}

.comment_box {
    border: 2px solid #777;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 25%);
}
</style>

<template>
    <section class="flex flex-col gap-8 w-full mx-auto mt-4">
        <div class="flex flex-wrap items-center justify-between gap-4 w-full">
            <div class="flex items-center gap-2">
                <Icon class="w-7 h-7 bg-gray-700" size="28px" folder="icons/new" name="Chat" />
                <h3 class="kalameh_bold title text-2xl md:text-3xl w-max max-w-full">پرسش و پاسخ</h3>
            </div>
            <button class="toggle_comment flex items-center gap-1 p-2 px-3 rounded-2xl" @click="commentBoxOpen = !commentBoxOpen">
                <Icon class="w-5 h-5 bg-gray-600" size="20px" folder="icons/new" name="EditSquare" />
                <span>ثبت دیدگاه</span>
            </button>
        </div>

        <div class="flex flex-col items-start gap-4" v-if="commentBoxOpen">
            <div class="flex items-center gap-2">
                <img class="rounded-full shadow-xl w-16 h-16 object-cover" :src="user.info.image || `/misc/avatar.svg`" loading="lazy" alt="avatar" />
                <div class="flex flex-col">
                    <span>{{ `${user.info.name} ${user.info.family}` }}</span>
                    <small class="opacity-75">{{ user.info.email }}</small>
                </div>
            </div>
            <div class="comment_box flex flex-col items-end gap-4 w-full rounded-2xl p-4">
                <textarea type="text" v-model="commentText" placeholder="دیدگاه خود را وارد کنید..." class="w-full resize-none" rows="5"></textarea>
                <span
                    class="p-2 rounded-xl text-xs"
                    :class="{ 'bg-red-100 text-red-800': messageType == 'error', 'bg-emerald-100 text-emerald-800': messageType == 'success' }"
                    v-if="!!message"
                >
                    {{ message }}
                </span>
                <button
                    class="orange_gradient_h flex items-center justify-center gap-2 p-2 px-4 w-max rounded-xl hover:shadow-lg"
                    :class="{ 'opacity-50': sending }"
                    @click="sendComment($event)"
                >
                    <div class="flex items-center justify-center gap-2" v-if="!sending">
                        <span class="">ارسال</span>
                        <Icon class="w-5 h-5 bg-gray-100" size="20px" folder="icons/new" name="Send" />
                    </div>
                    <Loading class="w-8 h-8" v-else />
                </button>
            </div>
        </div>

        <div class="flex flex-col items-start gap-8 md:gap-10">
            <Comment v-for="(comment, i) in comments" :key="i" :comment.sync="comments[i]" />
        </div>
        <button
            class="gray_gradient flex items-center gap-2 py-3 px-6 rounded-xl w-max"
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
            commentBoxOpen: false,

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

            let params = [`page=${this.commentsPage}`, `type=course`, `commentedOn=${this.commentedOn}`];
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
                    type: "course",
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
