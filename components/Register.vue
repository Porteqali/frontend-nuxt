<style></style>

<template>
    <Dialog :open="open" @update:open="updateOpenState">
        <div class="flex items-center gap-6 w-full">
            <div class="flex flex-col gap-4 max-w-xs">
                <h4 class="font-bold text-2xl">حساب آموزشی خود را ایجاد کنید</h4>

                <button class="bg-white shadow-sm hover:shadow-md p-3 rounded-xl flex justify-center items-center gap-2">
                    <img class="w-6" src="/misc/google.svg" alt="google" />
                    <b>ورود با حساب گوگل</b>
                </button>

                <div class="flex justify-center items-center gap-4 w-full">
                    <span class="w-4/12 max-w-screen-2xs h-1 bg-gray-600 rounded-sm"></span>
                    یا
                    <span class="w-4/12 max-w-screen-2xs h-1 bg-gray-600 rounded-sm"></span>
                </div>

                <transition name="slideleft" mode="out-in">
                    <div ref="stage1" key="stage1" v-if="page == 'stage1'" class="flex flex-col gap-6">
                        <form class="flex flex-col gap-6" @submit="sendCode($event)">
                            <div class="flex flex-col gap-2 w-full">
                                <label class="">ایمیل یا شماره موبایل</label>
                                <input
                                    type="text"
                                    name="username"
                                    v-model="username"
                                    class="p-3 w-full rounded-xl shadow-xl"
                                    :class="{ 'border-rose-400': errorTag == 'username' }"
                                />
                            </div>
                            <p class="rounded-lg p-2 bg-rose-50 text-rose-900 text-sm" v-if="errorMessage">
                                <i class="fas fa-exclamation-square"></i>
                                {{ errorMessage }}
                            </p>
                            <button
                                type="submit"
                                class="orange_gradient_h flex items-center justify-center shadow-sm hover:shadow-md p-3 text-xl rounded-xl w-full"
                                :class="{ 'opacity-60': loading }"
                            >
                                <span v-if="!loading">ارسال کد</span>
                                <Loading class="w-8 h-8" v-else />
                            </button>
                        </form>
                        <p class="text-sm opacity-75">با ثبت نام کلیه شرایط و قوانین پرتقال را میپذیرم.</p>
                    </div>
                    <div ref="stage2" key="stage2" v-else-if="page == 'stage2'" class="flex flex-col gap-6">
                        <form class="flex flex-col gap-6" @submit="sendCode($event)">
                            <div class="flex flex-col gap-2 w-full">
                                <label class="">کد ارسال شده به "{{ username }}" را وارد کنید <span>{{ new Date(timeLeft * 1000).toISOString().substr(14, 5) }}</span></label>
                                <div class="flex items-center gap-2" @click="$refs.codeInput.focus()">
                                    <span class="bg-white flex items-center justify-center p-3 w-12 h-12 rounded-xl shadow-xl">{{ code.split("")[5] }}</span>
                                    <span class="bg-white flex items-center justify-center p-3 w-12 h-12 rounded-xl shadow-xl">{{ code.split("")[4] }}</span>
                                    <span class="bg-white flex items-center justify-center p-3 w-12 h-12 rounded-xl shadow-xl">{{ code.split("")[3] }}</span>
                                    <span class="bg-white flex items-center justify-center p-3 w-12 h-12 rounded-xl shadow-xl">{{ code.split("")[2] }}</span>
                                    <span class="bg-white flex items-center justify-center p-3 w-12 h-12 rounded-xl shadow-xl">{{ code.split("")[1] }}</span>
                                    <span class="bg-white flex items-center justify-center p-3 w-12 h-12 rounded-xl shadow-xl">{{ code.split("")[0] }}</span>
                                </div>
                                <input class="opacity-0 w-0 h-0 text-center" ref="codeInput" type="text" v-model="code" v-mask="'######'" />
                            </div>
                            <button
                                class="flex items-center gap-4 text-orange-700 hover:underline"
                                :class="{ 'opacity-50 cursor-not-allowed': !canResend }"
                                :disabled="!canResend"
                                type="button"
                                @click="resend()"
                            >
                                <span>ارسال دوباره کد</span>
                            </button>
                            <p class="rounded-lg p-2 bg-rose-50 text-rose-900 text-sm" v-if="errorMessage">
                                <i class="fas fa-exclamation-square"></i>
                                {{ errorMessage }}
                            </p>
                            <div class="flex items-center gap-2">
                                <button
                                    class="orange_gradient_v flex items-center justify-center shadow-sm hover:shadow-md p-3 rounded-xl w-max"
                                    :class="{ 'opacity-60': loading }"
                                    @click="changePage('stage1')"
                                    type="button"
                                    v-if="!loading"
                                >
                                    <Icon class="w-7 h-7 bg-white" folder="icons" name="ArrowLeft.line" style="transform: rotate(180deg)" />
                                </button>
                                <button
                                    type="submit"
                                    class="orange_gradient_h flex items-center justify-center shadow-sm hover:shadow-md p-3 text-xl rounded-xl w-full"
                                    :class="{ 'opacity-60': loading }"
                                >
                                    <span v-if="!loading">ادامه</span>
                                    <Loading class="w-8 h-8" v-else />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div ref="stage3" key="stage3" v-else-if="page == 'stage3'" class="flex flex-col gap-6"></div>
                </transition>

                <button class="text-sm opacity-75 mt-4 w-max" @click="openLogin()">
                    ازقبل حساب کاربری دارید؟
                    <span class="text-orange-600 underline">ورود به حساب</span>
                </button>
            </div>
            <div class="hidden lg:flex">
                <img src="/pages/login-register/Custom2.png" class="w-full max-w-md" />
            </div>
        </div>
    </Dialog>
</template>

<script>
import axios from "axios";
import { mask } from "vue-the-mask";
import Dialog from "./Dialog";
import Loading from "./Loading.vue";
import Icon from "./Icon.vue";

export default {
    name: "Register",
    props: ["open"],
    components: {
        Dialog,
        Loading,
        Icon,
    },
    directives: { mask },
    data() {
        return {
            loading: false,
            page: this.page || "stage1",

            username: "",
            code: "",
            canResend: false,
            timeLeft: 120,
            timerInterval: null,

            name: "",
            family: "",
            password: "",
            passwordConfirmation: "",

            errorMessage: "",
            errorTag: "",
        };
    },
    mounted() {
        setInterval(() => {
            if (this.timeLeft) this.timeLeft = Math.max(0, this.timeLeft - 1);
        }, 1000);
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        openLogin() {
            this.$emit("login:open");
        },

        sendCode(e) {
            e.preventDefault();
            // if (this.loading) return;
            // this.loading = true;

            this.page = "stage2";

            // TODO
            // send req to register
            // get the token
            // if it was ok then send req to get user info
            // close the register and redirect to profile
        },

        changePage(page) {
            this.page = page;
        },
    },
};
</script>
