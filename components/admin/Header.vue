<style scoped>
header {
    background-color: #ffffffaa;
    color: #000;
    min-height: 3rem;
}
</style>

<template>
    <header class="flex items-center justify-between gap-6 p-3 w-full max-w-screen-4xl rounded-3xl shadow-lg z-20">
        <div class="flex items-center gap-6">
            <button class="mr-4" @click="sideMenuToggle()"><img src="/icons/admin/Hamburger.svg" width="24" /></button>
            <img class="h-8 md:h-10" src="/logo_orange.png" alt="porteqal" />
        </div>
        <div class="flex items-center gap-4"></div>
    </header>
</template>

<script>
export default {
    computed: {
        sideMenuOpen() {
            return this.$store.state.admin_panel.sideMenuOpen;
        },
    },
    methods: {
        sideMenuToggle() {
            this.$store.commit("admin_panel/sideMenuToggle", !this.sideMenuOpen);
        },
    },
};
</script>
