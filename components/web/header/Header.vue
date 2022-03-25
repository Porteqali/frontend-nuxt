<style scoped>
header {
    background-color: #fafafa;
    color: #333;
}

.active {
    color: #fff;
    background-color: #625e59;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 20%);
    padding: 0.5rem;
}
</style>

<template>
    <div class="fixed top-0 flex items-center justify-center py-2 w-screen shadow-xl z-20 bg-truegray-50">
        <header class="flex items-center gap-4 lg:gap-2 py-2 lg:py-0 px-4 md:px-8 w-full max-w-screen-2xl">
            <button class="flex justify-center items-center p-2.5 rounded-xl bg-white shadow-lg lg:hidden" @click="toggleMenu()">
                <Icon class="w-5 h-5 bg-gray-800" size="20px" folder="icons/new" name="Category" />
            </button>
            <nuxt-link title="پرتقال" to="/" class="flex-shrink-0">
                <img class="h-8" src="/logo_mark.svg" alt="پرتقال" />
            </nuxt-link>

            <Menu class="lg:mr-2" />

            <div class="flex items-center mr-auto flex-shrink-0">
                <div
                    class="flex items-center gap-2 bg-warmgray-200 rounded-xl md:rounded-2xl p-1 hover:shadow-xl"
                    v-if="!user.info.email && !user.info.mobile && !loading"
                >
                    <button class="text-warmgray-800 px-2 pr-4 text-xs md:text-base" @click="openLogin()">ورود</button>
                    <button class="bg-warmgray-600 text-white p-2 px-4 text-xs md:text-base rounded-xl md:rounded-2xl" @click="openRegister()">ثبت نام</button>
                </div>
                <div
                    class="p-2 rounded-xl bg-warmgray-200 relative"
                    :class="{ active: profileDropdownOpenState }"
                    @mouseover="profileDropdownOpenState = true"
                    @mouseleave="profileDropdownOpenState = false"
                    v-if="(!!user.info.email || !!user.info.mobile) && !loading"
                >
                    <Icon
                        class="w-6 md:w-7 h-6 md:h-7"
                        :class="[profileDropdownOpenState ? 'bg-gray-100' : 'bg-gray-700']"
                        size="28px"
                        folder="icons/new"
                        name="Profile"
                    />
                    <ProfileDropdown class="z-10" :open.sync="profileDropdownOpenState" />
                </div>
                <div class="p-2 rounded-xl bg-warmgray-200" v-if="loading">
                    <Loading class="w-6 md:w-8 h-6 md:h-8" />
                </div>
            </div>
        </header>

        <Login :open.sync="loginOpenState" @register:open="openRegister()" @forgetPass:open="openForgetPass()" />
        <Register :open.sync="registerOpenState" @login:open="openLogin()" />
        <ForgetPassword :open.sync="forgetPassOpenState" @login:open="openLogin()" />
    </div>
</template>

<script>
import Icon from "~/components/Icon.vue";
import Login from "~/components/auth/Login";
import Register from "~/components/auth/Register";
import Loading from "~/components/Loading.vue";
import ForgetPassword from "~/components/auth/ForgetPassword.vue";
import ProfileDropdown from "~/components/web/header/ProfileDropdown";
import Menu from "./Menu.vue";

export default {
    components: {
        Icon,
        Login,
        Register,
        Loading,
        ForgetPassword,
        ProfileDropdown,
        Menu,
    },
    data() {
        return {
            loading: true,

            profileDropdownOpenState: false,
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

        // load back cart list info
        let cartList = localStorage.getItem("cart");
        if (cartList) {
            try {
                cartList = JSON.parse(cartList);
                for (const item in cartList) this.$store.dispatch("cart/addItemToCart", { item: { ...cartList[item] } });
            } catch (e) {}
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        sideMenuOpen() {
            return this.$store.state.menu.sideMenuOpen;
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

        toggleMenu() {
            this.$store.commit("menu/sideMenuToggle", !this.sideMenuOpen);
        },
    },
};
</script>
