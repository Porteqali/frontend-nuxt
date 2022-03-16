<style scoped>
.header_nav_container {
    max-height: initial;
    position: absolute;
    top: 7rem;
    right: 0;
    margin: auto 1rem;
    width: calc(100% - 2rem);
    z-index: 2;
}

.nav_toggle {
    background-color: #fff;
}
.nav_toggle.open {
    position: absolute;
    top: 1.5rem;
    left: 1rem;
}

li.active,
nav li:hover {
    color: #fff;
    background-color: #625e59;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 20%);
    padding: 0.5rem;
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
        <button class="nav_toggle flex justify-center items-center p-4 rounded-2xl shadow-lg lg:hidden">
            <img src="/icons/Category.black.svg" width="24" loading="lazy" alt="Category" />
        </button>
        <transition name="slidedown" appear>
            <div
                class="header_nav_container menu flex flex-wrap items-start md:items-center gap-1 lg:gap-8 py-0 rounded-3xl shadow-lg lg:shadow-none bg-white lg:bg-transparent"
                v-show="calcMenuOpenState()"
            >
                <nav>
                    <ul class="flex flex-wrap md:flex-nowrap items-center gap-6 xl:gap-8 py-4 md:p-0">
                        <li
                            class="flex items-center gap-1 md:py-2 md:my-2 cursor-pointer rounded-xl"
                            :class="{ active: departmentsDropdownOpenState, 'p-2 pl-4 m-2': departmentsDropdownOpenState }"
                            @mouseover="departmentsDropdownOpenState = true"
                            @mouseleave="departmentsDropdownOpenState = false"
                        >
                            <Icon
                                class="w-6 h-6"
                                :class="[departmentsDropdownOpenState ? 'bg-gray-100' : 'bg-gray-700']"
                                size="24px"
                                folder="icons/new"
                                name="ArrowDown2"
                            />
                            <span :class="{ 'text-white': departmentsDropdownOpenState }">دپارتمان ها</span>
                            <DepartmentDropdown class="z-10" :open.sync="departmentsDropdownOpenState" />
                        </li>
                        <li class="flex items-center gap-1 md:py-2 md:my-2 rounded-xl" @click="open = false">
                            <nuxt-link title="blog" to="/blog">وبلاگ</nuxt-link>
                        </li>
                        <li class="flex items-center gap-1 md:py-2 md:my-2 rounded-xl" @click="open = false">
                            <nuxt-link title="contact-us" to="/contact-us">تماس با ما</nuxt-link>
                        </li>
                        <li class="flex items-center gap-1 md:py-2 md:my-2 rounded-xl" @click="open = false">
                            <nuxt-link title="about-us" to="/about-us">درباره ما</nuxt-link>
                        </li>
                        <li class="flex items-center gap-1 md:py-2 md:my-2 rounded-xl" @click="open = false">
                            <nuxt-link title="where-to-start" to="/where-to-start">از کجا شروع کنم؟</nuxt-link>
                        </li>
                    </ul>
                </nav>
                <ul class="icon_buttons flex items-center gap-2 flex-shrink-0 mr-auto ml-0">
                    <li
                        class="p-2 my-2 rounded-xl bg-warmgray-200"
                        :class="{ active: searchDropdownOpenState }"
                        @mouseover="searchDropdownOpenState = true"
                        @mouseleave="searchDropdownOpenState = false"
                    >
                        <Icon class="w-7 h-7" :class="[searchDropdownOpenState ? 'bg-gray-100' : 'bg-gray-700']" size="28px" folder="icons/new" name="Search" />
                        <SearchDropdown class="z-10" :open.sync="searchDropdownOpenState" />
                    </li>
                    <li
                        class="p-2 my-2 rounded-xl bg-warmgray-200"
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
                        <Icon class="w-7 h-7" :class="[cartDropdownOpenState ? 'bg-gray-100' : 'bg-gray-700']" size="28px" folder="icons/new" name="Buy" />
                        <CartDropdown class="z-10" :open.sync="cartDropdownOpenState" />
                    </li>
                    <li class="px-2" v-if="!user.info.email && !user.info.mobile && !loading">
                        <button class="flex items-center gap-2 bg-warmgray-200 rounded-2xl p-1 hover:shadow-xl" @click="openLogin()">
                            <span class="text-warmgray-800 px-2 pr-4">ورود</span>
                            <span class="bg-warmgray-600 text-white p-2 px-4 rounded-2xl">ثبت نام</span>
                        </button>
                    </li>
                    <li
                        class="p-2 my-2 rounded-xl bg-warmgray-200"
                        :class="{ active: profileDropdownOpenState }"
                        @mouseover="profileDropdownOpenState = true"
                        @mouseleave="profileDropdownOpenState = false"
                        v-if="(!!user.info.email || !!user.info.mobile) && !loading"
                    >
                        <Icon class="w-7 h-7" :class="[profileDropdownOpenState ? 'bg-gray-100' : 'bg-gray-700']" size="28px" folder="icons/new" name="Profile" />
                        <ProfileDropdown class="z-10" :open.sync="profileDropdownOpenState" />
                    </li>
                    <li class="p-2 my-2 rounded-xl bg-warmgray-200" v-if="loading">
                        <Loading class="w-8 h-8" />
                    </li>
                </ul>
            </div>
        </transition>

        <Login :open.sync="loginOpenState" @register:open="openRegister()" @forgetPass:open="openForgetPass()" />
        <Register :open.sync="registerOpenState" @login:open="openLogin()" />
        <ForgetPassword :open.sync="forgetPassOpenState" @login:open="openLogin()" />
    </div>
</template>

<script>
import Icon from "~/components/Icon.vue";
import DepartmentDropdown from "~/components/web/header2/DepartmentDropdown";
import SearchDropdown from "~/components/web/header/SearchDropdown";
import CartDropdown from "~/components/web/header2/CartDropdown";
import ProfileDropdown from "~/components/web/header/ProfileDropdown";
import Login from "~/components/auth/Login";
import Register from "~/components/auth/Register";
import Loading from "~/components/Loading.vue";
import ForgetPassword from "~/components/auth/ForgetPassword.vue";

export default {
    components: {
        Icon,
        DepartmentDropdown,
        SearchDropdown,
        CartDropdown,
        ProfileDropdown,
        Login,
        Register,
        Loading,
        ForgetPassword,
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
            forgetPassOpenState: false,
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
            this.forgetPassOpenState = false;
        },
        openLogin() {
            this.loginOpenState = true;
            this.registerOpenState = false;
            this.forgetPassOpenState = false;
        },
        openForgetPass() {
            this.loginOpenState = false;
            this.registerOpenState = false;
            this.forgetPassOpenState = true;
        },

        calcMenuOpenState() {
            // if (typeof window === "undefined") return false;
            // if (window.outerWidth <= 1024) return this.open;
            // else return true;
            return false
        },
    },
};
</script>
