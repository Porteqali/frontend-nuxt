<style scoped>
.card {
    background-color: #ffffff77;
}

.active {
    background-color: #80839088;
}
.active > span {
    color: #fff;
}
</style>

<template>
    <main role="main" class="flex flex-wrap lg:flex-nowrap items-start justify-center gap-8 max-w-screen-4xl w-full">
        <nav class="card sticky top-0 flex flex-col gap-4 p-6 rounded-3xl shadow-xl w-full md:max-w-xs flex-grow">
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
                    <span class="text-orange-400">0</span>
                    <small class="opacity-70 text-xs">تومان</small>
                </b>
            </div>
            <hr />
            <ul class="flex flex-col gap-4 w-full">
                <li class="w-full">
                    <nuxt-link class="flex items-center gap-2 p-1 rounded-xl w-full hover:shadow-md" :class="{ active: $route.name == 'profile' }" to="/profile">
                        <img src="/icons/Profile.gray.svg" alt="Profile" />
                        <span>اطلاعات حساب</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-1 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-courses' }"
                        to="/profile/courses"
                    >
                        <img src="/icons/Play.gray.svg" alt="Play" />
                        <span>دوره های خریداری شده</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-1 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-transactions' }"
                        to="#"
                    >
                        <img src="/icons/Document.gray.svg" alt="Document" />
                        <span>تراکنش های مالی</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-1 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-wallet' }"
                        to="/profile/wallet"
                    >
                        <img src="/icons/Wallet.gray.svg" alt="Wallet" />
                        <span>شارژ کیف پول</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link
                        class="flex items-center gap-2 p-1 rounded-xl w-full hover:shadow-md"
                        :class="{ active: $route.name == 'profile-comments' }"
                        to="/profile/comments"
                    >
                        <img src="/icons/Chat.gray.svg" alt="Chat" />
                        <span>نظرات</span>
                    </nuxt-link>
                </li>
                <li class="w-full">
                    <nuxt-link class="flex items-center gap-2 p-1 rounded-xl w-full hover:shadow-md" to="#">
                        <img src="/icons/Logout.gray.svg" alt="Logout" />
                        <span>خروج</span>
                    </nuxt-link>
                </li>
            </ul>
        </nav>
        <NuxtChild nuxt-child-key="profile" />
    </main>
</template>

<script>
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
};
</script>
