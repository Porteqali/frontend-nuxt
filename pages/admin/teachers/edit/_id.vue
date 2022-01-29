<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/teachers">مدیریت اساتید</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>ویرایش استاد</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
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
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>شماره موبایل</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input
                            type="text"
                            v-model="mobile"
                            v-mask="'09##-### ####'"
                            dir="ltr"
                            class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                        />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>تلفن ثابت</span>
                        </label>
                        <input
                            type="text"
                            v-model="tel"
                            v-mask="'###-#### ####'"
                            dir="ltr"
                            placeholder="021-2233 4567"
                            class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                        />
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>ایمیل</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="email" v-model="email" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>آدرس</span>
                    </label>
                    <input type="text" v-model="address" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>کد پستی</span>
                        </label>
                        <input type="text" v-model="postalCode" dir="ltr" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>کد ملی</span>
                        </label>
                        <input type="text" v-model="nationalCode" dir="ltr" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
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
                <hr class="w-full" />
                <label for="">گروه های استاد</label>
                <small class="text-xs opacity-75">اولین گروه به عنوان گروه اصلی استاد در نظر گرفته میشود</small>
                <ul class="flex flex-wrap gap-2" v-if="Object.keys(groups).length">
                    <li
                        class="flex items-center gap-2 p-2 rounded-xl shadow-md w-max"
                        :class="{ 'bg-orange-50': i == groups[Object.keys(groups)[0]].value }"
                        v-for="(group, i) in groups"
                        :key="i"
                    >
                        <img class="w-8 h-8 shadow-md object-cover rounded-full" :src="group.icon" alt="" />
                        <span class="text-sm">{{ group.name }}</span>
                        <button type="button" @click="selectGroup(group)"><img src="/icons/Cancel.svg" width="20" /></button>
                    </li>
                </ul>
                <div class="flex flex-col gap-2 w-full">
                    <Select :selectedOption="{ name: '', value: '' }" @update:selectedOption="selectGroup" :options="groupsOptions" placeholder="انتخاب گروه">
                        <template v-slot:option="{ option }">
                            <span :value="option.value">{{ option.name }}</span>
                        </template>
                    </Select>
                </div>
                <hr class="w-full" />
                <label for="">تاریخ تولد</label>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">روز</label>
                        <Select :selectedOption.sync="birthDay" :options="birthDayOptions">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">ماه</label>
                        <Select :selectedOption.sync="birthMonth" :options="birthMonthOptions">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">سال</label>
                        <Select :selectedOption.sync="birthYear" :options="birthYearOptions">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">نام پدر</label>
                    <input type="text" v-model="fatherName" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">توضیحات</label>
                    <textarea v-model="description" dir="auto" rows="4" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
                </div>
                <hr class="w-full" />
                <label for="">مشخصات مالی</label>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>کمیسیون</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <Select :selectedOption.sync="commission" :options="commissionOptions">
                        <template v-slot:option="{ option }">
                            <span :value="option.value">{{ option.name }}</span>
                        </template>
                    </Select>
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">شماره کارت</label>
                        <input
                            type="text"
                            v-model="cardNumber"
                            dir="ltr"
                            v-mask="`####-####-####-####`"
                            class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                        />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">نام صاحب کارت</label>
                        <input type="text" v-model="cardOwnerName" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">بانک</label>
                        <input type="text" v-model="cardBankName" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">شماره شبا</label>
                    <input type="text" v-model="shebaNumber" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
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
        return { title: "ویرایش استاد - گروه آموزشی پرتقال" };
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
            birthDayOptions: this.birthDayOptions || {},
            birthMonthOptions: this.birthMonthOptions || {},
            birthYearOptions: this.birthYearOptions || {},
            commissionOptions: this.commissionOptions || {},
            groupsOptions: this.groupsOptions || {},

            image: "",
            name: "",
            family: "",
            email: "",
            status: { name: "فعال", value: "active" },
            mobile: "",
            tel: "",
            address: "",
            postalCode: "",
            nationalCode: "",
            birthDay: { name: "", value: "" },
            birthMonth: { name: "", value: "" },
            birthYear: { name: "", value: "" },
            fatherName: "",
            description: "",
            groups: {},
            password: "",
            passwordConfirmation: "",
            cardNumber: "",
            cardOwnerName: "",
            cardBankName: "",
            shebaNumber: "",
            commission: { name: "", value: "" },

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await Promise.all([this.loadDates(), this.getCommissions({ headers }), this.getCourseGroups({ headers })]);
        await this.loadTeacher({ headers }, route);
    },
    mounted() {
        this.baseUrl = window.location.origin;
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async loadTeacher(data = {}, route) {
            let url = `/api/admin/teachers/${route.params.id}`;
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
                    this.status = this.statusOptions[response.data.status];
                    this.mobile = response.data.mobile;
                    this.tel = response.data.tel;
                    this.address = response.data.address;
                    this.postalCode = response.data.postalCode;
                    this.nationalCode = response.data.nationalCode;

                    const birthDate = response.data.birthDate.split("/");
                    this.birthYear = this.birthYearOptions[`Y${birthDate[0]}`] || { name: "", value: "" };
                    this.birthMonth = this.birthMonthOptions[`M${birthDate[1]}`] || { name: "", value: "" };
                    this.birthDay = this.birthDayOptions[`D${birthDate[2]}`] || { name: "", value: "" };

                    this.fatherName = response.data.fatherName;
                    this.description = response.data.description;
                    for (let i = 0; i < response.data.groups.length; i++) this.selectGroup(this.groupsOptions[response.data.groups[i]]);
                    this.cardNumber = response.data.cardNumber;
                    this.cardOwnerName = response.data.cardOwnerName;
                    this.cardBankName = response.data.cardBankName;
                    this.shebaNumber = response.data.shebaNumber;
                    this.commission = this.commissionOptions[response.data.commission];
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async loadDates() {
            for (let i = 1; i <= 31; i++) {
                const value = i <= 9 ? i.toString().padStart(2, "0") : i.toString();
                this.birthDayOptions[`D${value}`] = { name: value, value };
            }

            const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
            for (let i = 0; i < months.length; i++) {
                let value = i + 1;
                value = value <= 9 ? value.toString().padStart(2, "0") : value.toString();
                this.birthMonthOptions[`M${value}`] = { name: months[i], value };
            }

            for (let i = 1405; i > 1310; i--) this.birthYearOptions[`Y${i.toString()}`] = { name: i.toString(), value: i.toString() };
        },

        async getCommissions(data = {}) {
            let url = `/api/admin/commissions?pp=50`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    response.data.records.forEach((record) => {
                        this.commissionOptions[record._id] = { name: record.name, value: record._id };
                    });
                })
                .catch((e) => {});
        },

        async getCourseGroups(data = {}) {
            let url = `/api/course-groups?pp=50`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    response.data.records.forEach((record) => {
                        this.groupsOptions[record._id] = { name: record.name, value: record._id, icon: record.icon };
                    });
                })
                .catch((e) => {});
        },

        async selectFile() {
            this.image = this.$refs.fileInput.files[0] ? URL.createObjectURL(this.$refs.fileInput.files[0]) : "";
        },

        async deleteImage() {
            this.$refs.fileInput.files = undefined;
            this.image = "";
        },

        selectGroup(group) {
            if (typeof this.groups[group.value] === "undefined") this.groups[group.value] = group;
            else delete this.groups[group.value];
            this.groups = { ...this.groups };
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
            formData.append("status", this.status.value);
            formData.append("mobile", this.mobile.replaceAll("-", "").replaceAll(" ", ""));
            if (!!this.tel) formData.append("tel", this.tel);
            if (!!this.address) formData.append("address", this.address);
            if (!!this.postalCode) formData.append("postalCode", this.postalCode);
            if (!!this.nationalCode) formData.append("nationalCode", this.nationalCode);
            if (!!this.password) formData.append("password", this.password);
            if (!!this.passwordConfirmation) formData.append("passwordConfirmation", this.passwordConfirmation);
            if (!!this.birthDay.value && !!this.birthMonth.value && !!this.birthYear.value) {
                formData.append("birthDate", `${this.birthYear.value}/${this.birthMonth.value}/${this.birthDay.value}`);
            }
            if (!!this.fatherName) formData.append("fatherName", this.fatherName);
            formData.append("description", this.description);
            formData.append("groups", Object.keys(this.groups).toString());
            if (!!this.cardNumber) formData.append("cardNumber", this.cardNumber);
            if (!!this.cardOwnerName) formData.append("cardOwnerName", this.cardOwnerName);
            if (!!this.cardBankName) formData.append("cardBankName", this.cardBankName);
            if (!!this.shebaNumber) formData.append("shebaNumber", this.shebaNumber);
            formData.append("commission", this.commission.value);

            let url = encodeURI(`/api/admin/teachers/${this.$route.params.id}`);
            await axios
                .put(url, formData)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "استاد با موفقیت ویرایش شد" });
                })
                .catch((e) => {
                    console.log(e);
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
