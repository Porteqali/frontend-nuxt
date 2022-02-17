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
        <div class="flex flex-wrap lg:flex-nowrap items-start gap-4 md:gap-6 w-full">
            <div class="flex flex-col gap-4 md:gap-6 w-full lg:w-7/12">
                <GeneralDetailsSection />
                <MainChartSection class="card" />
            </div>
            <div class="flex flex-col gap-4 md:gap-6 w-full lg:w-5/12">
                <MarketingLinkSection class="card" />
                <MostSoldCoursesSection class="card" />
                <RegisteredUsersSection class="card" />
            </div>
        </div>
        <div class="flex flex-wrap xl:flex-nowrap items-start gap-4 md:gap-6">
            <RecentCommissionsSection class="card" />
            <ActiveCoursesSection class="card" />
        </div>
    </main>
</template>

<script>
import RecentTransactionsSection from "~/components/marketer-panel/dashboard/RecentCommissions.section.vue";
import GeneralDetailsSection from "~/components/marketer-panel/dashboard/GeneralDetails.section.vue";
import MainChartSection from "~/components/marketer-panel/dashboard/MainChart.section.vue";
import MostSoldCoursesSection from "~/components/marketer-panel/dashboard/MostSoldCourses.section.vue";
import ActiveCoursesSection from "../../components/marketer-panel/dashboard/ActiveCourses.section.vue";
import RecentCommissionsSection from "../../components/marketer-panel/dashboard/RecentCommissions.section.vue";
import RegisteredUsersSection from "../../components/marketer-panel/dashboard/RegisteredUsers.section.vue";
import MarketingLinkSection from "../../components/marketer-panel/dashboard/MarketingLink.section.vue";

export default {
    layout: "marketerPanel",
    components: {
        RecentTransactionsSection,
        GeneralDetailsSection,
        MainChartSection,
        MostSoldCoursesSection,
        RecentCommissionsSection,
        ActiveCoursesSection,
        RegisteredUsersSection,
        MarketingLinkSection,
    },
};
</script>
