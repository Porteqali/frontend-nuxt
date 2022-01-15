<style scoped>
.newsletter_box {
    background-color: var(--search-box-bg-color);
    color: var(--search-box-color);
}
.newsletter_box button {
    color: var(--search-box-button-color);
}
</style>

<template>
    <div class="flex flex-col gap-2">
        <h4 class="font-bold text-2xl">عضویت در خبرنامه</h4>
        <form class="newsletter_box flex items-center gap-4 p-2 rounded-xl shadow-lg" @submit="subscribe($event)">
            <input class="flex-grow outline-none bg-transparent w-40 md:w-60" v-model="email" type="text" placeholder="ایمیل خود را وارد کنید" />
            <button
                type="submit"
                class="orange_gradient_v flex-shrink-0 p-2 md:px-8 rounded-xl shadow-lg flex items-center justify-center"
                :class="{ 'opacity-60 cursor-not-allowed': loading }"
            >
                <span>ثبت نام</span>
            </button>
        </form>
        <small
            class="flex items-center p-2 py-1 rounded-lg"
            :class="{ 'bg-red-100 text-red-800': messageType == 'error', 'bg-emerald-100 text-emerald-800': messageType == 'success' }"
            v-if="!!message"
        >
            {{ message }}
        </small>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Newsletter",
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
