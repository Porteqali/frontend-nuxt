<style scoped>
.active {
    background-color: #4e4e4e;
    border: 3px solid #a0a0a0;
}
.active > span {
    color: #fff;
}
</style>

<template>
    <main role="main" class="flex flex-wrap lg:flex-nowrap items-start justify-center gap-8 max-w-screen-2xl w-full mt-24 md:mt-24 px-4 md:px-8">
        <nav class="relative flex flex-col gap-4 p-6 rounded-3xl shadow-xl bg-white w-full md:max-w-xs flex-grow z-10 overflow-hidden">
            <div class="flex items-center gap-2">
                <img class="w-12 h-12 rounded-2xl object-cover" :src="user.info.image" :alt="`${user.info.name} ${user.info.family}`" />
                <div class="flex flex-col gap-1">
                    <h4 class="font-bold">{{ `${user.info.name} ${user.info.family}` }}</h4>
                    <small class="opacity-75">{{ user.info.email ? user.info.email : user.info.mobile }}</small>
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-1">
                    <img src="/icons/Wallet.svg" width="24" height="24" alt="Wallet" />
                    <p class="text-xs">موجودی کیف پول</p>
                </div>
                <b class="flex items-center gap-1">
                    <span class="text-orange-400">{{ new Intl.NumberFormat("fa").format(user.info.wallet) }}</span>
                    <small class="opacity-70 text-xs">تومان</small>
                </b>
            </div>
            <hr />
            <ul class="flex flex-col gap-4 w-full">
                <li class="w-full">
                    <nuxt-link class="flex items-center gap-2 p-2 rounded-xl w-full hover:shadow-md" :class="{ active: $route.name == 'profile' }" to="/profile">
                        <Icon class="w-6 h-6" :class="[$route.name == 'profile' ? 'bg-gray-100' : 'bg-gray-700']" size="24px" folder="icons/new" name="Home" />
                        <span>داشبورد</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-2 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-info' }"
                        to="/profile/info"
                    >
                        <Icon
                            class="w-6 h-6"
                            :class="[$route.name == 'profile-info' ? 'bg-gray-100' : 'bg-gray-700']"
                            size="24px"
                            folder="icons/new"
                            name="Profile"
                        />
                        <span>اطلاعات حساب</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-2 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-roadmaps' }"
                        to="/profile/roadmaps"
                    >
                        <Icon
                            class="w-6 h-6"
                            :class="[$route.name == 'profile-roadmaps' ? 'bg-gray-100' : 'bg-gray-700']"
                            size="24px"
                            folder="icons/new"
                            name="Location"
                        />
                        <span>آرشیو نقشه های راه</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-2 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-courses' }"
                        to="/profile/courses"
                    >
                        <Icon
                            class="w-6 h-6"
                            :class="[$route.name == 'profile-courses' ? 'bg-gray-100' : 'bg-gray-700']"
                            size="24px"
                            folder="icons/new"
                            name="Play"
                        />
                        <span>دوره های خریداری شده</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-2 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-transactions' }"
                        to="/profile/transactions"
                    >
                        <Icon
                            class="w-6 h-6"
                            :class="[$route.name == 'profile-transactions' ? 'bg-gray-100' : 'bg-gray-700']"
                            size="24px"
                            folder="icons/new"
                            name="Document"
                        />
                        <span>تراکنش های مالی</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-2 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-wallet' }"
                        to="/profile/wallet"
                    >
                        <Icon
                            class="w-6 h-6"
                            :class="[$route.name == 'profile-wallet' ? 'bg-gray-100' : 'bg-gray-700']"
                            size="24px"
                            folder="icons/new"
                            name="Wallet"
                        />
                        <span>شارژ کیف پول</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-2 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-comments' }"
                        to="/profile/comments"
                    >
                        <Icon
                            class="w-6 h-6"
                            :class="[$route.name == 'profile-comments' ? 'bg-gray-100' : 'bg-gray-700']"
                            size="24px"
                            folder="icons/new"
                            name="Chat"
                        />
                        <span>نظرات</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <button class="flex items-center gap-2 p-2 rounded-xl w-full hover:shadow-md" @click="logout()">
                        <Icon class="w-6 h-6 bg-rose-900" size="24px" folder="icons/new" name="Logout" />
                        <span>خروج</span>
                    </button>
                </li>
            </ul>
            <img class="absolute -z-1 w-64 -left-8 -bottom-4 opacity-50" src="/misc/path.svg" alt="path" />
        </nav>
        <NuxtChild nuxt-child-key="profile" />
    </main>
</template>

<script>
import axios from "axios";

export default {
    async middleware({ store, req, redirect }) {
        let headers = {};
        if (process.server) headers = req.headers;

        const user = store.state.user;
        // check if user is filled in store or not -> if not get the info
        if (!user.info.email && !user.info.mobile) await store.dispatch("user/getUserInfo", { headers }).catch((e) => {});
        // check if user is logged in or not -> if not redirect to home page
        if (!user.info.email && !user.info.mobile) return redirect("/");
    },
    data() {
        return {};
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async logout() {
            await axios.post(`/auth/logout`).catch((e) => {});
            await this.$store.dispatch("user/logout");
            this.$router.push("/");
        },
    },
};
</script>
