<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap justify-between items-center gap-4">
            <div class="flex items-center gap-2">
                <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
                <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
                <nuxt-link to="/admin/users">مدیریت کاربران</nuxt-link>
                <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
                <h1 class="text-2xl"><b>تراکنش های شارژ کیف پول</b></h1>
            </div>
            <!--  -->
        </div>

        <hr class="w-full" />

        <div class="flex flex-wrap justify-between items-center gap-4 w-full">
            <div class="flex flex-wrap md:flex-nowrap items-center gap-2 flex-grow">
                <form class="w-screen max-w-screen-2xs md:max-w-screen-xs" @submit="searchTable($event)">
                    <div class="flex items-center gap-2 p-2 bg-white shadow-md rounded-xl">
                        <img src="/icons/admin/Search.svg" width="24" />
                        <input class="w-full text-sm" type="text" placeholder="جستجو" v-model="search" />
                    </div>
                </form>
                <!-- <button class="flex items-center gap-2 p-2 rounded-xl border-2 border-solid border-gray-700" @click="filterDialogState = true">
                    <img src="/icons/admin/Filter.line.svg" width="20" />
                    <span class="text-sm">فیلتر ها</span>
                </button> -->
            </div>
            <div class="flex justify-center items-center gap-1 flex-shrink-0">
                <button class="hover:shadow-lg p-2 text-sm rounded-xl" :class="{ 'bg-white shadow-md': tableView == 'list' }" @click="tableView = 'list'">
                    <img src="/icons/admin/List.line.svg" width="26" />
                </button>
                <button class="hover:shadow-lg p-2 text-sm rounded-xl" :class="{ 'bg-white shadow-md': tableView == 'card' }" @click="tableView = 'card'">
                    <img src="/icons/admin/Category.line.svg" width="26" />
                </button>
            </div>
        </div>

        <Table
            :heads="tableHeads"
            :records="tableData"
            :view.sync="tableView"
            :sort.sync="sort"
            :page.sync="page"
            :pp.sync="pp"
            :loading="isDataLoading"
            :isEmpty="!tableData.length"
            :total="total"
            :pageTotal="pageTotal"
            :pageUrl="`/admin/users/wallet-transactions/${userId}/:page?search=${search}&forUser=${userId}`"
            @update:table="getTableData()"
        >
            <template v-slot:tbody="{ record, index }">
                <td>
                    <div class="flex items-center gap-2">
                        <img class="w-8 h-8 rounded-full object-cover" :src="record.user[0].image" v-if="record.user[0].image" alt="" />
                        <span>{{ record.fullname }}</span>
                    </div>
                </td>
                <td>
                    <span class="title">کد تراکنش</span>
                    {{ record.transactionCode }}
                </td>
                <td>
                    <span class="title">مبلغ کل</span>
                    {{ new Intl.NumberFormat("fa").format(record.chargeAmount) }}
                    <small>تومان</small>
                </td>
                <td>
                    <span class="title">مبلغ پرداختی</span>
                    {{ new Intl.NumberFormat("fa").format(record.paidAmount) }}
                    <small>تومان</small>
                </td>
                <td>
                    <span class="p-1 px-2 text-xs rounded-md bg-lightblue-100 text-lightblue-700" v-if="record.status == 'waiting_for_payment'">منتظر پرداخت</span>
                    <span class="p-1 px-2 text-xs rounded-md bg-emerald-100 text-emerald-700" v-if="record.status == 'ok'">پرداخت موفق</span>
                    <span class="p-1 px-2 text-xs rounded-md bg-rose-100 text-rose-700" v-if="record.status == 'cancel'">لغو شده</span>
                    <span class="p-1 px-2 text-xs rounded-md bg-red-100 text-red-700" v-if="record.status == 'error'">خطا</span>
                </td>
                <td>
                    {{ new Date(record.createdAt).toLocaleString("fa") }}
                </td>
                <td>
                    <div class="flex items-center gap-1">
                        <button
                            class="p-2 rounded-lg hover:bg-emerald-200 flex-shrink-0"
                            title="تکمیل فرایند پرداخت"
                            @click="askToComplete(record._id, `${record.name}`, index)"
                            v-if="record.status == 'waiting_for_payment' && checkPermissions(['admin.wallet-transactions.complete'], userPermissions)"
                        >
                            <img src="/icons/admin/Payment.svg" width="24" />
                        </button>
                    </div>
                </td>
            </template>
        </Table>

        <Dialog boxClass="max-w-xs md:max-w-md" :open.sync="payDialogState">
            <div class="flex flex-col gap-2 w-full max-w-xs md:max-w-md">
                <span class="text-lg">
                    آیا مطمئن به
                    <b class="text-emerald-600">پرداخت</b>
                    این تراکنش هستید؟
                </span>
                <small class="opacity-50">این عملیات برگشت ناپذیر است!</small>
            </div>
            <hr class="border-solid my-4" />
            <div class="flex gap-2">
                <button class="p-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white" :disabled="paying" @click="payRecord()">
                    <span>تکمیل فرایند پرداخت</span>
                </button>
                <button class="p-6 py-2 rounded-xl border-2 border-solid border-gray-400 hover:bg-gray-200" @click="payDialogState = false">لغو</button>
            </div>
        </Dialog>
    </main>
