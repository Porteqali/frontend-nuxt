<style scoped>
.box {
    position: absolute;
    left: 0;
    margin-top: 1rem;
    background-color: #fff;
    color: #333;
}

ul li:hover > .bar {
    flex-grow: 1;
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box flex flex-col gap-4 rounded-3xl shadow-lg w-max max-w-xs p-4" v-show="open">
            <div class="flex items-center justify-center gap-2 w-full">
                <img :src="user.info.image || `/header/avatar.svg`" class="w-12 h-12 object-cover rounded-full" :alt="`${user.info.name} ${user.info.family}`" />
                <div class="flex flex-col">
                    <span class="kalameh_bold">{{ `${user.info.name} ${user.info.family}` }}</span>
                    <small class="text-xs opacity-60">{{ user.info.email }}</small>
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

            <hr class="w-11/12 mx-auto border rounded-full border-gray-400" />

            <ul class="flex flex-col gap-4 w-full">
                <li class="flex items-center gap-1 w-full">
                    <nuxt-link to="/profile" class="flex items-center gap-2">
                        <Icon class="w-6 h-6 bg-gray-800" size="24px" folder="icons/new" name="Document" />
                        <span>حساب کاربری</span>
                    </nuxt-link>
                    <div class="bar h-1 bg-amber-500"></div>
                </li>
                <li class="flex items-center gap-1 w-full">
                    <button class="flex items-center gap-2" @click="logout()">
                        <Icon class="w-6 h-6 bg-rose-800" size="24px" folder="icons/new" name="Logout" />
                        <span>خروج</span>
                    </button>
                    <div class="bar h-1 bg-amber-500"></div>
                </li>

                <hr class="w-11/12 opacity-35" />

                <li class="flex items-center gap-1 w-full" v-if="user.info.role == 'admin' || user.info.role == 'marketer' || user.info.role == 'teacher'">
                    <a href="/admin" class="flex items-center gap-2" v-if="user.info.role == 'admin'">
                        <Icon class="w-6 h-6 bg-gray-800" size="24px" folder="icons/new" name="Activity" />
                        <span>پنل ادمین</span>
                    </a>
                    <a href="/marketer-panel" class="flex items-center gap-2" v-if="user.info.role == 'marketer'">
                        <Icon class="w-6 h-6 bg-gray-800" size="24px" folder="icons/new" name="Activity" />
                        <span>پنل بازاریاب</span>
                    </a>
                    <a href="/teacher-panel" class="flex items-center gap-2" v-if="user.info.role == 'teacher'">
                        <Icon class="w-6 h-6 bg-gray-800" size="24px" folder="icons/new" name="Activity" />
                        <span>پنل استاد</span>
                    </a>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";

export default {
    name: "ProfileDropdown",
    props: ["open"],
    components: {
        Icon,
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        async logout() {
            await axios.post(`/auth/logout`).catch((e) => {});
            await this.$store.dispatch("user/logout");
            this.$router.push("/");
        },
    },
};
</script>
