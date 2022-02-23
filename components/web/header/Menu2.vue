<style scoped>
.header_nav_container {
    background-color: #fff;
    max-height: initial;
    position: absolute;
    top: 7rem;
    right: 0;
    margin: auto 1rem;
    width: calc(100% - 2rem);
    color: #333;
}

.nav_toggle {
    background-color: #fff;
}

.login_btn {
    background-color: #fff;
}

@media (min-width: 1024px) {
    .menu {
        display: flex !important;
    }
    .header_nav_container {
        max-height: 4em;
        position: relative;
        top: initial;
        right: initial;
        margin: auto;
        width: 100%;
    }
}
</style>

<template>
    <div class="flex items-center gap-4 w-max lg:w-full">
        <button class="nav_toggle blur flex justify-center items-center p-6 rounded-3xl shadow-lg lg:hidden" @click="open = !open">
            <img src="/icons/Category.black.svg" width="20" loading="lazy" alt="Category" />
        </button>
        <transition name="slidedown" appear>
            <div class="header_nav_container menu blur flex flex-wrap items-start md:items-center gap-1 lg:gap-8 p-8 py-0 rounded-3xl shadow-lg" v-show="open">
                <nav>
                    <ul class="flex flex-wrap md:flex-nowrap items-center gap-6 xl:gap-8 py-4 md:p-0">
                        <li
                            class="flex items-center gap-1 md:py-4 cursor-pointer"
                            @mouseover="departmentsDropdownOpenState = true"
                            @mouseleave="departmentsDropdownOpenState = false"
                        >
                            <img src="/icons/Category.black.svg" width="20" alt="Category" />
                            <span>دپارتمان ها</span>
                            <DepartmentDropdown class="z-10" :open.sync="departmentsDropdownOpenState" />
                        </li>
                        <li class="flex items-center gap-1 md:py-4">
                            <nuxt-link title="blog" to="/blog">وبلاگ</nuxt-link>
                        </li>
                        <li class="flex items-center gap-1 md:py-4">
                            <nuxt-link title="contact-us" to="/contact-us">تماس با ما</nuxt-link>
                        </li>
                        <li class="flex items-center gap-1 md:py-4">
                            <nuxt-link title="about-us" to="/about-us">درباره ما</nuxt-link>
                        </li>
                        <li class="flex items-center gap-1 md:py-4">
                            <nuxt-link title="where-to-start" to="/where-to-start">از کجا شروع کنم؟</nuxt-link>
                        </li>
                    </ul>
                </nav>
                <ul class="flex items-center gap-2 xl:gap-4 flex-shrink-0 mr-auto ml-0">
                    <li class="p-4 px-2" @mouseover="searchDropdownOpenState = true" @mouseleave="searchDropdownOpenState = false">
                        <img src="/icons/Search.black.svg" width="28" height="28" alt="Search" />
                        <SearchDropdown class="z-10" :open.sync="searchDropdownOpenState" />
                    </li>
                    <li class="p-4 px-2" @mouseover="cartDropdownOpenState = true" @mouseleave="cartDropdownOpenState = false">
                        <span
                            class="absolute mt-8 mr-1 flex items-center justify-center w-5 h-5 text-sm p-1 pt-2 rounded-md bg-orange-500 text-white"
                            v-show="Object.keys(cart.list).length"
                        >
                            {{ Object.keys(cart.list).length }}
                        </span>
                        <img src="/icons/Buy.black.svg" width="28" height="28" alt="Buy" />
                        <CartDropdown class="z-10" :open.sync="cartDropdownOpenState" />
                    </li>
                    <li class="-ml-6" v-if="!user.info.email && !user.info.mobile">
                        <button class="login_btn rounded-2xl p-2 px-4 shadow-md hover:shadow-xl" @click="openLogin()">ورود | ثبت نام</button>
                    </li>
                    <li class="p-4 px-2" @mouseover="profileDropdownOpenState = true" @mouseleave="profileDropdownOpenState = false" v-else>
                        <img src="/icons/Profile.black.svg" width="28" height="28" alt="Profile" />
                        <ProfileDropdown class="z-10" :open.sync="profileDropdownOpenState" />
                    </li>
                </ul>
            </div>
        </transition>

        <Login :open.sync="loginOpenState" @register:open="openRegister()" />
        <Register :open.sync="registerOpenState" @login:open="openLogin()" />
    </div>
</template>

<script>
import DepartmentDropdown from "~/components/web/header/DepartmentDropdown";
import SearchDropdown from "~/components/web/header/SearchDropdown";
import CartDropdown from "~/components/web/header/CartDropdown";
import ProfileDropdown from "~/components/web/header/ProfileDropdown";
import Login from "~/components/auth/Login";
import Register from "~/components/auth/Register";

export default {
    components: {
        DepartmentDropdown,
        SearchDropdown,
        CartDropdown,
        ProfileDropdown,
        Login,
        Register,
    },
    data() {
        return {
            open: false,

            departmentsDropdownOpenState: false,
            cartDropdownOpenState: false,
            profileDropdownOpenState: false,
            searchDropdownOpenState: false,

            loginOpenState: false,
            registerOpenState: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.$store.dispatch("user/getUserInfo", { headers }).catch((e) => {});
    },
    async mounted() {
        // await this.$store.dispatch("user/getUserInfo").catch((e) => {});
        await this.$store.dispatch("user/refresh");
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        cart() {
            return this.$store.state.cart;
        },
    },
    methods: {
        openRegister() {
            this.loginOpenState = false;
            this.registerOpenState = true;
        },
        openLogin() {
            this.loginOpenState = true;
            this.registerOpenState = false;
        },
    },
};
</script>
