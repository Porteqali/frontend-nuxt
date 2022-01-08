<style scoped>
.card {
    background-color: #ffffff77;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <section class="card flex flex-col items-center justify-center gap-8 p-4 md:p-6 rounded-3xl shadow-xl w-full max-w-screen-lg" v-if="!loading">
            <img class="w-11/12 max-w-xs" src="/pages/payment-results/success.png" alt="success" v-if="status == '200'" />
            <img class="w-11/12 max-w-xs" src="/pages/payment-results/error.png" alt="error" v-else />
            <!-- TODO : span out the masseges -->
            <div>status=422&message=NoMethod</div>
            <div>status=405&message=MethodNotDefined</div>
            <div>status=422&message=WalletBalanceNotEnough</div>
            <div>status=417&message=TransactionCanceled</div>
            <div>status=412&message=TransactionFailedAndWillBounce</div>
            <div>status=200&message=Success</div>
        </section>
        <div class="card flex flex-col items-center justify-center gap-4 p-6 w-full max-w-md rounded-3xl shadow-xl" v-else>
            <span>لطفا چند لحظه صبر کنید...</span>
            <span class="skeleton w-full h-8 my-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-8/12 h-2"></span>
        </div>
    </main>
</template>

<script>
export default {
    head() {
        return {
            title: "نتیجه پرداخت - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    data() {
        return {
            loading: true,
            status: "",
            message: "",
        };
    },
    async mounted() {
        this.loading = false;

        this.status = this.$route.query.status;
        this.message = this.$route.query.message;

        // if payment was success then clear the cart
        if (this.status == "200") await this.$store.dispatch("cart/clearCart");
    },
    methods: {},
};
</script>
