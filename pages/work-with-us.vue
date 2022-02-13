<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}

.card {
    position: relative;
    border-radius: 0 2rem 2rem 2rem;
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
    /* backdrop-filter: blur(5px); */
}
.card::after,
.card::before {
    content: "";
    width: 99%;
    height: 100%;
    z-index: -1;
    position: absolute;
    border-radius: 0 2rem 2rem 2rem;
}
.card::before {
    background: linear-gradient(180deg, #ffbdb5 0%, #ff5a51 100%);
    transform: skew(15deg, -1deg) rotate(15deg) translateX(1rem);
    top: 4rem;
    width: 92%;
}
.card::after {
    background: linear-gradient(180deg, #ff7e46 0%, #f04646 100%);
    transform: skew(10deg, -3deg) rotate(10deg) translateX(2rem);
    top: 1.5rem;
}

input,
textarea {
    outline: none;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <section class="relative flex flex-col justify-center items-center" id="top">
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col gap-4 text-7xl">
                    <span class="kalameh_bold font-bold">همکاری با ما</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>همکاری با ما</li>
                </ul>
            </div>
            <img class="" src="/pages/work-with-us/team.webp" alt="porteqali-team" style="max-height: 1920px" />
        </section>
        <section class="flex flex-col items-center gap-8 w-full max-w-screen-lg">
            <div class="flex flex-col gap-2 ml-auto mb-8">
                <strong class="font-bold text-3xl">دوست عزیزم سلام</strong>
                <p class="text-lg" style="line-height: 2rem">
                    از اینکه گروه آموزشی پرتقال رو برای همکاری انتخاب کردی بینهایت خوشحالیم، ما در گروه آموزشی پرتقال سعی کردیم بهترین و باکیفیت ترین آموزش های ایران
                    رو خدمت تمام علاقمندان به حوزه کامپیوتر و تکنولوژی تقدیم کنیم. پس اگه فک میکنی که از صدا ، لحن بیان ، علم و کیفیت کار خوبی توی یک یا چند حوزه خاص
                    تکنولوژی برخورداری بدون معطلی رزومه و شماره تماس خودت رو توی کادر توضیحات زیر برای ما ارسال کن تا همکاران ما در اسرع وقت باهات تماس بگیرن و
                    درصورت امکان با هم برای کمک به حوزه آی تی ایران عزیزمون تلاش کنیم.
                </p>
            </div>
            <div class="flex flex-wrap justify-center items-start lg:justify-between gap-16 lg:gap-20 w-full">
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
                        <label class="">عنوان پیشنهادی برای تدریس</label>
                        <input type="text" v-model="issue" placeholder="" class="p-3 w-full rounded-xl shadow-xl" />
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
                        v-if="!sent"
                    >
                        <div class="flex items-center justify-center gap-2" v-if="!sending">
                            <span class="font-bold">ارسال پیام</span>
                            <img src="/icons/Send.svg" alt="Send" width="24" height="24" />
                        </div>
                        <img src="/icons/TimeCircle.line.svg" alt="loading" width="32" height="32" v-else />
                    </button>
                    <div>
                        <p class="max-w-md">
                            توجه کنید که سابقه تدریس ویدئویی و ضبط فیلم بسیار مهم است، حتما در صورتی که تجربه ضبط آموزش و تجهیزات آن را دارید با ما در ارتباط باشید
                        </p>
                    </div>
                </form>
                <div class="flex flex-col gap-4">
                    <h3 class="text-2xl text-center font-bold">نظر مدرسین پرتقال</h3>
                    <div class="card w-full max-w-md rounded-3xl p-8" v-if="!testimonialsLoading && testimonials.length > 0">
                        <div v-swiper="testimonialsSwiperOptions" class="w-full max-w-md select-none overflow-hidden">
                            <ul class="swiper-wrapper flex w-max">
                                <li class="swiper-slide flex flex-wrap items-center gap-4 p-4 max-w-sm w-full" v-for="(testimonial, i) in testimonials" :key="i">
                                    <img class="w-28 h-28 rounded-full" :src="testimonial.image" :alt="testimonial.fullname" />
                                    <div class="flex flex-col items-start gap-2">
                                        <b class="font-bold text-2xl">{{ testimonial.fullname }}</b>
                                        <span>{{ testimonial.title }}</span>
                                    </div>
                                    <p class="max-w-md my-8">{{ testimonial.comment }}</p>
                                </li>
                            </ul>
                            <div class="swiper-pagination swiper-pagination-bullets"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import { mask } from "vue-the-mask";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
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
            sent: false,

            testimonialsLoading: "",
            testimonials: ["", "", "", ""],
            testimonialsSwiperOptions: {
                autoplay: 3000,
                slidesPerView: 1,
                initialSlide: 0,
                spaceBetween: 32,
                loop: false,
                freeMode: false,
                pagination: ".swiper-pagination",
            },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMetadata("work-with-us"), this.getTestimonials({ headers })]);
    },
    methods: {
        async send(e) {
            e.preventDefault();
            if (this.sending) return;
            this.sending = true;

            this.message = "";

            await axios
                .post(`/api/collaborate-request`, {
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
                    this.sent = true;
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

        async getTestimonials(data = {}) {
            if (this.testimonialsLoading) return;
            this.testimonialsLoading = true;

            let url = `/api/testimonials?showFor=teacher`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.testimonials = results.data.records;
                })
                .catch((e) => {})
                .finally(() => (this.testimonialsLoading = false));
        },
    },
};
</script>
