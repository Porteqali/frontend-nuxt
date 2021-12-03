<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}

.card {
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}

input,
textarea {
    outline: none;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <section class="relative flex flex-wrap-reverse justify-evenly gap-8 lg:gap-20" id="top">
            <img class="" src="/pages/contact-us/PhoneCallMan.png" alt="porteqali-PhoneCallMan" style="max-height: 1920px" />
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col gap-4 text-7xl">
                    <span class="kalameh_bold font-bold">تماس با ما</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>تماس با ما</li>
                </ul>
            </div>
        </section>
        <section class="flex flex-col items-center gap-8 w-full max-w-screen-lg">
            <div class="flex flex-col gap-2 ml-auto mb-8">
                <h2 class="font-bold text-3xl">بی صبرانه منتظر شنیدن نظرات و پیشنهادهای شما هستیم</h2>
                <p class="text-xl">پیشنهادات و انتقادات شما عزیزان، به پیشرفت گروه آموزشی پرتقال کمک بزرگی خواهد کرد</p>
            </div>
            <div class="flex flex-wrap justify-center lg:justify-between gap-16 lg:gap-20 w-full">
                <form class="flex flex-col items-center gap-6 w-full max-w-screen-2sm" @submit="send($event)">
                    <div class="flex items-center gap-4 w-full">
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">نام</label>
                            <input type="text" v-model="name" placeholder="" dir="auto" class="p-3 w-full rounded-xl shadow-xl" />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">نام خانوادگی</label>
                            <input type="text" v-model="family" placeholder="" dir="auto" class="p-3 w-full rounded-xl shadow-xl" />
                        </div>
                    </div>
                    <div class="flex items-center gap-4 w-full">
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">شماره همراه</label>
                            <input
                                type="text"
                                v-model="mobile"
                                v-mask="'09##-### ####'"
                                :masked="true"
                                placeholder="0912-345 6789"
                                dir="auto"
                                class="p-3 w-full rounded-xl shadow-xl"
                            />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">ایمیل</label>
                            <input type="email" v-model="email" placeholder="email@example.com" dir="auto" class="p-3 w-full rounded-xl shadow-xl" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">موضوع</label>
                        <input type="text" v-model="issue" placeholder="موضوع پیشنهاد، انتقاد و نظر خود را بنویسید" class="p-3 w-full rounded-xl shadow-xl" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">توضیحات</label>
                        <textarea type="text" v-model="text" class="p-3 w-full rounded-xl shadow-xl resize-none" rows="5"></textarea>
                    </div>
                    <span
                        class="p-2 rounded-lg"
                        :class="{ 'bg-red-100 text-red-800': messageType == 'error', 'bg-emerald-100 text-emerald-800': messageType == 'success' }"
                        v-if="!!message"
                    >
                        {{ message }}
                    </span>
                    <button
                        class="orange_gradient_h py-3 px-4 flex items-center justify-center gap-2 w-full rounded-xl hover:shadow-lg"
                        :class="{ 'opacity-50': sending }"
                        type="submit"
                    >
                        <div class="flex items-center justify-center gap-2" v-if="!sending">
                            <span class="font-bold">ارسال پیام</span>
                            <img src="/icons/Send.svg" alt="Send" width="24" height="24" />
                        </div>
                        <img src="/icons/TimeCircle.line.svg" alt="loading" width="32" height="32" v-else />
                    </button>
                    <div>
                        <p>
                            لطفا قبل از ارسال پیام،
                            <nuxt-link to="/faqs" class="underline text-orange-700">سوالات متداول</nuxt-link>
                            را مطالعه نمایید
                        </p>
                        <p>در این قسمت امکان پاسخ به سوال شما وجود ندارد</p>
                    </div>
                </form>
                <div class="flex flex-col gap-4">
                    <h3 class="text-2xl text-center font-bold">راه های ارتباطی</h3>
                    <ul class="card flex flex-col gap-8 rounded-3xl p-8 w-full max-w-sm">
                        <li class="flex flex-wrap items-center justify-between gap-4">
                            <h5 class="flex items-center gap-2">
                                <img src="/icons/Location.orange.line.svg" alt="Calling" width="24" height="24" />
                                <b class="font-bold text-xl">آدرس</b>
                            </h5>
                            <span>به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.</span>
                        </li>
                        <li class="flex flex-wrap items-center justify-between gap-4">
                            <h5 class="flex items-center gap-2">
                                <img src="/icons/Calling.orange.line.svg" alt="Calling" width="24" height="24" />
                                <b class="font-bold text-xl">شماره تلفن</b>
                            </h5>
                            <span><a href="tel:021-56942823">021-56942823</a></span>
                        </li>
                        <li class="flex flex-wrap items-center justify-between gap-4">
                            <h5 class="flex items-center gap-2">
                                <img src="/icons/Message.orange.line.svg" alt="Calling" width="24" height="24" />
                                <b class="font-bold text-xl">پست اکترونیک</b>
                            </h5>
                            <span><a href="mailto:info@porteqali.com">info@porteqali.com</a></span>
                        </li>
                        <li class="flex flex-wrap items-center justify-between gap-4">
                            <h5 class="flex items-center gap-2">
                                <img src="/icons/Document.orange.line.svg" alt="Calling" width="24" height="24" />
                                <b class="font-bold text-xl">کدپستی</b>
                            </h5>
                            <span>1899713936</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="flex flex-col items-start gap-8 w-full max-w-screen-lg">
            <div class="bg-fuchsia-800 bg-opacity-50 rounded-3xl w-full h-80"></div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import { mask } from "vue-the-mask";

export default {
    head: {
        title: "تماس با ما - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: {},
    directives: { mask },
    data() {
        return {
            name: "",
            family: "",
            mobile: "",
            email: "",
            issue: "",
            text: "",

            message: "",
            messageType: "succes",

            sending: false,
        };
    },
    methods: {
        async send(e) {
            e.preventDefault();
            if (this.sending) return;
            this.sending = true;

            this.message = "";

            await axios
                .post(`/api/contact-request`, {
                    name: this.name,
                    family: this.family,
                    mobile: this.mobile,
                    email: this.email,
                    issue: this.issue,
                    text: this.text,
                })
                .then(() => {
                    this.messageType = "success";
                    this.message = "پیام شما ارسال شد";
                })
                .catch((e) => {
                    this.messageType = "error";
                    console.log(e.response.data);
                    if (typeof e.response !== "undefined") this.message = e.response.data.message[0].errors[0];
                })
                .finally(() => {
                    this.sending = false;
                });
        },
    },
};
</script>
