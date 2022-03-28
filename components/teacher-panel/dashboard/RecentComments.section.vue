<style scoped>
h3::after {
    content: "";
    position: absolute;
    left: 5%;
    bottom: -2px;
    display: inline-block;
    width: 80%;
    height: 1rem;
    background-color: #ffc8a2;
    z-index: 0;
}
.answer_btn {
    background-color: #92d0c9;
    color: #fff;
}
</style>

<template>
    <section class="flex flex-col gap-6 p-4 md:p-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <h3 class="relative text-2xl"><b class="relative z-10">آخرین نظرات ارسالی</b></h3>
            <nuxt-link class="hover:underline text-cyan-600 text-xs" to="/teacher-panel/comments">مشاهده ادامه نظرات</nuxt-link>
        </header>
        <ul class="flex flex-col gap-4">
            <li class="flex flex-wrap items-start gap-2 shadow-lg p-4 rounded-xl" v-for="(comment, i) in comments" :key="i">
                <img class="w-14 h-14 rounded-full object-cover shadow-md" :src="comment.user[0].image" v-if="comment.user[0].image" alt="" />
                <div class="flex flex-col gap-1 flex-grow">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="text-lg">{{ comment.fullname }}</span>
                        <small class="bg-gray-200 text-yellow-900 p-1 px-2 rounded-lg" v-if="comment.course[0]">{{ comment.course[0].name }}</small>
                    </div>
                    <p class="text-sm opacity-75">{{ comment.text.length > 60 ? comment.text.substr(0, 80) + "..." : comment.text }}</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <small class="text-xs text-left">{{ new Date(comment.createdAt).toLocaleString("fa") }}</small>
                    <nuxt-link class="answer_btn flex items-center gap-1 p-1 px-3 rounded-xl w-max shadow-md" :to="`/teacher-panel/comments/edit/${comment._id}`">
                        <img src="/icons/admin/Reply.svg" width="14" alt="" />
                        پاسخ
                    </nuxt-link>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "RecentCommentsSection",
    components: {},
    data() {
        return {
            isDataLoading: false,
            comments: [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getComments({ headers })]);
    },
    methods: {
        async getComments(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/teacher-panel/comments`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`pp=6`];
            url = encodeURI(`${url}?${params.join("&")}`);

            await axios
                .get(url, { headers })
                .then((response) => {
                    this.comments = response.data.records;
                })
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));
        },
    },
};
</script>
