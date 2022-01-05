<style scoped>
.card {
    background-color: #ffffff77;
}
.cart_item {
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}

.coupon_code_input {
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <div class="flex flex-wrap md:flex-nowrap items-start justify-center gap-8 w-full" v-if="!loading">
            <section class="card relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl w-full max-w-screen-lg flex-grow">
                <ul v-if="Object.keys(cart.list).length">
                    <transition-group class="flex flex-col gap-4" name="slideleft" appear>
                        <li class="cart_item flex items-start gap-4 p-4 rounded-2xl" v-for="item in cart.list" :key="item._id">
                            <img class="w-24 h-auto rounded-xl shadow-md" :src="item.image" width="100" :alt="item.name" />
                            <div class="flex items-center gap-4 w-full">
                                <div class="flex flex-col gap-4 flex-grow">
                                    <h5 class="w-full max-w-xl text-2xl">{{ item.name }}</h5>
                                    <div class="flex items-end gap-4">
                                        <div class="flex flex-col gap-1">
                                            <small class="price text-xs line-through opacity-75" v-if="item.price != item.discountedPrice">
                                                {{ new Intl.NumberFormat("fa").format(item.price) }} تومان
                                            </small>
                                            <span class="price text-orange-100 text-lg">{{ new Intl.NumberFormat("fa").format(item.discountedPrice) }} تومان</span>
                                        </div>
                                        <b class="rounded-md shadow-md bg-rose-400 p-2 py-1" v-if="item.price != item.discountedPrice">
                                            {{ 100 - Math.round((item.discountedPrice / item.price) * 100) }}%
                                        </b>
                                    </div>
                                </div>
                                <button class="flex items-center justify-center w-max flex-shrink-0" @click="remove(item)">
                                    <img src="/icons/CloseSquare.svg" width="24" height="24" alt="Close Square" />
                                </button>
                            </div>
                        </li>
                    </transition-group>
                </ul>
                <div class="flex flex-col items-center justify-center gap-8 p-8" v-else>
                    <img class="w-52" src="/misc/cart.png" alt="cart" />
                    <p class="text-xl">سبد خرید شما خالی است!</p>
                </div>
            </section>
            <section class="card relative flex flex-col gap-4 p-4 md:p-6 rounded-3xl shadow-xl w-full max-w-sm flex-shrink-0" v-if="Object.keys(cart.list).length">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <span>قیمت کل</span>
                    <span>{{ new Intl.NumberFormat("fa").format(158000) }} تومان</span>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <span>میزان تخفیف</span>
                    <span class="text-rose-500">
                        <b class="rounded-md shadow-md bg-rose-400 text-white p-2 py-1">12%</b>
                        {{ new Intl.NumberFormat("fa").format(12000) }} تومان
                    </span>
                </div>
                <hr />
                <form class="coupon_code_input flex items-center gap-2 p-2 w-full rounded-xl" @submit="registerCouponCode($event)">
                    <!-- if user submit a code and code is valid and accepter: replace this section with the code and a way to delete it -->
                    <input class="w-full bg-transparent h-full px-2" type="text" placeholder="کد تخفیف" />
                    <button class="bg-black bg-opacity-40 p-2 px-4 rounded-xl flex-shrink-0" type="submit">اعمال کد</button>
                </form>
                <hr />
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <b>مبلغ قابل پرداخت</b>
                    <b class="text-xl text-orange-400">{{ new Intl.NumberFormat("fa").format(158000) }} تومان</b>
                </div>
                <p class="text-sm">امکان تغییر قیمت دوره های داخل سبد خرید در هر زمان وجود دارد</p>
                <button class="orange_gradient_h flex items-center justify-center w-full p-4 rounded-xl">
                    <b class="text-xl">تایید و پرداخت</b>
                </button>
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
export default {
    // TODO
    // if user apply a coupon code:
    // for each cart item we should apply the code and test if code will reduce the pirce or not
    // if coupon code reduces the price of code we accept that price
    // then we sum up all price and calc the total discount and payable price
    // if user accepts we send info to server to do the same calc again and if it matches we proceed to gateway
    // if not match: we send and error and ask user to update the cart
    head() {
        return {
            title: "سبد خرید - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: {},
    data() {
        return {
            loading: true,

            totalDiscount: 0,
            totalDiscountPercent: 0,

            payablePrice: 0,
        };
    },
    mounted() {
        this.loading = false;
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
    },
    methods: {
        async remove(item) {
            await this.$store.dispatch("cart/removeItemFromCart", { item });
            // save cart list info into localStorage
            localStorage.setItem("cart", JSON.stringify(this.cart.list));
        },

        // TODO
        // wrtite method and calc total price and discount amounts
    },
};
</script>
