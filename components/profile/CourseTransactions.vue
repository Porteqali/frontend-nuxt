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
                        <span>{{ new Date(transaction.info[0].createdAt).toLocaleString("fa") }}</span>
                        <hr class="w-4" />
                        <div class="flex items-center gap-2">
                            <span>کد تراکنش:</span>
                            <b class="bg-gray-300 p-1 rounded-lg">{{ transaction.info[0].transactionCode }}</b>
                        </div>
                        <hr class="w-4" />
                        <small class="p-1 px-2 rounded-lg bg-amber-300 text-amber-800" v-show="transaction.info[0].status == 'waiting_for_payment'">
                            پرداخت نشده
                        </small>
                        <small class="p-1 px-2 rounded-lg bg-emerald-300 text-emerald-800" v-show="transaction.info[0].status == 'ok'">پرداخت موفق</small>
                        <small class="p-1 px-2 rounded-lg bg-rose-300 text-rose-800" v-show="transaction.info[0].status == 'cancel'">لغو شده</small>
                        <small class="p-1 px-2 rounded-lg bg-red-300 text-red-800" v-show="transaction.info[0].status == 'error'">خطا</small>
                    </div>
                    <hr class="w-full opacity-40" />
                    <ul class="flex flex-wrap items-center gap-4">
                        <li class="flex flex-col gap-2" v-for="(item, j) in transaction.info" :key="j">
                            <img class="w-20 h-20 object-contain rounded-xl shadow-md" :src="item.course[0].image" :alt="item.course[0].name" />
                            <h5 class="w-full max-w-screen-2xs text-xs opacity-75">{{ item.course[0].name }}</h5>
                        </li>
                    </ul>
                    <hr class="w-full opacity-40" />
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-2">
                            <span>مبلغ کل:</span>
                            <b class="text-orange-100">{{ new Intl.NumberFormat("fa").format(transaction.info[0].totalPrice) }}</b>
                            <small class="opacity-75">تومان</small>
                        </div>
                        <div class="flex items-center gap-2">
                            <span>مبلغ پرداختی:</span>
                            <b class="text-orange-100">{{ new Intl.NumberFormat("fa").format(transaction.info[0].paidAmount) }}</b>
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

            let url = `/api/user-profile/transactions/course`;
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
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => (this.transactionsLoading = false));
        },
    },
};
</script>
