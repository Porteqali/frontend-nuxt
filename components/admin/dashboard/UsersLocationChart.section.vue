<style scoped>
h3::after {
    content: "";
    position: absolute;
    left: 5%;
    bottom: -2px;
    display: inline-block;
    width: 80%;
    height: 1rem;
    background-color: #eee;
    z-index: 0;
}
.title {
    /* transform: rotate(-90deg); */
}
</style>

<template>
    <section class="w-full flex flex-col gap-6 p-4 md:p-6">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <h3 class="relative text-2xl"><b class="relative z-10">موقعیت مکانی کاربران</b></h3>
        </header>
        <hr class="w-full" />
        <div class="flex flex-row-reverse items-end gap-2 h-96 overflow-x-auto overflow-y-hidden">
            <span class="flex items-center justify-end flex-col gap-4 h-full" v-for="(item, i) in info" :key="i">
                <p class="flex items-center justify-center bg-white shadow-md w-6 h-6 p-1 rounded-full text-xs -mb-6 z-10">
                    {{ `${((item.count / total) * 100).toFixed(0)}%` }}
                </p>
                <b class="w-6 rounded-full" :style="`height: ${((item.count / total) * 100).toFixed(0)}%; background-color: ${item.color};`"></b>
                <small class="title text-xs w-12 h-12 overflow-hidden text-center">{{ item.location }}</small>
            </span>
        </div>
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

            info: [
                { location: "Iran-Bojnord", count: 10222, color: "#222" },
                { location: "Iran-Esfehan", count: 8963, color: "#333" },
                { location: "Iran-Tabriz", count: 7456, color: "#444" },
                { location: "Iran-Gorgan", count: 4896, color: "#555" },
                { location: "Iran-Bandar Abbas", count: 21456, color: "#666" },
                { location: "Iran-Mos Esba", count: 18195, color: "#777" },
                { location: "France-Tehran", count: 1632, color: "#888" },
                { location: "France-Paris", count: 2346, color: "#999" },
                { location: "France-Paris", count: 11256, color: "#aaa" },
                { location: "France-Paris", count: 45446, color: "#bbb" },
                { location: "France-Paris", count: 5122, color: "#ccc" },
                { location: "France-Paris", count: 3942, color: "#ddd" },
                { location: "France-Paris", count: 36434, color: "#eee" },
            ],
            total: 54879,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getData({ headers })]);
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async getData(data = {}) {
            if (this.isDataLoading) return;
            this.isDataLoading = true;

            let url = `/api/admin/dashboard/user-locations`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(encodeURI(url), { headers })
                .then((response) => {
                    this.info = response.data.info;
                    this.total = response.data.total;
                })
                .catch((e) => {})
                .finally(() => (this.isDataLoading = false));
        },
    },
};
</script>
