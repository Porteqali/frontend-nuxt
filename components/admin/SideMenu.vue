<style scoped>
.side_nav {
    position: absolute;
    width: 100%;
    max-width: 250px;
    min-height: calc(100vh - 6.5rem);
    background-color: #ffffffaa;
    color: #000;
    z-index: 20;
}
.side_nav ul {
    overflow: auto;
}

@media (min-width: 768px) {
    .side_nav {
        position: relative !important;
        min-height: calc(100vh - 7rem);
    }
}
</style>

<template>
    <transition name="slideleft" appear="">
        <nav class="side_nav blur flex items-start gap-6 p-4 rounded-3xl shadow-lg" v-show="sideMenuOpen">
            <ul class="flex flex-col gap-4 w-full h-full">
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/admin/Home.svg" width="24" alt="Home" />
                        <span>داشبورد</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/admin/ShieldDone.svg" width="24" alt="Admin" />
                        <span>مدیریت ادمین ها</span>
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </transition>
</template>

<script>
export default {
    computed: {
        sideMenuOpen() {
            return this.$store.state.admin_panel.sideMenuOpen;
        },
    },
    mounted() {
        console.log(screen.width);
        if (screen.width <= 768) {
            this.$store.commit("admin_panel/sideMenuToggle", false);
        } else this.$store.commit("admin_panel/sideMenuToggle", true);
    },
};
</script>
