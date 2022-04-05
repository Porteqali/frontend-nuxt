<style scoped></style>

<template>
    <section class="relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl bg-white w-full max-w-screen-lg flex-grow">
        <div class="flex items-center gap-2">
            <img src="/icons/Chat.gray.svg" width="32" height="32" alt="Chat" />
            <h2 class="kalameh_bold title text-2xl">نظرات</h2>
        </div>
        <ul class="flex flex-col gap-4 w-full">
            <transition-group class="flex flex-col gap-4" name="slideleft" appear>
                <li class="flex flex-col items-start gap-4 p-4 rounded-2xl w-full shadow-lg bg-warmgray-50" v-for="comment in comments" :key="comment._id">
                    <div class="flex items-start gap-4 w-full" v-if="comment.item">
                        <img class="w-20 h-12 object-cover rounded-xl shadow-md flex-shrink-0" :src="comment.item.image" width="100" :alt="comment.item.name" />
                        <div class="flex flex-wrap items-start justify-between gap-2 w-full">
                            <div class="flex flex-col items-start gap-1">
                                <h4>{{ comment.item.name }}</h4>
                                <small class="bg-gray-300 text-bluegray-800 p-1 px-2 rounded-lg">{{ comment.item.type }}</small>
                            </div>
                            <span class="p-1 px-2 rounded-lg text-xs shadow-md bg-amber-200 text-amber-800" v-if="comment.status == 'waiting_for_review'">
                                در انتظار تایید
                            </span>
                            <span class="p-1 px-2 rounded-lg text-xs shadow-md bg-green-200 text-emerald-800" v-if="comment.status == 'active'">تایید شده</span>
                            <span class="p-1 px-2 rounded-lg text-xs shadow-md bg-rose-200 text-rose-800" v-if="comment.status == 'deactive'">رد شده</span>
                        </div>
                    </div>
                    <hr class="w-full opacity-50" />
                    <p class="opacity-75">{{ comment.text }}</p>
                    <hr class="w-full opacity-50" />
                    <button class="w-max text-amber-500" @click="showReplies(comment._id)">
                        <small class="text-xs" v-if="!comment.showReply">نمایش پاسخ‌ها</small>
                        <small class="text-xs" v-else>مخفی کردن پاسخ‌ها</small>
                    </button>
                    <div class="flex flex-col items-start gap-4 w-full" v-show="comment.showReply">
                        <Comment
                            class="border-r-2 border-solid border-gray-300 pr-6 w-full"
                            v-for="subcomment in comment.comments"
                            :key="subcomment._id"
                            :comment="subcomment"
                        />
                        <button
                            class="gray_gradient blur flex items-center gap-2 py-3 px-6 rounded-3xl w-max"
                            v-if="!comment.repliesLoading && comment.repliesPage <= comment.repliesPageTotal"
                            @click="getReplies(comment._id)"
                        >
                            <small>بارگذاری بیشتر</small>
                        </button>
                        <Loading class="w-10 h-10" v-if="comment.repliesLoading" />
                    </div>
                </li>
            </transition-group>
        </ul>
        <button class="gray_gradient p-3 px-4 w-max rounded-2xl" v-if="!commentsLoading && commentsPage <= commentsPageTotal" @click="getComments()">
            بارگذاری بیشتر
        </button>
        <Loading class="w-8 h-8" v-if="commentsLoading" />
    </section>
</template>

<script>
import axios from "axios";
import Comment from "~/components/web/Comment";
import Loading from "~/components/Loading.vue";

export default {
    head() {
        return {
            title: "نظرات ارسالی - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: {
        Loading,
        Comment,
    },
    data() {
        return {
            comments: {},
            commentsPage: 1,
            commentsTotal: 0,
            commentsPageTotal: 1,
            commentsLoading: false,

            // showReply: false,
            // replies: this.replies || [],
            // repliesPage: 1,
            // repliesTotal: 0,
            // repliesPageTotal: 1,
            // repliesLoading: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getComments({ headers })]);
    },
    methods: {
        async getComments(data = {}) {
            if (this.commentsLoading || this.commentsPage > this.commentsPageTotal) return;
            this.commentsLoading = true;

            let url = `/api/user-profile/comments`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.commentsPage}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    const newComments = {};
                    results.data.records.forEach((comment) => {
                        newComments[comment._id] = {
                            ...comment,
                            comments: [],
                            showReply: false,
                            replies: [],
                            repliesPage: 1,
                            repliesTotal: 0,
                            repliesPageTotal: 1,
                            repliesLoading: false,
                        };
                    });

                    this.comments = { ...this.comments, ...newComments };
                    this.commentsPage = results.data.page + 1;
                    this.commentsTotal = results.data.total;
                    this.commentsPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.commentsLoading = false));
        },

        async getReplies(commentId) {
            const comment = this.comments[commentId];

            if (comment.repliesLoading || comment.repliesPage > comment.repliesPageTotal) return;
            comment.repliesLoading = true;

            let url = `/api/comments/replies`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${comment.repliesPage}`, `commentId=${commentId}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    const newComments = results.data.records.map((comment) => {
                        return { ...comment, comments: [] };
                    });
                    comment.replies = [...comment.replies, ...newComments];
                    comment.repliesPage = results.data.page + 1;
                    comment.repliesTotal = results.data.total;
                    comment.repliesPageTotal = results.data.pageTotal;

                    this.comments[commentId].comments = comment.replies;
                })
                .catch((e) => {})
                .finally(() => (comment.repliesLoading = false));
        },

        showReplies(commentId) {
            const comment = this.comments[commentId];
            comment.showReply = !comment.showReply;
            if (!!comment.firstRequestSent) return;
            this.getReplies();
            comment.firstRequestSent = true;
        },
    },
};
</script>
