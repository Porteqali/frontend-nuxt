<style scoped>
.background {
    background: linear-gradient(263deg, #ffa825 9.9%, rgba(255, 112, 215, 0.55) 100%);
    height: 24rem;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 w-full mb-16">
        <div class="background relative flex shadow-xl w-full mt-16 py-10">
            <img class="absolute left-28 top-0 h-full w-auto object-contain" src="/misc/start2.png" alt="where-to-start" />
            <img class="absolute right-40 -bottom-16" src="/misc/ship.png" alt="ship" />
            <section class="relative flex flex-col items-start gap-8 md:gap-16 w-full max-w-screen-xl px-4 md:px-8 mx-auto">
                <div class="flex flex-col gap-4 w-full max-w-2xl rounded-2xl shadow-xl bg-white p-4 md:p-6">
                    <h1 class="kalameh_bold title text-2xl md:text-3xl w-full max-w-max">دوست داری تو چه حوزه ای کار کنی؟</h1>
                    <p>اینجا میتونی حوزه ای که میخوای رو انتخاب کنی و ما زیرشاخه هاشو بهت نشون بدیم و تو مسیر یادگیریش همراهیت کنیم.</p>
                    <p>اینجوری خیلی سریع تر به هدف دلخواهت میرسی!</p>
                </div>
                <div class="flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl rounded-2xl shadow-xl bg-white p-4 md:p-6 md:mr-14">
                    <p class="flex-grow">اگر تو انتخابت شک داری یا نمیدونی کدوم حوزه برات بهتره، با یه پرسش و پاسخ ساده به جوابت میرسی ;(</p>
                    <nuxt-link class="orange_gradient_h p-4 px-6 rounded-2xl shadow-lg w-max flex-shrink-0" to="/ask-me">شروع پرسش و پاسخ</nuxt-link>
                </div>
            </section>
        </div>

        <section class="flex flex-col w-full max-w-screen-2xl px-4 md:px-8 mt-10">
            <ul class="flex flex-wrap items-center justify-center gap-16 w-full">
                <li class="flex flex-col items-start gap-2 w-full max-w-xs" v-for="(major, i) in majors" :key="i">
                    <img :src="major.image" :alt="major.title" />
                    <h3 class="kalameh_bold text-xl md:text-2xl w-max">{{ major.title }}</h3>
                    <p class="text-sm">{{ major.short }}</p>
                    <nuxt-link
                        class="flex items-center gap-1 rounded-2xl p-2 px-4 w-max border-2 border-solid border-gray-700 bg-white hover:bg-amber-500 hover:text-white"
                        :to="`/major/${major.slug}`"
                    >
                        <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Filter" />
                        <span>زیر شاخه ها</span>
                    </nuxt-link>
                </li>
            </ul>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import getMetadata from "~/mixins/getMetadata";
import Icon from "~/components/Icon.vue";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: { Icon },
    data() {
        return {
            majors: this.majors || [
                {
                    image: "/pages/where-to-start/film.png",
                    title: "فیلم و سینما",
                    short: "اینجا میتونی حوزه ای که میخوای رو انتخاب کنی و ما زیرشاخه هاشو بهت نشون بدیم و تو مسیر یادگیریش همراهیت کنیم",
                    slug: "film",
                },
                {
                    image: "/pages/where-to-start/pc.png",
                    title: "برنامه نویسی",
                    short: "اینجا میتونی حوزه ای که میخوای رو انتخاب کنی و ما زیرشاخه هاشو بهت نشون بدیم و تو مسیر یادگیریش همراهیت کنیم",
                    slug: "pc",
                },
                {
                    image: "/pages/where-to-start/graphic.png",
                    title: "طراحی و گرافیک",
                    short: "اینجا میتونی حوزه ای که میخوای رو انتخاب کنی و ما زیرشاخه هاشو بهت نشون بدیم و تو مسیر یادگیریش همراهیت کنیم",
                    slug: "graphic",
                },
                {
                    image: "/pages/where-to-start/security.png",
                    title: "امنیت و شبکه",
                    short: "اینجا میتونی حوزه ای که میخوای رو انتخاب کنی و ما زیرشاخه هاشو بهت نشون بدیم و تو مسیر یادگیریش همراهیت کنیم",
                    slug: "security",
                },
            ],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([
            this.getMetadata("where-to-start"),
            // this.getMajors({ headers })
        ]);
    },
    methods: {
        async getMajors(data = {}) {
            if (this.majorsLoading) return;
            this.majorsLoading = true;

            let url = `/api/majors`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.majors = results.data.records;
                })
                .catch((e) => {})
                .finally(() => (this.majorsLoading = false));
        },
    },
};
</script>
