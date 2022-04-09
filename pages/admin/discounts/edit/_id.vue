<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/discounts">تخفیف ها</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>ویرایش تخفیف</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <label for="">نوع تخفیف</label>
                <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                    <div class="flex items-center gap-2 cursor-pointer select-none" @click="type = 'onCourse'">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="type == 'onCourse'" />
                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                        </transition>
                        <span class="text-sm opacity-75">تخفیف معمولی روی دوره</span>
                    </div>
                    <div class="flex items-center gap-2 cursor-pointer select-none" @click="type = 'code'">
                        <transition name="check" mode="out-in" appear>
                            <img src="/icons/admin/TickSquare.svg" width="24" v-if="type == 'code'" />
                            <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                        </transition>
                        <span class="text-sm opacity-75">بن تخفیف</span>
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>نام</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="name" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full" :class="{ 'opacity-50': type != 'code' }">
                        <label class="text-sm">
                            <span>کد</span>
                            <b class="text-red-500" v-if="type == 'code'">*</b>
                        </label>
                        <input
                            type="text"
                            v-model="code"
                            dir="auto"
                            class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                            :disabled="type != 'code'"
                        />
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                    <div class="flex flex-col gap-2 w-max flex-shrink-0">
                        <label for=""></label>
                        <div class="flex items-center gap-2 cursor-pointer select-none" @click="amountType = 'percent'">
                            <transition name="check" mode="out-in" appear>
                                <img src="/icons/admin/TickSquare.svg" width="24" v-if="amountType == 'percent'" />
                                <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                            </transition>
                            <span class="text-sm opacity-75">درصد</span>
                        </div>
                        <div class="flex items-center gap-2 cursor-pointer select-none" @click="amountType = 'number'">
                            <transition name="check" mode="out-in" appear>
                                <img src="/icons/admin/TickSquare.svg" width="24" v-if="amountType == 'number'" />
                                <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                            </transition>
                            <span class="text-sm opacity-75">مبلغ ثابت</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>مقدار</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                            <input type="number" v-model="amount" dir="ltr" class="w-full bg-transparent" />
                            <small class="font-bold" v-if="amountType == 'percent'">%</small>
                            <small class="font-bold" v-if="amountType == 'number'">تومان</small>
                        </div>
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>از تاریخ</span>
                        </label>
                        <client-only placeholder="Loading...">
                            <persian-date-picker
                                v-model="startDate"
                                type="date"
                                class="p-2 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                            ></persian-date-picker>
                        </client-only>
                        <!-- <input type="date" v-model="startDate" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" /> -->
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>تا تاریخ</span>
                        </label>
                        <client-only placeholder="Loading...">
                            <persian-date-picker
                                v-model="endDate"
                                type="date"
                                class="p-2 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                            ></persian-date-picker>
                        </client-only>
                        <!-- <input type="date" v-model="endDate" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" /> -->
                    </div>
                </div>
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
                <div class="flex items-center gap-2 p-2 rounded-xl shadow-md flex-shrink-0 w-max" v-if="!!selectedSearchItem.name || !!selectedSearchItem.fullname">
                    <img class="w-14 shadow-md object-cover rounded-xl" v-if="!!selectedSearchItem.image" :src="selectedSearchItem.image" alt="" />
                    <img class="w-14 shadow-md object-cover rounded-xl" v-if="!!selectedSearchItem.icon" :src="selectedSearchItem.icon" alt="" />
                    <span class="text-sm" v-if="selectedSearchItem.name">{{ selectedSearchItem.name }}</span>
                    <span class="text-sm" v-if="selectedSearchItem.fullname">{{ selectedSearchItem.fullname }}</span>
                    <button class="flex-shrink-0" type="button" @click="selectSearchedItem({})"><img src="/icons/Cancel.svg" width="24" /></button>
                </div>
                <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>اعمال تخفیف بر روی</span>
                        </label>
                        <Select :selectedOption.sync="emmitTo" @update:selectedOption="selectSearchedItem({})" :options="emmitToOptions">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
                    </div>
                    <div class="relative flex flex-col w-full" v-if="emmitTo.value != 'allCourses'">
                        <div class="flex flex-col gap-2 w-full z-20">
                            <label class="text-sm">
                                <span>جستجوی {{ emmitTo.name }}</span>
                            </label>
                            <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                                <input type="text" v-model="searchQuery" class="w-full flex-grow bg-transparent" @input="searchTimeoutCheck()" />
                                <button type="button" @click="searchQuery = ''" v-if="!!searchQuery"><img src="/icons/Cancel.svg" width="24" /></button>
                            </div>
                        </div>
                        <ul
                            class="absolute top-16 flex flex-col gap-2 p-2 pt-6 rounded-xl w-full bg-white shadow-lg z-10 max-h-64 overflow-auto"
                            v-if="!!searchQuery"
                        >
                            <li
                                class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 cursor-pointer"
                                v-for="(item, i) in searchResults"
                                :key="i"
                                @click="selectSearchedItem(item)"
                            >
                                <img class="w-14 shadow-md object-cover rounded-xl" v-if="item.image" :src="item.image" alt="" />
                                <img class="w-14 shadow-md object-cover rounded-xl" v-if="item.icon" :src="item.icon" alt="" />
                                <span class="text-sm" v-if="item.name">{{ item.name }}</span>
                                <span class="text-sm" v-if="item.fullname">{{ item.fullname }}</span>
                            </li>
                            <li v-if="!searchResults.length"><small class="text-rose-800">نتیجه ای پیدا نشد!</small></li>
                        </ul>
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
import JDate from "jalali-moment";

