<style>
body {
    margin: 0 auto;
    width: 100vw;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0;
    background-color: var(--body-bg-color);
}

.nuxt_main {
    /* relative flex flex-col items-center justify-start overflow-x-hidden w-full */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    width: 100vw;
}

header {
    color: var(--header-nav-text-color);
}

.footer_container {
    /* box-shadow: inset 0px -200px 70px -50px var(--body-bg-color); */
    z-index: 5;
}
.footer_bg {
    bottom: -20%;
    left: 0;
    margin-right: -10%;
    margin-bottom: 0;
    min-width: 768px;
    z-index: -1;
    position: fixed;
}
footer {
    color: var(--header-nav-text-color);
    background-color: var(--header-nav-container-bg-color);
}
.go_up_btn {
    margin-left: 10%;
    z-index: 5;
}

.newsletter_box {
    background-color: var(--search-box-bg-color);
    color: var(--search-box-color);
}
.newsletter_box button {
    color: var(--search-box-button-color);
}
</style>

<template>
    <div class="nuxt_main px-4 md:px-8 lg:px-12" dir="rtl" ref="body" id="app">
        <header class="flex items-center justify-between gap-8 py-8 w-full max-w-screen-4xl z-20">
            <nuxt-link to="/" class="flex-shrink-0">
                <img v-if="!!$nuxt.$route.matched[0] && !!topBackground[$nuxt.$route.matched[0].path]" src="/logo_white.png" alt="پرتقال" />
                <img v-else src="/logo_orange.png" alt="پرتقال" />
            </nuxt-link>
            <Menu />
        </header>

        <Background
            v-if="!!$nuxt.$route.matched[0] && !!topBackground[$nuxt.$route.matched[0].path]"
            :src="topBackground[$nuxt.$route.matched[0].path].src"
            :topOffset="topBackground[$nuxt.$route.matched[0].path].topOffset"
            :rightOffset="topBackground[$nuxt.$route.matched[0].path].rightOffset"
            :minWidth="topBackground[$nuxt.$route.matched[0].path].minWidth"
        />

        <Nuxt class="z-10" nuxt-child-key="default" />

        <div class="footer_container w-full mt-32">
            <button class="go_up_btn orange_gradient_v relative flex items-center justify-center rounded-xl p-6 -mb-8 mr-auto" @click="scrollUp()">
                <img src="/icons/GoUp.svg" alt="GoUp" width="16" height="16" />
            </button>
            <footer class="blur flex flex-col items-center gap-4 max-w-screen-4xl shadow-xl w-full rounded-3xl mb-4 p-4 lg:p-8 z-10">
                <div class="flex flex-wrap items-center justify-evenly gap-16 w-full">
                    <div class="flex flex-col gap-4">
                        <h4 class="font-bold text-2xl">همراه پرتقال</h4>
                        <ul class="flex flex-wrap flex-row lg:flex-col gap-6 lg:gap-2">
                            <li><nuxt-link to="/blog">وبلاگ پرتقال</nuxt-link></li>
                            <li><nuxt-link to="/departments">دپارتمان ها</nuxt-link></li>
                            <li><nuxt-link to="/about-us">درباره ما</nuxt-link></li>
                            <li><nuxt-link to="/contact-us">تماس با ما</nuxt-link></li>
                            <li><nuxt-link to="/work-with-us">همکاری با ما</nuxt-link></li>
                            <li><nuxt-link to="/faqs">سوالات متداول</nuxt-link></li>
                            <li><nuxt-link to="/terms-and-conditions">قوانین و مقررات</nuxt-link></li>
                            <li><nuxt-link to="/privacy-policy">حریم خصوصی</nuxt-link></li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-6">
                        <img class="w-max" src="/logo_orange.png" height="50" alt="پرتقال" />
                        <p class="max-w-screen-xs">
                            لورم چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
                            بهبود ابزارهای کاربردی.می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                        </p>
                        <div class="flex flex-col gap-2">
                            <b class="text-xl">مشاوره تلفنی</b>
                            <div class="flex items-center gap-1">
                                <a class="text-xl lg:text-2xl" href="tel:229081212">229081212</a>
                                <img src="/icons/Calling.orange.line.svg" alt="Calling" width="24" height="24" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col gap-2">
                            <h4 class="font-bold text-2xl">عضویت در خبرنامه</h4>
                            <div class="newsletter_box flex items-center gap-4 p-2 rounded-xl shadow-lg">
                                <input class="flex-grow outline-none bg-transparent w-40 md:w-60" type="text" placeholder="ایمیل خود را وارد کنید" />
                                <button class="orange_gradient_v flex-shrink-0 p-2 md:px-8 rounded-xl shadow-lg flex items-center justify-center">
                                    <span>ثبت نام</span>
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <span class="bg-white shadow-xl p-2 rounded-xl">
                                <a target="_blank" rel="nofollow" href="https://trustseal.enamad.ir/?id=188225&Code=U2OkUKhLJGtzDqjP0Iq1">
                                    <img src="https://Trustseal.eNamad.ir/logo.aspx?id=188225&Code=U2OkUKhLJGtzDqjP0Iq1" id="U2OkUKhLJGtzDqjP0Iq1" />
                                </a>
                            </span>
                            <span class="bg-white shadow-xl p-2 rounded-xl">
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
        </div>

        <img class="footer_bg absolute w-full max-w-screen-4xl opacity-75" src="/backgrounds/Background.footer.webp" alt="Background.footer" />
    </div>
</template>

<script>
import Menu from "~/components/header/Menu.vue";

export default {
    name: "Default.layout",
    head: {
        title: "گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "گروه آموزشی پرتقال" }],
    },
    components: {
        Menu,
    },
    data() {
        return {
            topBackground: {
                "": { src: "/backgrounds/Background.png", topOffset: 0, rightOffset: -10, minWidth: 2220 },
                "/privacy-policy": { src: "/backgrounds/Background2.png", topOffset: -20, rightOffset: -15, minWidth: 2420 },
                "/terms-and-conditions": { src: "/backgrounds/Background2.png", topOffset: -20, rightOffset: -15, minWidth: 2420 },
                "/about-us": { src: "/backgrounds/Background2.png", topOffset: -20, rightOffset: -15, minWidth: 2420 },
                "/contact-us": { src: "/backgrounds/Background2.png", topOffset: -20, rightOffset: -15, minWidth: 2420 },
                "/work-with-us": { src: "/backgrounds/Background4.png", topOffset: 0, rightOffset: 0, minWidth: 2220 },
                "/faqs": { src: "/backgrounds/Background5.png", topOffset: -15, rightOffset: -10, minWidth: 2420 },
                "/blog/:page?": { src: "/backgrounds/Background3.png", topOffset: -30, rightOffset: -80, minWidth: 3220 },
                "/blog": { src: "/backgrounds/Background3.png", topOffset: -30, rightOffset: -80, minWidth: 3220 },
            },
        };
    },
    mounted() {
        if (process.client && window) {
            window.history.scrollRestoration = "auto";
        }
    },
    methods: {
        scrollUp() {
            window.scrollTo({ top: 0 });
        },
    },
};
</script>
