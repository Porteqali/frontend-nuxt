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
    <main class="dashboard_body flex flex-col gap-4 md:gap-6 md:p-2 md:py-1">
        <div class="flex flex-wrap lg:flex-nowrap items-start gap-4 md:gap-6 w-full" v-if="checkPermissions(['admin.dashboard.view'], userPermissions)">
            <div class="flex flex-col gap-4 md:gap-6 w-full lg:w-7/12">
                <GeneralDetailsSection />
                <MainChartSection class="card" />
            </div>
            <div class="flex flex-col gap-4 md:gap-6 w-full lg:w-5/12">
                <MostViewedCoursesSection class="card" />
                <MostSoldCoursesSection class="card" />
                <DeviceChartSection class="card" />
            </div>
        </div>
        <div class="flex flex-wrap-reverse items-end gap-4 md:gap-6 w-full" v-if="checkPermissions(['admin.dashboard.view'], userPermissions)">
            <RecentCommentsSection class="card w-full lg:w-6/12" style="width: 12px" />
            <div class="flex flex-col gap-4 md:gap-6 w-full lg:w-6/12">
                <UsersLocationChartSection class="card" />
                <RecentTransactionsSection class="card" />
            </div>
        </div>
    </main>
</template>

<script>
import RecentCommentsSection from "~/components/admin/dashboard/RecentComments.section.vue";
import RecentTransactionsSection from "~/components/admin/dashboard/RecentTransactions.section.vue";
import UsersLocationChartSection from "~/components/admin/dashboard/UsersLocationChart.section.vue";
import MostViewedCoursesSection from "~/components/admin/dashboard/MostViewedCourses.section.vue";
import MostSoldCoursesSection from "~/components/admin/dashboard/MostSoldCourses.section.vue";
import GeneralDetailsSection from "~/components/admin/dashboard/GeneralDetails.section.vue";
import MainChartSection from "~/components/admin/dashboard/MainChart.section.vue";
import DeviceChartSection from "~/components/admin/dashboard/DeviceChart.section.vue";

import permissionCheck from "~/mixins/permissionCheck";

export default {
    layout: "admin",
    components: {
        RecentCommentsSection,
        RecentTransactionsSection,
        UsersLocationChartSection,
        MostViewedCoursesSection,
        MostSoldCoursesSection,
        GeneralDetailsSection,
        MainChartSection,
        DeviceChartSection,
    },
    mixins: [permissionCheck],
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
};
</script>
