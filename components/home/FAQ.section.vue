<style scoped>
.card {
    background-color: var(--faq-section-card-bg-color);
    color: var(--faq-section-card-color);
}
.card h4 {
    color: var(--faq-section-card-title-color);
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="department">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <h3 class="font-bold text-4xl">سوالات متداول</h3>
        </div>
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
                        <p v-show="faq.open">{{ faq.answer }}</p>
                    </transition>
                </div>
                <transition name="fade" mode="out-in" appear>
                    <img src="/icons/ArrowUpCircle.line.svg" alt="ArrowUpCircle" v-if="faq.open" />
                    <img src="/icons/ArrowDownCircle.line.svg" alt="ArrowDownCircle" v-else />
                </transition>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: "FaqSection",
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
};
</script>
