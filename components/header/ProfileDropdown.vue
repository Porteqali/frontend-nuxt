<style scoped>
.box {
    position: absolute;
    top: 3.25rem;
    left: 0;
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
ul li {
    border-bottom: 1px solid #ffffff22;
}
ul li:hover {
    transform: scale(1.05, 1.05);
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box blur rounded-3xl shadow-lg" v-show="open">
            <div class="flex items-center justify-center p-4 w-full">
                <img src="/header/avatar.svg" width="40" height="40" alt="avatar" />
            </div>
            <ul class="flex flex-col p-6 pt-0 w-full">
                <li class="p-3">
                    <nuxt-link to="#" class="flex items-center gap-2">
                        <img src="/icons/Work.blue.svg" width="24" height="24" alt="Work" />
                        <span>حساب کاربری</span>
                    </nuxt-link>
                </li>
                <li class="p-3">
                    <nuxt-link to="#" class="flex items-center gap-2">
                        <img src="/icons/Document.blue.svg" width="24" height="24" alt="Document" />
                        <span>گواهینامه ها</span>
                    </nuxt-link>
                </li>
                <li class="p-3">
                    <nuxt-link to="#" class="flex items-center gap-2">
                        <img src="/icons/Buy.blue.svg" width="24" height="24" alt="Buy" />
                        <span>صورت حساب ها</span>
                    </nuxt-link>
                </li>
                <li class="p-3">
                    <button class="flex items-center gap-2" @click="logout()">
                        <img src="/icons/Logout.blue.svg" width="24" height="24" alt="Logout" />
                        <span>خروج</span>
                    </button>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
import axios from "axios";
export default {
    name: "ProfileDropdown",
    props: ["open"],
    components: {},
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        async logout() {
            await axios.post(`/auth/logout`).catch((e) => {});
            await this.$store.dispatch("user/logout");
        },
    },
};
</script>
