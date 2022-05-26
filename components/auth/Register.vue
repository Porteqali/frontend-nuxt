<style scoped>
.side_image {
    min-height: 32rem;
    width: 24rem;
}
.side_image img {
    width: calc(100% + 3rem);
}
</style>

<template>
    <Dialog :open="open" @update:open="updateOpenState">
        <div class="flex items-center gap-6 w-full">
            <div class="flex flex-col gap-6 max-w-xs w-full flex-shrink-0">
                <h4 class="kalameh_black title font-bold text-3xl w-max max-w-full overflow-hidden">حساب آموزشی خود را ایجاد کنید</h4>

                <a href="/auth/login/google" class="bg-white shadow-sm hover:shadow-md p-3 rounded-xl flex justify-center items-center gap-2">
                    <img class="w-6" src="/misc/google.svg" alt="google" />
                    <b>ورود با حساب گوگل</b>
                </a>

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
                            <p class="rounded-lg p-2 bg-rose-50 text-rose-900 text-sm" v-if="errorMsg">
                                <i class="fas fa-exclamation-square"></i>
                                {{ errorMsg }}
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
                        <form class="flex flex-col gap-6" @submit="verify($event)">
                            <div class="flex flex-col gap-2 w-full">
                                <label class="">
                                    کد ارسال شده به "{{ username }}" را وارد کنید
                                    <span v-if="timeLeft">{{ new Date(timeLeft * 1000).toISOString().substr(14, 5) }}</span>
                                </label>
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
                            <p class="rounded-lg p-2 bg-rose-50 text-rose-900 text-sm" v-if="errorMsg">
                                <i class="fas fa-exclamation-square"></i>
                                {{ errorMsg }}
                            </p>
                            <div class="flex items-center gap-2">
                                <button
                                    class="orange_gradient_v flex items-center justify-center shadow-sm hover:shadow-md p-3 rounded-xl w-max"
                                    :class="{ 'opacity-60': loading }"
                                    @click="page = 'stage1'"
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
                    <div ref="stage3" key="stage3" v-else-if="page == 'stage3'" class="flex flex-col gap-6">
                        <form class="flex flex-col gap-6" @submit="register($event)">
                            <div class="flex items-center gap-2">
                                <div class="flex flex-col gap-2 w-full">
                                    <label class="">نام</label>
                                    <input
                                        type="text"
                                        v-model="name"
                                        name="name"
                                        class="p-3 w-full rounded-xl shadow-xl"
                                        :class="{ 'border-2 border-solid border-rose-400': errorTag == 'name' }"
                                    />
                                </div>
                                <div class="flex flex-col gap-2 w-full">
                                    <label class="">نام خانوادگی</label>
                                    <input
                                        type="text"
                                        v-model="family"
                                        name="family"
                                        class="p-3 w-full rounded-xl shadow-xl"
                                        :class="{ 'border-2 border-solid border-rose-400': errorTag == 'family' }"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label class="">رمزعبور</label>
                                <input
                                    type="password"
                                    v-model="password"
                                    name="password"
                                    class="p-3 w-full rounded-xl shadow-xl"
                                    :class="{ 'border-2 border-solid border-rose-400': errorTag == 'password' }"
                                />
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label class="">تکرار رمزعبور</label>
                                <input
                                    type="password"
                                    v-model="passwordConfirmation"
                                    name="passwordConfirmation"
                                    class="p-3 w-full rounded-xl shadow-xl"
                                    :class="{ 'border-2 border-solid border-rose-400': errorTag == 'passwordConfirmation' }"
                                />
                            </div>
                            <p class="rounded-lg p-2 bg-rose-50 text-rose-900 text-sm" v-if="errorMsg">
                                <i class="fas fa-exclamation-square"></i>
                                {{ errorMsg }}
                            </p>
                            <div class="flex items-center gap-2">
                                <button
                                    type="submit"
                                    class="orange_gradient_h flex items-center justify-center shadow-sm hover:shadow-md p-3 text-xl rounded-xl w-full"
                                    :class="{ 'opacity-60': loading }"
                                >
                                    <span v-if="!loading">تایید</span>
                                    <Loading class="w-8 h-8" v-else />
                                </button>
                            </div>
                        </form>
                    </div>
                </transition>

                <button class="text-sm opacity-75 mt-4 w-max" @click="openLogin()">
                    ازقبل حساب کاربری دارید؟
                    <span class="text-orange-600 underline">ورود به حساب</span>
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
import { mask } from "vue-the-mask";
import Dialog from "../Dialog";
import Loading from "../Loading";
import Icon from "../Icon";

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
            canResend: this.canResend || false,
            timeLeft: 0,

            name: "",
            family: "",
            password: "",
            passwordConfirmation: "",

            errorMsg: "",
            errorTag: "",
        };
    },
    mounted() {
        setInterval(() => {
            if (this.timeLeft) {
                this.timeLeft = Math.max(0, this.timeLeft - 1);
                this.canResend = false;
            } else this.canResend = true;
        }, 1000);
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        openLogin() {
            this.$emit("login:open");
        },

        async sendCode(e) {
            if (e) e.preventDefault();
            if (this.loading) return;
            this.loading = true;

            this.errorMsg = this.errorTag = "";

            await axios
                .post(`/auth/send-code`, { username: this.username.toLowerCase() })
                .then((response) => {
                    this.page = "stage2";
                    this.timeLeft = response.data.expireIn;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.errorTag = e.response.data.message[0].property;
                            this.errorMsg = e.response.data.message[0].errors[0];
                        }
                    }
                })
                .finally(() => (this.loading = false));
        },
        async verify(e) {
            e.preventDefault();
            if (this.loading) return;
            this.loading = true;

            this.errorMsg = this.errorTag = "";

            await axios
                .post(`/auth/verify`, { username: this.username.toLowerCase(), code: this.code })
                .then(async (response) => {
                    if (response.data.register) {
                        this.page = "stage3";
                        this.timeLeft = 0;
                        this.name = this.family = this.password = this.passwordConfirmation = "";
                    } else {
                        await this.$store.dispatch("user/refresh");
                        await this.$store.dispatch("user/getUserInfo");
                        this.updateOpenState(false);
                    }
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.errorTag = e.response.data.message[0].property;
                            this.errorMsg = e.response.data.message[0].errors[0];
                        }
                    }
                })
                .finally(() => (this.loading = false));
        },
        async register(e) {
            e.preventDefault();
            if (this.loading) return;
            this.loading = true;

            this.errorMsg = this.errorTag = "";

            await axios
                .post(`/auth/register`, {
                    username: this.username.toLowerCase(),
                    code: this.code,
                    name: this.name,
                    family: this.family,
                    password: this.password,
                    passwordConfirmation: this.passwordConfirmation,
                })
                .then(async (response) => {
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
                .finally(() => (this.loading = false));
        },

        resend() {
            if (!this.canResend) return;
            this.sendCode();
        },
    },
};
</script>
