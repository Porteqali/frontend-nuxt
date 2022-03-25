<style scoped></style>

<template>
    <section class="relative flex items-center justify-evenly w-full mt-20 mb-32 px-4 md:px-8" title="newsletter" id="newsletter">
        <img class="absolute opacity-80" src="/misc/orange.png" alt="" />
        <div class="relative flex flex-col items-center gap-8 md:gap-16 bg-warmgray-100 rounded-2xl p-4 md:p-8 py-12 w-full max-w-screen-lg">
            <img class="absolute -top-1/4" src="/pages/home/lines.png" alt="" />
            <div class="relative flex flex-col items-center gap-2">
                <h4 class="kalameh_bold text-3xl md:text-4xl">خبری رو از دست نده</h4>
                <h2 class="kalameh_bold opacity-90">عضویت در خبرنامه</h2>
            </div>
            <form class="relative bg-white text-gray-800 flex items-center gap-4 p-2 rounded-2xl shadow-lg w-full max-w-2xl" @submit="subscribe($event)">
                <input class="flex-grow outline-none bg-transparent w-full" v-model="email" type="text" placeholder="ایمیل خود را وارد کنید" />
                <button
                    type="submit"
                    class="orange_gradient_h flex-shrink-0 p-2 px-4 rounded-2xl text-sm md:text-lg shadow-lg flex items-center"
                    :class="{ 'opacity-60 cursor-not-allowed': loading }"
                >
                    ثبت نام
                </button>
            </form>
            <small
                class="flex items-center p-2 py-1 -mt-6 md:-mt-10 rounded-lg"
                :class="{ 'bg-red-100 text-red-800': messageType == 'error', 'bg-emerald-100 text-emerald-800': messageType == 'success' }"
                v-if="!!message"
            >
                {{ message }}
            </small>
        </div>
    </section>
</template>

<script>
import axios from "axios";
export default {
    name: "NewsletterSection",
    data() {
        return {
            messageType: "success",
            message: "",

            email: "",
            loading: false,
        };
    },
    methods: {
        async subscribe(e) {
            e.preventDefault();

            if (this.loading) return;
            this.loading = true;

            this.message = "";

            await axios
                .post(`/api/contact-request/subscribe-to-newsletter`, { email: this.email })
                .then(() => {
                    this.messageType = "success";
                    this.message = "شما در خبرنامه عضو شدید";
                })
                .catch((e) => {
                    this.messageType = "error";
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.message = e.response.data.message[0].errors[0];
                        }
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
