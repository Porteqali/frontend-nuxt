<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <!-- <Background src="/backgrounds/Background2.png" :topOffset="-30" :rightOffset="-10" :minWidth="2420" /> -->

        <section class="relative flex flex-wrap justify-evenly gap-8 lg:gap-20" id="top">
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col gap-4 text-7xl">
                    <span class="kalameh_bold font-bold">حریم خصوصی</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>حریم خصوصی</li>
                </ul>
            </div>
        </section>

        <article class="w-full p-8 mt-20 rounded-2xl max-w-screen-lg shadow-2xl z-10 bg-white">
            <p>
                پرتقال با تاکید بر احترامی که برای حریم شخصی کاربران قائل است، برای سفارش، ثبت نظر یا استفاده از برخی امکانات وب سایت اطلاعاتی را از کاربران درخواست
                می‌کند تا بتواند خدماتی امن و مطمئن را به کابران ارائه دهد. برای نمونه می‌توان به اطلاعاتی مانند ایمیل، شماره همراه، نام و ... اشاره نمود.
            </p>
            <br />
            <p>
                لازم به ذکر است تمام مکاتبات پرتقال از طریق ایمیل و شماره همراهی که مخاطب در پروفایل خود ثبت می‌کند صورت می‌گیرد. پرتقال برای اطلاع رسانی جشنواره‌ها،
                انتشار آموزش‌های جدید و ... برای مخاطبان سایت ایمیل یا پیامک ارسال می‌کند. در صورتی که مخاطب تمایل به دریافت اینگونه ایمیل‌ها نداشته باشند می‌توانند
                با استفاده از لینک مربوط به لغو اشتراک خبرنامه موجود در انتهای ایمیل دریافتی، اقدام نمایند.
            </p>
            <br />
            <p>
                لازم به ذکر است، حفظ و نگهداری رمز عبور بر عهده مخاطب می‌باشد و لذا برای جلوگیری از هرگونه سوء استفاده احتمالی، کاربران نباید آن اطلاعات را برای شخص
                دیگری فاش کنند. پرتقال هویت شخصی مخاطبان را محرمانه می‌داند و اطلاعات شخصی آنان را به هیچ شخص یا سازمان دیگری منتقل نمی‌کند. پرتقال برای حفاظت و
                نگهداری اطلاعات و حریم شخصی کاربران همه توان خود را به کار می‌گیرد و امیدوار است که تجربه‌ی خریدی امن، راحت و خوشایند را برای همه مخاطبان فراهم آورد.
            </p>
        </article>
    </main>
</template>

<script>
import Background from "~/components/web/Background";

export default {
    scrollToTop: true,
    head: {
        title: "حریم خصوصی - گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "" }],
    },
    components: {
        Background,
    },
    mounted() {},
    methods: {},
};
</script>
