<style scoped>
.header_nav_container {
    /* background-color: var(--header-nav-container-bg-color); */
    /* background-color: #fff; */
    max-height: initial;
    position: absolute;
    top: 7rem;
    right: 0;
    margin: auto 1rem;
    width: calc(100% - 2rem);
    z-index: 2;
}

.nav_toggle {
    /* background-color: var(--header-nav-container-bg-color); */
    background-color: #fff;
}
.nav_toggle.open {
    position: absolute;
    top: 1.5rem;
    left: 1rem;
}

.login_btn {
    background-color: var(--header-nav-container-bg-color);
    color: #fff;
    /* background-color: #fff; */
}

li.active {
    background-color: var(--header-nav-container-bg-color);
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 20%);
}

.backdrop {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 30%);
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

    .backdrop {
        display: none;
    }
}
</style>

<template>
    <div class="flex items-center gap-4 w-max lg:w-full" @mouseover="open = true" @mouseleave="open = false">
        <div class="backdrop" v-if="open" @click="open = false"></div>
        <button class="nav_toggle blur flex justify-center items-center p-6 rounded-3xl shadow-lg lg:hidden">
            <img src="/icons/Category.black.svg" width="24" loading="lazy" alt="Category" />
        </button>
        <transition name="slidedown" appear>
            <div
                class="header_nav_container menu flex flex-wrap items-start md:items-center gap-1 lg:gap-8 px-4 lg:px-8 py-0 rounded-3xl shadow-lg lg:shadow-none bg-white lg:bg-transparent"
                v-show="calcMenuOpenState()"
            >
                <nav>
                    <ul class="flex flex-wrap md:flex-nowrap items-center gap-6 xl:gap-8 py-4 md:p-0 text-lg">
                        <li
                            class="flex items-center gap-1 md:py-2 md:my-2 cursor-pointer rounded-2xl"
                            :class="{ active: departmentsDropdownOpenState, 'p-2 px-4 m-2': departmentsDropdownOpenState }"
                            @mouseover="departmentsDropdownOpenState = true"
                            @mouseleave="departmentsDropdownOpenState = false"
                        >
                            <img src="/icons/Category.black.svg" width="24" alt="Category" />
                            <span :class="{ 'text-white': departmentsDropdownOpenState }">دپارتمان ها</span>
                            <DepartmentDropdown class="z-10" :open.sync="departmentsDropdownOpenState" />
                        </li>
                        <li class="flex items-center gap-1 md:py-4" @click="open = false">
                            <nuxt-link title="blog" to="/blog">وبلاگ</nuxt-link>
                        </li>
                        <li class="flex items-center gap-1 md:py-4" @click="open = false">
                            <nuxt-link title="contact-us" to="/contact-us">تماس با ما</nuxt-link>
                        </li>
                        <li class="flex items-center gap-1 md:py-4" @click="open = false">
                            <nuxt-link title="about-us" to="/about-us">درباره ما</nuxt-link>
                        </li>
                        <li class="flex items-center gap-1 md:py-4" @click="open = false">
                            <nuxt-link title="where-to-start" to="/where-to-start">از کجا شروع کنم؟</nuxt-link>
                        </li>
                    </ul>
                </nav>
                <ul class="icon_buttons flex items-center gap-2 flex-shrink-0 mr-auto ml-0">
                    <li
                        class="p-2 m-2 rounded-xl"
                        :class="{ active: searchDropdownOpenState }"
                        @mouseover="searchDropdownOpenState = true"
                        @mouseleave="searchDropdownOpenState = false"
                    >
                        <img :src="searchDropdownOpenState ? `/icons/Search.svg` : `/icons/Search.black.svg`" width="28" height="28" alt="Search" />
                        <SearchDropdown class="z-10" :open.sync="searchDropdownOpenState" />
                    </li>
                    <li
                        class="p-2 m-2 rounded-xl"
                        :class="{ active: cartDropdownOpenState }"
                        @mouseover="cartDropdownOpenState = true"
                        @mouseleave="cartDropdownOpenState = false"
                    >
                        <span
                            class="absolute mt-8 mr-1 flex items-center justify-center w-5 h-5 text-sm p-1 pt-2 rounded-md bg-orange-500 text-white"
                            v-show="Object.keys(cart.list).length"
                        >
                            {{ Object.keys(cart.list).length }}
                        </span>
                        <img :src="cartDropdownOpenState ? `/icons/Buy.svg` : `/icons/Buy.black.svg`" width="28" height="28" alt="Buy" />
                        <CartDropdown class="z-10" :open.sync="cartDropdownOpenState" />
                    </li>
                    <li class="" v-if="!user.info.email && !user.info.mobile && !loading">
                        <button class="login_btn rounded-2xl p-2 px-4 shadow-md hover:shadow-xl" @click="openLogin()">ورود | ثبت نام</button>
                    </li>
                    <li
                        class="p-2 m-2 rounded-xl"
                        :class="{ active: profileDropdownOpenState }"
                        @mouseover="profileDropdownOpenState = true"
                        @mouseleave="profileDropdownOpenState = false"
                        v-if="(!!user.info.email || !!user.info.mobile) && !loading"
                    >
                        <img :src="profileDropdownOpenState ? `/icons/Profile.svg` : `/icons/Profile.black.svg`" width="28" height="28" alt="Profile" />
                        <ProfileDropdown class="z-10" :open.sync="profileDropdownOpenState" />
                    </li>
                    <li class="p-4" v-if="loading">
                        <Loading class="w-6 h-6" />
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
import Loading from "~/components/Loading.vue";

export default {
    components: {
        DepartmentDropdown,
        SearchDropdown,
        CartDropdown,
        ProfileDropdown,
        Login,
        Register,
        Loading,
    },
    data() {
        return {
            loading: true,
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
        await this.$store.dispatch("user/refresh").finally(() => (this.loading = false));
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

        calcMenuOpenState() {
            if (typeof window === "undefined") return false;
            if (window.outerWidth <= 1024) return this.open;
            else return true;
        },
    },
};
</script>
