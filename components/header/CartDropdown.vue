<style scoped>
.box {
    position: absolute;
    top: 3.75rem;
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
            <ul class="flex flex-col gap-6 w-full">
                <li class="flex items-center gap-4" v-for="(item, i) in items" :key="i">
                    <img class="w-24 h-auto rounded-xl" src="/misc/course.png" width="100" alt="" />
                    <div class="flex flex-wrap items-center gap-4">
                        <div class="flex flex-col gap-2 flex-grow">
                            <h5 class="overflow-hidden overflow-ellipsis whitespace-nowrap">دوره آموزش فیگما</h5>
                            <small class="price">100,000 تومان</small>
                        </div>
                        <button class="flex items-center justify-center w-max flex-shrink-0">
                            <img src="/icons/CloseSquare.svg" width="24" height="24" alt="Close Square" />
                        </button>
                    </div>
                </li>
            </ul>
            <div class="flex flex-wrap items-center justify-between gap-4">
                <h5>قیمت کل:</h5>
                <span class="price">520,000 تومان</span>
            </div>
            <hr class="opacity-40" />
            <button class="w-full py-4 view_cart_btn rounded-xl shadow-lg">مشاهده سبد خرید</button>
            <button class="w-full py-4 orange_gradient_h rounded-xl shadow-lg">تسویه حساب</button>
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
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },
    },
};
</script>
