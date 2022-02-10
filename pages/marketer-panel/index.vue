<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 p-4"></main>
</template>

<script>
export default {
    layout: "marketerPanel",
    mounted() {
        this.$router.push("/marketer-panel/dashboard");
    },
};
</script>
