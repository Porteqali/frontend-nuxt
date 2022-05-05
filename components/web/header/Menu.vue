<style scoped>
.menu {
    max-height: initial;
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: calc(100% - 2rem);
    max-width: 18rem;
    z-index: 2;
    border-radius: 1rem 0 0 1rem;
}
.backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 30%);
}

li.active,
nav li:hover,
.nuxt-link-active li {
    color: #fff;
    background-color: #625e59;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 20%);
    padding: 0.5rem;
}

@media (min-width: 1024px) {
    .menu {
        display: flex !important;
        max-height: 4em;
        position: relative;
        top: initial;
        right: initial;
        width: 100%;
        max-width: initial;
    }

    .backdrop {
        display: none;
    }
}
</style>

<template>
    <div class="flex items-center gap-4 w-max lg:w-full" @mouseover="open = true" @mouseleave="open = false">
        <div class="backdrop" v-if="!!sideMenuOpen" @click="toggleMenu()"></div>
        <transition name="slideleft" appear>
            <div
                class="menu flex flex-wrap flex-col-reverse lg:flex-row items-start lg:items-center justify-end gap-4 lg:gap-8 p-4 lg:p-0 shadow-lg lg:shadow-none bg-white lg:bg-transparent"
                v-show="!!sideMenuOpen"
            >
                <div class="flex w-full mt-auto h-52 bg-warmgray-600 border-8 border-solid border-gray-300 rounded-3xl lg:hidden"></div>
                <nav>
                    <ul class="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
                        <li
                            class="flex items-center gap-1 md:py-2 md:my-2 cursor-pointer rounded-xl"
                            :class="{
                                active: departmentsDropdownOpenState || ($nuxt.$route.matched[0] && $nuxt.$route.matched[0].path == '/department'),
                                'p-2 pl-4 m-2': departmentsDropdownOpenState,
                            }"
                            @mouseover="departmentsDropdownOpenState = true"
                            @mouseleave="departmentsDropdownOpenState = false"
                        >
                            <Icon
                                class="w-6 h-6"
                                :class="[
                                    departmentsDropdownOpenState || ($nuxt.$route.matched[0] && $nuxt.$route.matched[0].path == '/department')
                                        ? 'bg-gray-100'
                                        : 'bg-gray-700',
                                ]"
                                size="24px"
                                folder="icons/new"
                                name="ArrowDown2"
                            />
                            <span :class="{ 'text-white': departmentsDropdownOpenState }">دپارتمان ها</span>
                            <DepartmentDropdown class="z-10" :open.sync="departmentsDropdownOpenState" />
                        </li>
                        <nuxt-link title="blog" to="/blog" @click="toggleMenu(false)">
                            <li class="flex items-center gap-1 md:py-2 md:my-2 rounded-xl">وبلاگ</li>
                        </nuxt-link>
                        <!-- <nuxt-link title="contact-us" to="/contact-us" @click="toggleMenu(false)">
                            <li class="flex items-center gap-1 md:py-2 md:my-2 rounded-xl">تماس با ما</li>
                        </nuxt-link> -->
                        <nuxt-link title="faqs" to="/faqs" @click="toggleMenu(false)">
                            <li class="flex items-center gap-1 md:py-2 md:my-2 rounded-xl">سوالات متداول</li>
                        </nuxt-link>
                        <nuxt-link title="about-us" to="/about-us" @click="toggleMenu(false)">
                            <li class="flex items-center gap-1 md:py-2 md:my-2 rounded-xl">درباره ما</li>
                        </nuxt-link>
                        <nuxt-link title="where-to-start" to="/where-to-start" @click="toggleMenu(false)">
                            <li class="flex items-center gap-1 md:py-2 md:my-2 rounded-xl">از کجا شروع کنم؟</li>
                        </nuxt-link>
                    </ul>
                </nav>
                <hr class="w-full border-b-2 border-t-0 border-warmgray-500 opacity-50 flex lg:hidden" />
                <ul class="flex items-center gap-2 flex-shrink-0 mr-auto ml-0 w-full lg:w-auto">
                    <div class="flex items-center gap-2 lg:hidden ml-auto">
                        <button class="flex justify-center items-center p-1.5 rounded-xl bg-white shadow-lg" @click="toggleMenu(false)">
                            <Icon class="w-5 h-5 bg-gray-800" size="20px" folder="icons" name="Cancel" />
                        </button>
                        <nuxt-link title="پرتقال" to="/">
                            <img class="h-8" src="/logo_mark.svg" alt="پرتقال" />
                        </nuxt-link>
                    </div>
                    <li class="p-2 my-2 rounded-xl bg-warmgray-200 cursor-pointer hover:shadow-xl" @click="searchDropdownOpenState = true" title="جستجو">
                        <Icon class="w-7 h-7 bg-gray-700" size="28px" folder="icons/new" name="Search" />
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
                </ul>
            </div>
        </transition>

        <SearchDropdown class="z-10" :open.sync="searchDropdownOpenState" />
    </div>
</template>

<script>
import Icon from "~/components/Icon.vue";
import DepartmentDropdown from "~/components/web/header/DepartmentDropdown";
import SearchDropdown from "~/components/web/header/SearchDropdown";
import CartDropdown from "~/components/web/header/CartDropdown";

export default {
    components: {
        Icon,
        DepartmentDropdown,
        SearchDropdown,
        CartDropdown,
    },
    data() {
        return {
            loading: true,
            open: false,

            departmentsDropdownOpenState: false,
            cartDropdownOpenState: false,
            searchDropdownOpenState: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.$store.dispatch("user/getUserInfo", { headers }).catch((e) => {});
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        sideMenuOpen() {
            return this.$store.state.menu.sideMenuOpen;
        },
    },
    methods: {
        toggleMenu(state) {
            if (state != null && state != undefined) this.$store.commit("menu/sideMenuToggle", !!state);
            else this.$store.commit("menu/sideMenuToggle", !this.sideMenuOpen);
        },
    },
};
</script>
