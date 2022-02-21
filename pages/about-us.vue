<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}

.counts {
    color: var(--about-us-counts-color);
}

.teacher_card {
    background-color: rgba(19, 40, 80, 0.8);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    color: #fff;
}
.teacher_card * {
    z-index: 2;
}
.teacher_card::before {
    color: #fff;
    background: linear-gradient(0deg, rgba(19, 40, 80, 0.8), rgba(19, 40, 80, 0.8));
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(15px);
    border-radius: 2rem;
}

.more_btn {
    background-color: var(--department-section-title-alt-text-bg-color);
    color: var(--department-section-title-alt-text-color);
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-2xl w-full">
        <!-- <Background src="/backgrounds/Background2.png" :topOffset="-30" :rightOffset="-10" :minWidth="2420" /> -->

        <section class="relative flex flex-wrap-reverse justify-evenly gap-8 lg:gap-20" id="top">
            <img class="" src="/pages/about-us/UpStairsMan.png" alt="porteqali-UpStairsMan" loading="lazy" style="max-height: 1920px" />
            <div class="flex flex-col gap-10 mt-28">
                <h1 class="flex flex-col gap-4 text-7xl">
                    <span class="kalameh_bold font-bold">درباره ما</span>
                </h1>
                <ul class="flex items-center gap-2 font-light">
                    <li><nuxt-link title="صفحه اصلی" to="/">صفحه اصلی</nuxt-link></li>
                    <li>&gt;</li>
                    <li>درباره ما</li>
                </ul>
            </div>
        </section>

        <article class="flex flex-col gap-16 w-full">
            <div class="flex flex-wrap items-center justify-evenly gap-8">
                <div class="flex flex-col gap-4">
                    <h2 class="text-2xl font-bold">معرفی گروه آموزشی پرتقال</h2>
                    <p class="max-w-screen-sm text-lg">
                        بهمن 1396 بود که تولید فیلم آموزشی فارسی زبان را شروع کردیم و مفتخریم این روز ها عنوان یکی از بزرگترین و معتبر ترین وب سایت های آموزش ویدئویی
                        کشور از دید شما کاربران عزیز را به خود اختصاص داده ایم. صدها مدرس متخصص و هزاران ویدئو آموزشی با کیفیت برای شما فراهم کرده ایم تا خاطرات تلخ
                        یادگیری در وب ایران که در گذشته تجربه کرده اید را کرده و لحظات و خاطرات آینده ساز و آرامش بخشی را با آموزش های ما تجربه کنید!
                    </p>
                </div>
                <img class="shadow-xl rounded-3xl" src="/pages/about-us/img2.crop.png" loading="lazy" alt="معرفی گروه آموزشی پرتقال" />
            </div>
            <div class="flex flex-wrap-reverse items-center justify-evenly gap-8">
                <img class="shadow-xl rounded-3xl" src="/pages/about-us/img1.crop.png" loading="lazy" alt="معرفی گروه آموزشی پرتقال" />
                <div class="flex flex-col gap-4">
                    <h2 class="text-2xl font-bold">معرفی گروه آموزشی پرتقال</h2>
                    <p class="max-w-screen-sm text-lg">
                        بهمن 1396 بود که تولید فیلم آموزشی فارسی زبان را شروع کردیم و مفتخریم این روز ها عنوان یکی از بزرگترین و معتبر ترین وب سایت های آموزش ویدئویی
                        کشور از دید شما کاربران عزیز را به خود اختصاص داده ایم. صدها مدرس متخصص و هزاران ویدئو آموزشی با کیفیت برای شما فراهم کرده ایم تا خاطرات تلخ
                        یادگیری در وب ایران که در گذشته تجربه کرده اید را کرده و لحظات و خاطرات آینده ساز و آرامش بخشی را با آموزش های ما تجربه کنید!
                    </p>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center w-full mx-auto">
                <div class="bg-gray-700 bg-opacity-80 text-white blur flex flex-col lg:flex-row items-center rounded-3xl p-8 pb-16 w-max">
                    <div class="flex flex-col gap-16 flex-shrink-0">
                        <h3 class="kalameh_extra_bold text-6xl font-extrabold">داستان پرتقال</h3>
                        <p class="text-2xl max-w-sm text-justify">
                            بهمن 1396 بود که تولید فیلم آموزشی فارسی زبان را شروع کردیم و مفتخریم این روز ها عنوان یکی از بزرگترین و معتبر ترین وب سایت های آموزش
                            ویدئویی کشور از دید شما کاربران عزیز را به خود اختصاص داده ایم.
                        </p>
                    </div>
                    <img class="lg:-mt-28 lg:-ml-24 m-0 w-6/12 lg:w-full" src="/pages/about-us/Saly.png" loading="lazy" alt="Saly" />
                </div>
                <div class="flex flex-wrap items-center justify-center gap-8 w-full -mt-16 z-10">
                    <div class="orange_gradient_h flex flex-col items-center justify-center gap-8 w-64 h-64 p-6 rounded-3xl shadow-xl">
                        <b class="counts text-4xl" dir="ltr">+4,000</b>
                        <span class="bg-white counts p-6 py-4 rounded-xl shadow-lg">دانشجو</span>
                    </div>
                    <div class="orange_gradient_h flex flex-col items-center justify-center gap-8 w-64 h-64 p-6 rounded-3xl shadow-xl">
                        <b class="counts text-4xl" dir="ltr">+5,000</b>
                        <span class="bg-white counts p-6 py-4 rounded-xl shadow-lg">دقیقه ویدیو آموزشی</span>
                    </div>
                    <div class="orange_gradient_h flex flex-col items-center justify-center gap-8 w-64 h-64 p-6 rounded-3xl shadow-xl">
                        <b class="counts text-4xl" dir="ltr">76</b>
                        <span class="bg-white counts p-6 py-4 rounded-xl shadow-lg">مدرس برتر</span>
                    </div>
                </div>
            </div>
        </article>

        <section class="relative flex flex-col gap-8 mt-16 w-full max-w-screen-2xl" id="teachers">
            <div class="flex flex-wrap justify-between gap-8 w-full">
                <h2 class="font-bold text-4xl">اساتید گروه آموزشی پرتقال</h2>
            </div>
            <ul class="flex flex-wrap justify-center gap-6" v-if="!teachersLoading">
                <li
                    class="teacher_card flex flex-col items-center justify-start gap-4 p-8 md:p-16 w-full rounded-3xl shadow-2xl max-w-sm"
                    :style="`background-image: url('${teacher.image}')`"
                    v-for="(teacher, i) in teachers"
                    :key="i"
                >
                    <img class="w-24 h-24 rounded-full shadow-md" :src="teacher.image" loading="lazy" :alt="`${teacher.name} ${teacher.family}`" />
                    <b class="text-2xl">{{ `${teacher.name} ${teacher.family}` }}</b>
                    <small class="text-lightblue-400">{{ teacher.title }}</small>
                    <p class="opacity-75 text-center max-w-xs">{{ teacher.description }}</p>
                    <ul class="flex flex-wrap items-center gap-2">
                        <li v-for="(social, j) in teacher.social" :key="j">
                            <a :href="social.link"><Icon class="w-8 h-8 bg-gray-200" folder="social" :name="social.name" /></a>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="flex flex-wrap justify-center gap-6" v-else>
                <li
                    class="teacher_card flex flex-col items-center justify-start gap-4 p-8 md:p-16 w-full rounded-3xl shadow-2xl max-w-md"
                    v-for="(teacher, i) in teachersSkeleton"
                    :key="i"
                >
                    <span class="skeleton w-24 h-24 rounded-full shadow-md"></span>
                    <small class="skeleton w-20 h-2 text-lightblue-400"></small>
                    <div class="flex flex-col gap-2 w-full">
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-full h-2"></span>
                        <span class="skeleton w-4/12 h-2"></span>
                    </div>
                </li>
            </ul>
            <div class="flex items-center justify-center w-full">
                <nuxt-link to="/teachers" class="more_btn blur flex items-center gap-2 py-3 px-6 rounded-xl w-max">
                    <img src="/icons/BookOpenOutlineColor.orange.svg" width="24" height="24" alt="BookOpenOutlineColor" />
                    <span>مشاهده همه مدرس ها</span>
                </nuxt-link>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Background from "~/components/web/Background";
import Icon from "~/components/Icon.vue";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: {
        Background,
        Icon,
    },
    data() {
        return {
            teachersLoading: false,
            teachersSkeleton: [0, 0, 0],
            teachers: this.teachers || [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMetadata("about-us"), this.getTeachers({ headers })]);
    },
    methods: {
        async getTeachers(data = {}) {
            if (this.teachersLoading) return;
            this.teachersLoading = true;

            let url = `/api/about-us/teachers`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.teachers = results.data))
                .catch((e) => {})
                .finally(() => (this.teachersLoading = false));
        },
    },
};
</script>
