<style scoped>
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

.loading {
    background-color: #ffffff88;
    backdrop-filter: blur(5px);
}
</style>

<template>
    <section class="flex flex-col gap-6 p-4 md:p-6" style="width: calc(100% - 0.1rem)">
        <ul class="tab flex items-center gap-4">
            <li class="p-1 cursor-pointer" :class="{ active: type == 'income' }" @click="type = 'income'">میزان درآمد</li>
        </ul>
        <div class="flex flex-wrap items-end gap-4">
            <div class="flex flex-col gap-2 w-64">
                <label class="text-sm"><span>از تاریخ</span></label>
                <input type="datetime-local" v-model="startDate" class="p-2 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
            </div>
            <div class="flex flex-col gap-2 w-64">
                <label class="text-sm"><span>تا تاریخ</span></label>
                <input type="datetime-local" v-model="endDate" class="p-2 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
            </div>
            <button class="flex items-center p-2.5 px-3 bg-gray-200 hover:shadow-md rounded-xl w-max text-sm" @click="getInfo()">به روز رسانی</button>
        </div>
        <small class="w-full lg:w-10/12 opacity-75">
            نتایج با توجه به بازه تاریخ تا 30 روز به صورت روزانه، تا 365 روز به صورت ماهانه و بالاتر از آن به صورت سالانه نمایش داده میشوند.
        </small>
        <div class="relative w-full">
            <canvas ref="chart" class="w-full h-full"></canvas>
            <div class="loading absolute inset-0" v-if="isDataLoading"></div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { Chart, registerables } from "chart.js";
import JDate from "jalali-moment";
import Icon from "~/components/Icon.vue";

export default {
    name: "MainChartSection",
    components: {
        Icon,
    },
    data() {
        return {
            isDataLoading: false,
            chartData: this.chartData || { data: [], label: [] },
            type: "income", // income | sells | link-visits | users
            startDate: "",
            endDate: "",

            chart: null,
            chartOptions: {
                responsive: true,
                interaction: { mode: "index", intersect: false },
                tooltips: { mode: "label", intersect: true },
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
            },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getInfo({ headers })]);
    },
    mounted() {
        const ctx = this.$refs.chart.getContext("2d");
        Chart.register(...registerables);
        this.chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: this.chartData.label,
                datasets: [{ data: this.chartData.data, lineTension: 0.5, fill: true, borderWidth: 2, borderColor: "#f3d388", backgroundColor: "#ff7952" }],
            },
            options: this.chartOptions,
        });
    },
    watch: {
        async type() {
            await this.getInfo();
        },
    },
    methods: {
        async getInfo(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/teacher-panel/dashboard/main-chart`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`type=${this.type}`];
            if (this.startDate) params.push(`startDate=${JDate(this.startDate).toISOString()}`);
            if (this.endDate) params.push(`endDate=${JDate(this.endDate).toISOString()}`);
            url = `${url}?${params.join("&")}`;

            await axios
                .get(encodeURI(url), { headers })
                .then((response) => {
                    this.chartData = { label: response.data.label, data: response.data.data };
                    if (!this.startDate) this.startDate = response.data.startDate;
                    if (!this.endDate) this.endDate = response.data.endDate;
                })
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));

            if (!process.server) {
                this.chart.data.labels = this.chartData.label;
                this.chart.data.datasets[0].data = this.chartData.data;
                switch (this.type) {
                    case "income":
                        this.chart.data.datasets[0].borderColor = "#f3d388";
                        this.chart.data.datasets[0].backgroundColor = "#ff7952";
                        break;
                    case "users":
                        this.chart.data.datasets[0].borderColor = "#6437d5";
                        this.chart.data.datasets[0].backgroundColor = "#b699ff";
                        break;
                }
                this.chart.update();
            }
        },
    },
};
</script>