export default {
    layout: "admin",
    head() {
        return { title: "ویرایش تخفیف - گروه آموزشی پرتقال" };
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
            emmitToOptions: {
                allCourses: { name: "همه دوره ها", value: "allCourses" },
                course: { name: "دوره خاص", value: "course" },
                courseGroup: { name: "گروه دوره", value: "courseGroup" },
                teacherCourses: { name: "استاد", value: "teacherCourses" },
                singleUser: { name: "کاربر", value: "singleUser" },
            },
            searchQuery: "",
            searchTimeout: null,
            searchResults: [],
            selectedSearchItem: {},

            name: "",
            type: "onCourse",
            amountType: "percent",
            amount: "",
            code: "",
            startDate: "",
            endDate: "",
            status: { name: "فعال", value: "active" },
            emmitTo: { name: "همه دوره ها", value: "allCourses" },

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.loadDiscount({ headers }, route);
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
        async loadDiscount(data = {}, route) {
            let url = `/api/admin/discounts/${route.params.id}`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    this.name = response.data.name;
                    this.type = response.data.type;
                    this.amount = response.data.amount;
                    this.amountType = response.data.amountType;
                    this.code = response.data.code;
                    this.status = this.statusOptions[response.data.status];
                    this.emmitTo = this.emmitToOptions[response.data.emmitTo];
                    this.selectedSearchItem = response.data.emmitToData || {};
                    this.startDate = JDate(response.data.startDate).locale("fa").format("YYYY-MM-DD");
                    this.endDate = JDate(response.data.endDate).locale("fa").format("YYYY-MM-DD");
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async searchTimeoutCheck() {
            if (this.searchTimeout) clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(async () => {
                await this.search();
                this.searchTimeout = null;
            }, 2000);
        },
        async search() {
            let url = `/api/admin/discounts/search/${this.searchQuery}?section=${this.emmitTo.value}`;
            await axios
                .get(encodeURI(url))
                .then((results) => {
                    this.searchResults = results.data.records;
                    if (this.searchResults.length > 5) this.searchResults.length = 5;
                })
                .catch((e) => {});
        },
        selectSearchedItem(item) {
            this.selectedSearchItem = { ...item };
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            let data = {
                name: this.name,
                type: this.type,
                amount: this.amount.toString(),
                amountType: this.amountType,
                startDate: JDate(this.startDate).toISOString(),
                endDate: JDate(this.endDate).toISOString(),
                status: this.status.value,
                emmitTo: this.emmitTo.value,
            };
            if (!!this.selectedSearchItem._id) data["emmitToId"] = this.selectedSearchItem._id;
            if (this.type == "code") data["code"] = this.code || "";

            let url = encodeURI(`/api/admin/discounts/${this.$route.params.id}`);
            await axios
                .put(url, data)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "تخفیف با موفقیت ویرایش شد" });
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
