<style scoped>
.dashbaord_table {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 5px;
    width: 100%;
    height: 100%;
}
.dashbaord_table table {
    position: relative;
    width: 100%;
    border-collapse: collapse;
}
.dashbaord_table thead {
    position: sticky;
    top: 0;
}
.dashbaord_table th {
    position: sticky;
    z-index: 2;
    top: 0;
    background-color: #efefef;
    padding: 0.75rem;
}
.dashbaord_table th:hover {
    background-color: #ebebeb;
}
.dashbaord_table th[sortable="true"] {
    cursor: pointer;
}
.dashbaord_table tbody {
    width: 100%;
    height: 100%;
    overflow: auto;
}
.dashbaord_table tbody td {
    border-bottom: 1px solid #eaeaea;
}
.dashbaord_table tbody tr:hover {
    transition: all 0.2s;
    background-color: #f6f6f6;
}
.dashbaord_table td {
    padding: 0.5rem;
}
.dashbaord_table td .title {
    display: none;
    font-size: 0.75rem;
    margin-inline-end: 0.5rem;
}

.dashbaord_table .t_group_button .list {
    inset-inline-end: 0;
}

.dashbaord_table table.card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
}
.dashbaord_table table.card thead tr {
    display: none;
    flex-direction: column;
    width: max-content;
    padding: 0.5rem;
}
.dashbaord_table table.card thead th {
    border-radius: 5px;
    padding: 0.6rem 0.5rem;
}
.dashbaord_table table.card tbody {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    height: auto;
    overflow: initial;
}
.dashbaord_table table.card tbody tr {
    display: flex;
    flex-direction: column;
    overflow: initial;
    width: 240px;
    flex-grow: 1;
    border-radius: 0.75rem;
    padding: 0.5rem;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 8%);
    background-color: #fff;
    margin: 0.25rem;
}
.dashbaord_table table.card tbody td {
}
.dashbaord_table table.card tbody .title {
    display: inline-block;
}

.dashbaord_table table.card .t_group_button .list {
    inset-inline-end: initial;
}
</style>

<template>
    <div class="dashbaord_table">
        <div class="flex flex-wrap justify-between items-center">
            <small class="opacity-50">{{ `نمایش ${(page - 1) * pp + 1} تا ${end} از ${total} نتیجه` }}</small>
            <div class="flex items-center gap-2">
                <Select :small="true" :selectedOption.sync="selectedPP" @update:selectedOption="updatePerPage()" :options="ppOptions">
                    <template v-slot:option="{ option }">
                        <span :value="option.value">{{ option.name }}</span>
                    </template>
                </Select>
                <small class="opacity-50">رکورد در هر صفحه</small>
            </div>
        </div>

        <div class="shadow-lg rounded-xl overflow-auto h-full" :class="{ 'p-4': tableView == 'card' }" v-if="!loading">
            <table :class="{ 'flex-grow': !isEmpty, [tableView]: true }">
                <thead>
                    <tr>
                        <th v-for="(value, name) in heads" :key="name" class="" :sortable="value.sortable" @click="updateSort(value.sortable, name)">
                            <div class="flex items-center gap-1 cursor-pointer">
                                <span class="opacity-75 text-sm">{{ name }}</span>
                                <img class="select-none w-4" src="/icons/admin/SortAsc.svg" v-if="value.sortable && sort.col == name && sort.type == 'asc'" />
                                <img class="select-none w-4" src="/icons/admin/SortDesc.svg" v-else-if="value.sortable && sort.col == name && sort.type == 'desc'" />
                                <img class="select-none w-4" src="/icons/admin/SortEmpty.svg" v-else-if="value.sortable" />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="!isEmpty">
                    <tr v-for="(record, i) in records" :key="record._id">
                        <slot name="tbody" :record="record" :index="i"></slot>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-center items-center text-rose-900 mt-8" v-if="isEmpty && !loading">اطلاعاتی برای نمایش وجود ندارد</div>
        </div>
        <Loading class="w-10 h-10" v-if="loading" />

        <ul class="flex items-center gap-4" v-if="!!pagesList.length">
            <li v-for="(item, i) in pagesList" :key="i">
                <nuxt-link
                    class="flex items-center justify-center p-3 w-8 h-8 shadow-md rounded-xl"
                    :class="page != item ? 'bg-white' : 'bg-gray-800 text-white'"
                    :to="pageUrl.replace(':page', item)"
                    v-if="item > 0"
                >
                    {{ item }}
                </nuxt-link>
                <span class="flex items-center justify-center p-3 w-8 h-8 rounded-full bg-indigo-100" v-else>...</span>
            </li>
        </ul>
    </div>
</template>

<script>
import Select from "~/components/forms/Select.vue";
import Loading from "~/components/Loading.vue";

export default {
    name: "DashboardTable",
    props: ["heads", "records", "sort", "page", "pp", "total", "pageTotal", "loading", "isEmpty", "view", "pageUrl"],
    components: {
        Select,
        Loading,
    },
    data() {
        return {
            tableView: "list",
            pagesList: [],

            ppOptions: [
                { name: 25, value: 25 },
                { name: 50, value: 50 },
                { name: 100, value: 100 },
                { name: 200, value: 200 },
            ],
            selectedPP: { name: 25, value: 25 },
        };
    },
    created() {},
    mounted() {
        if (localStorage.getItem("tableView") !== null) {
            this.tableView = localStorage.getItem("tableView");
            this.$emit("update:view", this.tableView);
        }
        this.pagesList = this.getPageList(this.pageTotal, this.page, 7);
    },
    watch: {
        view(newValue, oldValue) {
            this.tableView = newValue;
            localStorage.setItem("tableView", newValue);
        },
        records() {
            this.pagesList = this.getPageList(this.pageTotal, this.page, 7);
        },
    },
    computed: {
        end() {
            let end = this.total < this.page * this.pp ? this.total : this.page * this.pp;
            return end;
        },
    },
    methods: {
        updatePerPage() {
            this.$emit("update:pp", this.selectedPP.value);
            this.$emit("update:table");
        },
        updateSort(sortable, name) {
            if (!sortable) return;

            if (this.sort.col == name) this.sort.type = this.sort.type == "asc" ? "desc" : "asc";
            this.sort.col = name;

            this.$emit("update:sort", this.sort);
            this.$emit("update:table");
        },

        getPageList(totalPages, page, maxLength) {
            if (maxLength < 5) throw "maxLength must be at least 5";

            const range = (start, end) => Array.from(Array(end - start + 1), (_, i) => i + start);

            var sideWidth = maxLength < 9 ? 1 : 2;
            var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
            var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
            if (totalPages <= maxLength) return range(1, totalPages);

            if (page <= maxLength - sideWidth - 1 - rightWidth) {
                return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
            }
            if (page >= totalPages - sideWidth - 1 - rightWidth) {
                return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
            }

            return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
        },
    },
};
</script>
