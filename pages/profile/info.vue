<style scoped></style>

<template>
    <section class="relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl bg-white w-full max-w-screen-lg flex-grow">
        <div class="flex items-center gap-2">
            <img src="/icons/Profile.gray.svg" width="32" height="32" alt="Profile" />
            <h2 class="kalameh_bold title text-2xl">اطلاعات حساب</h2>
        </div>
        <AvatarImageUpload v-if="!loading" />
        <form class="flex flex-col items-start gap-6" @submit="save($event)" v-if="!loading">
            <div class="flex flex-wrap md:flex-nowrap items-center gap-4 w-full">
                <div class="flex flex-col gap-2 w-full">
                    <label class="">نام</label>
                    <input type="text" v-model="name" dir="auto" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="">نام خانوادگی</label>
                    <input type="text" v-model="family" dir="auto" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl" />
                </div>
            </div>
            <hr class="w-full" />
            <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                <div class="flex flex-col gap-2 w-full">
                    <label class="flex items-center gap-2">
                        <span>ایمیل</span>
                        <small class="p-1 px-2 text-xs rounded-lg bg-lightblue-100 text-blue-600" v-if="emailVerified">تایید شده</small>
                        <small class="p-1 px-2 text-xs rounded-lg bg-rose-100 text-rose-600" v-else>تایید نشده</small>
                    </label>
                    <input type="email" v-model="email" dir="auto" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl" disabled />
                </div>
                <button
                    type="button"
                    class="flex items-center gap-1 border-2 border-solid border-gray-300 hover:bg-warmgray-600 hover:text-white p-2.5 px-4 rounded-xl hover:shadow-lg flex-shrink-0"
                    @click="emailVerificationOpenState = true"
                >
                    <Icon class="w-6 h-6 bg-orange-400" size="24px" folder="icons/new" name="Edit" />
                    <span class="text-sm">ویرایش و تایید ایمیل</span>
                </button>
            </div>
            <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                <div class="flex flex-col gap-2 w-full">
                    <label class="flex items-center gap-2">
                        <span>شماره موبایل</span>
                        <small class="p-1 px-2 text-xs rounded-lg bg-lightblue-100 text-blue-600" v-if="mobileVerified">تایید شده</small>
                        <small class="p-1 px-2 text-xs rounded-lg bg-rose-100 text-rose-600" v-else>تایید نشده</small>
                    </label>
                    <input type="email" v-model="mobile" dir="auto" class="p-3 w-full bg-warmgray-100 rounded-xl focus:shadow-xl" disabled />
                </div>
                <button
                    type="button"
                    class="flex items-center gap-1 border-2 border-solid border-gray-300 hover:bg-warmgray-600 hover:text-white p-2.5 px-4 rounded-xl hover:shadow-lg flex-shrink-0"
                    @click="mobileVerificationOpenState = true"
                >
                    <Icon class="w-6 h-6 bg-orange-400" size="24px" folder="icons/new" name="Edit" />
                    <span class="text-sm">ویرایش و تایید شماره موبایل</span>
                </button>
            </div>
            <hr class="w-full" />
            <span
                class="p-2 rounded-lg text-sm"
                :class="{ 'bg-red-100 text-red-800': messageType == 'error', 'bg-emerald-100 text-emerald-800': messageType == 'success' }"
                v-if="!!message"
            >
                {{ message }}
            </span>
            <button class="orange_gradient_h p-3 px-4 rounded-xl shadow-md" :class="{ 'opacity-50 cursor-wait': saving }" type="submit">تایید و ثبت</button>
        </form>
        <div class="flex flex-col items-center justify-center gap-4 p-6 w-full" v-if="loading">
            <span>در حال بارگذاری اطلاعات...</span>
            <span class="skeleton w-full h-8 my-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-8/12 h-2"></span>
        </div>

        <ChangeAndConfirmEmail :open.sync="emailVerificationOpenState" @update:email="updateEmail" />
        <ChangeAndConfirmMobile :open.sync="mobileVerificationOpenState" @update:mobile="updateMobile" />
    </section>
</template>

<script>
import axios from "axios";
import AvatarImageUpload from "~/components/profile/AvatarImageUpload.vue";
import ChangeAndConfirmEmail from "~/components/profile/ChangeAndConfirmEmail.vue";
import ChangeAndConfirmMobile from "~/components/profile/ChangeAndConfirmMobile.vue";

export default {
    head() {
        return {
            title: "ویرایش و تایید اطلاعات - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "" }],
        };
    },
    components: {
        AvatarImageUpload,
        ChangeAndConfirmEmail,
        ChangeAndConfirmMobile,
    },
    data() {
        return {
            loading: true,

            emailVerified: false,
            mobileVerified: false,

            name: "",
            family: "",
            email: "",
            mobile: "",

            saving: false,
            messageType: "",
            message: "",

            emailVerificationOpenState: false,
            mobileVerificationOpenState: false,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.checkVerificationStatus({ headers })]);
    },
    mounted() {
        this.loading = false;

        this.name = this.user.info.name || "";
        this.family = this.user.info.family || "";
        this.email = this.user.info.email || "";
        this.mobile = this.user.info.mobile || "";
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async checkVerificationStatus(data = {}) {
            let url = `/api/users/check-verification`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.emailVerified = results.data.emailVerified;
                    this.mobileVerified = results.data.mobileVerified;
                })
                .catch((e) => {});
        },

        async save(e) {
            e.preventDefault();
            if (this.saving) return;
            this.saving = true;

            this.message = "";

            await axios
                .post(`/api/users/edit-info`, {
                    name: this.name,
                    family: this.family,
                })
                .then(() => {
                    this.messageType = "success";
                    this.message = "اطلاعات شما ذخیره شد";
                    this.$store.commit("user/setInfo", { ...this.user.info, name: this.name, family: this.family });
                })
                .catch((e) => {
                    this.messageType = "error";
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.message = e.response.data.message[0].errors[0];
                        }
                    }
                })
                .finally(() => (this.saving = false));
        },

        updateEmail(email) {
            this.email = email;
        },
        updateMobile(mobile) {
            this.mobile = mobile;
        },
    },
};
</script>
