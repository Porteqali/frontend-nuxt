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
    <div class="flex flex-wrap gap-4 md:gap-6 w-full">
        <section class="card flex flex-col gap-2 p-4 w-screen max-w-max">
            <div class="flex items-center gap-2">
                <b class="border-4 border-solid border-teal-500 rounded-2xl shadow-md p-2">
                    <Icon class="w-9 h-9 bg-gray-800" size="36px" folder="icons/admin" name="SackDollar" />
                </b>
                <div class="flex flex-col gap-1">
                    <label class="text-sm">میزان فروش</label>
                    <strong class="text-xl opacity-80">
                        {{ new Intl.NumberFormat("fa").format(info.totalSells) }}
                    </strong>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <label class="text-xs">میزان فروش ماه قبل:</label>
                <strong class="opacity-80">{{ new Intl.NumberFormat("fa").format(info.lastMonthSells) }}</strong>
                <small class="flex items-center gap-1" :class="info.lastMonthSellsPercentage >= 0 ? 'text-green-600' : 'text-red-600'">
                    <span class="h-4">{{ new Intl.NumberFormat("fa").format(info.lastMonthSellsPercentage) }}%</span>
                    <Icon class="w-2 h-2 bg-green-700" size="8px" folder="icons/admin" name="ArrowUp" v-if="info.lastMonthSellsPercentage >= 0" />
                    <Icon class="w-2 h-2 bg-red-700" size="8px" folder="icons/admin" name="ArrowDown" v-if="info.lastMonthSellsPercentage < 0" />
                </small>
            </div>
        </section>
        <section class="card flex flex-col gap-2 p-4 w-screen max-w-max">
            <div class="flex items-center gap-2">
                <b class="border-4 border-solid border-cyan-600 rounded-2xl shadow-md p-2">
                    <Icon class="w-9 h-9 bg-gray-800" size="36px" folder="icons/admin" name="Payment" />
                </b>
                <div class="flex flex-col gap-1">
                    <label class="text-sm">درآمد کل</label>
                    <strong class="text-xl opacity-80">{{ new Intl.NumberFormat("fa").format(info.totalIncome) }}</strong>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <label class="text-xs">درآمد کل ماه قبل:</label>
                <strong class="opacity-80">{{ new Intl.NumberFormat("fa").format(info.lastMonthIncome) }}</strong>
                <small class="flex items-center gap-1" :class="info.lastMonthIncomePercentage >= 0 ? 'text-green-600' : 'text-red-600'">
                    <span class="h-4">{{ new Intl.NumberFormat("fa").format(info.lastMonthIncomePercentage) }}%</span>
                    <Icon class="w-2 h-2 bg-green-700" size="8px" folder="icons/admin" name="ArrowUp" v-if="info.lastMonthIncomePercentage >= 0" />
                    <Icon class="w-2 h-2 bg-red-700" size="8px" folder="icons/admin" name="ArrowDown" v-if="info.lastMonthIncomePercentage < 0" />
                </small>
            </div>
        </section>
        <section class="card flex flex-col gap-2 p-4 w-screen max-w-max">
            <div class="flex items-center gap-2">
                <b class="border-4 border-solid border-yellow-600 rounded-2xl shadow-md p-2">
                    <Icon class="w-9 h-9 bg-gray-800" size="36px" folder="icons/admin" name="Receipt" />
                </b>
                <div class="flex flex-col gap-1 flex-grow">
                    <label class="text-sm">دریافتی کل</label>
                    <strong class="text-xl opacity-80">{{ new Intl.NumberFormat("fa").format(info.totalPayedCommission) }}</strong>
                </div>
            </div>
        </section>
        <section class="card flex flex-col gap-2 p-4 w-screen max-w-max">
            <div class="flex items-center gap-2">
                <b class="border-4 border-solid border-indigo-300 rounded-2xl shadow-md p-2">
                    <Icon class="w-9 h-9 bg-gray-800" size="36px" folder="icons" name="Wallet" />
                </b>
                <div class="flex flex-col gap-1">
                    <label class="text-sm">کمیسیون باقی مانده</label>
                    <strong class="text-xl opacity-80">{{ new Intl.NumberFormat("fa").format(info.commissionBalance) }}</strong>
                </div>
            </div>
        </section>
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
                totalSells: 0,
                lastMonthSells: 0,
                lastMonthSellsPercentage: 12,

                totalIncome: 0,
                lastMonthIncome: 0,
                lastMonthIncomePercentage: 12,

                totalPayedCommission: 0,
                commissionBalance: 0,
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

            let url = `/api/teacher-panel/dashboard/general-details-info`;
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
