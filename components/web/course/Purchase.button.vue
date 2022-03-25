<style scoped>
.buy_btn:hover {
    gap: 2rem;
}
</style>

<template>
    <button
        class="buy_btn orange_gradient_h flex items-center justify-center gap-2 w-full flex-grow md:text-xl shadow-lg hover:shadow-xl rounded-2xl p-6"
        :class="{ 'opacity-60 cursor-wait': redirectingToGateway }"
        @click="buy()"
    >
        <img src="/icons/Buy.svg" width="32" height="32" alt="Buy" />
        <span class="kalameh_bold whitespace-nowrap" v-if="coursePrice > 0">افزودن به سبد خرید</span>
        <span class="kalameh_bold whitespace-nowrap" v-else>ثبت نام در دوره</span>
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
