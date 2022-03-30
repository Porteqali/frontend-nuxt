<style scoped>
.img {
    transform: rotateY(180deg);
    right: 0;
    top: 15%;
}
.cart_item {
    background-color: #fff;
    color: #333;
}

.coupon_code_input {
    background-color: #fff;
    color: #333;
    border: 2px solid #e3e3e3;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-2xl w-full px-4 md:px-8 mt-24 md:mt-24 mb-16">
        <img class="img absolute w-96 -z-1" src="/misc/path.svg" />
        <div class="flex flex-wrap md:flex-nowrap items-start justify-center gap-8 w-full" v-if="!loading">
            <section class="relative flex flex-col gap-8 w-full max-w-screen-lg flex-grow">
                <ul v-if="Object.keys(cart.list).length">
                    <transition-group class="flex flex-col gap-4" name="slideleft" appear>
                        <li class="cart_item flex flex-wrap lg:flex-nowrap items-start gap-4 p-4 rounded-2xl shadow-xl" v-for="item in cart.list" :key="item._id">
                            <img class="w-32 h-24 rounded-xl shadow-md" :src="item.image" width="100" :alt="item.name" />
                            <div class="flex flex-col gap-4 flex-grow">
                                <h5 class="kalameh_bold w-full max-w-xl text-lg">{{ item.name }}</h5>
                                <div class="flex items-end gap-4">
                                    <div class="flex flex-col gap-1">
                                        <small class="price text-xs line-through opacity-75" v-if="item.price != item.discountedPrice">
                                            {{ new Intl.NumberFormat("fa").format(item.price) }} تومان
                                        </small>
                                        <div class="flex items-center gap-1">
                                            <span class="price text-amber-500 text-lg font-bold">
                                                {{ new Intl.NumberFormat("fa").format(item.discountedPrice) }}
                                            </span>
                                            <small>تومان</small>
                                        </div>
                                    </div>
                                    <b class="kalameh_bold rounded-full text-xs bg-rose-500 text-white p-2 py-1 mb-1" v-if="item.price != item.discountedPrice">
                                        {{ 100 - Math.round((item.discountedPrice / item.price) * 100) }}%
                                    </b>
                                </div>
                            </div>
                            <button class="flex items-center justify-center w-max bg-warmgray-100 rounded-xl shadow-lg p-1 flex-shrink-0" @click="remove(item)">
                                <Icon class="w-7 h-7 bg-gray-600" size="28px" folder="icons/new" name="CloseSquare" />
                            </button>
                        </li>
                    </transition-group>
                </ul>
                <div class="flex flex-col items-center justify-center gap-8 p-8" v-else>
                    <img class="w-52" src="/misc/Cart2.png" alt="cart" />
                    <p class="kalameh_bold text-2xl">سبد خرید شما خالی است!</p>
                    <nuxt-link class="bg-warmgray-100 rounded-2xl px-4 py-2 w-max shadow-md hover:shadow-xl" to="/department">مشاهده دوره های آموزشی</nuxt-link>
                </div>
            </section>
            <section
                class="card relative flex flex-col gap-4 p-4 md:p-6 bg-white rounded-3xl shadow-xl w-full max-w-sm flex-shrink-0"
                v-if="Object.keys(cart.list).length && !cartTotalLoading"
            >
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <span class="kalameh_bold">قیمت کل</span>
                    <span>{{ new Intl.NumberFormat("fa").format(totalPrice) }} تومان</span>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <span class="kalameh_bold">میزان تخفیف</span>
                    <span class="text-rose-500">
                        <b class="kalameh_bold rounded-full text-xs bg-rose-500 text-white p-2 py-1">{{ totalDiscountPercent }}%</b>
                        {{ new Intl.NumberFormat("fa").format(totalDiscount) }} تومان
                    </span>
                </div>
                <hr />
                <form class="coupon_code_input flex items-center gap-2 p-1 w-full rounded-2xl" @submit="registerCouponCode($event)">
                    <input class="w-full bg-transparent h-full px-2 text-sm" v-model="couponCode" type="text" placeholder="کد تخفیف" />
                    <button class="bg-warmgray-700 text-white text-sm p-2 px-4 rounded-xl flex-shrink-0" type="submit">اعمال کد</button>
                </form>
                <hr />
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <b class="kalameh_bold">مبلغ قابل پرداخت</b>
                    <b class="text-xl text-orange-400">{{ new Intl.NumberFormat("fa").format(payablePrice) }} تومان</b>
                </div>
                <p class="text-sm">امکان تغییر قیمت دوره های داخل سبد خرید در هر زمان وجود دارد</p>
                <div class="flex items-center gap-2">
                    <button
                        class="orange_gradient_h flex items-center justify-center w-full p-4 rounded-xl shadow-lg hover:shadow-xl"
                        :class="{ 'opacity-50 cursor-wait': redirectingToGateway }"
                        :disabled="redirectingToGateway"
                        @click="pay('zarinpal')"
                    >
                        <b class="kalameh_bold">تایید و پرداخت</b>
                    </button>
                    <button
                        class="bg-warmgray-100 flex items-center justify-center gap-1 p-3 rounded-xl shadow-lg hover:shadow-xl flex-shrink-0"
                        :class="{ 'opacity-50 cursor-wait': redirectingToGateway }"
                        :disabled="redirectingToGateway"
                        @click="pay('wallet')"
                        title="پرداخت با کیف پول"
                    >
                        <Icon class="w-8 h-8 bg-gray-800" folder="icons/new" name="Wallet" />
                        <span class="text-xs">کیف پول</span>
                    </button>
                </div>
            </section>
            <section class="card relative flex items-center justify-center gap-4 p-6 rounded-3xl shadow-xl w-full max-w-sm flex-shrink-0" v-if="cartTotalLoading">
                <Loading class="w-20 h-20 m-10" />
            </section>
        </div>
        <div class="card flex flex-col items-center justify-center gap-4 p-6 w-full max-w-md rounded-3xl shadow-xl" v-else>
            <img class="w-52" src="/misc/cart.png" alt="cart" />
            <span class="skeleton w-full h-8 my-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-8/12 h-2"></span>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import Loading from "~/components/Loading.vue";

export default {
    head() {
        return {
            title: "سبد خرید - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: { Loading },
    data() {
        return {
            loading: true,
            cartTotalLoading: false,

            couponCode: "",
            totalPrice: 0,
            totalDiscount: 0,
            totalDiscountPercent: 0,
            payablePrice: 0,

            redirectingToGateway: false,
        };
    },
    async mounted() {
        this.loading = false;
        await this.calcCartTotal();
    },
    watch: {
        cartList() {
            setTimeout(() => this.calcCartTotal(), 1000);
        },
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        cartList() {
            return this.$store.state.cart.list;
        },
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async remove(item) {
            await this.$store.dispatch("cart/removeItemFromCart", { item });
            // save cart list info into localStorage
            localStorage.setItem("cart", JSON.stringify(this.cart.list));
        },

        async calcCartTotal() {
            if (this.cartTotalLoading) return;
            this.cartTotalLoading = true;

            const list = localStorage.getItem("cart");
            if (!list) return;

            await axios
                .post(`/api/cart-total`, { list, couponCode: this.couponCode })
                .then((result) => {
                    this.totalPrice = result.data.totalPrice;
                    this.totalDiscount = result.data.totalDiscount;
                    this.totalDiscountPercent = result.data.totalDiscountPercent;
                    this.payablePrice = result.data.payablePrice;
                })
                .catch((e) => {
                    this.couponCode = "";
                })
                .finally(() => (this.cartTotalLoading = false));
        },

        async registerCouponCode(e) {
            e.preventDefault();
            await this.calcCartTotal();
        },

        async pay(method) {
            // before redirecting to payment gateway check if user is logged in or not
            if (!this.user.info.email && !this.user.info.mobile) {
                this.$store.dispatch("toast/makeToast", {
                    type: "error",
                    title: "پرداخت و خرید",
                    message: `برای انجام هرگونه عملیات خرید، ابتدا باید در سایت ثبتنام و وارد حساب کاربری خود شده باشید`,
                });
                return;
            }

            if (this.redirectingToGateway) return;
            this.redirectingToGateway = true;

            const list = localStorage.getItem("cart");
            if (!list) return;

            // request back-end for redirect url
            await axios
                .post(`/api/course-payment`, { method, list, couponCode: this.couponCode })
                .then((response) => {
                    // then rediect to gateway
                    window.location.href = response.data.url;
                })
                .catch((e) => {
                    this.redirectingToGateway = false;
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.$store.dispatch("toast/makeToast", {
                                type: "error",
                                title: "انتقال به درگاه پرداخت",
                                message: e.response.data.message[0].errors[0],
                            });
                        }
                    }
                });
        },
    },
};
</script>
