<style scoped></style>

<template></template>

<script>
import axios from "axios";
export default {
    layout: "none",
    head() {
        return {
            title: "شارژ کیف پول - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    async mounted() {
        const method = this.$route.params.method;
        const query = this.$route.query;
        await this.callback(method, query);
    },
    methods: {
        async callback(method, query) {
            let url = `/payment-callback-handler/wallet-charge/${method}?`;
            for (const item in query) url += `${item}=${query[item]}&`;

            await axios
                .get(url)
                .then((response) => {
                    this.$router.push(response.data.link);
                    // window.location.href = response.data.link;
                })
                .catch((e) => {
                    this.$router.push("/");
                    // window.location.href = "/";
                });
        },
    },
};
</script>
