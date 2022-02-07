<style scoped>
.card {
    background-color: #ffffff77;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <section class="card flex flex-col items-center justify-center gap-8 p-4 md:p-6 rounded-3xl shadow-xl w-full max-w-screen-lg" v-if="!loading">
            <div class="flex flex-col items-center justify-center gap-4 w-full" v-if="status >= '200' && status < '300'">
                <img class="w-11/12 max-w-screen-2xs" src="/pages/payment-results/success.png" alt="success" />
                <h3 class="text-3xl font-bold text-emerald-400">پرداخت موفق</h3>
            </div>
            <div class="flex flex-col items-center justify-center gap-4 w-full" v-else>
                <img class="w-11/12 max-w-screen-2xs" src="/pages/payment-results/error.png" alt="error" />
                <h3 class="text-3xl font-bold text-rose-400">خطا در پرداخت</h3>
            </div>

            <div class="flex flex-col items-center justify-center gap-2 w-full" v-if="status == '200'">
                <p class="text-center">با تشکر از خرید شما</p>
                <p class="text-center text-sm opacity-75">میتوانید با مراجعه به حساب کاربری خود دوره های خریداری شده را مشاهده کنید</p>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 w-full" v-else-if="status == '201'">
                <p class="text-center">با تشکر از خرید شما</p>
                <p class="text-center text-sm opacity-75">کیف پول شما با موفقیت شارژ شد</p>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 w-full" v-else-if="status == '422'">
                <p class="text-center">روش پرداخت مشخص نشده یا مورد تایید نیست</p>
                <code class="text-xs text-red-500">{{ status }}</code>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 w-full" v-else-if="status == '405'">
                <p class="text-center">روش پرداخت مشخص نشده</p>
                <code class="text-xs text-red-500">{{ status }}</code>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 w-full" v-else-if="status == '421'">
                <p class="text-center">اعتبار کیف پول کافی نیست</p>
                <code class="text-xs text-red-500">{{ status }}</code>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 w-full" v-else-if="status == '417'">
                <p class="text-center">تراکنش توسط کاربر لغو شد</p>
                <code class="text-xs text-red-500">{{ status }}</code>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 w-full" v-else-if="status == '412'">
                <p class="text-center">عملیات تراکنش به درستی انجام نشد. مبلغ کسر شده تا ساعاتی دیگر به حساب شما بازگشت داده میشود</p>
                <p class="text-center text-sm opacity-75">لطفا در صورت عدم بازگشت مبلغ به حساب، با پشتیبانی تماس بگیرید</p>
                <code class="text-xs text-red-500">{{ status }}</code>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 w-full" v-else-if="status == '413'">
                <p class="text-center">تراکنش تکراری یا منقضی شده.</p>
                <code class="text-xs text-red-500">{{ status }}</code>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 w-full" v-else>
                <p class="text-center text-sm opacity-75">عملیات تراکنش به درستی انجام نشد. لطفا با پشتیبانی تماس بگیرید</p>
                <code class="text-xs text-red-500">{{ message }}</code>
                <code class="text-xs text-red-500">{{ status }}</code>
            </div>
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
        if (this.status == "200") {
            await this.$store.dispatch("cart/clearCart");
            localStorage.removeItem("cart");
        }
    },
    methods: {},
};
</script>
