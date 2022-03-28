<style scoped>
h3::after {
    content: "";
    position: absolute;
    left: 5%;
    bottom: -2px;
    display: inline-block;
    width: 80%;
    height: 1rem;
    background-color: #ffc8a2;
    z-index: 0;
}

.tab {
    border-bottom: 1px solid #ddd;
}
.tab li {
    border-bottom: 3px solid transparent;
}
.tab .active {
    color: #a0710b;
    border-bottom-color: #a0710b;
}
</style>

<template>
    <section class="w-full flex flex-col gap-6 p-4 md:p-6">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <h3 class="relative text-2xl"><b class="relative z-10">تراکنش های اخیر</b></h3>
            <nuxt-link class="hover:underline text-cyan-600 text-xs" :to="`/admin/${tab}`">تمام تراکنش ها</nuxt-link>
        </header>
        <ul class="tab flex items-center gap-4">
            <li class="p-1 cursor-pointer" :class="{ active: tab == 'course-transactions' }" @click="tab = 'course-transactions'">خرید دوره</li>
            <li class="p-1 cursor-pointer" :class="{ active: tab == 'wallet-transactions' }" @click="tab = 'wallet-transactions'">شارژ کیف پول</li>
        </ul>
        <ul class="flex flex-col gap-6 w-full overflow-x-auto overflow-y-hidden">
            <li class="flex items-start gap-2 w-full" style="min-width: 720px" v-for="(record, i) in transactions" :key="i">
                <div class="flex items-center justify-between gap-2 w-full" v-if="tab == 'course-transactions' && record.info">
                    <div class="flex items-center gap-2">
                        <img class="w-8 h-8 rounded-full object-cover" :src="record.info[0].userImage" v-if="record.info[0].userImage" alt="" />
                        <span class="text-sm">{{ record.info[0].userFullname }}</span>
                    </div>
                    <span class="bg-bluegray-100 p-1 text-xs rounded-lg shadow-sm">{{ record.info[0].courseName }}</span>
                    <div class="flex items-center gap-1 font-bold">
                        {{ new Intl.NumberFormat("fa").format(record.info[0].totalPrice) }}
                        <small>تومان</small>
                    </div>
                    <small>{{ new Date(record.info[0].createdAt).toLocaleString("fa") }}</small>
                    <div>
                        <span class="p-1 px-2 text-xs rounded-md bg-lightblue-100 text-lightblue-700" v-if="record.info[0].status == 'waiting_for_payment'">
                            منتظر پرداخت
                        </span>
                        <span class="p-1 px-2 text-xs rounded-md bg-emerald-100 text-emerald-700" v-if="record.info[0].status == 'ok'">پرداخت موفق</span>
                        <span class="p-1 px-2 text-xs rounded-md bg-rose-100 text-rose-700" v-if="record.info[0].status == 'cancel'">لغو شده</span>
                        <span class="p-1 px-2 text-xs rounded-md bg-red-100 text-red-700" v-if="record.info[0].status == 'error'">خطا</span>
                    </div>
                    <router-link
                        class="p-2 rounded-lg hover:bg-blue-200 flex-shrink-0"
                        title="مشاهده جزئیات"
                        :to="`/admin/course-transactions/details/${record._id}`"
                        v-if="checkPermissions(['admin.course-transactions.view'], userPermissions)"
                    >
                        <img src="/icons/admin/Document.svg" width="24" />
                    </router-link>
                </div>
                <!-- -------------------------------------- -->
                <div class="flex items-center justify-between gap-2 w-full" v-if="tab == 'wallet-transactions'">
                    <div class="flex items-center gap-2" v-if="record.user">
                        <img class="w-8 h-8 rounded-full object-cover" :src="record.user[0].image" v-if="record.user[0].image" alt="" />
                        <span class="text-sm">{{ record.fullname }}</span>
                    </div>
                    <div class="flex items-center gap-1 font-bold">
                        {{ new Intl.NumberFormat("fa").format(record.chargeAmount) }}
                        <small>تومان</small>
                    </div>
                    <small>{{ new Date(record.createdAt).toLocaleString("fa") }}</small>
                    <div>
                        <span class="p-1 px-2 text-xs rounded-md bg-lightblue-100 text-lightblue-700" v-if="record.status == 'waiting_for_payment'">
                            منتظر پرداخت
                        </span>
                        <span class="p-1 px-2 text-xs rounded-md bg-emerald-100 text-emerald-700" v-if="record.status == 'ok'">پرداخت موفق</span>
                        <span class="p-1 px-2 text-xs rounded-md bg-rose-100 text-rose-700" v-if="record.status == 'cancel'">لغو شده</span>
                        <span class="p-1 px-2 text-xs rounded-md bg-red-100 text-red-700" v-if="record.status == 'error'">خطا</span>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios";
import permissionCheck from "~/mixins/permissionCheck";

export default {
    name: "RecentCommentsSection",
    mixins: [permissionCheck],
    components: {},
    data() {
        return {
            isDataLoading: false,
            tab: "course-transactions",
            transactions: [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getTransactions({ headers })]);
    },
    watch: {
        tab(val) {
            this.getTransactions();
        },
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async getTransactions(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/admin/${this.tab}`;
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
