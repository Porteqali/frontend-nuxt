<style scoped>
.box {
    position: absolute;
    /* top: 3.75rem; */
    margin-top: 1rem;
    left: 0;
    background-color: #fff;
    color: #333;
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box blur flex flex-col gap-4 p-6 rounded-3xl shadow-lg" v-show="open">
            <ul class="flex flex-col gap-6 w-full max-h-96 overflow-auto overflow-x-hidden" v-if="Object.keys(cart.list).length">
                <transition-group class="flex flex-col gap-4" name="slideleft" appear>
                    <li class="flex items-center gap-4" v-for="item in cart.list" :key="item._id">
                        <img class="w-24 h-16 rounded-xl shadow-md" :src="item.image" width="100" loading="lazy" :alt="item.name" />
                        <div class="flex flex-wrap items-center gap-4 w-full">
                            <div class="flex flex-col gap-2 flex-grow">
                                <h5 class="w-48 font-bold">{{ item.name }}</h5>
                                <small class="text-orange-800">{{ new Intl.NumberFormat("fa").format(item.discountedPrice) }} تومان</small>
                            </div>
                            <button class="flex items-center justify-center w-max p-1 flex-shrink-0 rounded-lg bg-warmgray-200" @click="remove(item)">
                                <Icon class="w-6 h-6 bg-warmgray-700" size="24px" folder="icons/new" name="CloseSquare" />
                            </button>
                        </div>
                    </li>
                </transition-group>
            </ul>
            <div class="flex flex-col gap-4 w-full" v-if="Object.keys(cart.list).length">
                <hr class="opacity-70" />
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-1">
                        <Icon class="w-6 h-6 bg-warmgray-600" size="24px" folder="icons/new" name="Ticket" />
                        <h5>قیمت کل:</h5>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="text-xl font-bold text-gray-600">{{ new Intl.NumberFormat("fa").format(cart.total) }}</span>
                        <small>تومان</small>
                    </div>
                </div>
                <hr class="opacity-70" />
            </div>
            <nuxt-link to="/cart" class="flex items-center justify-center w-full py-4 orange_gradient_h rounded-xl shadow-lg" v-if="Object.keys(cart.list).length">
                اتمام فرایند خرید
            </nuxt-link>

            <div class="flex flex-col items-center justify-center gap-4" v-if="!Object.keys(cart.list).length">
                <img class="w-32" src="/misc/Cart2.png" alt="empty-cart" />
                <span>سبد خرید شما خالی است!</span>
            </div>
        </div>
    </transition>
</template>

<script>
import Icon from "~/components/Icon.vue";

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
