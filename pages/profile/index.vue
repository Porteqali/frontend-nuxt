<style scoped>
.card {
    background-color: #ffffff77;
}
</style>

<template>
    <section class="card relative flex flex-col gap-8 p-4 md:p-6 rounded-3xl shadow-xl w-full max-w-screen-lg flex-grow">
        <div class="flex items-center gap-2">
            <img src="/icons/Profile.gray.svg" width="32" height="32" alt="Profile" />
            <h2 class="text-2xl">اطلاعات حساب</h2>
        </div>
        <AvatarImageUpload v-if="!loading" />
        <form class="flex flex-col items-start gap-6" @submit="save($event)" v-if="!loading">
            <div class="flex flex-wrap md:flex-nowrap items-center gap-4 w-full">
                <div class="flex flex-col gap-2 w-full">
                    <label class="">نام</label>
                    <input type="text" v-model="name" dir="auto" class="p-3 w-full rounded-xl shadow-xl" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="">نام خانوادگی</label>
                    <input type="text" v-model="family" dir="auto" class="p-3 w-full rounded-xl shadow-xl" />
                </div>
            </div>
            <hr class="w-full" />
            <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                <div class="flex flex-col gap-2 w-full">
                    <label class="">ایمیل</label>
                    <input type="email" v-model="email" dir="auto" class="p-3 w-full rounded-xl shadow-xl" disabled />
                </div>
                <button type="button" class="gray_gradient p-3 px-4 rounded-2xl shadow-md flex-shrink-0" @click="emailVerificationOpenState = true">
                    ویرایش و تایید ایمیل
                </button>
            </div>
            <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                <div class="flex flex-col gap-2 w-full">
                    <label class="">شماره موبایل</label>
                    <input type="email" v-model="mobile" dir="auto" class="p-3 w-full rounded-xl shadow-xl" disabled />
                </div>
                <button type="button" class="gray_gradient p-3 px-4 rounded-2xl shadow-md flex-shrink-0" @click="mobileVerificationOpenState = true">
                    ویرایش و تایید شماره موبایل
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
            <button class="orange_gradient_h p-3 px-4 rounded-2xl shadow-md" :class="{ 'opacity-50 cursor-wait': saving }" type="submit">تایید و ثبت</button>
        </form>
        <div class="flex flex-col items-center justify-center gap-4 p-6 w-full" v-if="loading">
            <span>در حال بارگذاری اطلاعات...</span>
            <span class="skeleton w-full h-8 my-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-full h-2"></span>
            <span class="skeleton w-8/12 h-2"></span>
        </div>

        <ChangeAndConfirmEmail :open.sync="emailVerificationOpenState" />
        <ChangeAndConfirmMobile :open.sync="mobileVerificationOpenState" />
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
            title: "حساب کاربری - گروه آموزشی پرتقال",
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
    },
};
</script>
