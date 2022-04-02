<style scoped>
.board {
    border: 8px solid rgb(189, 189, 189);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full max-w-screen-lg flex-grow">
        <section class="board flex flex-col gap-2 shadow-xl bg-warmgray-600 text-white w-full p-4 md:p-6 rounded-3xl" v-if="!loading" id="active-roadmap">
            <h2 class="kalameh_bold title text-2xl text-white w-max max-w-full">نقشه راه</h2>
            <div class="relative orange_gradient_v flex items-center gap-2 rounded-2xl p-2">
                <img class="absolute lg:relative flex-shrink-0 w-full max-w-screen-2xs opacity-50 lg:opacity-100" src="/pages/departments/img.png" alt="start" />
                <div class="relative flex flex-col gap-2">
                    <h4 class="kalameh_bold text-xl text-gray-700">نقشه راه خودتو انتخاب کن</h4>
                    <p>نمیدونی از کجا باید شروع کنی؟ میتونی رو کمک ما حساب کنی!</p>
                    <nuxt-link
                        class="flex justify-center text-sm border-2 border-solid border-white rounded-2xl mt-4 p-2 px-4 w-max hover:bg-gray-100 hover:bg-opacity-20"
                        to="/where-to-start"
                    >
                        انتخاب نقشه راه
                    </nuxt-link>
                </div>
                <!-- TODO -->
            </div>
        </section>

        <section class="flex flex-col gap-2 shadow-xl bg-white w-full p-4 md:p-6 rounded-3xl" v-if="!loading" id="purchased-courses">
            <div class="flex items-center gap-2 mb-4">
                <img src="/icons/Play.gray.svg" width="32" height="32" alt="Play" />
                <h2 class="kalameh_bold title text-2xl">دوره های خریداری شده</h2>
            </div>
            <div class="flex flex-col">
                <p>در حال حاضر دوره ای خریداری نکرده اید!</p>
                <nuxt-link class="underline text-orange-600" to="/department">مشاهده دوره ها</nuxt-link>
            </div>
            <!-- TODO -->
        </section>

        <div class="flex flex-col items-center justify-center gap-4 shadow-xl bg-white p-6 w-full rounded-3xl" v-if="loading">
            <span>در حال بارگذاری اطلاعات...</span>
            <span class="skeleton w-full h-8 my-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-8/12 h-2"></span>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    head() {
        return {
            title: "حساب کاربری - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: {},
    data() {
        return {
            loading: true,
        };
    },
    mounted() {
        this.loading = false;
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {},
};
</script>
