<style scoped>
.box {
    position: absolute;
    /* top: 3.75rem; */
    margin-top: 1rem;
    left: 0;
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}

.price {
    color: var(--cart-dropdown-price-color);
}

.view_cart_btn {
    background-color: var(--view-cart-btn-bg-color);
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box blur flex flex-col gap-4 p-6 rounded-3xl shadow-lg" v-show="open">
            <ul class="flex flex-col gap-6 w-full max-h-96 overflow-auto overflow-x-hidden" v-if="Object.keys(cart.list).length">
                <transition-group class="flex flex-col gap-4" name="slideleft" appear>
                    <li class="flex items-center gap-4" v-for="item in cart.list" :key="item._id">
                        <img class="w-24 h-auto rounded-xl shadow-md" :src="item.image" width="100" :alt="item.name" />
                        <div class="flex flex-wrap items-center gap-4 w-full">
                            <div class="flex flex-col gap-2 flex-grow">
                                <h5 class="w-48">{{ item.name }}</h5>
                                <small class="price">{{ new Intl.NumberFormat("fa").format(item.discountedPrice) }} تومان</small>
                            </div>
                            <button class="flex items-center justify-center w-max flex-shrink-0" @click="remove(item)">
                                <img src="/icons/CloseSquare.svg" width="24" height="24" alt="Close Square" />
                            </button>
                        </div>
                    </li>
                </transition-group>
            </ul>
            <div class="flex flex-wrap items-center justify-between gap-4" v-if="Object.keys(cart.list).length">
                <h5>قیمت کل:</h5>
                <span class="price">{{ new Intl.NumberFormat("fa").format(cart.total) }} تومان</span>
            </div>
            <hr class="opacity-40" />
            <!-- <nuxt-link to="/cart" class="flex items-center justify-center w-full py-4 view_cart_btn rounded-xl shadow-lg" v-if="Object.keys(cart.list).length">
                مشاهده سبد خرید
            </nuxt-link> -->
            <nuxt-link to="/cart" class="flex items-center justify-center w-full py-4 orange_gradient_h rounded-xl shadow-lg" v-if="Object.keys(cart.list).length">
                مشاهده سبد خرید
            </nuxt-link>

            <div class="flex flex-col items-center justify-center" v-if="!Object.keys(cart.list).length">
                <img class="w-48" src="/misc/Cart.png" alt="empty-cart" />
                <span>سبد خرید شما خالی است!</span>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "CartDropdown",
    props: ["open"],
    components: {},
    data() {
        return {
            loading: false,

            items: ["", "", ""],
        };
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        async remove(item) {
            await this.$store.dispatch("cart/removeItemFromCart", { item });
            // save cart list info into localStorage
            localStorage.setItem("cart", JSON.stringify(this.cart.list));
        },
    },
};
</script>
