<style scoped>
.box {
    position: absolute;
    /* top: 3.75rem; */
    margin-top: 1rem;
    left: 0;
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
ul li {
    border-bottom: 1px solid #ffffff22;
}
ul li:last-of-type {
    border: none;
}
ul li:hover {
    transform: scale(1.05, 1.05);
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box blur rounded-3xl shadow-lg" v-show="open">
            <div class="flex flex-col items-center justify-center gap-2 p-4 w-full">
                <img :src="user.info.image || `/header/avatar.svg`" class="w-10 h-10 object-cover rounded-full" width="40" height="40" alt="avatar" />
                <span>{{ `${user.info.name} ${user.info.family}` }}</span>
                <hr class="w-full mx-auto border rounded-full border-lightblue-400" />
            </div>
            <ul class="flex flex-col p-6 pt-0 w-full">
                <li class="p-3">
                    <nuxt-link to="/profile" class="flex items-center gap-2">
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
                <hr class="w-full opacity-35" />
                <li class="p-3" v-if="user.info.role == 'admin' || user.info.role == 'marketer' || user.info.role == 'teacher'">
                    <nuxt-link to="/admin" class="flex items-center gap-2" v-if="user.info.role == 'admin'">
                        <img src="/icons/admin/Activity.svg" width="24" height="24" />
                        <span>پنل ادمین</span>
                    </nuxt-link>
                    <nuxt-link to="/marketer-panel" class="flex items-center gap-2" v-if="user.info.role == 'marketer'">
                        <img src="/icons/admin/Activity.svg" width="24" height="24" />
                        <span>پنل بازاریاب</span>
                    </nuxt-link>
                    <nuxt-link to="/teacher-panel" class="flex items-center gap-2" v-if="user.info.role == 'teacher'">
                        <img src="/icons/admin/Activity.svg" width="24" height="24" />
                        <span>پنل استاد</span>
                    </nuxt-link>
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
