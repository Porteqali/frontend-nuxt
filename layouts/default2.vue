<style scoped>
.nuxt_main {
    background-color: var(--body-bg-color);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    overflow: hidden;
}

header {
    color: var(--header-nav-text-color);
}

.footer_container {
    /* box-shadow: inset 0px -200px 70px -50px var(--body-bg-color); */
    z-index: 5;
}
.footer_bg {
    bottom: 0;
    /* right: 10%; */
    width: 70%;
    margin-right: -10%;
    margin-bottom: 0;
    min-width: 768px;
    max-width: 1280px;
    z-index: -1;
    position: absolute;

    /* position: fixed; */
    /* left: 20%; */
}
footer {
    background-color: #fff;
    color: #333;
}
.go_up_btn {
    margin-left: 10%;
    z-index: 5;
}
</style>

<template>
    <div class="nuxt_main px-4 md:px-8 lg:px-12" dir="rtl" ref="body" id="app">
        <Banner :data="banner" v-if="!!banner && banner.status == 'active'" />

        <header class="flex items-center justify-between gap-8 py-8 w-full max-w-screen-4xl z-20">
            <nuxt-link title="پرتقال" to="/" class="flex-shrink-0">
                <img src="/logo_orange.svg" alt="پرتقال" />
            </nuxt-link>
            <Menu />
        </header>

        <Nuxt class="z-10" nuxt-child-key="default" />

        <div class="footer_container relative w-full mt-20">
            <button class="go_up_btn orange_gradient_v relative flex items-center justify-center rounded-xl p-6 -mb-8 mr-auto shadow-md" @click="scrollUp()">
                <img src="/icons/GoUp.svg" alt="GoUp" width="16" height="16" />
            </button>
            <footer class="flex flex-col items-center gap-4 max-w-screen-4xl shadow-xl w-full rounded-3xl mx-auto mb-4 p-4 lg:p-8 z-10">
                <div class="flex flex-wrap items-center justify-evenly gap-16 w-full">
                    <div class="flex flex-col gap-4 p-6 lg:p-0">
                        <h4 class="font-bold text-2xl">همراه پرتقال</h4>
                        <ul class="flex flex-wrap flex-row lg:flex-col gap-6 lg:gap-2">
                            <li><nuxt-link title="وبلاگ پرتقال" to="/blog">وبلاگ پرتقال</nuxt-link></li>
                            <li><nuxt-link title="دپارتمان ها" to="/department">دپارتمان ها</nuxt-link></li>
                            <li><nuxt-link title="درباره ما" to="/about-us">درباره ما</nuxt-link></li>
                            <li><nuxt-link title="تماس با ما" to="/contact-us">تماس با ما</nuxt-link></li>
                            <li><nuxt-link title="همکاری با ما" to="/work-with-us">همکاری با ما</nuxt-link></li>
                            <li><nuxt-link title="سوالات متداول" to="/faqs">سوالات متداول</nuxt-link></li>
                            <li><nuxt-link title="قوانین و مقررات" to="/terms-and-conditions">قوانین و مقررات</nuxt-link></li>
                            <li><nuxt-link title="حریم خصوصی" to="/privacy-policy">حریم خصوصی</nuxt-link></li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-6">
                        <img class="w-max" src="/logo_orange.svg" height="50" alt="پرتقال" />
                        <p class="max-w-screen-xs">
                            لورم چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
                            بهبود ابزارهای کاربردی.می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                        </p>
                        <div class="flex flex-col gap-2">
                            <b class="text-xl">مشاوره تلفنی</b>
                            <div class="flex items-center gap-1">
                                <a class="text-xl lg:text-2xl" :href="`tel:${contact_info.tel}`">{{ contact_info.tel }}</a>
                                <img src="/icons/Calling.orange.line.svg" alt="Calling" width="24" height="24" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-6">
                        <Newsletter />
                        <div class="flex flex-wrap gap-4">
                            <span class="bg-white shadow-xl p-2 rounded-xl w-32">
                                <a target="_blank" rel="nofollow" href="https://trustseal.enamad.ir/?id=188225&Code=U2OkUKhLJGtzDqjP0Iq1">
                                    <img src="https://Trustseal.eNamad.ir/logo.aspx?id=188225&Code=U2OkUKhLJGtzDqjP0Iq1" id="U2OkUKhLJGtzDqjP0Iq1" />
                                </a>
                            </span>
                            <span class="bg-white shadow-xl p-2 rounded-xl w-32">
                                <img src="/misc/namad.png" alt="پروانه نشر دیجیتال" />
                            </span>
                        </div>
                    </div>
                </div>
                <hr class="w-full max-w-screen-xl my-4 opacity-70" />
                <p class="text-justify text-xs md:text-sm">
                    کلیه حقوق مادی و معنوی این وبسایت متعلق به گروه آموزشی پرتقال است. ضوابط حاکم بر وبسایت پرتقال، مبتنی بر قوانین جاری جمهوری اسلامی ایران است.
                </p>
                <small dir="ltr">
                    <pre wrap="true">Porteqali.com All Rights Reserved. Copyright {{ new Date(Date.now()).getFullYear() }} ©</pre>
                </small>
            </footer>
            <img class="footer_bg absolute opacity-75" src="/backgrounds/Background.footer2.png" alt="Background.footer" />
        </div>
        <!-- <img class="footer_bg absolute opacity-75" src="/backgrounds/Background.footer2.png" alt="Background.footer" /> -->

        <Toast />
    </div>
