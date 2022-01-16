<style scoped>
.side_nav {
    position: absolute;
    width: 100%;
    max-width: 280px;
    height: calc(100vh - 7rem);
    background-color: #ffffffbb;
    color: #000;
    z-index: 20;
}
.side_nav ul {
    overflow-y: auto;
    overflow-x: hidden;
}
.side_nav li:hover {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 10%);
    background-color: #fff;
}
.submenu {
    width: calc(100% - 1rem);
    border-right: 2px solid #aaa;
    padding-inline-start: 1rem;
    margin-inline-start: 1rem;
    overflow: initial !important;
}

@media (min-width: 768px) {
    .side_nav {
        position: relative !important;
        max-width: 250px;
    }
}
</style>

<template>
    <transition name="slideleft" appear="">
        <nav class="side_nav blur flex flex-col gap-4 p-2 rounded-3xl shadow-lg" v-show="sideMenuOpen">
            <ul class="flex flex-col gap-3 p-2 w-full h-full flex-grow" v-clickaway:sidenav_toggler="menuOnBlur">
                <li class="flex w-full p-1 rounded-lg">
                    <nuxt-link class="flex items-center gap-2 w-full" to="/admin">
                        <img src="/icons/admin/Home.svg" width="24" alt="Home" />
                        <span>داشبورد</span>
                    </nuxt-link>
                </li>

                <hr class="w-full" />

                <li
                    class="flex w-full p-1 rounded-lg cursor-pointer"
                    @click="openGroup('admins')"
                    v-if="$store.dispatch('admin_panel/checkPermissions', { permissionsToCheck: [], permissions: [], style: [] })"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/ShieldDone.svg" width="24" />
                        <span>مدیریت ادمین ها</span>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="20" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-2" v-show="openedGroup.includes('admins')" name="admins">
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/list">لیست ادمین ها</nuxt-link></li>
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/permissions">دسترسی ها</nuxt-link></li>
                    </ul>
                </transition>

                <li class="flex w-full p-1 rounded-lg cursor-pointer" @click="openGroup('marketers')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Users2.svg" width="24" />
                        <span>مدیریت بازاریابان</span>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="20" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-2" v-show="openedGroup.includes('marketers')" name="marketers">
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/list">لیست ادمین ها</nuxt-link></li>
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/permissions">دسترسی ها</nuxt-link></li>
                    </ul>
                </transition>

                <li class="flex w-full p-1 rounded-lg cursor-pointer" @click="openGroup('users')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Users3.svg" width="24" />
                        <span>مدیریت کاربران</span>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="20" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-2" v-show="openedGroup.includes('users')" name="users">
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users">لیست کاربران</nuxt-link></li>
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users-comments">نظرات کاربران</nuxt-link></li>
                    </ul>
                </transition>

                <li class="flex w-full p-1 rounded-lg">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/admin/Teacher.svg" width="24" />
                        <span>مدیریت اساتید</span>
                    </nuxt-link>
                </li>

                <li class="flex w-full p-1 rounded-lg">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/Wallet.gray.svg" width="24" />
                        <span>گروه کاربران</span>
                    </nuxt-link>
                </li>

                <hr class="w-full" />

                <li class="flex w-full p-1 rounded-lg cursor-pointer" @click="openGroup('courses')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Play.svg" width="24" />
                        <span>مدیریت دوره ها</span>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="20" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-2" v-show="openedGroup.includes('courses')" name="courses">
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users">لیست دوره ها</nuxt-link></li>
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users-comments">گروه دوره ها</nuxt-link></li>
                    </ul>
                </transition>

                <hr class="w-full" />

                <li class="flex w-full p-1 rounded-lg cursor-pointer" @click="openGroup('finance')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Document.svg" width="24" />
                        <span>مدیریت مالی</span>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="20" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-2" v-show="openedGroup.includes('finance')" name="finance">
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users">لیست تراکنش ها</nuxt-link></li>
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users-comments">کمیسیون ها</nuxt-link></li>
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users-comments">تخفیف ها</nuxt-link></li>
                    </ul>
                </transition>

                <li class="flex w-full p-1 rounded-lg cursor-pointer" @click="openGroup('invoices')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Discount.svg" width="24" />
                        <span>مدیریت سررسید ها</span>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="20" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-2" v-show="openedGroup.includes('invoices')" name="invoices">
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users">تنظیمات سررسید</nuxt-link></li>
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users-comments">لیست سررسید ها</nuxt-link></li>
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users-comments">پرداختی های سررسید</nuxt-link></li>
                    </ul>
                </transition>

                <hr class="w-full" />

                <li class="flex w-full p-1 rounded-lg">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/admin/HandShake.svg" width="24" />
                        <span>همکاری با ما</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full p-1 rounded-lg">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/admin/Calling.svg" width="24" />
                        <span>تماس با ما</span>
                    </nuxt-link>
                </li>

                <hr class="w-full" />

                <li class="flex w-full p-1 rounded-lg">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/admin/Blog.svg" width="24" />
                        <span>مقالات</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full p-1 rounded-lg">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/admin/Question.svg" width="24" />
                        <span>سوالات متداول</span>
                    </nuxt-link>
                </li>
                <li class="flex w-full p-1 rounded-lg">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/admin/Chat.svg" width="24" />
                        <span>نظرات نمایشی</span>
                    </nuxt-link>
                </li>

                <hr class="w-full" />

                <li class="flex w-full p-1 rounded-lg">
                    <nuxt-link class="flex items-center gap-2 w-full" to="#">
                        <img src="/icons/admin/InfoCircle.svg" width="24" />
                        <span>اطلاعات تماس</span>
                    </nuxt-link>
                </li>

                <li class="flex w-full p-1 rounded-lg cursor-pointer" @click="openGroup('pages')">
                    <div class="flex items-center gap-2 w-full">
                        <img src="/icons/admin/Discount.svg" width="24" />
                        <span>مدیریت صفحات</span>
                    </div>
                    <img class="mr-auto" src="/icons/ArrowDown.line.svg" width="20" />
                </li>
                <transition name="accordiondown" appear>
                    <ul class="submenu flex flex-col gap-2" v-show="openedGroup.includes('pages')" name="pages">
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users">درباره ما</nuxt-link></li>
                        <li class="p-1 px-2 rounded-lg"><nuxt-link class="w-full" to="/admin/users-comments">همکاری با ما</nuxt-link></li>
                    </ul>
                </transition>
            </ul>
            <button class="flex items-center gap-2 p-1 mb-2 w-full rounded-lg bg-red-100 hover:shadow-md">
                <img src="/icons/Logout.gray.svg" width="24" />
                <span class="text-rose-800">خروج</span>
            </button>
        </nav>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            openedGroup: "",
        };
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
    },
    methods: {
        menuOnBlur() {
            if (screen.width <= 768 && !!this.sideMenuOpen) this.$store.commit("admin_panel/sideMenuToggle", false);
        },

        openGroup(groupName) {
            if (this.openedGroup == groupName) this.openedGroup = "";
            else this.openedGroup = groupName;
        },

        checkPermissions(permissionsToCheck = [], style = "OR") {
            // TOOD
            // get users permissions
            return this.$store.dispatch("admin_panel/checkPermissions", { permissionsToCheck, permissions: [], style });
        },
    },
};
</script>
