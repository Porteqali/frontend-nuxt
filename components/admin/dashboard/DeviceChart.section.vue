<style scoped>
h3::after {
    content: "";
    position: absolute;
    left: -5%;
    bottom: -2px;
    display: inline-block;
    width: 100%;
    height: 1rem;
    background-color: #eee;
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

.loading {
    background-color: #ffffff88;
    backdrop-filter: blur(5px);
}
</style>

<template>
    <section class="flex flex-col gap-6 p-4 md:p-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <h3 class="relative text-2xl"><b class="relative z-10">دستگاه کاربران وبسایت</b></h3>
        </header>
        <div class="flex flex-col items-start w-full">
            <ul class="tab flex items-center gap-4 w-full z-10">
                <li class="p-1 cursor-pointer" :class="{ active: type == 'browser' }" @click="type = 'browser'">مرورگر</li>
                <li class="p-1 cursor-pointer" :class="{ active: type == 'os' }" @click="type = 'os'">سیستم عامل</li>
            </ul>
            <div class="relative w-full max-w-sm -my-8">
                <canvas ref="chart" class="w-full h-full"></canvas>
                <div class="loading absolute inset-0" v-if="isDataLoading"></div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { Chart, registerables } from "chart.js";

export default {
    name: "DeviceChartSection",
    components: {},
    data() {
        return {
            isDataLoading: false,
            chartData: this.chartData || { data: [], label: [] },
            type: "browser", // browser | os

            chart: null,
            chartOptions: {
                responsive: true,
                tooltips: { mode: "label", intersect: true },
                plugins: { legend: { position: "left" } },
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
            type: "doughnut",
            data: {
                labels: this.chartData.label,
                datasets: [{ data: this.chartData.data, backgroundColor: ["#e5a47f", "#e57f7f", "#ddd6d6", "#000", "#ffb5b8", "#9bdabd"] }],
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

            let url = `/api/admin/dashboard/device-chart`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`type=${this.type}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(encodeURI(url), { headers })
                .then((response) => {
                    this.chartData = { label: response.data.label, data: response.data.data };
                })
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));

            if (!process.server) {
                this.chart.data.labels = this.chartData.label;
                this.chart.data.datasets[0].data = this.chartData.data;
                this.chart.update();
            }
        },
    },
};
</script>
