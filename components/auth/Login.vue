<style scoped>
.side_image {
    min-height: 32rem;
    width: 30rem;
}
.side_image img {
    width: calc(100% + 3rem);
}
</style>

<template>
    <Dialog :open="open" @update:open="updateOpenState">
        <div class="flex items-center gap-6 w-full">
            <div class="flex flex-col gap-6 max-w-xs w-full flex-shrink-0">
                <h4 class="kalameh_black title font-bold text-3xl w-max max-w-full overflow-hidden">خوش آمدید.</h4>

                <a href="/auth/login/google" class="bg-white shadow-sm hover:shadow-md p-3 rounded-xl flex justify-center items-center gap-2">
                    <img class="w-6" src="/misc/google.svg" alt="google" />
                    <b>ورود با حساب گوگل</b>
                </a>

                <div class="flex justify-center items-center gap-4 w-full">
                    <span class="w-4/12 max-w-screen-2xs h-1 bg-gray-600 rounded-sm"></span>
                    یا
                    <span class="w-4/12 max-w-screen-2xs h-1 bg-gray-600 rounded-sm"></span>
                </div>

                <form class="flex flex-col gap-4" @submit="login($event)">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">ایمیل یا شماره موبایل</label>
                        <input
                            type="text"
                            v-model="username"
                            name="username"
                            class="p-3 w-full rounded-xl shadow-xl"
                            :class="{ 'border-2 border-solid border-rose-400': errorTag == 'username' }"
                        />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">رمزعبور</label>
                        <div
                            class="flex items-center gap-2 w-full rounded-xl shadow-xl bg-white"
                            :class="{ 'border-2 border-solid border-rose-400': errorTag == 'password' }"
                        >
                            <input :type="showPass ? 'text' : 'password'" v-model="password" name="password" class="w-full p-3 rounded-xl" />
                            <div class="flex items-center p-3 cursor-pointer" @click="showPass = !showPass">
                                <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Hide" v-if="showPass" />
                                <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Show" v-else />
                            </div>
                        </div>
                    </div>
                    <p class="rounded-lg p-2 bg-rose-50 text-rose-900 text-sm" v-if="errorMsg">
                        {{ errorMsg }}
                    </p>
                    <button
                        type="submit"
                        class="orange_gradient_h flex items-center justify-center shadow-sm hover:shadow-md p-3 mt-2 text-xl rounded-xl w-full"
                        :class="{ 'opacity-60': loading }"
                    >
                        <span v-if="!loading">ورود</span>
                        <Loading class="w-8 h-8" v-else />
                    </button>
                </form>
                <button type="button" class="text-sm opacity-75 w-max" @click="openForgetPass()">رمزعبور خود را فراموش کردید؟</button>
                <button class="text-sm opacity-75 w-max" @click="openRegister()">
                    حساب کاربری ندارید؟
                    <span class="text-orange-600 underline">ساخت حساب</span>
                </button>
            </div>
            <div class="side_image orange_gradient_v hidden lg:flex rounded-2xl shadow-xl mr-12">
                <img src="/pages/login-register/bg.png" class="object-contain max-w-lg -mr-12" />
            </div>
        </div>
    </Dialog>
</template>

<script>
import axios from "axios";
import Dialog from "../Dialog";
import Loading from "../Loading";

export default {
    name: "Login",
    props: ["open"],
    components: {
        Dialog,
        Loading,
    },
    data() {
        return {
            loading: false,
            showPass: false,

            username: "",
            password: "",

            errorMsg: "",
            errorTag: "",
        };
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        openRegister() {
            this.$emit("register:open");
        },
        openForgetPass() {
            this.$emit("forgetPass:open");
        },

        async login(e) {
            e.preventDefault();
            if (this.loading) return;
            this.loading = true;

            this.errorMsg = this.errorTag = "";

            await axios
                .post(`/auth/login`, { username: this.username.toLowerCase(), password: this.password })
                .then(async () => {
                    await this.$store.dispatch("user/refresh");
                    // await this.$store.dispatch("user/getUserInfo");
                    this.updateOpenState(false);
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.errorTag = e.response.data.message[0].property;
                            this.errorMsg = e.response.data.message[0].errors[0];
                        }
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
