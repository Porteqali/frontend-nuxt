<style scoped>
.buy_btn {
    border-radius: 0 0 1rem 1rem;
}
</style>

<template>
    <button class="buy_btn flex items-center justify-center gap-2 text-xl p-4 -m-6 mt-0 shadow-lg bg-bluegray-100 text-black" @click="buy()">
        <img src="/icons/Buy.black.svg" alt="Buy" />
        <span v-if="coursePrice > 0">افزودن به سبد خرید</span>
        <span v-else>ثبت نام در دوره</span>
        <!-- TODO: check if course is in cart or not : if in cart then show InCart message -->
    </button>
</template>

<script>
import axios from "axios";

export default {
    name: "PurchaseButton",
    props: ["course", "coursePrice", "courseName"],
    data() {
        return {};
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
    },
    methods: {
        async buy() {
            // TODO
            // if coursePrice is free -> request back to register user for course (also check course free or not in back too)
            // if course is not free -> add course to cart

            if (this.coursePrice > 0) {
                await this.$store.dispatch("cart/addItemToCart", {
                    item: {
                        _id: this.course._id,
                        price: this.course.price,
                        image: this.course.image,
                        name: this.course.name,
                        discountedPrice: this.course.discountInfo.discountedPrice,
                    },
                });
                this.$store.dispatch("toast/makeToast", {
                    icon: "/icons/Category.svg",
                    title: "سبد خرید",
                    message: `دوره "${this.courseName}" به سبد خرید شما اضافه شد.`,
                    btn: { text: "مشاهده سبد خرید", internal: true, link: "/cart" },
                });

                // save cart list info into localStorage
                localStorage.setItem("cart", JSON.stringify(this.cart.list));
            } else {
            }
        },
    },
};
</script>
