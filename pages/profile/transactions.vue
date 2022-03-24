<style scoped>
.tab {
    border-bottom: 1px solid #ddd;
}
.tab li {
    border-bottom: 3px solid transparent;
}
.tab .active {
    color: #ff7527;
    border-bottom-color: #ff8537;
}
</style>

<template>
    <section class="relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl bg-white w-full max-w-screen-lg flex-grow">
        <div class="flex items-center gap-2">
            <img src="/icons/Document.gray.svg" width="32" height="32" alt="Document" />
            <h2 class="kalameh_bold title text-2xl">تراکنش هی مالی</h2>
        </div>
        <ul class="tab flex items-center gap-4">
            <li class="p-1 cursor-pointer" :class="{ active: page == 'course-transactions' }" @click="page = 'course-transactions'">دوره آموزشی</li>
            <li class="p-1 cursor-pointer" :class="{ active: page == 'wallet-transactions' }" @click="page = 'wallet-transactions'">شارژ کیف پول</li>
        </ul>
        <div class="w-full">
            <WalletTransactions v-show="page == 'wallet-transactions'" />
            <CourseTransactions v-show="page == 'course-transactions'" />
        </div>
    </section>
</template>

<script>
import WalletTransactions from "~/components/profile/WalletTransactions.vue";
import CourseTransactions from "~/components/profile/CourseTransactions.vue";

export default {
    head() {
        return {
            title: "تراکنش های مالی - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: {
        WalletTransactions,
        CourseTransactions,
    },
    data() {
        return {
            page: "course-transactions",
        };
    },
};
</script>
