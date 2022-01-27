<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/marketers">مدیریت بازاریابان</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>پرداخت کمیسیون</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-2">
                        <img class="w-14 h-14 rounded-full object-cover shadow-md" :src="image" v-if="image" alt="" />
                        <div class="flex flex-col">
                            <span class="text-lg">{{ `${name} ${family}` }}</span>
                            <small class="opacity-75">{{ email }}</small>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <img src="/icons/Wallet.svg" width="24" alt="" />
                        <span class="">حداکثر کمیسیون قابل پرداخت :</span>
                        <b>
                            {{ new Intl.NumberFormat("fa").format(commissionBalance) }}
                            <small>تومان</small>
                        </b>
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>مبلغ پرداختی (به تومان)</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input
                        type="text"
                        v-model="amount"
                        v-money="{ decimal: '.', thousands: ',' }"
                        dir="auto"
                        class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                    />
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>شماره حساب | شماره کارت</span>
                        </label>
                        <input type="text" v-model="cardNumber" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>بانک</span>
                        </label>
                        <input type="text" v-model="bank" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                </div>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4">
                <button class="orange_gradient_h p-4 py-2 rounded-xl" :class="{ 'opacity-75 cursor-wait': saving }" :disabled="saving" @click="save()">
                    تایید و ثبت
                </button>
                <button class="border-2 border-gray-500 hover:bg-gray-200 p-4 py-1.5 rounded-xl" @click="$router.back()">بازگشت</button>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "admin",
    head() {
        return { title: "ویرایش بازاریاب - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,
            image: "",
            name: "",
            family: "",
            email: "",
            commissionBalance: "",

            amount: "",
            cardNumber: "",
            bank: "",

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.loadMarketer({ headers }, route);
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
        async loadMarketer(data = {}, route) {
            let url = `/api/admin/marketers/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.image = response.data.image;
                    this.name = response.data.name;
                    this.family = response.data.family;
                    this.email = response.data.email;
                    this.commissionBalance = response.data.commissionBalance;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async selectFile() {
            this.image = this.$refs.fileInput.files[0] ? URL.createObjectURL(this.$refs.fileInput.files[0]) : "";
        },

        async deleteImage() {
            this.$refs.fileInput.files = undefined;
            this.image = "";
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            const data = {};
            data.amount = this.amount.replace(",", "");
            if (!!this.cardNumber) data.cardNumber = this.cardNumber;
            if (!!this.bank) data.bank = this.bank;

            let url = encodeURI(`/api/admin/marketers/pay/${this.$route.params.id}`);
            await axios
                .post(url, data)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "پرداخت کمیسیون ثبت شده" });
                    this.$router.back();
                })
                .catch((e) => {
                    console.log(e);
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                        this.errorMsg = e.response.data.message[0].errors[0];
                        this.errorTag = e.response.data.message[0].property;
                    }
                })
                .finally(() => {
                    this.saving = false;
                });
        },
    },
};
</script>
