<style scoped>
.cart_item {
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
</style>

<template>
    <section class="flex flex-col gap-4">
        <ul class="flex flex-col gap-4 w-full">
            <transition-group class="flex flex-col gap-4" name="slideleft" appear>
                <li class="cart_item flex flex-col gap-4 p-4 rounded-2xl shadow-lg w-full" v-for="transaction in transactions" :key="transaction._id">
                    <div class="flex flex-wrap items-center gap-4">
                        <span>{{ new Date(transaction.createdAt).toLocaleString("fa") }}</span>
                        <hr class="w-4" />
                        <div class="flex items-center gap-2">
                            <span>کد تراکنش:</span>
                            <b class="bg-gray-300 text-gray-800 p-1 px-2 text-sm rounded-lg">{{ transaction.transactionCode }}</b>
                        </div>
                        <hr class="w-4" />
                        <small class="p-1 px-2 rounded-lg bg-amber-200 text-amber-800" v-show="transaction.status == 'waiting_for_payment'">پرداخت نشده</small>
                        <small class="p-1 px-2 rounded-lg bg-emerald-200 text-emerald-800" v-show="transaction.status == 'ok'">پرداخت موفق</small>
                        <small class="p-1 px-2 rounded-lg bg-rose-200 text-rose-800" v-show="transaction.status == 'cancel'">لغو شده</small>
                        <small class="p-1 px-2 rounded-lg bg-red-200 text-red-800" v-show="transaction.status == 'error'">خطا</small>
                    </div>
                    <hr class="w-full opacity-40" />
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-2">
                            <span>مبلغ کل:</span>
                            <b class="text-orange-100 text-xl">{{ new Intl.NumberFormat("fa").format(transaction.chargeAmount) }}</b>
                            <small class="opacity-75">تومان</small>
                        </div>
                        <div class="flex items-center gap-2">
                            <span>مبلغ پرداختی:</span>
                            <b class="text-orange-100 text-xl">{{ new Intl.NumberFormat("fa").format(transaction.paidAmount) }}</b>
                            <small class="opacity-75">تومان</small>
                        </div>
                    </div>
                </li>
            </transition-group>
        </ul>
        <button class="gray_gradient p-3 px-4 w-max rounded-2xl" v-if="!transactionsLoading && transactionsPage <= transactionsPageTotal" @click="getTransactions()">
            بارگذاری بیشتر
        </button>
        <Loading class="w-8 h-8" v-if="transactionsLoading" />
    </section>
</template>

<script>
import axios from "axios";
import Loading from "~/components/Loading.vue";

export default {
    components: {
        Loading,
    },
    data() {
        return {
            transactions: [],
            transactionsPage: 1,
            transactionsTotal: 0,
            transactionsPageTotal: 1,
            transactionsLoading: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getTransactions({ headers })]);
    },
    methods: {
        async getTransactions(data = {}) {
            if (this.transactionsLoading || this.transactionsPage > this.transactionsPageTotal) return;
            this.transactionsLoading = true;

            let url = `/api/user-profile/transactions/wallet`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.transactionsPage}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.transactions = [...this.transactions, ...results.data.records];
                    this.transactionsPage = results.data.page + 1;
                    this.transactionsTotal = results.data.total;
                    this.transactionsPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.transactionsLoading = false));
        },
    },
};
</script>
