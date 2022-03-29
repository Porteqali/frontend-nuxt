<style scoped>
.cart_item {
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl bg-white w-full max-w-screen-lg flex-grow">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <img src="/icons/Wallet.gray.svg" width="32" height="32" alt="Wallet" />
                <h2 class="kalameh_bold title text-2xl">شارژ کیف پول</h2>
            </div>
            <b class="flex items-center gap-1">
                <span class="text-orange-400 text-3xl">{{ new Intl.NumberFormat("fa").format(user.info.wallet) }}</span>
                <small class="opacity-70 text-lg font-light">تومان</small>
            </b>
        </div>
        <div class="flex flex-col items-start gap-6">
            <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                <div class="flex flex-col gap-2 w-full">
                    <label class="">مبلغ مورد نظر برای شارژ</label>
                    <div class="flex items-center justify-between gap-2 w-full rounded-xl">
                        <input
                            type="text"
                            v-model="chargeAmount"
                            v-money="moneyOptions"
                            placeholder="مبلغ به تومان"
                            class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl"
                        />
                        <span>تومان</span>
                    </div>
                </div>
                <button type="button" class="orange_gradient_h p-3 px-4 rounded-2xl shadow-md flex-shrink-0" @click="pay()">تایید و شارژ کیف پول</button>
            </div>
            <hr class="w-full" />
            <ul class="flex flex-wrap items-center gap-4">
                <li class="p-4 md:p-8 rounded-3xl cursor-pointer shadow-md hover:shadow-xl bg-warmgray-50 text-gray-700" @click="chargeAmount = 10000">
                    <b class="text-lg md:text-2xl">10،000</b>
                    <small>تومان</small>
                </li>
                <li class="p-4 md:p-8 rounded-3xl cursor-pointer shadow-md hover:shadow-xl bg-warmgray-50 text-gray-700" @click="chargeAmount = 50000">
                    <b class="text-lg md:text-2xl">50،000</b>
                    <small>تومان</small>
                </li>
                <li class="p-4 md:p-8 rounded-3xl cursor-pointer shadow-md hover:shadow-xl bg-warmgray-50 text-gray-700" @click="chargeAmount = 100000">
                    <b class="text-lg md:text-2xl">100،000</b>
                    <small>تومان</small>
                </li>
                <li class="p-4 md:p-8 rounded-3xl cursor-pointer shadow-md hover:shadow-xl bg-warmgray-50 text-gray-700" @click="chargeAmount = 200000">
                    <b class="text-lg md:text-2xl">200،000</b>
                    <small>تومان</small>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import axios from "axios";
export default {
    head() {
        return {
            title: "شارژ کیف پول - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: {},
    data() {
        return {
            redirectingToGateway: false,
            chargeAmount: "",
            moneyOptions: { decimal: ".", thousands: "," },
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async pay(method = "zarinpal") {
            // before redirecting to payment gateway check if user is logged in or not
            if (!this.user.info.email && !this.user.info.mobile) {
                this.$store.dispatch("toast/makeToast", {
                    type: "error",
                    title: "پرداخت و خرید",
                    message: `برای انجام هرگونه عملیات خرید، ابتدا باید در سایت ثبتنام و وارد حساب کاربری خود شده باشید`,
                });
                return;
            }

            if (this.redirectingToGateway) return;
            this.redirectingToGateway = true;

            // request back-end for redirect url
            await axios
                .post(`/api/wallet-payment`, { method, amount: this.chargeAmount.replace(",", "") })
                .then((response) => {
                    // then rediect to gateway
                    window.location.href = response.data.url;
                })
                .catch((e) => {
                    this.redirectingToGateway = false;
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.$store.dispatch("toast/makeToast", {
                                type: "error",
                                title: "انتقال به درگاه پرداخت",
                                message: e.response.data.message[0].errors[0],
                            });
                        }
                    }
                });
        },
    },
};
</script>
