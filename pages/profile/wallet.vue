<style scoped>
.cart_item {
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
</style>

<template>
    <section class="card relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl w-full max-w-screen-lg flex-grow">
        <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <img src="/icons/Wallet.gray.svg" width="32" height="32" alt="Wallet" />
                <h2 class="text-2xl">شارژ کیف پول</h2>
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
                    <div class="flex items-center justify-between gap-2 p-3 w-full rounded-xl shadow-xl bg-white">
                        <input type="text" v-model="chargeAmount" v-money="moneyOptions" placeholder="مبلغ به تومان" class="w-full bg-transparent" />
                        <span>تومان</span>
                    </div>
                </div>
                <button type="button" class="orange_gradient_h p-3 px-4 rounded-2xl shadow-md flex-shrink-0">تایید و پرداخت</button>
            </div>
            <hr class="w-full" />
            <ul class="flex flex-wrap items-center gap-4">
                <li class="cart_item p-8 rounded-3xl cursor-pointer shadow-md hover:shadow-xl" @click="chargeAmount=10000">
                    <b class="text-2xl">10،000</b>
                    <small>تومان</small>
                </li>
                <li class="cart_item p-8 rounded-3xl cursor-pointer shadow-md hover:shadow-xl" @click="chargeAmount=50000">
                    <b class="text-2xl">50،000</b>
                    <small>تومان</small>
                </li>
                <li class="cart_item p-8 rounded-3xl cursor-pointer shadow-md hover:shadow-xl" @click="chargeAmount=100000">
                    <b class="text-2xl">100،000</b>
                    <small>تومان</small>
                </li>
                <li class="cart_item p-8 rounded-3xl cursor-pointer shadow-md hover:shadow-xl" @click="chargeAmount=200000">
                    <b class="text-2xl">200،000</b>
                    <small>تومان</small>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
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
            chargeAmount: "",
            moneyOptions: { decimal: ".", thousands: "," },
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
};
</script>
