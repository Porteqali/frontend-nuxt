<style scoped>
.about_text {
    font-size: 1.25rem;
    line-height: 2.5rem;
    border: 1rem solid #c9c9c9;
    border-radius: 2rem;
}

.swiper-slide {
    height: auto !important;
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-10 max-w-screen-2xl w-full mt-24 md:mt-24 px-4 md:px-8 mb-16">
        <article class="flex flex-wrap-reverse justify-center items-start xl:gap-10 w-full">
            <div class="flex flex-col items-center gap-8 -mt-8 xl:-mt-0">
                <div class="relative flex items-end">
                    <img class="-ml-40" src="/pages/about-us/path2.svg" alt="path" />
                    <img class="-mr-40 -mb-12" src="/pages/about-us/orange.png" alt="orange" />
                </div>
                <ul class="flex flex-wrap items-center justify-between gap-4 md:gap-8 w-full max-w-xl">
                    <li class="flex flex-col items-center justify-center gap-4">
                        <Icon class="w-10 h-10 bg-orange-500" size="40px" folder="icons/new" name="User3" />
                        <strong class="kalameh_bold text-orange-500 opacity-90 text-xl md:text-4xl" dir="ltr">50,000+</strong>
                        <b class="kalameh_bold md:text-lg text-warmgray-800">کاربر فعال</b>
                    </li>
                    <li class="flex flex-col items-center justify-center gap-4">
                        <Icon class="w-10 h-10 bg-orange-500" size="40px" folder="icons/new" name="Voice3" />
                        <strong class="kalameh_bold text-orange-500 opacity-90 text-xl md:text-4xl" dir="ltr">23</strong>
                        <b class="kalameh_bold md:text-lg text-warmgray-800">مدرس برتر</b>
                    </li>
                    <li class="flex flex-col items-center justify-center gap-4">
                        <Icon class="w-10 h-10 bg-orange-500" size="40px" folder="icons/new" name="Play" />
                        <strong class="kalameh_bold text-orange-500 opacity-90 text-xl md:text-4xl" dir="ltr">2,000+</strong>
                        <b class="kalameh_bold md:text-lg text-warmgray-800">ویدیو آموزشی</b>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col items-center md:items-start gap-4">
                <h1 class="kalameh_black title text-4xl md:text-6xl w-max max-w-full">درباره پرتقال</h1>
                <span class="kalameh_bold md:text-lg opacity-75">داستان ما از کجا شروع شد؟</span>
                <p class="about_text w-full max-w-screen-sm mt-4 bg-warmgray-600 text-white p-4 md:p-8">
                    بهمن 1396 بود که تولید فیلم آموزشی فارسی زبان را شروع کردیم و مفتخریم این روز ها عنوان یکی از بزرگترین و معتبر ترین وب سایت های آموزش ویدئویی
                    کشور از دید شما کاربران عزیز را به خود اختصاص داده ایم. صدها مدرس متخصص و هزاران ویدئو آموزشی با کیفیت برای شما فراهم کرده ایم تا خاطرات تلخ
                    یادگیری در وب ایران که در گذشته تجربه کرده اید را کرده و لحظات و خاطرات آینده ساز و آرامش بخشی را با آموزش های ما تجربه کنید!
                </p>
            </div>
        </article>

        <span class="spacer_v w-7/12 h-0.5 mt-6"></span>

        <section class="relative flex flex-col items-center gap-8 mt-16 w-full max-w-screen-2xl">
            <div class="relative flex flex-col gap-8 bg-white rounded-2xl p-4 md:p-8 w-full max-w-screen-xl">
                <div class="orange_gradient_v absolute -top-10 -right-16 w-52 h-52 opacity-75 rounded-full -z-1"></div>
                <h3 class="kalameh_black title text-3xl md:text-4xl w-max max-w-full">ما در پرتقال یک هدف داریم</h3>
                <p class="w-full">
                    بهمن 1396 بود که تولید فیلم آموزشی فارسی زبان را شروع کردیم و مفتخریم این روز ها عنوان یکی از بزرگترین و معتبر ترین وب سایت های آموزش ویدئویی
                    کشور از دید شما کاربران عزیز را به خود اختصاص داده ایم. صدها مدرس متخصص و هزاران ویدئو آموزشی با کیفیت برای شما فراهم کرده ایم تا خاطرات تلخ
                    یادگیری در وب ایران که در گذشته تجربه کرده اید را کرده و لحظات و خاطرات آینده ساز و آرامش بخشی را با آموزش های ما تجربه کنید!
                </p>
            </div>
            <img class="absolute -left-48 2xl:-left-32 -bottom-64 lg:-bottom-52" src="/pages/about-us/target.png" alt="target" />
        </section>

        <span class="spacer_h w-0.5 h-24"></span>

        <div class="flex flex-col items-center gap-4 w-full my-8">
            <h2 class="kalameh_black title2 text-4xl md:text-5xl w-max max-w-full">اساتید پرتقال</h2>
            <p class="kalameh_bold">با اساتید گروه پرتقال بیشتر اشنا بشید</p>
        </div>
        <section class="flex flex-wrap-reverse justify-evenly gap-24 md:gap-10 w-full max-w-screen-2xl" v-if="!groupsLoading">
            <div class="relative flex flex-col-reverse md:flex-col items-start w-full gap-4" v-for="(group, i) in groups" :key="i">
                <div v-swiper:[departments[i].slug]="departments[i].swiperOptions" class="w-full max-w-6xl select-none overflow-hidden py-8 px-2 xl:mr-60">
                    <ul class="swiper-wrapper flex items-start w-full">
                        <li
                            class="swiper-slide flex flex-col items-start justify-start gap-4 p-4 md:p-6 mt-10 w-screen max-w-xs flex-shrink-0 rounded-3xl shadow-xl bg-white ml-6"
                            v-for="(teacher, j) in group"
                            :key="j"
                        >
                            <div class="flex flex-wrap md:flex-nowrap items-end gap-4 -mt-16">
                                <img
                                    class="w-28 h-28 bg-gray-200 p-2 rounded-full object-cover shadow-md flex-shrink-0"
                                    :src="teacher.image"
                                    :alt="`${teacher.name} ${teacher.family}`"
                                />
                                <div class="flex flex-col gap-1">
                                    <b class="kalameh_bold text-2xl">{{ `${teacher.name} ${teacher.family}` }}</b>
                                    <small class="text-gray-500 text-xs" v-if="teacher.groups && teacher.groups[0]">
                                        مدرس دوره های {{ teacher.groups[0].name }}
                                    </small>
                                </div>
                            </div>
                            <p class="w-full text-sm opacity-75 h-20 overflow-hidden">
                                {{ teacher.description.length > 128 ? teacher.description.substr(0, 128) + "..." : teacher.description }}
                            </p>
                            <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                                <ul class="flex flex-wrap items-center gap-2">
                                    <li v-for="(social, j) in teacher.socials" :key="j">
                                        <a :href="`tel:${social.link}`" :title="social.name" v-if="social.name == 'whatsapp'">
                                            <Icon class="w-5 h-5 bg-gray-400" folder="social" :name="social.name" />
                                        </a>
                                        <a :href="social.link" :title="social.name" v-else>
                                            <Icon class="w-5 h-5 bg-gray-400" folder="social" :name="social.name" />
                                        </a>
                                    </li>
                                </ul>
                                <nuxt-link
                                    :to="`/teacher/${teacher._id}`"
                                    class="orange_gradient_h flex items-center justify-center w-max p-3 px-4 rounded-2xl mr-auto"
                                >
                                    مشاهده دوره ها
                                </nuxt-link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="xl:absolute xl:mt-40 bg-orange-300 flex items-center gap-4 px-4 w-full h-3 rounded-full">
                    <h3 class="kalameh_bold text-xl md:text-2xl w-max max-w-full xl:max-w-screen-2xs text-gray-700">اساتید دوره های {{ departments[i].name }}</h3>
                    <div class="flex items-center gap-1 md:justify-between flex-shrink-0 xl:flex-grow">
                        <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl" :class="[`swiper-prev-${departments[i].slug}`]">
                            <img src="/icons/new/ArrowRight3.svg" width="24" />
                        </button>
                        <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl" :class="[`swiper-next-${departments[i].slug}`]">
                            <img src="/icons/new/ArrowLeft3.svg" width="24" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";
import getMetadata from "~/mixins/getMetadata";

export default {
    head() {
        return { title: this.metadata.title, meta: [...this.metadata.meta], link: [...this.metadata.link] };
    },
    mixins: [getMetadata],
    components: {
        Icon,
    },
    data() {
        return {
            departments: {
                network: {
                    name: "امنیت شبکه",
                    slug: "network",
                    swiperOptions: { slidesPerView: "auto", prevButton: ".swiper-prev-network", nextButton: ".swiper-next-network" },
                },
                languages: {
                    name: "زبان های خارجی",
                    slug: "languages",
                    swiperOptions: { slidesPerView: "auto", prevButton: ".swiper-prev-languages", nextButton: ".swiper-next-languages" },
                },
                graphic: {
                    name: "طراحی گرافیک",
                    slug: "graphic",
                    swiperOptions: { slidesPerView: "auto", prevButton: ".swiper-prev-graphic", nextButton: ".swiper-next-graphic" },
                },
                university: {
                    name: "دروس دانشگاهی",
                    slug: "university",
                    swiperOptions: { slidesPerView: "auto", prevButton: ".swiper-prev-university", nextButton: ".swiper-next-university" },
                },
                programming: {
                    name: "برنامه نویسی",
                    slug: "programming",
                    swiperOptions: { slidesPerView: "auto", prevButton: ".swiper-prev-programming", nextButton: ".swiper-next-programming" },
                },
                "web-design": {
                    name: "طراحی وب",
                    slug: "web-design",
                    swiperOptions: { slidesPerView: "auto", prevButton: ".swiper-prev-web-design", nextButton: ".swiper-next-web-design" },
                },
                business: {
                    name: "کسب و کار",
                    slug: "business",
                    swiperOptions: { slidesPerView: "auto", prevButton: ".swiper-prev-business", nextButton: ".swiper-next-business" },
                },
                free: {
                    name: "دوره های رایگان",
                    slug: "free",
                    swiperOptions: { slidesPerView: "auto", prevButton: ".swiper-prev-free", nextButton: ".swiper-next-free" },
                },
            },

            groupsLoading: false,
            groups: this.groups || [],
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getMetadata("about-us"), this.getTeachers({ headers })]);
    },
    methods: {
        async getTeachers(data = {}) {
            if (this.groupsLoading) return;
            this.groupsLoading = true;

            let url = `/api/teachers`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.groups = results.data;
                })
                .catch((e) => {})
                .finally(() => (this.groupsLoading = false));
        },
    },
};
</script>
