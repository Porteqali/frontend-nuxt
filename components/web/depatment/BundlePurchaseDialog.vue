<style scoped>
.bundle_tag {
    position: absolute;
    right: -0.5rem;
    transform: rotate(25deg);
    box-shadow: 0px 0px 15px rgba(245, 15, 21, 40%);
}

.purchased_tag {
    position: absolute;
    top: 0.5rem;
    right: 0.25rem;
    transform: rotate(25deg);
    border-radius: 0.5rem;
}
</style>

<template>
    <Dialog :open="open" @update:open="updateOpenState">
        <div class="flex flex-col gap-4 w-full max-w-xs md:max-w-2xl">
            <div class="flex flex-col gap-3 w-full overflow-hidden">
                <h5 class="kalameh_bold title text-2xl md:text-3xl ml-8">خرید یکجای دوره های باندل {{ bundle.title }}</h5>
                <small class="opacity-75 bg-amber-100 text-orange-700 p-1 px-2 rounded-full w-max" v-if="!!bundle.discountPercent">
                    با خرید این باندل از
                    <b class="text-rose-700">{{ bundle.discountPercent }} درصد</b>
                    تخفیف بیشتر استفاده کن
                </small>
            </div>
            <small class="w-full" v-if="bundle.desc">{{ bundle.desc }}</small>
            <span class="flex items-center gap-1 -mb-2">
                <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Play" />
                دوره های داخل این باندل
            </span>
            <div class="flex flex-col gap-4 w-full" v-if="!loading && !!bundleInfo">
                <ul class="flex flex-col gap-4 h-96 overflow-auto w-full p-2">
                    <li class="relative w-full" v-for="(item, i) in bundleInfo.courses" :key="i">
                        <div class="flex items-start gap-2 w-full bg-white rounded-xl p-2 shadow-xl" :class="{ 'opacity-60': item.course.hasBeenPurchased }">
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
                                <b>
                                    {{ new Intl.NumberFormat("fa").format(item.course.discountInfo.discountedPrice) }}
                                    <small>تومان</small>
                                </b>
                            </div>
                        </div>
                        <small class="purchased_tag kalameh_bold p-1 bg-orange-300 text-orange-500" v-if="item.course.hasBeenPurchased">خریداری شده</small>
                    </li>
                </ul>
                <hr />
                <div class="flex flex-col md:flex-row items-center gap-4">
                    <div class="relative flex flex-col items-start">
                        <span class="bundle_tag kalameh_bold bg-rose-500 text-white text-sm p-0.5 px-2 font-bold rounded-2xl" v-if="bundleInfo.discountPercent > 0">
                            {{ bundleInfo.discountPercent }}%
                        </span>
                        <div class="flex items-center gap-1" :class="{ 'mr-8': bundleInfo.discountPercent > 0 }">
                            <span class="kalameh_bold line-through">{{ new Intl.NumberFormat("fa").format(bundleInfo.price) }}</span>
                            <small class="text-xs">تومان</small>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="kalameh_bold text-orange-500 text-2xl md:text-3xl">
                                {{ new Intl.NumberFormat("fa").format(bundleInfo.discountedPrice) }}
                            </span>
                            <small class="text-sm">تومان</small>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 flex-grow">
                        <button
                            class="orange_gradient_h flex items-center justify-center w-full p-4 rounded-xl shadow-lg hover:shadow-xl"
                            :class="{ 'opacity-50 cursor-wait': redirectingToGateway }"
                            :disabled="redirectingToGateway"
                            @click="pay('zarinpal')"
                        >
                            <b class="kalameh_bold">تایید و پرداخت</b>
                        </button>
                        <button
                            class="bg-warmgray-100 flex items-center justify-center gap-1 p-3 rounded-xl shadow-lg hover:shadow-xl flex-shrink-0"
                            :class="{ 'opacity-50 cursor-wait': redirectingToGateway }"
                            :disabled="redirectingToGateway"
                            @click="pay('wallet')"
                            title="پرداخت با کیف پول"
                        >
                            <Icon class="w-8 h-8 bg-gray-800" folder="icons/new" name="Wallet" />
                            <span class="text-xs">کیف پول</span>
                        </button>
                    </div>
                </div>
            </div>
            <Loading class="w-12 h-12" v-else />
        </div>
    </Dialog>
</template>

<script>
import axios from "axios";
import Dialog from "~/components/Dialog";
import Loading from "~/components/Loading";

export default {
    name: "BundlePurchaseDialog",
    props: ["open", "bundle"],
    components: {
        Dialog,
        Loading,
    },
    data() {
        return {
            loading: false,
            bundleInfo: {},
            redirectingToGateway: false,

            errorMsg: "",
            errorTag: "",
        };
    },
    watch: {
        async bundle(val) {
            await this.getBundleInfo();
        },
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        async getBundleInfo() {
            if (this.loading) return;
            this.loading = true;

            let url = `/api/bundles/info/${this.bundle._id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(encodeURI(url), { headers })
                .then((results) => (this.bundleInfo = results.data))
                .catch((e) => {})
                .finally(() => (this.loading = false));
        },

        async pay(method) {
            // before redirecting to payment gateway check if user is logged in or not
            if (!this.user.info.email && !this.user.info.mobile) {
                this.$store.dispatch("toast/makeToast", {
                    type: "error",
                    title: "پرداخت و خرید",
                    message: `برای انجام هرگونه عملیات خرید، ابتدا باید در سایت ثبتنام و وارد حساب کاربری خود شده باشید`,
                });
                return;
            }

            if (this.bundleInfo.discountedPrice < 1000 && method != "wallet") {
                this.$store.dispatch("toast/makeToast", {
                    type: "error",
                    title: "پرداخت و خرید",
                    message: `مبالغ زیر 1000 تومان را با کیف پول پرداخت کنید`,
                });
                return;
            }

            if (this.redirectingToGateway) return;
            this.redirectingToGateway = true;

            // request back-end for redirect url
            await axios
                .post(`/api/course-payment`, { method, bundleId: this.bundle._id })
                .then((response) => {
                    // then rediect to gateway
                    window.location.href = response.data.url;
                })
                .catch((e) => {
                    this.redirectingToGateway = false;
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.$store.dispatch("toast/makeToast", {
                                type: "error",
                                title: "انتقال به درگاه پرداخت",
                                message: e.response.data.message[0].errors[0],
                            });
                        }
                    }
                });
        },
    },
};
</script>
