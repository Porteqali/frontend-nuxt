<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/permissions">مدیریت دسترسی ها</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>ویرایش دسترسی</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>نام گروه دسترسی</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="name" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <hr class="w-full" />
                <div class="flex flex-col gap-1">
                    <h5>دسترسی ها</h5>
                    <small class="opacity-50">مجوز های مورد نظر خود را انتخاب کنید</small>
                </div>
                <ul class="flex flex-col gap-2 mt-2">
                    <li class="mb-4" v-for="(group, groupName) in permissions" :key="groupName">
                        <div class="flex items-center mb-2 gap-2 cursor-pointer select-none" @click="addPermission(group)">
                            <transition name="check" mode="out-in" appear>
                                <img src="/icons/admin/TickSquare.svg" width="24" v-if="checkPermission(group)" />
                                <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                            </transition>
                            <b>{{ group[0].groupLabel }}</b>
                        </div>
                        <ul class="px-6">
                            <li class="mb-2" v-for="(item, i) in group" :key="i">
                                <div class="flex items-center gap-2 cursor-pointer select-none" @click="addPermission([item])">
                                    <transition name="check" mode="out-in" appear>
                                        <img src="/icons/admin/TickSquare.svg" width="24" v-if="checkPermission([item])" />
                                        <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                                    </transition>
                                    <span class="text-sm opacity-75">{{ item.label }}</span>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
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

export default {
    layout: "admin",
    head() {
        return { title: "ویرایش گروه دسترسی - گروه آموزشی پرتقال" };
    },
    components: {},
    data() {
        return {
            loading: false,
            saving: false,
            permissions: this.permissions || {},

            name: "",
            selectedPermissions: this.selectedPermissions || [],

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.getPermissions({ headers });
        await this.loadPermissions({ headers }, route);
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async getPermissions(data = {}) {
            let url = `/api/admin/permission-groups/permissions`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            url = encodeURI(url);
            await axios
                .get(url, { headers })
                .then((response) => {
                    const records = response.data.records;
                    for (let i = 0; i < records.length; i++) {
                        if (!this.permissions.hasOwnProperty(records[i].group)) this.permissions[records[i].group] = [];
                        this.permissions[records[i].group].push({ ...records[i] });
                    }
                    this.permissions = { ...this.permissions };
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        async loadPermissions(data = {}, route) {
            let url = `/api/admin/permission-groups/${route.params.id}`;
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
                    this.selectedPermissions = response.data.permissions;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },

        addPermission(items) {
            let state = "";
            if (items.length > 1) state = this.checkPermission(items) ? "1" : "0";

            for (let i = 0; i < items.length; i++) {
                const index = this.selectedPermissions.indexOf(items[i]._id);
                if (index === -1) {
                    if (state == "1") continue;
                    this.selectedPermissions.push(items[i]._id);
                } else {
                    if (state == "0") continue;
                    this.selectedPermissions.splice(index, 1);
                }
            }
        },
        checkPermission(items) {
            let checked = true;
            for (let i = 0; i < items.length; i++) {
                if (this.selectedPermissions.indexOf(items[i]._id) === -1) {
                    checked = false;
                    break;
                }
            }
            return checked;
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            let url = encodeURI(`/api/admin/permission-groups/${this.$route.params.id}`);
            await axios
                .put(url, {
                    name: this.name,
                    selectedPermissions: this.selectedPermissions,
                })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "گروه دسترسی با موفقیت ویرایش شد" });
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