</template>

<script>
import axios from "axios";
import permissionCheck from "~/mixins/permissionCheck";
import Table from "~/components/admin/Table.vue";
import DeleteDialog from "~/components/admin/DeleteDialog.vue";
import ButtonList from "~/components/forms/admin/ButtonList.vue";

export default {
    layout: "admin",
    head() {
        return { title: "تراکنش های شارژ کیف پول - گروه آموزشی پرتقال" };
    },
    mixins: [permissionCheck],
    components: {
        Table,
        DeleteDialog,
        ButtonList,
    },
    data() {
        return {
            isDataLoading: false,

            userId: this.userId || "",
            search: this.search || "",
            sort: this.sort || { col: "تاریخ ثبت", type: "asc" },
            page: this.page || 1,
            pp: this.pp || 25,
            total: this.total || 0,
            pageTotal: this.pageTotal || 0,

            tableHeads: {
                کاربر: { sortable: true },
                "کد تراکنش": { sortable: true },
                "مبلغ کل": { sortable: true },
                "مبلغ پرداختی": { sortable: true },
                وضعیت: { sortable: true },
                "تاریخ ثبت": { sortable: true },
                عملیات: { sortable: false },
            },
            tableData: this.tableData || [],
            tableView: "list",

            paying: false,
            payingRecordId: "",
            payingRecordName: "",
            payingRecordIndex: "",

            filterDialogState: false,
            payDialogState: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;
        this.processRoute(route);

        await Promise.all([this.getTableData({ headers })]);
    },
    async beforeRouteUpdate(to, from, next) {
        if (to.params.page) this.$route.params.page = to.params.page;
        if (to.query.search) this.$route.query.order = to.query.order;

        this.processRoute(to);
        await this.getTableData({});
        next();
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
        sortOptions() {
            let sortOptions = {};
            for (let item in this.tableHeads) {
                if (this.tableHeads[item].sortable) sortOptions[item] = this.tableHeads[item];
            }
            return sortOptions;
        },
    },
    methods: {
        async getTableData(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/admin/wallet-transactions`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [
                `page=${this.page}`,
                `pp=${this.pp}`,
                `sort=${this.sort.col}`,
                `sort_type=${this.sort.type}`,
                `search=${this.search}`,
                `forUser=${this.userId}`,
            ];

            url = encodeURI(`${url}?${params.join("&")}`);

            await axios
                .get(url, { headers })
                .then((response) => {
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                    this.pageTotal = response.data.pageTotal;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                })
                .finally(() => (this.isDataLoading = false));
        },

        async searchTable(e) {
            e.preventDefault();
            this.clearResults();
            this.getTableData();
        },

        processRoute(route) {
            if (route.params.page && !isNaN(parseInt(route.params.page))) this.page = parseInt(route.params.page);
            if (route.query.search) this.search = route.query.search;
            if (route.params.id) this.userId = route.params.id;
        },

        clearResults() {
            this.page = 1;
            this.pp = 25;
            this.total = 0;
            this.pageTotal = 0;
        },

        // ========================

        askToComplete(id, name, index) {
            this.payingRecordId = id;
            this.payingRecordName = name;
            this.payingRecordIndex = index;
            this.payDialogState = true;
        },

        async payRecord() {
            if (this.paying) return;
            this.paying = true;

            let url = `/api/admin/wallet-transactions/${this.payingRecordId}`;
            await axios
                .post(url)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "تراکنش با موفقیت پرداخت شد" });
                    this.tableData[this.payingRecordIndex].status = "ok";
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                })
                .finally(() => {
                    this.paying = false;
                    this.payDialogState = false;
                    this.payingRecordId = "";
                    this.payingRecordName = "";
                    this.payingRecordIndex = "";
                });
        },
    },
};
</script>
