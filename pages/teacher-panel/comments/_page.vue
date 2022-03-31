<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap justify-between items-center gap-4">
            <div class="flex items-center gap-2">
                <nuxt-link to="/teacher-panel"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
                <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
                <h1 class="text-2xl"><b>نظرات کاربران</b></h1>
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
                <button
                    class="flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-warmgray-100 hover:shadow-none shadow-md"
                    @click="filterDialogState = true"
                >
                    <img src="/icons/admin/Filter.line.svg" width="20" />
                    <span class="pl-1 text-sm">فیلتر ها</span>
                </button>
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
            :pageUrl="`/teacher-panel/comments/:page?search=${search}`"
            @update:table="getTableData()"
        >
            <template v-slot:tbody="{ record }">
                <td>
                    <div class="flex items-center gap-2">
                        <img class="w-8 h-8 rounded-full object-cover" :src="record.user[0].image" v-if="record.user[0].image" alt="" />
                        <span>{{ record.fullname }}</span>
                    </div>
                </td>
                <td>
                    <div class="flex items-center gap-1">
                        <span class="p-1 bg-bluegray-200 rounded-lg text-xs" v-if="record.course[0]">دوره</span>
                        <span class="text-sm" v-if="record.course[0]">{{ record.course[0].name }}</span>
                    </div>
                </td>
                <td>
                    <p class="text-sm">{{ record.text.length > 60 ? record.text.substr(0, 60) + "..." : record.text }}</p>
                </td>
                <td>
                    <span class="p-1 px-2 text-xs rounded-md bg-emerald-100 text-emerald-700" v-if="record.status == 'active'">تایید شده</span>
                    <span class="p-1 px-2 text-xs rounded-md bg-rose-100 text-rose-700" v-if="record.status == 'deactive'">تایید نشده</span>
                    <span class="p-1 px-2 text-xs rounded-md bg-blue-100 text-blue-700" v-if="record.status == 'waiting_for_review'">درحال بررسی</span>
                </td>
                <td>{{ new Date(record.createdAt).toLocaleString("fa") }}</td>
                <td>
                    <div class="flex items-center gap-1">
                        <router-link class="p-2 rounded-lg hover:bg-blue-200" title="پاسخ" :to="`/teacher-panel/comments/edit/${record._id}`">
                            <img src="/icons/admin/Edit.svg" width="24" />
                        </router-link>
                    </div>
                </td>
            </template>
        </Table>

        <Dialog boxClass="max-w-xs md:max-w-md" :open.sync="filterDialogState">
            <div class="flex flex-col gap-2 w-full max-w-xs md:max-w-md">
                <label for="">وضعیت:</label>
                <div class="flex flex-wrap items-center gap-6">
                    <div class="flex items-center gap-2 cursor-pointer select-none w-max" @click="filterStatus('waiting_for_review')">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="statusFilter.includes('waiting_for_review')" />
                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                        </transition>
                        <span class="text-sm opacity-75">درحال بررسی</span>
                    </div>
                    <div class="flex items-center gap-2 cursor-pointer select-none w-max" @click="filterStatus('active')">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="statusFilter.includes('active')" />
                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                        </transition>
                        <span class="text-sm opacity-75">تایید شده</span>
                    </div>
                    <div class="flex items-center gap-2 cursor-pointer select-none w-max" @click="filterStatus('deactive')">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="statusFilter.includes('deactive')" />
                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                        </transition>
                        <span class="text-sm opacity-75">تایید نشده</span>
                    </div>
                </div>
            </div>
            <hr class="border-solid my-4" />
            <div class="flex flex-wrap items-center gap-2">
                <button class="p-6 py-2 rounded-xl bg-warmgray-700 hover:bg-warmgray-800 text-white" @click="getTableData()">اعمال فیلتر</button>
                <button class="p-6 py-2 rounded-xl border-2 border-solid border-gray-400 hover:bg-gray-200" @click="clearFilters()">حذف فیلتر های اعمال شده</button>
            </div>
        </Dialog>
    </main>
</template>

<script>
import axios from "axios";
import Icons from "~/components/Icon.vue";
import Table from "~/components/admin/Table.vue";
import DeleteDialog from "~/components/admin/DeleteDialog.vue";

export default {
    layout: "admin",
    head() {
        return { title: "نظرات کاربران - گروه آموزشی پرتقال" };
    },
    components: {
        Icons,
        Table,
        DeleteDialog,
    },
    data() {
        return {
            isDataLoading: false,

            statusFilter: this.statusFilter || [],

            search: this.search || "",
            sort: this.sort || { col: "تاریخ ثبت", type: "desc" },
            page: this.page || 1,
            pp: this.pp || 25,
            total: this.total || 0,
            pageTotal: this.pageTotal || 0,

            tableHeads: {
                کاربر: { sortable: true },
                مورد: { sortable: true },
                متن: { sortable: true },
                وضعیت: { sortable: true },
                "تاریخ ثبت": { sortable: true },
                عملیات: { sortable: false },
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

            let url = `/api/teacher-panel/comments`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.page}`, `pp=${this.pp}`, `sort=${this.sort.col}`, `sort_type=${this.sort.type}`, `search=${this.search}`];
            if (this.statusFilter) params.push(`status=${this.statusFilter.toString()}`);
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
        },

        clearResults() {
            this.page = 1;
            this.pp = 25;
            this.total = 0;
            this.pageTotal = 0;
        },

        // ========================

        async clearFilters() {
            this.statusFilter = [];
            await this.getTableData();
        },
        // ...
        filterStatus(status) {
            if (this.statusFilter.includes(status)) this.statusFilter.splice(this.statusFilter.indexOf(status), 1);
            else this.statusFilter.push(status);
        },
        // ...
    },
};
</script>
