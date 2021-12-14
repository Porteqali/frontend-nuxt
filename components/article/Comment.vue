<style scoped></style>

<template>
    <div class="flex flex-col items-start md:flex-row gap-4 md:gap-8">
        <img
            class="rounded-full shadow-xl w-16 md:w-36 h-16 md:h-36"
            v-if="comment.author[0]"
            :src="comment.author[0].image || `/misc/avatar.svg`"
            :alt="`${comment.author[0].name} ${comment.author[0].family}`"
        />
        <div class="flex flex-col items-start gap-4 w-full">
            <div class="flex flex-col gap-2 w-full p-4 rounded-xl shadow-xl bg-white">
                <b v-if="comment.author[0]">{{ `${comment.author[0].name} ${comment.author[0].family}` }}</b>
                <small>{{ comment.date }}</small>
                <p class="p-3 my-2" v-if="comment.text">{{ comment.text }}</p>
                <button class="w-max text-indigo-400" @click="showReply = !showReply" v-if="!!comment.comments.length">
                    <span v-if="!showReply">نمایش پاسخ‌ها</span>
                    <span v-else>مخفی کردن پاسخ‌ها</span>
                </button>
            </div>
            <Comment
                class="border-r-2 border-solid border-gray-300 pr-6 md:pr-2 w-full"
                v-show="showReply"
                v-for="subcomment in comment.comments"
                :key="subcomment._id"
                :comment="subcomment"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
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
        };
    },
};
</script>
