<style scoped>
.side_nav {
    position: fixed;
    width: 100%;
    max-width: 280px;
    height: calc(100vh - 7rem);
    background-color: #292929;
    color: #ddd;
    z-index: 20;
}

.side_nav ul {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-color: #888 transparent !important;
    scrollbar-width: thin !important;
}
.side_nav ul::-webkit-scrollbar {
    width: 2px;
}

.side_nav li:hover > a,
.nuxt-link-active {
    /* box-shadow: 0px 8px 12px rgba(0, 0, 0, 10%); */
    background-color: #606060;
}

.menu_icon {
    /* background-color: #f1f1f1;
    padding: .15rem;
    border-radius: .25rem; */
    width: 1.5rem;
    height: 1.5rem;
    filter: invert(1);
}

.submenu {
    width: calc(100% - 1.25rem);
    border-right: 2px solid #aaa;
    padding-inline-start: 1rem;
    margin-inline-start: 1.25rem;
    overflow: initial !important;
}

@media (min-width: 768px) {
    .side_nav {
        /* position: relative !important; */
        position: sticky !important;
        top: 6rem;
    }
}
</style>

<template>
    <transition name="slideleft" appear="">
        <nav class="side_nav flex flex-col gap-4 p-2 rounded-2xl shadow-2xl" v-show="sideMenuOpen">
            <ul class="flex flex-col p-1 gap-1 w-full h-full flex-grow text-sm" v-clickaway:sidenav_toggler="menuOnBlur">
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/teacher-panel/dashboard">
                        <img src="/icons/admin/Home.svg" class="menu_icon" width="24" />
                        <span>داشبورد</span>
                    </nuxt-link>
                </li>

                <hr class="w-11/12 mx-auto my-1 border-gray-600" />

                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/teacher-panel/courses">
                        <img src="/icons/admin/Play.svg" class="menu_icon" width="24" />
                        <span>دوره ها</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/teacher-panel/comments">
                        <img src="/icons/admin/Chat.svg" class="menu_icon" width="24" />
                        <span>نظرات</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/teacher-panel/commissions">
                        <img src="/icons/admin/SackDollar.svg" class="menu_icon" width="24" />
                        <span>کمیسیون ها</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full" to="/teacher-panel/commission-payments">
                        <img src="/icons/admin/Receipt.svg" class="menu_icon" width="24" />
                        <span>پرداختی کمیسیون ها</span>
                    </nuxt-link>
                </li>
            </ul>
            <div class="flex flex-col p-1">
                <button class="flex items-center gap-2 p-2 w-full rounded-xl bg-rose-800" @click="$router.push('/')">
                    <img src="/icons/Logout.gray.svg" class="menu_icon" width="24" />
                    <span class="text-rose-200">خروج</span>
                </button>
            </div>
        </nav>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            openedGroup: "",

            collabRequestCount: 0,
            contactRequestCount: 0,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;
    },
    mounted() {
        if (screen.width <= 768) {
            this.$store.commit("admin_panel/sideMenuToggle", false);
        } else this.$store.commit("admin_panel/sideMenuToggle", true);
    },
    beforeDestroy() {
        this.$store.commit("admin_panel/sideMenuToggle", false);
    },
    computed: {
        sideMenuOpen() {
            return this.$store.state.admin_panel.sideMenuOpen;
        },
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        menuOnBlur() {
            if (screen.width <= 768 && !!this.sideMenuOpen) this.$store.commit("admin_panel/sideMenuToggle", false);
        },

        openGroup(groupName) {
            if (this.openedGroup == groupName) this.openedGroup = "";
            else this.openedGroup = groupName;
        },
    },
};
</script>
