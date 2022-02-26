<style scoped></style>

<template>
    <div class="flex flex-col items-start md:flex-row gap-4 md:gap-8 w-full">
        <img
            class="rounded-full shadow-xl w-16 md:w-36 h-16 md:h-36"
            loading="lazy"
            v-if="comment.author[0]"
            :src="comment.author[0].image || `/misc/avatar.svg`"
            :alt="`${comment.author[0].name} ${comment.author[0].family}`"
        />
        <div class="flex flex-col items-start gap-4 w-full">
            <div class="flex flex-col gap-2 w-full p-4 rounded-3xl shadow-xl bg-white">
                <b v-if="comment.author[0]">{{ `${comment.author[0].name} ${comment.author[0].family}` }}</b>
                <small>{{ comment.createdAt }}</small>
                <p class="p-3 my-2" v-if="comment.text">{{ comment.text }}</p>
                <button class="w-max text-indigo-400" @click="showReplies()" v-if="!!comment.comments.length || !firstRequestSent">
                    <small v-if="!showReply">نمایش پاسخ‌ها</small>
                    <small v-else>مخفی کردن پاسخ‌ها</small>
                </button>
            </div>
            <div class="flex flex-col items-start gap-4 w-full" v-show="showReply">
                <Comment
                    class="border-r-2 border-solid border-gray-300 pr-6 w-full"
                    v-for="subcomment in comment.comments"
                    :key="subcomment._id"
                    :comment="subcomment"
                />
                <button
                    class="gray_gradient blur flex items-center gap-2 py-3 px-6 rounded-3xl w-max"
                    v-if="!repliesLoading && repliesPage <= repliesPageTotal"
                    @click="getReplies()"
                >
                    <small>بارگذاری بیشتر</small>
                </button>
                <Loading class="w-10 h-10" v-if="repliesLoading" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Comment from "./Comment";

export default {
    name: "Comment",
    props: ["comment"],
    components: {
        Comment,
    },
    data() {
        return {
            showReply: false,
            firstRequestSent: false,

            replies: this.replies || [],
            repliesPage: 1,
            repliesTotal: 0,
            repliesPageTotal: 1,
            repliesLoading: false,
        };
    },
    methods: {
        async getReplies(data = {}) {
            if (this.repliesLoading || this.repliesPage > this.repliesPageTotal) return;
            this.repliesLoading = true;

            let url = `/api/comments/replies`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.repliesPage}`, `commentId=${this.comment._id}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    const newComments = results.data.records.map((comment) => {
                        return { ...comment, comments: [] };
                    });
                    this.replies = [...this.replies, ...newComments];

                    this.$emit("update:comment", { ...this.comment, comments: this.replies });

                    this.repliesPage = results.data.page + 1;
                    this.repliesTotal = results.data.total;
                    this.repliesPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.repliesLoading = false));
        },

        showReplies() {
            this.showReply = !this.showReply;
            if (!this.firstRequestSent) {
                this.getReplies();
                this.firstRequestSent = true;
            }
        },
    },
};
</script>
