<style scoped>
.img {
    transform: rotateY(180deg);
    right: 0;
    top: 15%;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-2xl w-full px-4 md:px-8 mt-24 md:mt-28">
        <img class="img absolute -z-1" src="/misc/path.svg" />
        <section class="relative flex flex-wrap justify-evenly gap-8 lg:gap-20">
            <div class="flex flex-col gap-2 text-bluegray-900">
                <h1 class="kalameh_bold title text-3xl lg:text-4xl">قوانین و مقررات</h1>
                <p class="kalameh_bold opacity-75">شرایط و قوانین استفاده از وبسایت پرتقال</p>
            </div>
        </section>

        <article class="article_body w-full p-8 rounded-2xl max-w-screen-lg shadow-2xl z-10 bg-white mb-24">
            <div class="w-full h-full" v-html="htmlText"></div>
        </article>
    </main>
</template>

<script>
import axios from "axios";
import Background from "~/components/web/Background";
import getMetadata from "~/mixins/getMetadata";

export default {
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

        await Promise.all([this.getMetadata("terms-and-conditions"), this.getInfo({ headers })]);
    },
    mounted() {},
    methods: {
        async getInfo(data = {}) {
            if (this.loading) return;
            this.loading = true;

            let url = `/api/static-pages/terms_and_conditions`;
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
