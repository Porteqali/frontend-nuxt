<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/bundles">لیست باندل ها</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>ویرایش باندل</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>عنوان باندل نقشه راه</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="title" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>توضیحات باندل</span>
                    </label>
                    <textarea v-model="desc" dir="auto" rows="4" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
                </div>

                <hr class="w-full" />

                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>تخفیف باندل</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                        <input type="text" v-model="discountPercent" v-money="{ decimal: '.', thousands: ',' }" dir="auto" class="w-full bg-transparent" />
                        <small class="font-bold">%</small>
                    </div>
                </div>

                <hr class="w-full" />

                <div class="flex flex-col gap-2 w-max flex-shrink-0">
                    <div class="flex items-center gap-2 cursor-pointer select-none" @click="giftCode = !giftCode">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="20" v-if="giftCode" />
                            <img src="/icons/admin/TickSquareBox.svg" width="20" v-else />
                        </transition>
                        <span class="text-xs opacity-75">ایجاد بن هدیه پس از اتمام دوره ها؟</span>
                    </div>
                </div>

                <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>درصد بن تخفیف هدیه</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                            <input type="text" v-model="giftCodePercent" v-money="{ decimal: '.', thousands: ',' }" dir="auto" class="w-full bg-transparent" />
                            <small class="font-bold">درصد</small>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>تاریخ اتمام بن تخفیف</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <div class="flex items-center gap-2 p-3 w-max rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                            <input type="number" v-model="giftCodeDeadline" dir="ltr" class="w-32 bg-transparent" />
                            <small class="font-bold">روز</small>
                        </div>
                    </div>
                </div>

                <hr class="w-full" />
                <nuxt-link :to="`/admin/bundles/courses/${$route.params.id}`" class="w-max bg-lightblue-100 p-2 py-1 rounded-lg text-lightblue-900">
                    <small class="opacity-75 hover:underline">مشاهده و ویرایش دوره های باندل</small>
                </nuxt-link>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex items-center flex-wrap gap-2" v-show="saving">
                <small class="opacity-75">درحال آپلود فایل...</small>
                <div class="progress_bar bg-gray-50 w-40 h-max rounded-full shadow-inner">
                    <div class="h-2 bg-secondary-400 rounded-full" :style="`width:${uploadingFilesPercentage}%`"></div>
                </div>
                <b class="text-xs opacity-60">{{ `${uploadingFilesPercentage}%` }}</b>
            </div>
            <div class="flex flex-wrap items-center gap-4">
                <button class="orange_gradient_h p-4 py-2 rounded-xl" :class="{ 'opacity-75 cursor-wait': saving }" :disabled="saving" @click="save()">
                    تایید و ثبت
                </button>
                <button class="border-2 border-gray-500 hover:bg-gray-200 p-4 py-1.5 rounded-xl" @click="$router.back()">بازگشت</button>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "admin",
    head() {
        return { title: "ویرایش باندل - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,

            title: "",
            desc: "",
            discountPercent: "",
            giftCode: true,
            giftCodePercent: "",
            giftCodeDeadline: "",

            errorMsg: "",
            errorTag: "",
            uploadingFilesPercentage: 0,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.loadBundle({ headers }, route);
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async loadBundle(data = {}, route) {
            let url = `/api/admin/bundles/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.title = response.data.title;
                    this.desc = response.data.desc;
                    this.discountPercent = response.data.discountPercent;
                    this.giftCodePercent = response.data.giftCodePercent;
                    this.giftCodeDeadline = response.data.giftCodeDeadline;
                    this.giftCode = this.giftCodePercent && this.giftCodePercent > 0 ? true : false;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            const data = {
                title: this.title,
                desc: this.desc,
                discountPercent: this.discountPercent,
            };
            if (this.giftCode) {
                data.giftCodePercent = this.giftCodePercent;
                data.giftCodeDeadline = this.giftCodeDeadline;
            }

            let url = encodeURI(`/api/admin/bundles/${this.$route.params.id}`);
            await axios
                .put(url, data, { onUploadProgress: (e) => (this.uploadingFilesPercentage = parseInt(Math.round((e.loaded / e.total) * 100))) })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "باندل با موفقیت ویرایش شد" });
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                        this.errorMsg = e.response.data.message[0].errors[0];
                        this.errorTag = e.response.data.message[0].property;
                    }
                })
                .finally(() => {
                    this.saving = false;
                });
        },
    },
};
</script>
