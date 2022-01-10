<style scoped></style>

<template>
    <Dialog :open="open" title="ویرایش و تایید ایمیل" @update:open="updateOpenState">
        <div class="flex flex-col gap-4 w-screen max-w-xs md:max-w-md">
            <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                <div class="flex flex-col gap-2 w-full flex-grow">
                    <label class="">ایمیل</label>
                    <input type="email" v-model="email" name="email" dir="auto" class="p-3 w-full rounded-xl shadow-xl" />
                </div>
                <button class="gray_gradient p-3 px-4 rounded-2xl shadow-md flex-shrink-0" @click="sendVerificationCode()" v-if="timeLeft <= 0">
                    ارسال کد تایید
                </button>
            </div>
            <hr class="w-full" />
            <div class="flex flex-col items-start gap-4" v-if="timeLeft > 0">
                <div class="flex flex-col gap-2 w-full">
                    <label class="flex flex-col gap-2">
                        کد ارسال شده به "{{ email }}" را وارد کنید
                        <span v-if="timeLeft">{{ new Date(timeLeft * 1000).toISOString().substr(14, 5) }}</span>
                    </label>
                    <div class="flex items-center justify-center gap-2" @click="$refs.codeInput.focus()">
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
                    class="orange_gradient_h hover:shadow-md p-3 px-4 rounded-2xl w-full"
                    :class="{ 'opacity-60 cursor-wait': loading }"
                    :disabled="loading"
                    @click="verify()"
                >
                    ثبت کد
                </button>
            </div>
            <p class="rounded-lg p-2 bg-rose-50 text-rose-900 text-sm" v-if="errorMsg">{{ errorMsg }}</p>
        </div>
    </Dialog>
</template>

<script>
import axios from "axios";
import Dialog from "../Dialog";

export default {
    name: "ChangeAndConfirmEmail",
    props: ["open"],
    components: {
        Dialog,
    },
    data() {
        return {
            loading: false,

            email: "",
            code: "",

            timeLeft: 0,

            errorMsg: "",
            errorTag: "",
        };
    },
    mounted() {
        this.email = this.user.info.email || "";

        setInterval(() => {
            if (this.timeLeft) this.timeLeft = Math.max(0, this.timeLeft - 1);
        }, 1000);
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

        async sendVerificationCode() {
            if (this.loading) return;
            this.loading = true;

            this.errorMsg = this.errorTag = "";

            await axios
                .post(`/api/users/send-verification-code`, { username: this.email, type: "email" })
                .then((response) => {
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

        async verify() {
            if (this.loading) return;
            this.loading = true;

            this.errorMsg = this.errorTag = "";

            await axios
                .post(`/api/users/verify`, { username: this.email, code: this.code, type: "email" })
                .then(async (response) => {
                    this.$store.dispatch("toast/makeToast", {
                        type: "success",
                        title: "",
                        message: `ایمیل شما با موفقیت تایید شد`,
                    });
                    this.$store.commit("user/setInfo", { ...this.user.info, email: this.email });
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
    },
};
</script>
