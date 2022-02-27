<style scoped>
.buy_btn {
    border-radius: 0 0 1rem 1rem;
}
.buy_btn:hover {
    gap: 2rem;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 10%);
}
</style>

<template>
    <button
        class="buy_btn orange_gradient_h flex items-center justify-center gap-2 text-xl p-6 -m-6 mt-0"
        :class="{ 'opacity-60 cursor-wait': redirectingToGateway }"
        @click="buy()"
    >
        <img src="/icons/Buy.svg" width="32" height="32" alt="Buy" />
        <span v-if="coursePrice > 0">افزودن به سبد خرید</span>
        <span v-else>ثبت نام در دوره</span>
    </button>
</template>

<script>
import axios from "axios";

export default {
    name: "PurchaseButton",
    props: ["course", "coursePrice", "courseName"],
    data() {
        return {
            redirectingToGateway: false,
        };
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async buy() {
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
                // if course price is 0

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

                const list = {
                    [this.course._id]: {
                        _id: this.course._id,
                        price: this.course.price,
                        image: this.course.image,
                        name: this.course.name,
                        discountedPrice: this.course.discountInfo.discountedPrice,
                    },
                };

                await axios
                    .post(`/api/course-payment`, { list: JSON.stringify(list) })
                    .then((response) => {
                        // then rediect to gateway
                        console.log(response.data);
                        window.location.href = response.data.url;
                    })
                    .catch((e) => {
                        console.log(e);
                        if (typeof e.response !== "undefined" && e.response.data) {
                            if (typeof e.response.data.message === "object") {
                                this.$store.dispatch("toast/makeToast", {
                                    type: "error",
                                    title: "انتقال به درگاه پرداخت",
                                    message: e.response.data.message[0].errors[0],
                                });
                            }
                        }
                    })
                    .finally(() => (this.redirectingToGateway = false));
            }
        },
    },
};
</script>
