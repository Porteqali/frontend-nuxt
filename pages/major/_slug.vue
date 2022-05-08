<style scoped>
.bundle_tag {
    position: absolute;
    top: -0.5rem;
    right: -0.75rem;
    transform: rotate(25deg);
    box-shadow: 0px 0px 15px rgba(245, 15, 21, 40%);
}

.bundle_list_item {
    max-width: 236px;
    height: auto;
}

.dashed_line {
    top: 6.6rem;
}

.course_tag {
    box-shadow: 0px 0px 10px rgba(255, 49, 49, 0.25);
}

@media (min-width: 768px) {
    .dashed_line {
        top: 7.2rem;
    }
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-10 max-w-screen-2xl w-full mt-24 md:mt-24 px-4 md:px-8 mb-16">
        <article class="relative flex flex-col md:flex-row items-start gap-6 w-full">
            <div class="absolute -bottom-8 right-0 md:right-36 -z-1 w-64 h-36 bg-orange-200 rounded-2xl"></div>
            <img class="w-64 h-64 object-contain md:-ml-24 flex-shrink-0 md:z-10" :src="major.image" :alt="major.title" />
            <div class="relative flex flex-col gap-6 bg-white -mt-24 md:-mt-0 p-4 md:p-8 md:pr-32 shadow-xl rounded-2xl overflow-hidden flex-grow">
                <div class="absolute -left-10 top-4 flex flex-col w-52">
                    <img class="absolute -top-0 left-0 w-52 opacity-50" src="/misc/path.svg" alt="path" />
                    <img class="absolute -top-6 left-2 w-52 opacity-50" src="/misc/path.svg" alt="path" />
                    <img class="absolute -top-12 left-4 w-52 opacity-50" src="/misc/path.svg" alt="path" />
                </div>
                <h3 class="kalameh_bold title2 w-max max-w-full text-3xl md:text-4xl">{{ major.title }}</h3>
                <h2 class="opacity-75">آشنایی با رشته {{ major.title }}</h2>
                <p class="w-full">{{ major.text }}</p>
            </div>
        </article>

        <section class="relative flex flex-col items-start gap-6 w-full max-w-screen-2xl mt-8">
            <div class="flex items-center gap-2">
                <Icon class="w-9 h-9 bg-gray-700" size="36px" folder="icons/new" name="Filter" />
                <h1 class="kalameh_bold text-2xl md:text-3xl">زیر شاخه های رشته {{ major.title }}</h1>
            </div>
            <p class="opacity-75 w-full">
                حالا که با رشته {{ major.title }} آشنا شدی اینجا میتونی زیرشاخه های این حوزه رو ببینی و شروع کنی به یادگیری... انتخاب با توئه
            </p>
            <ul class="flex flex-col gap-8 w-full text-white">
                <li
                    class="flex flex-col gap-6 border-8 border-solid border-gray-300 bg-warmgray-600 rounded-3xl w-full p-4 md:p-8"
                    v-for="(bundle, i) in bundles"
                    :key="i"
                >
                    <div class="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 w-full">
                        <div class="flex flex-col gap-2 flex-grow">
                            <h4 class="kalameh_bold text-xl md:text-2xl w-max">{{ bundle.title }}</h4>
                            <p class="w-full text-sm" v-if="bundle.desc">{{ bundle.desc }}</p>
                        </div>
                        <div class="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 flex-shrink-0">
                            <div class="relative flex items-center justify-center gap-1 bg-white rounded-xl p-1 px-4">
                                <span
                                    class="bundle_tag kalameh_bold bg-rose-500 text-white text-sm p-0.5 px-2 font-bold rounded-2xl"
                                    v-if="bundle.discountPercent > 0"
                                >
                                    {{ bundle.discountPercent }}%
                                </span>
                                <b class="orange_text_gradient kalameh_black text-2xl">
                                    {{ new Intl.NumberFormat("fa").format(bundle.discountedPrice) }}
                                </b>
                                <small class="text-gray-600 text-sm">تومان</small>
                            </div>
                            <button class="orange_gradient_h flex items-center gap-1 p-2 rounded-xl w-max flex-shrink-0" @click="buy(bundle)">
                                <span class="">خرید یکجا دوره ها</span>
                                <Icon class="w-7 h-7 bg-gray-100" size="28px" folder="icons/new" name="Buy" />
                            </button>
                        </div>
                    </div>
                    <div v-swiper:d="bundleSwiperOptions" class="relative w-full select-none overflow-hidden">
                        <hr class="dashed_line absolute border-0 border-b-4 border-dashed border-gray-300 w-full" />
                        <ul class="swiper-wrapper relative flex w-full h-full flex-grow text-gray-700">
                            <li class="swiper-slide flex flex-col items-start md:items-center gap-1 mt-24 max-w-max flex-shrink-0 ml-2">
                                <div class="w-6 md:w-10 h-6 md:h-10 rounded-full bg-gray-300"></div>
                                <small class="text-orange-300">شروع</small>
                            </li>
                            <li
                                class="bundle_list_item swiper-slide flex flex-col items-start gap-2 w-full bg-white rounded-2xl p-3 flex-shrink-0 ml-8"
                                v-for="(item, j) in bundle.courses"
                                :key="j"
                            >
                                <div class="flex flex-col w-full h-36">
                                    <img class="w-full h-full object-cover rounded-xl flex-shrink-0" :src="item.course.image" :alt="item.course.name" />
                                </div>
                                <div class="flex flex-col gap-2 w-full">
                                    <h4 class="kalameh_bold text-sm md:text-base w-full">{{ item.course.name }}</h4>
                                    <div class="flex items-center gap-1">
                                        <img
                                            class="w-7 h-7 object-cover rounded-full"
                                            :src="item.course.teacher.image"
                                            :alt="`${item.course.teacher.name} ${item.course.teacher.family}`"
                                        />
                                        <small class="text-sm opacity-75">{{ `${item.course.teacher.name} ${item.course.teacher.family}` }}</small>
                                    </div>
                                </div>
                                <div class="flex items-start justify-between gap-2 w-full" v-if="item.course.discountInfo">
                                    <small
                                        class="course_tag flex items-center gap-1 mt-1 p-1 px-2 bg-red-500 text-white rounded-full text-xs"
                                        v-if="item.course.discountInfo && item.course.discountInfo.tag != 'رایگان' && item.course.price > 0"
                                    >
                                        <span class="kalameh_bold">{{ item.course.discountInfo.tag }}</span>
                                        <span class="kalameh_bold" v-if="!!item.course.discountInfo.discountType">تخفیف</span>
                                    </small>
                                    <div class="flex items-end justify-center gap-4">
                                        <div class="flex flex-col items-end" v-if="item.course.price">
                                            <span class="flex items-center gap-1">
                                                <b :class="[item.course.price != item.course.discountInfo.discountedPrice ? 'text-base line-through' : 'text-xl']">
                                                    {{ new Intl.NumberFormat("fa").format(item.course.price) }}
                                                </b>
                                                <small>تومان</small>
                                            </span>
                                            <b class="text-2xl text-amber-500" v-if="item.course.price != item.course.discountInfo.discountedPrice">
                                                {{ new Intl.NumberFormat("fa").format(item.course.discountInfo.discountedPrice) }}
                                            </b>
                                        </div>
                                        <span class="text-xl font-bold" v-else>رایگان</span>
                                    </div>
                                </div>
                            </li>
                            <li class="swiper-slide flex flex-col items-start md:items-center gap-1 mt-24 max-w-max flex-shrink-0 -mr-6 ml-2">
                                <div class="w-6 md:w-10 h-6 md:h-10 rounded-full bg-gray-300"></div>
                                <small class="text-orange-300">پایان</small>
                            </li>
                        </ul>
                    </div>
                    <button
                        class="flex items-center justify-center gap-1 border-2 border-solid border-white rounded-2xl p-2 px-4 w-max hover:bg-white hover:bg-opacity-10"
                        @click="startRoadMap(bundle._id)"
                    >
                        <Icon class="w-7 h-7 bg-gray-100" size="28px" folder="icons/new" name="Location" />
                        <span>انتخاب و شروع نقشه راه</span>
                    </button>
                </li>
            </ul>
            <button
                class="flex items-center gap-2 py-3 px-6 rounded-xl w-max bg-warmgray-200 hover:shadow-xl"
                v-if="!bundlesLoading && bundlesPage <= bundlesPageTotal"
                @click="getBundles()"
            >
                <span>بارگذاری بیشتر</span>
            </button>
        </section>

        <BundlePurchaseDialog :open.sync="bundlePurchaseDialogState" :bundle="selectedBundle" />
    </main>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";
import BundlePurchaseDialog from "~/components/web/depatment/BundlePurchaseDialog.vue";

export default {
    head() {
        return {
            title: `${this.major.title} - گروه آموزشی پرتقال`,
            meta: [
                { hid: "description", name: "description", content: this.major.metadata ? this.major.metadata.description : "" },
                { hid: "language", name: "language", content: "fa" },
                { hid: "author", name: "author", content: this.major.metadata ? this.major.metadata.author : "" },

                { hid: "og:locale", name: "og:locale", content: "fa_IR" },
                { hid: "og:title", name: "og:title", content: this.major.metadata ? this.major.metadata.title : "" },
                { hid: "og:description", name: "og:description", content: this.major.metadata ? this.major.metadata.description : "" },
                { hid: "og:url", name: "og:url", content: this.major.metadata ? this.major.metadata.url : "" },
                { hid: "og:site_name", name: "og:site_name", content: this.major.metadata ? this.major.metadata.title : "" },
                { hid: "og:image", name: "og:image", content: this.major.metadata ? this.major.metadata.thumbnail : "" },

                { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
                { hid: "twitter:site", name: "twitter:site", content: this.major.metadata ? this.major.metadata.url : "" },
                { hid: "twitter:description", name: "twitter:description", content: this.major.metadata ? this.major.metadata.description : "" },
                { hid: "twitter:title", name: "twitter:title", content: this.major.metadata ? this.major.metadata.title : "" },
                { hid: "twitter:image", name: "twitter:image", content: this.major.metadata ? this.major.metadata.thumbnail : "" },

                { hid: "robots", name: "robots", content: "max-image-preview:large" },
                { hid: "mobile-web-app-capable", name: "mobile-web-app-capable", content: "yes" },
            ],
            link: [
                { rel: "canonical", href: this.major.metadata ? this.major.metadata.url : "" },
                { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.ico" },
                { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
            ],
        };
    },
    components: {
        Icon,
        BundlePurchaseDialog,
    },
    data() {
        return {
            majorLoading: false,
            major: this.major || {
                image: "/pages/where-to-start/film.png",
                text: "حالا که با رشته  آشنا شدی اینجا میتونی زیرشاخ های این حوزه رو ببینی و شروع کنی به یادگیری... انتخاب با توئه",
                title: "طراحی و گرافیک",
            },

            bundles: this.bundles || [],
            bundlesPage: 1,
            bundlesTotal: 0,
            bundlesPageTotal: 1,
            bundlesLoading: false,

            bundleSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                loop: false,
            },

            bundlePurchaseDialogState: false,
            selectedBundle: {},

            selectingRoadmap: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;
        // await Promise.all([]);

        await this.getMajor({ headers }, route);
        await this.getBundles({ headers });
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async getMajor(data = {}, route) {
            if (this.majorLoading) return;
            this.majorLoading = true;

            let url = `/api/majors/${route.params.slug}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }
            await axios
                .get(encodeURI(url), { headers })
                .then((results) => {
                    this.major = results.data.major;
                })
                .catch((e) => {})
                .finally(() => (this.majorLoading = false));
        },

        async getBundles(data = {}) {
            if (this.bundlesLoading || this.bundlesPage > this.bundlesPageTotal) return;
            this.bundlesLoading = true;

            let url = `/api/majors/bundles/${this.major.slug}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            let params = [`page=${this.bundlesPage}`, `search=${this.searchQuery}`];
            url = `${url}?${params.join("&")}`;

            await axios
                .get(encodeURI(url), { headers })
                .then((results) => {
                    this.bundles = [...this.bundles, ...results.data.records];
                    this.bundlesPage = results.data.page + 1;
                    this.bundlesTotal = results.data.total;
                    this.bundlesPageTotal = results.data.pageTotal;
                })
                .catch((e) => {})
                .finally(() => (this.bundlesLoading = false));
        },

        async buy(courseBundle) {
            // before redirecting to payment gateway check if user is logged in or not
            if (!this.user.info.email && !this.user.info.mobile) {
                this.$store.dispatch("toast/makeToast", {
                    type: "error",
                    title: "پرداخت و خرید",
                    message: `برای انجام هرگونه عملیات خرید، ابتدا باید در سایت ثبتنام و وارد حساب کاربری خود شده باشید`,
                });
                return;
            }

            this.bundlePurchaseDialogState = true;
            this.selectedBundle = courseBundle;
        },

        async startRoadMap(bundleId) {
            // check if user logged in
            if (!this.user.info.email && !this.user.info.mobile) {
                this.$store.dispatch("toast/makeToast", {
                    type: "error",
                    title: "انتخاب نقشه راه",
                    message: `برای شروع ابتدا باید ثبتنام کنید یا وارد حساب کاربری خود شوید`,
                });
                return;
            }

            // send request to back to activate this roadmap
            if (this.selectingRoadmap) return;
            this.selectingRoadmap = true;

            await axios
                .post(`/api/bundles/activate/${bundleId}`, {})
                .then(() => {
                    this.$store.dispatch("toast/makeToast", {
                        type: "success",
                        title: "انتخاب نقشه راه",
                        message: `نقشه راه برای شما فعال شد! لطفا برای مشاهده دوره های باندل نقشه راه را خریداری نمایید.`,
                    });
                    this.$router.push("/profile");
                })
                .catch((e) => {
                    this.messageType = "error";
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.$store.dispatch("toast/makeToast", { type: "error", title: "انتخاب نقشه راه", message: e.response.data.message[0].errors[0] });
                        }
                    }
                })
                .finally(() => {
                    this.selectingRoadmap = false;
                });
        },
    },
};
</script>
