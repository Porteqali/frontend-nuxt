<style scoped>
.coupon {
    position: relative;
    max-width: 290px;
    min-height: 10rem;
    z-index: 0;
    background-image: url("/misc/coupon.svg");
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    filter: drop-shadow(0px 15px 15px rgba(0, 0, 0, 7%));
}
.coupon span {
    letter-spacing: 2px;
}
.coupon > div {
    max-width: 200px;
}

.discount_tag {
    border-radius: 0 0 1rem 1rem;
}

.porteqal {
    position: absolute;
    right: -3.25rem;
    transform: rotate(90deg);
}
</style>

<template>
    <div class="relative flex flex-col gap-8 w-full max-w-screen-lg flex-grow">
        <ActiveRoadmap v-if="!loading" />

        <section class="flex flex-col gap-2 w-full rounded-3xl" v-if="!loading && !!coupons.length" id="availabe-coupon-codes">
            <div class="flex items-center gap-2 mb-4">
                <img src="/icons/admin/Discount.svg" width="32" height="32" alt="Discount" />
                <h2 class="kalameh_bold title text-2xl">کدهای تخفیف</h2>
            </div>
            <div v-swiper:couponsSwiper="couponsSwiperOptions" class="relative w-full select-none overflow-hidden">
                <ul class="swiper-wrapper relative flex w-full h-full flex-grow">
                    <li class="coupon swiper-slide flex flex-col items-center justify-center w-full ml-6" v-for="(coupon, i) in coupons" :key="i">
                        <img class="porteqal w-28" src="/misc/half.png" alt="porteqal" />
                        <div class="absolute top-2 left-4 flex flex-col gap-2 items-end w-full">
                            <b class="discount_tag kalameh_black text-3xl p-2 bg-rose-600 text-amber-200">
                                {{ coupon.amount }}
                                <span v-if="coupon.amountType == 'percent'">%</span>
                                <span v-else>تومان</span>
                            </b>
                            <span class="kalameh_black text-2xl text-white">{{ coupon.code }}</span>
                            <small class="text-xs text-left opacity-80">مهلت استفاده تا تاریخ {{ new Date(coupon.endDate).toLocaleString("fa") }}</small>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section class="flex flex-col gap-2 shadow-xl bg-white w-full p-4 md:p-6 rounded-3xl" v-if="!loading" id="purchased-courses">
            <div class="flex items-center gap-2 mb-4">
                <img src="/icons/Play.gray.svg" width="32" height="32" alt="Play" />
                <h2 class="kalameh_bold title text-2xl">دوره های خریداری شده</h2>
            </div>
            <div class="flex flex-col" v-if="courses.length == 0 && !coursesLoading">
                <p>در حال حاضر دوره ای خریداری نکرده اید!</p>
                <nuxt-link class="underline text-orange-600" to="/department">مشاهده دوره ها</nuxt-link>
            </div>
            <ul class="flex flex-col gap-4 w-full" v-if="courses.length > 0 && !coursesLoading">
                <transition-group class="flex flex-col gap-4" name="slideleft" appear>
                    <li class="flex w-full" v-for="item in courses" :key="item._id">
                        <nuxt-link
                            :to="`/course/${item.course[0]._id}/${item.course[0].name.replace(/ /g, '-')}`"
                            class="flex flex-wrap md:flex-nowrap items-center gap-4 p-4 rounded-2xl shadow-md w-full bg-warmgray-50"
                        >
                            <img class="w-28 h-20 rounded-xl shadow-md flex-shrink-0" :src="item.course[0].image" width="100" :alt="item.course[0].name" />
                            <div class="flex flex-col gap-2 w-full">
                                <h4 class="kalameh_bold text-xl">{{ item.course[0].name }}</h4>
                                <div class="flex items-center gap-2">
                                    <img class="rounded-full object-cover w-8 h-8" :src="item.teacher[0].image" alt="Figma" width="32" height="32" />
                                    <span class="text-sm opacity-75">{{ `${item.teacher[0].name} ${item.teacher[0].family}` }}</span>
                                </div>
                            </div>
                            <div class="flex flex-wrap items-center justify-between md:justify-evenly gap-4 w-full">
                                <div class="flex flex-col items-center gap-2">
                                    <h5 class="flex items-center gap-2">
                                        <img src="/icons/TimeCircle.orange.svg" alt="TimeCircle" />
                                        <span class="kalameh_bold text-sm">مدت زمان دوره</span>
                                    </h5>
                                    <strong class="text-lg font-normal">{{ item.course[0].totalTime }}</strong>
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <h5 class="flex items-center gap-2">
                                        <img src="/icons/Video.orange.svg" alt="Video" />
                                        <span class="kalameh_bold text-sm">تعداد جلسات</span>
                                    </h5>
                                    <strong class="text-lg font-normal" v-if="item.course[0].topics">{{ item.course[0].topics.length }}</strong>
                                </div>
                            </div>
                        </nuxt-link>
                    </li>
                </transition-group>
            </ul>
            <nuxt-link class="underline text-orange-600 mt-4" to="/profile/courses" v-if="courses.length > 0 && !coursesLoading">مشاهده همه</nuxt-link>
        </section>

        <div class="flex flex-col items-center justify-center gap-4 shadow-xl bg-white p-6 w-full rounded-3xl" v-if="loading">
            <span>در حال بارگذاری اطلاعات...</span>
            <span class="skeleton w-full h-8 my-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-8/12 h-2"></span>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ActiveRoadmap from "~/components/profile/ActiveRoadmap.vue";

export default {
    head() {
        return {
            title: "حساب کاربری - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: { ActiveRoadmap },
    data() {
        return {
            loading: true,

            coupons: [],
            couponsLoading: false,
            couponsSwiperOptions: {
                autoplay: false,
                slidesPerView: "auto",
                loop: false,
            },

            courses: [],
            coursesLoading: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getCourses({ headers }), this.getCouponCodes({ headers })]);
    },
    mounted() {
        this.loading = false;
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async getCourses(data = {}) {
            if (this.coursesLoading) return;
            this.coursesLoading = true;

            let url = `/api/user-profile/courses`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.courses = results.data.records))
                .catch((e) => {})
                .finally(() => (this.coursesLoading = false));
        },

        async getCouponCodes(data = {}) {
            if (this.couponsLoading) return;
            this.couponsLoading = true;

            let url = `/api/user-profile/coupons`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.coupons = results.data.records))
                .catch((e) => {})
                .finally(() => (this.couponsLoading = false));
        },
    },
};
</script>
