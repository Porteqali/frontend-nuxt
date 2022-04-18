<style scoped></style>

<template>
    <section class="flex flex-wrap justify-between items-center gap-6 p-4 md:p-6 w-screen max-w-full">
        <label class="font-bold text-lg">لینک بازیابی شما:</label>
        <div class="flex items-center gap-2">
            <span class="text-lightblue-500 underline font-sans" dir="ltr">{{ `${baseUrl}/${code}` }}</span>
            <button class="orange_gradient_h flex items-center justify-center p-1 rounded-lg" title="کپی لینک" @click="copyLink()">
                <img src="/icons/Document.svg" width="20" alt="" />
            </button>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "MarketingLinkSection",
    components: {},
    data() {
        return {
            isDataLoading: false,
            baseUrl: "",
            code: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMarketingCode({ headers })]);
    },
    mounted() {
        this.baseUrl = window.location.origin;
    },
    methods: {
        async getMarketingCode(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/marketer-panel/dashboard/marketing-code`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(encodeURI(url), { headers })
                .then((response) => {
                    this.code = response.data.code;
                })
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));
        },

        async copyLink() {
            await navigator.clipboard.writeText(`${this.baseUrl}/${this.code}`);
            this.$store.dispatch("toast/makeToast", { type: "warning", title: "", message: "لینک کپی شد!" });
        },
    },
};
</script>
