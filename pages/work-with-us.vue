<style scoped>
.background {
    background: linear-gradient(233.4deg, #ffa825 11.05%, rgba(255, 112, 215, 0.34) 100.55%);
}

.testimonial_slide {
    max-width: 286px;
}

input,
textarea {
    outline: none;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 w-full max-w-screen-2xl mt-24 md:mt-24 px-4 md:px-8">
        <section class="relative flex flex-wrap lg:flex-nowrap justify-center items-center">
            <div class="flex flex-col gap-10 text-bluegray-900">
                <h1 class="title flex flex-col gap-4 kalameh_bold text-4xl lg:text-5xl w-max">همکاری با ما</h1>
                <p class="w-full max-w-xl text-sm md:text-base" style="line-height: 2rem">
                    از اینکه گروه آموزشی پرتقال رو برای همکاری انتخاب کردی بینهایت خوشحالیم، ما در گروه آموزشی پرتقال سعی کردیم بهترین و باکیفیت ترین آموزش های ایران
                    رو خدمت تمام علاقمندان به حوزه کامپیوتر و تکنولوژی تقدیم کنیم. پس اگه فک میکنی که از صدا ، لحن بیان ، علم و کیفیت کار خوبی توی یک یا چند حوزه خاص
                    تکنولوژی برخورداری بدون معطلی رزومه و شماره تماس خودت رو توی کادر توضیحات زیر برای ما ارسال کن تا همکاران ما در اسرع وقت باهات تماس بگیرن و
                    درصورت امکان با هم برای کمک به حوزه آی تی ایران عزیزمون تلاش کنیم.
                </p>
            </div>
            <img class="w-full max-w-xl" src="/pages/work-with-us/team.webp" alt="porteqali-team" />
        </section>

        <span class="w-11/12 h-0.5 spacer_v"></span>

        <section class="relative flex flex-col items-center gap-8 w-full max-w-screen-xl">
            <h2 class="title kalameh_bold text-3xl">از طریق فرم زیر درخواست رو ثبت کن</h2>
            <div class="flex items-end justify-center w-full">
                <form class="flex flex-col items-center gap-6 w-full max-w-screen-sm shadow-xl rounded-2xl bg-white p-6 lg:px-16 z-10" @submit="send($event)">
                    <div class="flex items-center gap-4 w-full">
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">نام</label>
                            <input type="text" v-model="name" placeholder="" dir="auto" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl" />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">نام خانوادگی</label>
                            <input type="text" v-model="family" placeholder="" dir="auto" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl" />
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
                                class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl"
                            />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label class="">ایمیل</label>
                            <input
                                type="email"
                                v-model="email"
                                placeholder="email@example.com"
                                dir="auto"
                                class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl"
                            />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">عنوان پیشنهادی برای تدریس</label>
                        <input type="text" v-model="issue" placeholder="" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="">توضیحات</label>
                        <textarea type="text" v-model="text" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl resize-none" rows="5"></textarea>
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
                            <span class="font-bold">ثبت درخواست همکاری</span>
                            <Icon class="w-6 h-6 bg-gray-100" size="24px" folder="icons/new" name="Send" />
                        </div>
                        <img src="/icons/TimeCircle.line.svg" alt="loading" width="32" height="32" v-else />
                    </button>
                    <p class="max-w-md text-xs text-center py-2">
                        توجه کنید که سابقه تدریس ویدئویی و ضبط فیلم بسیار مهم است، حتما در صورتی که تجربه ضبط آموزش و تجهیزات آن را دارید با ما در ارتباط باشید
                    </p>
                    <div class="text-sm">
                        <p>
                            لطفا قبل از ارسال پیام،
                            <nuxt-link title="سوالات متداول" to="/faqs" class="underline text-orange-700">سوالات متداول</nuxt-link>
                            را مطالعه نمایید
                        </p>
                    </div>
                </form>
                <div class="background absolute sm:relative flex items-end justify-end w-full max-w-3xl rounded-2xl pt-16 -mr-96 -mb-6">
                    <img src="/pages/work-with-us/bg.png" alt="bg" />
                </div>
            </div>
        </section>

        <span class="w-11/12 h-0.5 spacer_v"></span>

        <section class="flex flex-col items-center gap-2 w-full max-w-screen-xl mb-16">
            <h3 class="kalameh_bold text-2xl text-center font-bold">برخی از نظرات اساتید پرتقال</h3>
            <div class="flex items-center gap-2 md:gap-4 w-full" v-if="!testimonialsLoading && testimonials.length > 0">
                <button class="hidden md:flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-prev">
                    <img src="/icons/new/ArrowRight3.svg" width="24" />
                </button>
                <div v-swiper="testimonialsSwiperOptions" class="w-full select-none overflow-hidden py-8 px-0 md:px-4">
                    <ul class="swiper-wrapper flex w-full">
                        <li
                            class="testimonial_slide swiper-slide flex flex-col items-start gap-4 p-4 w-screen flex-shrink-0 rounded-2xl shadow-xl bg-white ml-4"
                            v-for="(testimonial, i) in testimonials"
                            :key="i"
                        >
                            <p class="max-w-xs text-sm">{{ testimonial.comment }}</p>
                            <div class="flex flex-wrap items-start gap-2 lg:-mb-10">
                                <img
                                    class="orange_gradient_h p-1 w-16 md:w-20 h-16 md:h-20 rounded-full object-cover"
                                    :src="testimonial.image"
                                    :alt="testimonial.fullname"
                                />
                                <div class="flex flex-col items-start">
                                    <b class="kalameh_bold text-lg">{{ testimonial.fullname }}</b>
                                    <span class="text-sm text-amber-500">{{ testimonial.title }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="swiper-pagination swiper-pagination-bullets"></div>
                </div>
                <button class="hidden md:flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-next">
                    <img src="/icons/new/ArrowLeft3.svg" width="24" />
                </button>
            </div>
            <div class="flex items-center justify-center gap-2 swiper-pagination2 swiper-pagination-bullets"></div>
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
                slidesPerView: "auto",
                initialSlide: 1,
                // spaceBetween: 32,
                loop: true,
                // freeMode: true,
                pagination: ".swiper-pagination",
                prevButton: ".swiper-prev",
                nextButton: ".swiper-next",
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
