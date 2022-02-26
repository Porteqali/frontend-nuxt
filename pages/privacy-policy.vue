<style scoped>
#top {
    /* color: var(--top-h1-color); */
    font-weight: 900;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-2xl w-full mt-10 lg:mt-0">
        <!-- <Background src="/backgrounds/Background2.png" :topOffset="-30" :rightOffset="-10" :minWidth="2420" /> -->

        <section class="relative flex flex-wrap justify-evenly gap-8 lg:gap-20" id="top">
            <div class="flex flex-col gap-10 text-bluegray-900">
                <h1 class="flex flex-col gap-4 text-5xl lg:text-7xl">
                    <span class="kalameh_black font-bold">حریم خصوصی</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>حریم خصوصی</li>
                </ul>
            </div>
        </section>

        <article class="article_body w-full p-8 rounded-2xl max-w-screen-lg shadow-2xl z-10 bg-white">
            <div class="w-full h-full" v-html="htmlText"></div>
        </article>
    </main>
</template>

<script>
import axios from 'axios';
import getMetadata from "~/mixins/getMetadata";
import Background from "~/components/web/Background";

export default {
    scrollToTop: true,
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
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

        await Promise.all([this.getMetadata("privacy-policy"), this.getInfo({ headers })]);
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
