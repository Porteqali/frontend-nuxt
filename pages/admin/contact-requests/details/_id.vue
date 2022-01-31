<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/contact-requests">پیام های تماس با ما</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>مشاهده پیام</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <b class="text-lg">{{ `${name} ${family}` }}</b>
                <div class="flex items-center gap-2">
                    <small>آدرس ایمیل:</small>
                    <span class="text-sm">{{ email }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <small>شماره موبایل:</small>
                    <span class="text-sm" dir="ltr">{{ mobile }}</span>
                </div>
                <span class="flex items-center gap-1">
                    <img src="/icons/TimeCircle.orange.svg" width="20" alt="" />
                    {{ new Date(createdAt).toLocaleString("fa") }}
                </span>
                <hr class="w-full" />
                <label class="">
                    <small>موضوع:</small>
                    {{ issue }}
                </label>
                <p class="bg-warmgray-50 rounded-xl p-2 w-full h-full">{{ message }}</p>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4">
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
        return { title: "مشاهده پیام - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,

            name: "",
            family: "",
            mobile: "",
            email: "",
            issue: "",
            message: "",
            status: "",
            createdAt: "",

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        const route = this.$nuxt.context.route;

        await this.loadRequest({ headers }, route);
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
        async loadRequest(data = {}, route) {
            let url = `/api/admin/contact-requests/${route.params.id}`;
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
                    this.family = response.data.family;
                    this.mobile = response.data.mobile;
                    this.email = response.data.email;
                    this.issue = response.data.issue;
                    this.message = response.data.message;
                    this.status = response.data.status;
                    this.createdAt = response.data.createdAt;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                });
        },
    },
};
</script>
