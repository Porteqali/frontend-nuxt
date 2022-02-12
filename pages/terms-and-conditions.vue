<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <!-- <Background src="/backgrounds/Background2.png" :topOffset="-30" :rightOffset="-10" :minWidth="2420" /> -->

        <section class="relative flex flex-wrap justify-evenly gap-8 lg:gap-20" id="top">
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col gap-4 text-7xl">
                    <span class="kalameh_bold font-bold">قوانین و مقررات</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>قوانین و مقررات</li>
                </ul>
            </div>
        </section>

        <article class="article_body w-full p-8 mt-20 rounded-2xl max-w-screen-lg shadow-2xl z-10 bg-white">
            <div class="w-full h-full" v-html="htmlText"></div>
        </article>
    </main>
</template>

<script>
import axios from 'axios';
import Background from "~/components/web/Background";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: "قوانین و مقررات - گروه آموزشی پرتقال", meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: {
        Background,
    },
    data() {
        return {
            loading: false,
            htmlText: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMetadata("terms-and-conditions"), this.getInfo({ headers })]);
    },
    mounted() {},
    methods: {
        async getInfo(data = {}) {
            if (this.loading) return;
            this.loading = true;

            let url = `/api/static-pages/privacy_policy`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.htmlText = results.data.text || ""))
                .catch((e) => {})
                .finally(() => (this.loading = false));
        },
    },
};
</script>
