<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap justify-between items-center gap-4">
            <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
                <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
                <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
                <nuxt-link to="/admin/teachers">مدیریت اساتید</nuxt-link>
                <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
                <h1 class="text-2xl"><b>تاریخچه پرداخت کمیسیون ها</b></h1>
            </div>
            <nuxt-link
                :to="`/admin/teachers/pay/${$route.params.id}`"
                class="orange_gradient_v rounded-xl p-2 px-4 w-max hover:shadow-md"
                v-if="checkPermissions(['admin.teachers.pay'], userPermissions)"
            >
                ایجاد رکورد پرداخت
            </nuxt-link>
        </div>

        <hr class="w-full" />
        <div class="flex items-center gap-2">
            <img class="w-14 h-14 rounded-full object-cover shadow-md" :src="image" v-if="image" alt="" />
            <div class="flex flex-col">
                <span class="text-lg">{{ `${name} ${family}` }}</span>
                <small class="opacity-75">{{ email }}</small>
            </div>
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
            :pageUrl="`/admin/teachers/commission-payments/${$route.params.id}/:page?search=${search}`"
            @update:table="getTableData()"
        >
            <template v-slot:tbody="{ record }">
                <td>
                    <span class="title">مبلغ پرداختی کمیسیون:</span>
                    {{ new Intl.NumberFormat("fa").format(record.payedAmount) }}
                </td>
                <td>
                    <span class="title">مبلغ مانده کمیسیون:</span>
                    {{ new Intl.NumberFormat("fa").format(record.commissionAmountAfterPayment) }}
                    <small>تومان</small>
                </td>
                <td>
                    <span class="title">شماره حساب | شماره کارت:</span>
                    {{ record.cardNumber }}
                </td>
                <td>
                    <span class="title">بانک:</span>
                    {{ record.bank }}
                </td>
                <td>{{ new Date(record.createdAt).toLocaleString("fa") }}</td>
            </template>
        </Table>
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
        return { title: "تاریخچه پرداخت کمیسیون ها - گروه آموزشی پرتقال" };
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

            image: this.image || "",
            name: this.name || "",
            family: this.family || "",
            email: this.email || "",

            search: this.search || "",
            sort: this.sort || { col: "تاریخ ثبت", type: "desc" },
            page: this.page || 1,
            pp: this.pp || 25,
            total: this.total || 0,
            pageTotal: this.pageTotal || 0,

            tableHeads: {
                "مبلغ پرداختی کمیسیون": { sortable: true },
                "مبلغ مانده کمیسیون": { sortable: true },
                "شماره حساب | شماره کارت": { sortable: true },
                بانک: { sortable: true },
                "تاریخ ثبت": { sortable: true },
            },
            tableData: this.tableData || [],
            tableView: "list",

            deletingRecordId: "",
            deletingRecordName: "",
            deletingRecordIndex: "",

            filterDialogState: false,
            deleteDialogState: false,
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

            let url = `/api/admin/teachers/commission-payments/${this.$route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.page}`, `pp=${this.pp}`, `sort=${this.sort.col}`, `sort_type=${this.sort.type}`, `search=${this.search}`];
            
            url = encodeURI(`${url}?${params.join("&")}`);

            await axios
                .get(url, { headers })
                .then((response) => {
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                    this.pageTotal = response.data.pageTotal;

                    this.image = response.data.user.image;
                    this.name = response.data.user.name;
                    this.family = response.data.user.family;
                    this.email = response.data.user.email;
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
        },

        clearResults() {
            this.page = 1;
            this.pp = 25;
            this.total = 0;
            this.pageTotal = 0;
        },
    },
};
</script>
