<style scoped>
header {
    background-color: #ffffffbb;
    color: #000;
    height: 4rem;
    /* overflow: hidden; */

    position: sticky;
    top: 1rem;
    z-index: 25;
}
</style>

<template>
    <header class="blur flex items-center justify-between gap-6 p-3 px-6 w-full max-w-screen-4xl rounded-2xl shadow-lg z-20">
        <div class="flex items-center gap-6">
            <button @click="sideMenuToggle()"><img class="sidenav_toggler" src="/icons/admin/Hamburger.svg" width="24" /></button>
            <nuxt-link class="" to="/"><img class="h-8 md:h-10" src="/logo_orange.png" alt="porteqal" /></nuxt-link>
        </div>
        <div class="flex items-center gap-4">
            <img class="cursor-pointer" src="/icons/admin/Notification.svg" width="24" @click="notificationOpen = !notificationOpen" />
            <i class="absolute w-2.5 h-2.5 top-5 rounded-full bg-orange-600" v-if="!!notifications.length"></i>
            <transition name="slidedown" appear="">
                <div class="absolute w-full max-w-xs max-h-96 p-4 rounded-2xl bg-white shadow-lg top-20 left-0" v-if="notificationOpen">
                    <ul class="flex flex-col gap-2" v-if="notifications.length">
                        <li class="flex flex-col gap-2" v-for="(item, i) in notifications" :key="i">
                            <nuxt-link class="flex items-start gap-2 w-full" :to="item.link">
                                <img class="p-2 shadow-lg rounded-full bg-warmgray-50 flex-shrink-0 w-10" :src="item.icon" width="32" alt="" />
                                <div class="flex flex-col gap-1">
                                    <strong>{{ item.title }}</strong>
                                    <p class="text-sm w-full max-w-xs" v-if="item.text">
                                        {{ item.text.length > 60 ? item.text.substr(0, 60) + "..." : item.text }}
                                    </p>
                                </div>
                            </nuxt-link>
                            <hr class="w-full" />
                        </li>
                    </ul>
                    <div class="flex flex-col items-center justify-center gap-4" v-else>
                        <img class="w-28" src="/misc/CheckBoard.png" style="filter: grayscale(0.6)" />
                        <b class="text-lg">اعلانیه ای وجود ندارد</b>
                    </div>
                </div>
            </transition>
            <div class="flex items-center gap-2">
                <img class="w-9 h-9 shadow-md object-cover rounded-full" :src="user.info.image" :alt="`${user.info.name} ${user.info.family}`" />
                <div class="hidden md:flex flex-col">
                    <strong class="text-sm">{{ `${user.info.name} ${user.info.family}` }}</strong>
                    <small class="text-xs">{{ user.info.email }}</small>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import axios from 'axios';

export default {
    components: {},
    data() {
        return {
            notificationOpen: false,
            notifications: [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await this.$store.dispatch("user/getUserInfo", { headers }).catch((e) => {});

        await this.getNotifications({ headers });
    },
    async mounted() {
        await this.$store.dispatch("user/refresh");
    },
    computed: {
        sideMenuOpen() {
            return this.$store.state.admin_panel.sideMenuOpen;
        },
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        sideMenuToggle() {
            this.$store.commit("admin_panel/sideMenuToggle", !this.sideMenuOpen);
        },

        async getNotifications(data = {}) {
            let url = `/api/admin/home/notifications`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(encodeURI(url), { headers })
                .then((response) => (this.notifications = response.data))
                .catch((e) => {});
        },
    },
};
</script>
