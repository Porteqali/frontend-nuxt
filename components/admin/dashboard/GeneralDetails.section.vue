<style scoped>
.card {
    display: flex;
    background-color: #fff;
    box-shadow: 0px 7px 15px -10px rgba(0, 0, 0, 20%);
    border-radius: 1rem;
    flex-grow: 1;
}
</style>

<template>
    <div class="flex flex-wrap items-start gap-4 md:gap-6 w-full">
        <section class="card flex flex-col gap-2 p-4 w-max flex-shrink-0" style="max-width: 278px">
            <div class="flex items-center gap-2">
                <b class="border-4 border-solid border-fuchsia-600 rounded-2xl shadow-md p-2">
                    <Icon class="w-9 h-9 bg-gray-800" size="36px" folder="icons/admin" name="Users3" />
                </b>
                <div class="flex flex-col gap-1">
                    <label class="text-sm">تعداد کل کاربران</label>
                    <strong class="text-xl opacity-80">{{ new Intl.NumberFormat("fa").format(info.totalUsers) }}</strong>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <label class="text-xs">ثبت نامی های ماه قبل:</label>
                <strong class="text-lg opacity-80">{{ new Intl.NumberFormat("fa").format(info.lastMonthRegisters) }}</strong>
                <small class="flex items-center gap-1" :class="info.lastMonthRegistersPercentage >= 0 ? 'text-green-600' : 'text-red-600'">
                    <span class="h-4">{{ new Intl.NumberFormat("fa").format(info.lastMonthRegistersPercentage) }}%</span>
                    <Icon class="w-2 h-2 bg-green-700" size="8px" folder="icons/admin" name="ArrowUp" v-if="info.lastMonthRegistersPercentage >= 0" />
                    <Icon class="w-2 h-2 bg-red-700" size="8px" folder="icons/admin" name="ArrowDown" v-if="info.lastMonthRegistersPercentage < 0" />
                </small>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <label class="text-xs">کاربرانی که خرید کرده اند:</label>
                <strong class="opacity-80">{{ new Intl.NumberFormat("fa").format(info.usersThatMadePurchase) }}</strong>
                <small class="flex items-center gap-1 text-gray-500">{{ new Intl.NumberFormat("fa").format(info.usersThatMadePurchasePercentage) }}%</small>
            </div>
            <hr class="w-full my-2" />
            <ul class="grid grid-cols-2">
                <li class="flex items-center gap-1">
                    <label class="text-xs w-10">دانشجو:</label>
                    <strong class="opacity-70">{{ new Intl.NumberFormat("fa").format(info.totalStudents) }}</strong>
                </li>
                <li class="flex items-center gap-1">
                    <label class="text-xs w-10">بازاریاب:</label>
                    <strong class="opacity-70">{{ new Intl.NumberFormat("fa").format(info.totalMarketers) }}</strong>
                </li>
                <li class="flex items-center gap-1">
                    <label class="text-xs w-10">استاد:</label>
                    <strong class="opacity-70">{{ new Intl.NumberFormat("fa").format(info.totalTeachers) }}</strong>
                </li>
                <li class="flex items-center gap-1">
                    <label class="text-xs w-10">ادمین:</label>
                    <strong class="opacity-70">{{ new Intl.NumberFormat("fa").format(info.totalAdmins) }}</strong>
                </li>
            </ul>
        </section>
        <div class="flex flex-col gap-4 md:gap-6">
            <section class="card flex flex-col gap-2 p-4 w-screen" style="max-width: 256px">
                <div class="flex items-center gap-2">
                    <b class="border-4 border-solid border-cyan-600 rounded-2xl shadow-md p-2">
                        <Icon class="w-9 h-9 bg-gray-800" size="36px" folder="icons/admin" name="Payment" />
                    </b>
                    <div class="flex flex-col gap-1">
                        <label class="text-sm">تعداد خرید ها</label>
                        <strong class="text-xl opacity-80">{{ new Intl.NumberFormat("fa").format(info.totalPurchases) }}</strong>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <label class="text-xs">خرید های ماه قبل:</label>
                    <strong class="opacity-80">{{ new Intl.NumberFormat("fa").format(info.lastMonthPurchases) }}</strong>
                    <small class="flex items-center gap-1" :class="info.lastMonthPurchasesPercentage >= 0 ? 'text-green-600' : 'text-red-600'">
                        <span class="h-4">{{ new Intl.NumberFormat("fa").format(info.lastMonthPurchasesPercentage) }}%</span>
                        <Icon class="w-2 h-2 bg-green-700" size="8px" folder="icons/admin" name="ArrowUp" v-if="info.lastMonthPurchasesPercentage >= 0" />
                        <Icon class="w-2 h-2 bg-red-700" size="8px" folder="icons/admin" name="ArrowDown" v-if="info.lastMonthPurchasesPercentage < 0" />
                    </small>
                </div>
            </section>
            <section class="card flex flex-col gap-2 p-4 w-screen" style="max-width: 256px">
                <div class="flex items-center gap-2">
                    <b class="border-4 border-solid border-yellow-600 rounded-2xl shadow-md p-2">
                        <Icon class="w-9 h-9 bg-gray-800" size="36px" folder="icons" name="Video" />
                    </b>
                    <div class="flex flex-col gap-1 flex-grow">
                        <label class="text-sm">تعداد دوره های فعال</label>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <strong class="text-xl opacity-80">{{ new Intl.NumberFormat("fa").format(info.activeCourseCount) }}</strong>
                            <nuxt-link class="text-lightblue-500 hover:underline text-xs" to="/admin/courses">لیست دوره ها</nuxt-link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="flex flex-col gap-4 md:gap-6">
            <section class="card flex flex-col gap-2 p-4 w-screen" style="max-width: 256px">
                <div class="flex items-center gap-2">
                    <b class="border-4 border-solid border-teal-500 rounded-2xl shadow-md p-2">
                        <Icon class="w-9 h-9 bg-gray-800" size="36px" folder="icons/admin" name="SackDollar" />
                    </b>
                    <div class="flex flex-col gap-1">
                        <label class="text-sm">درآمد کل</label>
                        <strong class="text-xl opacity-80">
                            {{ new Intl.NumberFormat("fa").format(info.totalIncome) }}
                            <small class="opacity-70 text-xs">تومان</small>
                        </strong>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <label class="text-xs">درآمد ماه قبل:</label>
                    <strong class="opacity-80">{{ new Intl.NumberFormat("fa").format(info.lastMonthIncome) }}</strong>
                    <small class="opacity-70 text-xs">تومان</small>
                    <small class="flex items-center gap-1" :class="info.lastMonthIncomePercentage >= 0 ? 'text-green-600' : 'text-red-600'">
                        <span class="h-4">{{ new Intl.NumberFormat("fa").format(info.lastMonthIncomePercentage) }}%</span>
                        <Icon class="w-2 h-2 bg-green-700" size="8px" folder="icons/admin" name="ArrowUp" v-if="info.lastMonthIncomePercentage >= 0" />
                        <Icon class="w-2 h-2 bg-red-700" size="8px" folder="icons/admin" name="ArrowDown" v-if="info.lastMonthIncomePercentage < 0" />
                    </small>
                </div>
            </section>
            <section class="card flex flex-col gap-2 p-4 w-screen" style="max-width: 256px">
                <div class="flex items-center gap-2">
                    <b class="border-4 border-solid border-indigo-300 rounded-2xl shadow-md p-2">
                        <Icon class="w-9 h-9 bg-gray-800" size="36px" folder="icons/admin" name="Activity" />
                    </b>
                    <div class="flex flex-col gap-1">
                        <label class="text-sm">کاربران آنلاین</label>
                        <strong class="text-xl opacity-80">{{ new Intl.NumberFormat("fa").format(info.onlineUserCount) }}</strong>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";

export default {
    name: "GeneralDetailsSection",
    components: {
        Icon,
    },
    data() {
        return {
            isDataLoading: false,

            info: {
                totalUsers: 0,
                lastMonthRegisters: 0,
                lastMonthRegistersPercentage: 0,
                usersThatMadePurchase: 0,
                usersThatMadePurchasePercentage: 0,
                totalStudents: 0,
                totalMarketers: 0,
                totalTeachers: 0,
                totalAdmins: 0,
                totalPurchases: 0,
                lastMonthPurchases: 0,
                lastMonthPurchasesPercentage: 0,
                totalIncome: 0,
                lastMonthIncome: 0,
                lastMonthIncomePercentage: 0,
                activeCourseCount: 0,
                onlineUserCount: 0,
            },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getInfo({ headers })]);
    },
    methods: {
        async getInfo(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/admin/dashboard/general-details-info`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(encodeURI(url), { headers })
                .then((response) => (this.info = response.data))
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));
        },
    },
};
</script>
