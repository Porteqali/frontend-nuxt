<style scoped>
.cart_item {
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
</style>

<template>
    <section class="card relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl w-full max-w-screen-lg flex-grow">
        <div class="flex items-center gap-2">
            <img src="/icons/Chat.gray.svg" width="32" height="32" alt="Chat" />
            <h2 class="text-2xl">نظرات</h2>
        </div>
        <ul class="flex flex-col gap-4 w-full">
            <transition-group class="flex flex-col gap-4" name="slideleft" appear>
                <li class="cart_item flex flex-col items-start gap-4 p-4 rounded-2xl w-full shadow-lg" v-for="comment in comments" :key="comment._id">
                    <div class="flex items-start gap-4 w-full">
                        <img class="w-16 h-auto rounded-xl shadow-md flex-shrink-0" :src="comment.item.image" width="100" :alt="comment.item.name" />
                        <div class="flex flex-wrap items-start justify-between gap-2 w-full">
                            <div class="flex flex-col items-start gap-1">
                                <h4>{{ comment.item.name }}</h4>
                                <small class="bg-gray-300 text-bluegray-800 p-1 px-2 rounded-lg">{{ comment.item.type }}</small>
                            </div>
                            <span class="p-1 px-2 rounded-lg text-xs shadow-md bg-amber-200 text-amber-800" v-if="comment.status == 'waiting_for_review'">
                                در انتظار تایید
                            </span>
                            <span class="p-1 px-2 rounded-lg text-xs shadow-md bg-emerald-200 text-emerald-800" v-if="comment.status == 'active'">تایید شده</span>
                            <span class="p-1 px-2 rounded-lg text-xs shadow-md bg-rose-200 text-rose-800" v-if="comment.status == 'deactive'">رد شده</span>
                        </div>
                    </div>
                    <hr class="w-full opacity-50" />
                    <p class="opacity-75">{{ comment.text }}</p>
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
    },
    data() {
        return {
            comments: [],
            commentsPage: 1,
            commentsTotal: 0,
            commentsPageTotal: 1,
            commentsLoading: false,
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
                    this.comments = [...this.comments, ...results.data.records];
                    this.commentsPage = results.data.page + 1;
                    this.commentsTotal = results.data.total;
                    this.commentsPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.commentsLoading = false));
        },
    },
};
</script>
