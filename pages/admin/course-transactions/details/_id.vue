<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/course-transactions">تراکنش های خرید دوره</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>جزئیات</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <div class="flex items-center gap-2">
                    <img class="w-14 h-14 rounded-full object-cover shadow-md" :src="user.image" v-if="user.image" alt="" />
                    <div class="flex flex-col">
                        <span class="text-lg">{{ `${user.name} ${user.family}` }}</span>
                        <small class="opacity-75">{{ user.email }}</small>
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex items-center gap-2">
                    <strong>{{ new Date(createdAt).toLocaleString("fa") }}</strong>
                    <span class="p-1 px-2 text-xs rounded-md w-max bg-lightblue-100 text-lightblue-700" v-if="status == 'waiting_for_payment'">منتظر پرداخت</span>
                    <span class="p-1 px-2 text-xs rounded-md w-max bg-emerald-100 text-emerald-700" v-if="status == 'ok'">پرداخت موفق</span>
                    <span class="p-1 px-2 text-xs rounded-md w-max bg-rose-100 text-rose-700" v-if="status == 'cancel'">لغو شده</span>
                    <span class="p-1 px-2 text-xs rounded-md w-max bg-red-100 text-red-700" v-if="status == 'error'">خطا</span>
                </div>
                <div class="flex items-center gap-2">
                    <small>مبلغ کل:</small>
                    <span class="flex items-center gap-1">
                        {{ new Intl.NumberFormat("fa").format(totalPrice) }}
                        <small>تومان</small>
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <small>مبلغ پرداختی:</small>
                    <span class="flex items-center gap-1">
                        {{ new Intl.NumberFormat("fa").format(paidAmount) }}
                        <small>تومان</small>
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <small>کد تراکنش:</small>
                    <span>{{ transactionCode }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <small>آدرس ای پی:</small>
                    <span>{{ ip }}</span>
                </div>
                <div class="flex flex-col gap-4" v-if="transactionError">
                    <hr class="w-full" />
                    <p class="bg-rose-100 text-rose-800 text-sm p-2 rounded-xl">{{ transactionError }}</p>
                </div>
                <hr class="w-full" />
                <label for="">دوره های انتخاب شده در سبد خرید</label>
                <ul class="flex flex-wrap items-center gap-4">
                    <li class="flex flex-col gap-2 p-2 bg-bluegray-50 shadow-md rounded-xl" v-for="(item, i) in items" :key="i">
                        <div class="flex items-center gap-2 mb-1">
                            <img class="w-14 h-14 rounded-xl object-cover shadow-sm bg-white" :src="item.course.image" v-if="item.course.image" alt="" />
                            <div class="flex flex-col gap-1">
                                <span>{{ `${item.course.name}` }}</span>
                                <b class="flex items-center gap-1">
                                    {{ new Intl.NumberFormat("fa").format(item.coursePrice) }}
                                    <small>تومان</small>
                                </b>
                            </div>
                        </div>
                        <hr class="w-full">
                        <div class="flex flex-wrap items-center gap-6">
                            <div class="flex items-center gap-2">
                                <small>سهم استاد:</small>
                                <span>
                                    {{ new Intl.NumberFormat("fa").format(item.teacherCut) }}
                                    <small>تومان</small>
                                </span>
                            </div>
                            <div class="flex items-center gap-2">
                                <small>سهم بازاریاب:</small>
                                <span>
                                    {{ new Intl.NumberFormat("fa").format(item.marketerCut) }}
                                    <small>تومان</small>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4">
                <!-- <button class="orange_gradient_h p-4 py-2 rounded-xl" :class="{ 'opacity-75 cursor-wait': saving }" :disabled="saving" @click="save()">
                    تایید و ثبت
                </button> -->
                <button class="border-2 border-gray-500 hover:bg-gray-200 p-4 py-1.5 rounded-xl" @click="$router.back()">بازگشت</button>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/admin/Select.vue";
import JDate from "jalali-moment";

export default {
    layout: "admin",
    head() {
        return { title: "جزئیات تراکنش - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,

            user: {},
            totalPrice: "",
            paidAmount: "",
            transactionCode: "",
            ip: "",
            transactionError: "",
            createdAt: "",
            status: "",
            items: [],

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.loadTransaction({ headers }, route);
    },
    mounted() {
        this.baseUrl = window.location.origin;
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async loadTransaction(data = {}, route) {
            let url = `/api/admin/course-transactions/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.user = response.data[0].user;
                    this.totalPrice = response.data[0].totalPrice;
                    this.paidAmount = response.data[0].paidAmount;
                    this.transactionCode = response.data[0].transactionCode;
                    this.ip = response.data[0].ip;
                    this.transactionError = response.data[0].error;
                    this.status = response.data[0].status;
                    this.createdAt = response.data[0].createdAt;
                    this.items = response.data;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async searchTimeoutCheck() {
            if (this.searchTimeout) clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(async () => {
                await this.search();
                this.searchTimeout = null;
            }, 2000);
        },
        async search() {
            let url = `/api/admin/course-transactions/search/${this.searchQuery}?section=${this.emmitTo.value}`;
            await axios
                .get(encodeURI(url))
                .then((results) => {
                    this.searchResults = results.data.records;
                    if (this.searchResults.length > 5) this.searchResults.length = 5;
                })
                .catch((e) => {});
        },
        selectSearchedItem(item) {
            this.selectedSearchItem = { ...item };
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            //
        },
    },
};
</script>