</template>

<script>
import axios from "axios";
import Menu from "~/components/web/header/Menu2.vue";
import Newsletter from "~/components/web/footer/Newsletter.vue";
import Toast from "~/components/Toast.vue";
import Background from "~/components/web/Background.vue";
import Banner from "~/components/web/Banner.vue";

export default {
    name: "Default.layout",
    head() {
        return {
            title: "گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "گروه آموزشی پرتقال" }],
        };
    },
    components: {
        Menu,
        Newsletter,
        Toast,
        Background,
        Banner,
    },
    data() {
        return {
            contact_info: this.contact_info || {},
            banner: this.banner || {},
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getContactInfo({ headers }), this.getBanner({ headers })]);
    },
    mounted() {
        if (process.client && window) {
            window.history.scrollRestoration = "auto";
        }

        // TODO : uncomment this
        // rayChat register
        // this.raychatInit();

        // load back cart list info
        let cartList = localStorage.getItem("cart");
        if (cartList) {
            try {
                cartList = JSON.parse(cartList);
                for (const item in cartList) this.$store.dispatch("cart/addItemToCart", { item: { ...cartList[item] } });
            } catch (e) {}
        }
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

        async getBanner(data = {}) {
            let url = `/api/banner`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.banner = results.data))
                .catch((e) => {});
        },

        raychatInit() {
            if (typeof window !== "undefined") {
                !(function () {
                    function t() {
                        var t = document.createElement("script");
                        (t.type = "text/javascript"),
                            (t.async = !0),
                            localStorage.getItem("rayToken")
                                ? (t.src = "https://app.raychat.io/scripts/js/" + o + "?rid=" + localStorage.getItem("rayToken") + "&href=" + window.location.href)
                                : (t.src = "https://app.raychat.io/scripts/js/" + o + "?href=" + window.location.href);
                        var e = document.getElementsByTagName("script")[0];
                        e.parentNode.insertBefore(t, e);
                    }
                    var e = document,
                        a = window,
                        o = "87076991-6e3c-4d73-a795-ce9cab0a21b2";
                    "complete" == e.readyState ? t() : a.attachEvent ? a.attachEvent("onload", t) : a.addEventListener("load", t, !1);
                })();
            }
        },
    },
};
</script>
