<style scoped>
.bundle_slider {
    max-width: 1364px;
}

.bundle_list {
    scrollbar-width: thin !important;
}
.bundle_list::-webkit-scrollbar-thumb {
    background: #8b8884;
}
.bundle_tag {
    position: absolute;
    top: -0.5rem;
    right: -0.75rem;
    transform: rotate(25deg);
    box-shadow: 0px 0px 15px rgba(245, 15, 21, 40%);
}
</style>

<template>
    <section class="relative flex flex-col gap-4 w-full" id="course-bundles" v-if="!!courseBundles.length">
        <h2 class="kalameh_bold title text-2xl md:text-3xl w-max">باندل های نقشه راه</h2>
        <p>بیشتر اوقات یادگیری یه دوره کافی نیست. اینجا ما دوره ها رو برات گروه بندی کردیم که خیلی راحت مجموعه مهارت های لازم تو یه حوزه رو یاد بگیری.</p>
        <div v-swiper:d="courseBundleSwiperOptions" class="bundle_slider w-full select-none overflow-hidden pb-8 mx-auto">
            <ul class="swiper-wrapper flex text-white">
                <li
                    class="swiper-slide flex flex-col gap-4 shadow-xl border-8 border-solid border-gray-300 bg-warmgray-600 rounded-3xl flex-shrink-0 w-full max-w-xs p-4 ml-7"
                    v-for="(courseBundle, i) in courseBundles"
                    :key="i"
                >
                    <h4 class="kalameh_bold text-xl md:text-2xl w-full">{{ courseBundle.title }}</h4>
                    <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                        <div class="relative flex items-center justify-center gap-1 bg-white rounded-xl p-1 px-4 flex-grow">
                            <span
                                class="bundle_tag kalameh_bold bg-rose-500 text-white text-sm p-0.5 px-2 font-bold rounded-2xl"
                                v-if="courseBundle.discountPercent > 0"
                            >
                                {{ courseBundle.discountPercent }}%
                            </span>
                            <b class="orange_text_gradient kalameh_black text-2xl">
                                {{ new Intl.NumberFormat("fa").format(courseBundle.discountedPrice) }}
                            </b>
                            <small class="text-gray-600 text-sm">تومان</small>
                        </div>
                        <button class="orange_gradient_h flex items-center gap-1 p-2 rounded-xl w-max flex-shrink-0" @click="buy(courseBundle)">
                            <span class="">خرید</span>
                            <Icon class="w-7 h-7 bg-gray-100" size="28px" folder="icons/new" name="Buy" />
                        </button>
                    </div>
                    <ul class="bundle_list flex flex-col gap-4 w-full h-full max-h-56 overflow-auto flex-grow">
                        <li class="flex items-start gap-2 w-full" v-for="(item, j) in courseBundle.courses" :key="j">
                            <img class="w-24 h-20 object-cover rounded-xl flex-shrink-0" :src="item.course.image" :alt="item.course.name" />
                            <div class="flex flex-col gap-2 flex-grow">
                                <h5 class="kalameh_bold text-xs md:text-sm w-full opacity-75">{{ item.course.name }}</h5>
                                <div class="flex items-center gap-1" v-if="item.course.teacher">
                                    <img
                                        class="w-7 h-7 object-cover rounded-full"
                                        :src="item.course.teacher.image"
                                        :alt="`${item.course.teacher.name} ${item.course.teacher.family}`"
                                    />
                                    <small class="text-xs opacity-75">{{ `${item.course.teacher.name} ${item.course.teacher.family}` }}</small>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <button
                        class="flex items-center justify-center gap-1 border-2 border-solid border-white rounded-2xl p-2 w-full hover:bg-white hover:bg-opacity-10"
                        @click="startRoadMap(courseBundle._id)"
                    >
                        <Icon class="w-7 h-7 bg-gray-100" size="28px" folder="icons/new" name="Location" />
                        <span>انتخاب و شروع نقشه راه</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="relative xl:absolute xl:top-1/2 flex items-center justify-between gap-8 -mt-8 mx-auto w-max xl:w-full">
            <div class="absolute -z-1 orange_gradient_v h-3 rounded-full w-full"></div>
            <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-prev-bundle">
                <img src="/icons/new/ArrowRight3.svg" width="24" />
            </button>
            <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-next-bundle">
                <img src="/icons/new/ArrowLeft3.svg" width="24" />
            </button>
        </div>

        <BundlePurchaseDialog :open.sync="bundlePurchaseDialogState" :bundle="selectedBundle" />
    </section>
</template>

<script>
import axios from "axios";
import BundlePurchaseDialog from "./BundlePurchaseDialog.vue";

export default {
    name: "Bundles",
    components: { BundlePurchaseDialog },
    data() {
        return {
            bundlesLoading: false,
            courseBundles: this.courseBundles || [],
            courseBundleSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                prevButton: ".swiper-prev-bundle",
                nextButton: ".swiper-next-bundle",
            },

            bundlePurchaseDialogState: false,
            selectedBundle: {},

            selectingRoadmap: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;
        await Promise.all([this.getBundles({ headers })]);
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async getBundles(data = {}) {
            if (this.bundlesLoading) return;
            this.bundlesLoading = true;
            let url = `/api/bundles`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }
            await axios
                .get(encodeURI(url), { headers })
                .then((results) => {
                    this.courseBundles = results.data.records;
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
