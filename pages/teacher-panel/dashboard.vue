<style scoped>
.card {
    display: flex;
    background-color: #fff;
    box-shadow: 0px 7px 15px -10px rgba(0, 0, 0, 20%);
    border-radius: 1rem;
    flex-grow: 1;
    min-height: 128px;
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
                <MostViewedCoursesSection class="card" />
                <MostSoldCoursesSection class="card" />
            </div>
        </div>
        <div class="flex flex-wrap xl:flex-nowrap items-start gap-4 md:gap-6">
            <RecentCommissionsSection class="card" />
            <RecentCommentsSection class="card" />
        </div>
    </main>
</template>

<script>
import RecentTransactionsSection from "~/components/teacher-panel/dashboard/RecentCommissions.section.vue";
import GeneralDetailsSection from "~/components/teacher-panel/dashboard/GeneralDetails.section.vue";
import MainChartSection from "~/components/teacher-panel/dashboard/MainChart.section.vue";
import MostViewedCoursesSection from "~/components/teacher-panel/dashboard/MostViewedCourses.section.vue";
import MostSoldCoursesSection from "~/components/teacher-panel/dashboard/MostSoldCourses.section.vue";
import ActiveCoursesSection from "../../components/teacher-panel/dashboard/ActiveCourses.section.vue";
import RecentCommissionsSection from "../../components/teacher-panel/dashboard/RecentCommissions.section.vue";
import RecentCommentsSection from "../../components/teacher-panel/dashboard/RecentComments.section.vue";

export default {
    layout: "teacherPanel",
    components: {
        RecentTransactionsSection,
        GeneralDetailsSection,
        MainChartSection,
        MostViewedCoursesSection,
        MostSoldCoursesSection,
        RecentCommissionsSection,
        ActiveCoursesSection,
        RecentCommentsSection,
    },
};
</script>
