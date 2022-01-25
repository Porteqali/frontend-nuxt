<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/users">مدیریت کاربران</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>ویرایش کاربر</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex items-center gap-4">
                    <img class="w-28 h-28 bg-gray-300 rounded-3xl object-cover" :src="image || '/icons/Profile.svg'" alt="" />
                    <div class="flex flex-col items-start gap-4">
                        <button type="button" class="orange_gradient_h p-2 px-4 rounded-xl shadow-md text-sm" @click="$refs.fileInput.click()" :disabled="saving">
                            آپلود عکس جدید
                        </button>
                        <button type="button" class="gray_gradient p-2 px-4 rounded-xl shadow-md text-sm" @click="deleteImage()" v-if="!!image">حذف</button>
                    </div>
                    <input class="w-0 h-0 opacity-0" ref="fileInput" type="file" accept=".jpg,.jpeg,.png,.gif" @change="selectFile()" />
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>نام</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="name" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>نام خانوادگی</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="family" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>ایمیل</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="email" v-model="email" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-max flex-shrink-0">
                        <label class="text-sm">
                            <span>وضعیت تایید ایمیل</span>
                        </label>
                        <div class="flex items-center gap-2 cursor-pointer select-none h-full" @click="emailVerified = !emailVerified">
                            <transition name="check" mode="out-in" appear>
                                <img src="/icons/admin/TickSquare.svg" width="24" v-if="emailVerified" />
                                <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                            </transition>
                            <span class="text-sm opacity-75" v-if="emailVerified">تایید شده</span>
                            <span class="text-sm opacity-75" v-else>تایید نشده</span>
                        </div>
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>شماره موبایل</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input
                            type="text"
                            v-model="mobile"
                            dir="auto"
                            v-mask="`###########`"
                            class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                        />
                    </div>
                    <div class="flex flex-col gap-2 w-max flex-shrink-0">
                        <label class="text-sm">
                            <span>وضعیت تایید موبایل</span>
                        </label>
                        <div class="flex items-center gap-2 cursor-pointer select-none h-full" @click="mobileVerified = !mobileVerified">
                            <transition name="check" mode="out-in" appear>
                                <img src="/icons/admin/TickSquare.svg" width="24" v-if="mobileVerified" />
                                <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                            </transition>
                            <span class="text-sm opacity-75" v-if="mobileVerified">تایید شده</span>
                            <span class="text-sm opacity-75" v-else>تایید نشده</span>
                        </div>
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>وضعیت</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <Select :selectedOption.sync="status" :options="statusOptions">
                        <template v-slot:option="{ option }">
                            <span :value="option.value">{{ option.name }}</span>
                        </template>
                    </Select>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>رمزعبور</span>
                        </label>
                        <input type="password" v-model="password" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>تکرار رمزعبور</span>
                        </label>
                        <input type="password" v-model="passwordConfirmation" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                </div>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
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
        return { title: "ویرایش کاربر - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,
            statusOptions: {
                active: { name: "فعال", value: "active" },
                deactive: { name: "غیرفعال", value: "deactive" },
            },

            image: "",
            name: "",
            family: "",
            email: "",
            emailVerified: false,
            mobile: "",
            mobileVerified: false,
            status: { name: "فعال", value: "active" },
            password: "",
            passwordConfirmation: "",

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.loadUser({ headers }, route);
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async loadUser(data = {}, route) {
            let url = `/api/admin/users/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.image = response.data.image;
                    this.name = response.data.name;
                    this.family = response.data.family;
                    this.email = response.data.email;
                    this.emailVerified = response.data.emailVerifiedAt ? true : false;
                    this.mobile = response.data.mobile;
                    this.mobileVerified = response.data.mobileVerifiedAt ? true : false;
                    this.status = this.statusOptions[response.data.status];
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async selectFile() {
            this.image = this.$refs.fileInput.files[0] ? URL.createObjectURL(this.$refs.fileInput.files[0]) : "";
        },

        async deleteImage() {
            this.$refs.fileInput.files = undefined;
            this.image = "";
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            const formData = new FormData();
            if (this.$refs.fileInput.files[0]) formData.append("files", this.$refs.fileInput.files[0]);
            formData.append("image", this.image);
            formData.append("name", this.name);
            formData.append("family", this.family);
            formData.append("email", this.email);
            formData.append("emailVerified", this.emailVerified);
            formData.append("mobile", this.mobile);
            formData.append("mobileVerified", this.mobileVerified);
            formData.append("status", this.status.value);
            if (!!this.password) formData.append("password", this.password);
            if (!!this.passwordConfirmation) formData.append("passwordConfirmation", this.passwordConfirmation);

            let url = encodeURI(`/api/admin/users/${this.$route.params.id}`);
            await axios
                .put(url, formData)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "کاربر با موفقیت ویرایش شد" });
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
