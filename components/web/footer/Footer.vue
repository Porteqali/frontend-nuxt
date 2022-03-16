<style scoped>
.goToTop {
    position: absolute !important;
}
.pikaboo {
    position: absolute;
    top: -154px;
    right: 83%;
}

.box {
    content: "";
    position: absolute;
    width: 6rem;
    height: 6rem;
    border-radius: 1.5rem;
    opacity: 75%;
    background: linear-gradient(87.25deg, #ffa825 -11.51%, #ff70d7 114.56%);
    transform: rotate(-30deg);
}

.quick_access ul li:first-child::before {
    content: "";
    width: 2rem;
    height: 2rem;
    opacity: 55%;
    position: absolute;
    z-index: -1;
    background: linear-gradient(87.25deg, #ffa825 -11.51%, #ff70d7 114.56%);
    border-radius: 0.5rem;
    transform: rotate(-30deg);
}
</style>

<template>
    <div class="flex flex-col items-center py-4 bg-warmgray-700 bg-opacity-95 text-white relative w-screen mt-10">
        <img class="pikaboo absolute" src="/misc/pikaboo.png" alt="pikaboo" />
        <footer class="relative flex flex-col items-center gap-4 w-full max-w-screen-2xl px-4 md:px-8 z-10">
            <button class="goToTop left-0 -top-8 orange_gradient_h flex items-center justify-center rounded-full p-6" @click="scrollUp()">
                <img src="/icons/GoUp.svg" alt="GoUp" width="16" height="16" />
            </button>
            <div class="box right-2 -top-8"></div>
            <div class="flex flex-wrap items-center justify-between gap-10 w-full max-w-screen-2xl">
                <div class="relative flex flex-col gap-4 bg-white border-8 border-solid border-warmgray-300 rounded-2xl p-4">
                    <img class="w-max h-10" src="/logo_mark.svg" alt="پرتقال" />
                    <p class="text-warmgray-800 w-full md:max-w-sm text-sm">
                        بهمن 1396 بود که تولید فیلم آموزشی فارسی زبان را شروع کردیم و مفتخریم این روز ها عنوان یکی از بزرگترین و معتبر ترین وب سایت های آموزش ویدئویی
                        کشور از دید شما کاربران عزیز را به خود اختصاص داده ایم. صدها مدرس متخصص و هزاران ویدئو آموزشی با کیفیت برای شما فراهم کرده ایم تا لحظات و
                        خاطرات آینده ساز و آرامش بخشی را با آموزش های ما تجربه کنید.
                    </p>
                    <nuxt-link class="flex items-center gap-1 text-orange-400 hover:underline w-max" to="/about-us">
                        درباره پرتقال
                        <Icon class="w-6 h-6 bg-orange-400" size="24px" folder="icons/new" name="ArrowLeft3" />
                    </nuxt-link>
                </div>
                <div class="quick_access flex flex-wrap md:flex-nowrap items-start justify-evenly md:justify-between px-4 md:px-0 gap-8 flex-grow">
                    <ul class="flex flex-col gap-4 flex-shrink-0">
                        <li><h5 class="kalameh_bold text-lg">همراه پرتقال</h5></li>
                        <li><nuxt-link title="وبلاگ پرتقال" to="/blog">وبلاگ</nuxt-link></li>
                        <li><nuxt-link title="دپارتمان ها" to="/department">دپارتمان ها</nuxt-link></li>
                        <li><nuxt-link title="همکاری با ما" to="/work-with-us">همکاری با ما</nuxt-link></li>
                    </ul>
                    <ul class="flex flex-col gap-4 flex-shrink-0">
                        <li><h5 class="kalameh_bold text-lg">خدمات مشتریان</h5></li>
                        <li><nuxt-link title="سوالات متداول" to="/faqs">سوالات متداول</nuxt-link></li>
                        <li><nuxt-link title="قوانین و مقررات" to="/terms-and-conditions">قوانین و مقررات</nuxt-link></li>
                        <li><nuxt-link title="حریم خصوصی" to="/privacy-policy">حریم خصوصی</nuxt-link></li>
                    </ul>
                    <ul class="flex flex-col gap-4 flex-shrink-0">
                        <li><h5 class="kalameh_bold text-lg">تماس با ما</h5></li>
                        <li><nuxt-link title="تماس با ما" to="/contact-us">ارسال پیام</nuxt-link></li>
                        <li class="flex items-center gap-1">
                            <Icon class="w-5 h-5 bg-gray-100" size="20px" folder="icons/new" name="Calling" />
                            <span>شماره تماس :</span>
                            <a title="شماره تماس پرتقال" :href="`tel:${contact_info.tel}`">{{ contact_info.tel }}</a>
                        </li>
                        <li class="flex items-center gap-1">
                            <Icon class="w-5 h-5 bg-gray-100" size="20px" folder="icons/new" name="Message" />
                            <span>آدرس ایمیل :</span>
                            <a title="آدرس ایمیل پرتقال" :href="`mailto:${contact_info.email}`">{{ contact_info.email }}</a>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-row items-start justify-between md:flex-col w-full md:w-max gap-6">
                    <ul class="flex flex-wrap items-center gap-4">
                        <li v-if="contact_info.socials && contact_info.socials.telegram">
                            <a :href="contact_info.socials.telegram"><img class="w-8 h-8" src="/social/telegram.png" alt="telegram" /></a>
                        </li>
                        <li v-if="contact_info.socials && contact_info.socials.instagram">
                            <a :href="contact_info.socials.instagram"><img class="w-8 h-8" src="/social/instagram.png" alt="instagram" /></a>
                        </li>
                    </ul>
                    <div class="flex flex-wrap gap-4">
                        <span class="bg-white shadow-xl p-1 rounded-xl w-24">
                            <a target="_blank" rel="nofollow" href="https://trustseal.enamad.ir/?id=188225&Code=U2OkUKhLJGtzDqjP0Iq1">
                                <img src="https://Trustseal.eNamad.ir/logo.aspx?id=188225&Code=U2OkUKhLJGtzDqjP0Iq1" id="U2OkUKhLJGtzDqjP0Iq1" />
                            </a>
                        </span>
                        <span class="bg-white shadow-xl p-1 rounded-xl w-24">
                            <img src="/misc/namad.png" alt="پروانه نشر دیجیتال" />
                        </span>
                    </div>
                </div>
            </div>
            <hr class="w-full border-t-2 border-b-0 border-amber-500 opacity-75" />
            <div class="flex flex-col items-center gap-2">
                <p class="text-justify text-xs opacity-75">
                    کلیه حقوق مادی و معنوی این وبسایت متعلق به گروه آموزشی پرتقال است. ضوابط حاکم بر وبسایت پرتقال، مبتنی بر قوانین جاری جمهوری اسلامی ایران است.
                </p>
                <small class="opacity-60" dir="ltr">
                    <pre wrap="true">Porteqali.com All Rights Reserved. Copyright {{ new Date(Date.now()).getFullYear() }} ©</pre>
                </small>
            </div>
        </footer>
    </div>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";

export default {
    name: "Footer",
    components: {
        Icon,
    },
    data() {
        return {
            contact_info: this.contact_info || {},
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getContactInfo({ headers })]);
    },
    methods: {
        scrollUp() {
            window.scrollTo({ top: 0 });
        },

        async getContactInfo(data = {}) {
            let url = `/api/contact-info`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.contact_info = results.data))
                .catch((e) => {});
        },
    },
};
</script>
