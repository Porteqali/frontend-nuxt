<style scoped>
h3::after {
    content: "";
    position: absolute;
    left: 5%;
    bottom: -2px;
    display: inline-block;
    width: 80%;
    height: 1rem;
    background-color: #eee;
    z-index: 0;
}
</style>

<template>
    <section class="w-full flex flex-col gap-6 p-4 md:p-6">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <h3 class="relative text-2xl"><b class="relative z-10">فروش های اخیر</b></h3>
            <nuxt-link class="hover:underline text-cyan-600 text-xs" :to="`/marketer-panel/commissions`">تمام تراکنش ها</nuxt-link>
        </header>
        <ul class="flex flex-col gap-6 w-full p-2 overflow-x-auto overflow-y-hidden">
            <li
                class="flex flex-wrap items-center justify-between gap-2 w-full p-2 shadow-md rounded-xl"
                style="min-width: 720px"
                v-for="(record, i) in transactions"
                :key="i"
            >
                <div class="flex flex-col gap-2" v-if="record.course">
                    <div class="flex items-center gap-2" v-if="record.user">
                        <img class="w-8 h-8 rounded-full object-cover" :src="record.user[0].image" v-if="record.user[0].image" alt="" />
                        <span class="text-sm">{{ `${record.user[0].name} ${record.user[0].family}` }}</span>
                    </div>
                    <span class="text-sm font-bold">{{ record.course[0].name }}</span>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                        <span class="text-xs">مبلغ پرداختی کاربر:</span>
                        <div class="flex items-center gap-1">
                            {{ new Intl.NumberFormat("fa").format(record.paidAmount) }}
                            <small>تومان</small>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs">کمیسیون بازاریاب:</span>
                        <div class="flex items-center gap-1">
                            {{ new Intl.NumberFormat("fa").format(record.marketerCut) }}
                            <small>تومان</small>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "RecentCommissionsSection",
    components: {},
    data() {
        return {
            isDataLoading: false,
            transactions: [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getTransactions({ headers })]);
    },
    methods: {
        async getTransactions(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/marketer-panel/commissions`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`pp=6`];
            url = encodeURI(`${url}?${params.join("&")}`);

            await axios
                .get(url, { headers })
                .then((response) => {
                    this.transactions = response.data.records;
                })
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));
        },
    },
};
</script>
