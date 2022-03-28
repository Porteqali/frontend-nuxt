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
</style>

<template>
    <section class="w-full flex flex-col gap-6 p-4 md:p-6">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <h3 class="relative text-2xl"><b class="relative z-10">ثبت نامی ها</b></h3>
            <nuxt-link class="hover:underline text-cyan-600 text-xs" :to="`/marketer-panel/customers`">لیست مشتریان</nuxt-link>
        </header>
        <ul class="flex flex-col gap-6 w-full p-2 overflow-x-auto overflow-y-hidden" style="max-height: 370px;">
            <li class="flex flex-wrap items-center justify-between gap-2 w-full p-2 shadow-md rounded-xl" v-for="(record, i) in customers" :key="i">
                <div class="flex flex-col items-start gap-2">
                    <div class="flex items-center gap-2">
                        <img class="w-8 h-8 rounded-full object-cover" :src="record.image" v-if="record.image" alt="" />
                        <span>{{ record.fullname }}</span>
                    </div>
                    <small class="bg-bluegray-200 p-2 py-1 rounded-lg w-max">{{ record.tillTheEnd }}</small>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                        <span class="text-xs">تاریخ ثبت نام:</span>
                        <span>{{ new Date(record.createdAt).toLocaleString("fa") }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs">تاریخ پایان دوره:</span>
                        <span>{{ new Date(record.endsAt).toLocaleString("fa") }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "RegisteredUsersSection",
    components: {},
    data() {
        return {
            isDataLoading: false,
            customers: [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getCustomers({ headers })]);
    },
    methods: {
        async getCustomers(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/marketer-panel/customers`;
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
                    this.customers = response.data.records;
                })
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));
        },
    },
};
</script>
