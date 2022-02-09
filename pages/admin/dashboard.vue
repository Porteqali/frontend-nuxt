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
                <div class="flex flex-wrap gap-4 md:gap-6 w-full">
                    <span class="card w-64 flex-grow" name="top-info"></span>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 flex-shrink-0">
                        <span class="card w-screen" style="max-width: 256px" name="top-info"></span>
                        <span class="card w-screen" style="max-width: 256px" name="top-info"></span>
                        <span class="card w-screen" style="max-width: 256px" name="top-info"></span>
                        <span class="card w-screen" style="max-width: 256px" name="top-info"></span>
                    </div>
                </div>
                <span class="card" style="height: 512px" name="chart"></span>
                <span class="card" style="height: 2.5rem; min-height: initial" name="empty-card"></span>
            </div>
            <div class="flex flex-col gap-4 md:gap-6 w-full lg:w-5/12">
                <span class="card h-64" name="most-viewed-courses"></span>
                <span class="card h-64" name="most-sold-courses"></span>
                <span class="card h-80" name="users-device-pie"></span>
            </div>
        </div>
        <div class="flex flex-wrap-reverse items-end gap-4 md:gap-6 w-full">
            <RecentCommentsSection class="card w-full lg:w-6/12" style="width: 12px;" />
            <div class="flex flex-col gap-4 md:gap-6 w-full lg:w-6/12">
                <UsersLocationChartSection class="card" />
                <RecentTransactionsSection class="card" />
            </div>
        </div>

        <!-- // TODO : add permission for every group section of dashboard -->
        <ul class="flex flex-col gap-2 bg-white bg-opacity-90 shadow-md p-4 rounded-xl">
            <li class="flex items-center gap-1">
                <img src="/icons/admin/TickSquareBox.svg" width="18" />
                تعداد ویزیت ها با لینک یک بازاریاب به تفکیک یک روز معلوم - ماه (روز های یک ماه) - سال (ماه های یک سال)
            </li>
            <li class="flex items-center gap-1">
                <img src="/icons/admin/TickSquareBox.svg" width="18" />
                تعداد ثبت نامی های هر بازاریاب به تفکیک یک روز معلوم - ماه (روز های یک ماه) - سال (ماه های یک سال)
            </li>
            <li class="flex items-center gap-1">
                <img src="/icons/admin/TickSquareBox.svg" width="18" />
                تعداد کاربرانی که در بازه اولیه هر بازاریاب هستند
            </li>
        </ul>
    </main>
</template>

<script>
import RecentCommentsSection from "~/components/admin/dashboard/RecentComments.section.vue";
import RecentTransactionsSection from "~/components/admin/dashboard/RecentTransactions.section.vue";
import UsersLocationChartSection from "~/components/admin/dashboard/UsersLocationChart.section.vue";

export default {
    layout: "admin",
    components: {
        RecentCommentsSection,
        RecentTransactionsSection,
        UsersLocationChartSection,
    },
};
</script>
