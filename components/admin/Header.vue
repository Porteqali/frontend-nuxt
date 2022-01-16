<style scoped>
header {
    background-color: #ffffffbb;
    color: #000;
    height: 4rem;
    overflow: hidden;
}
</style>

<template>
    <header class="flex items-center justify-between gap-6 p-3 px-6 w-full max-w-screen-4xl rounded-3xl shadow-lg z-20">
        <div class="flex items-center gap-6">
            <button @click="sideMenuToggle()"><img class="sidenav_toggler" src="/icons/admin/Hamburger.svg" width="24" /></button>
            <img class="h-8 md:h-10" src="/logo_orange.png" alt="porteqal" />
        </div>
        <div class="flex items-center gap-4">
            <img src="/icons/admin/Notification.svg" width="24" />
            <div class="flex items-center gap-2">
                <img class="w-9 h-9 shadow-md object-cover rounded-full" :src="user.info.image" :alt="`${user.info.name} ${user.info.family}`" />
                <div class="hidden md:flex flex-col">
                    <strong class="text-sm">{{ `${user.info.name} ${user.info.family}` }}</strong>
                    <small class="text-xs">{{ user.info.email }}</small>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.$store.dispatch("user/getUserInfo", { headers }).catch((e) => {});
    },
    async mounted() {
        await this.$store.dispatch("user/refresh");
    },
    computed: {
        sideMenuOpen() {
            return this.$store.state.admin_panel.sideMenuOpen;
        },
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        sideMenuToggle() {
            this.$store.commit("admin_panel/sideMenuToggle", !this.sideMenuOpen);
        },
    },
};
</script>
