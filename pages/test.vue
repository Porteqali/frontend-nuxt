<style scoped></style>

<template>
    <div>etst</div>
</template>

<script>
export default {
    layout: "none",
    data() {
        return {};
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;
    },
    mounted() {
        console.log(1);
    },
    methods: {},
};
</script>
