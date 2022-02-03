<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 p-4"></main>
</template>

<script>
export default {
    layout: "admin",
    mounted() {
        this.$router.push("/admin/dashboard");
    },
};
</script>
