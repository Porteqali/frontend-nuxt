<style scoped>
#top h1,
#top ul {
    color: var(--top-h1-color);
    font-weight: 900;
}
.search_box {
    background-color: var(--search-box-bg-color);
    color: var(--search-box-color);
}
.search_box button {
    color: var(--search-box-button-color);
}
.category_card {
    background-color: #000c7888;
    color: var(--top-h1-color);
}

.card {
    background-color: var(--faq-section-card-bg-color);
    color: var(--faq-section-card-color);
}
.card h4 {
    color: var(--faq-section-card-title-color);
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <section class="relative flex flex-wrap-reverse justify-evenly gap-8 lg:gap-20" id="top">
            <img class="" src="/pages/faqs/ResearchMan.png" alt="porteqali-PhoneCallMan" style="max-height: 1920px" />
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col gap-4 text-7xl">
                    <span class="kalameh_bold font-bold">سوالات متداول</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>سوالات متداول</li>
                </ul>
                <div class="search_box flex items-center gap-4 p-2 rounded-xl shadow-lg">
                    <input class="flex-grow outline-none bg-transparent w-64" type="text" placeholder="جستجو..." />
                    <button class="orange_gradient_v flex-shrink-0 p-2 md:px-8 rounded-xl shadow-lg flex items-center justify-center">
                        <span class="hidden md:inline-block">جستجو</span>
                        <img class="flex-shrink-0 inline-block md:hidden" src="/icons/Search.svg" width="24" height="24" alt="Search" />
                    </button>
                </div>
            </div>
        </section>

        <ul class="flex flex-wrap justify-center gap-8 w-full max-w-screen-xl mx-auto -mt-52">
            <li class="category_card blur flex flex-col items-center justify-center gap-4 p-8 px-16 rounded-2xl" @click="selectCategory()">
                <img src="/pages/faqs/Book.svg" width="128" height="128" alt="Book" />
                <strong class="text-2xl">آموزش</strong>
            </li>
            <li class="category_card blur flex flex-col items-center justify-center gap-4 p-8 px-16 rounded-2xl" @click="selectCategory()">
                <img src="/pages/faqs/Window.svg" width="128" height="128" alt="Window" />
                <strong class="text-2xl">پشتیبانی</strong>
            </li>
            <li class="category_card blur flex flex-col items-center justify-center gap-4 p-8 px-16 rounded-2xl" @click="selectCategory()">
                <img src="/pages/faqs/Mail.svg" width="128" height="128" alt="Mail" />
                <strong class="text-2xl">همکاری</strong>
            </li>
            <li class="category_card blur flex flex-col items-center justify-center gap-4 p-8 px-16 rounded-2xl" @click="selectCategory()">
                <img src="/pages/faqs/Wallet.svg" width="128" height="128" alt="Wallet" />
                <strong class="text-2xl">کارت اعتباری</strong>
            </li>
        </ul>

        <section class="flex flex-col items-center gap-8 w-full max-w-screen-xl">
            <ul class="flex flex-col items-center gap-8">
                <li
                    class="card shadow-xl flex items-center gap-8 p-8 w-full rounded-2xl max-w-screen-xl"
                    v-for="(faq, i) in faqs"
                    :key="i"
                    @click="faq.open = !faq.open"
                >
                    <span class="flex items-center justify-center w-10 h-10 p-4 rounded-full bg-indigo-100">{{ i + 1 }}</span>
                    <div class="flex flex-col gap-4 flex-grow w-full">
                        <h4 class="md:text-xl">{{ faq.question }}</h4>
                        <transition name="slidedown" mode="out-in" appear>
                            <p class="max-w-screen-md" v-show="faq.open">{{ faq.answer }}</p>
                        </transition>
                    </div>
                    <transition name="fade" mode="out-in" appear>
                        <img src="/icons/ArrowUpCircle.line.svg" alt="ArrowUpCircle" v-if="faq.open" />
                        <img src="/icons/ArrowDownCircle.line.svg" alt="ArrowDownCircle" v-else />
                    </transition>
                </li>
            </ul>
        </section>
    </main>
</template>

<script>
export default {
    head: {
        title: "سوالات متداول - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: {},
    data() {
        return {
            faqs: [
                {
                    question: "آیا برای استفاده از دوره ها نیاز به ثبت نام در سایت دارم؟",
                    answer: "بله ، برای استفاده از تمام خدمات سایت اعم از استفاده از دوره ، دانلود فایل های دوره و پرسش از استاد حتما باید در سایت ثبت نام کنید.",
                    open: false,
                },
                {
                    question: "بعد از ثبت نام با پیغام تایید حساب کاربری مواجه میشوم . آیا حتما باید حساب خود را تایید کنم؟",
                    answer: "بله ، برای استفاده از تمام خدمات سایت اعم از استفاده از دوره ، دانلود فایل های دوره و پرسش از استاد حتما باید در سایت ثبت نام کنید.",
                    open: false,
                },
                {
                    question: "در صورت ثبت نام در دوره ، آموزش موردنظر تا چندروز قابل استفاده خواهد بود؟",
                    answer: "بله ، برای استفاده از تمام خدمات سایت اعم از استفاده از دوره ، دانلود فایل های دوره و پرسش از استاد حتما باید در سایت ثبت نام کنید.",
                    open: false,
                },
                {
                    question: "چطوری میتونم دوره های آموزشی رو دانلود کنم؟",
                    answer: "بله ، برای استفاده از تمام خدمات سایت اعم از استفاده از دوره ، دانلود فایل های دوره و پرسش از استاد حتما باید در سایت ثبت نام کنید.",
                    open: false,
                },
                {
                    question: "اگر حین آموزش سوالی پیش بیاد چطوری میتونم به جوابش برسم؟",
                    answer: "بله ، برای استفاده از تمام خدمات سایت اعم از استفاده از دوره ، دانلود فایل های دوره و پرسش از استاد حتما باید در سایت ثبت نام کنید.",
                    open: false,
                },
            ],
        };
    },
    methods: {
        selectCategory() {},
    },
};
</script>
