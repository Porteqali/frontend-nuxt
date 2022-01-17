<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 p-4">
        <div class="flex flex-wrap justify-between items-center gap-4">
            <div class="flex items-center gap-2">
                <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
                <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
                <h1 class="text-2xl"><b>مدیریت دسترسی ها</b></h1>
            </div>
            <nuxt-link
                to="/admin/permissions/add"
                class="orange_gradient_v rounded-xl p-2 px-4 w-max hover:shadow-md"
                v-if="checkPermissions(['admin.permissions.add'], userPermissions)"
            >
                <b>دسترسی جدید</b>
            </nuxt-link>
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
                <button class="gray_gradient flex items-center gap-1 p-2 px-3 rounded-xl" @click="filterDialogState = true">
                    <img src="/icons/admin/Filter.line.svg" width="20" />
                    <span>فیلتر ها</span>
                </button>
            </div>
            <div class="flex justify-center items-center gap-1 flex-shrink-0">
                <button class="shadow-md hover:shadow-lg p-2 text-sm rounded-xl" :class="{ 'bg-white': tableView == 'list' }" @click="tableView = 'list'">
                    <img src="/icons/admin/List.line.svg" width="26" />
                </button>
                <button class="shadow-md hover:shadow-lg p-2 text-sm rounded-xl" :class="{ 'bg-white': tableView == 'card' }" @click="tableView = 'card'">
                    <img src="/icons/admin/Category.line.svg" width="26" />
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import permissionCheck from "~/mixins/permissionCheck";

export default {
    layout: "admin",
    mixins: [permissionCheck],
    async middleware({ store, req, redirect }) {
        let headers = {};
        if (process.server) headers = req.headers;

        // check if user have access to view this page
        // if not redirect to /admin
    },
    data() {
        return {
            tableView: "list",
            filterDialogState: false,
        };
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {},
};
</script>
