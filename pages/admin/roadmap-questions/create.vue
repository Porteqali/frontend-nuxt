<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/roadmap-questions">سوالات نقشه راه</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>سوال جدید</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>گروه سوال</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <Select :selectedOption.sync="questionGroup" :options="questionGroups">
                        <template v-slot:option="{ option }">
                            <span :value="option.value">{{ option.name }}</span>
                        </template>
                    </Select>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>سوال</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <input type="text" v-model="question" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                </div>
                <hr class="w-full" />
                <small class="text-xs opacity-75">حداقل دو گزینه باید تعیین شود</small>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>گزینه یک</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="option1" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>گزینه دو</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="option2" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>گزینه سه</span>
                        </label>
                        <input type="text" v-model="option3" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>گزینه چهار</span>
                        </label>
                        <input type="text" v-model="option4" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
                    </div>
                </div>

                <hr class="w-full" />

                <ul class="flex flex-wrap gap-4 p-2">
                    <li class="flex flex-col gap-2 w-full max-w-xs p-4 rounded-2xl shadow-lg" v-for="(major, i) in majors" :key="i">
                        <div class="flex items-center gap-2">
                            <img class="w-10 h-10 object-contain" :src="major.image" :alt="major.name" />
                            <b class="kalameh_bold">{{ major.name }}</b>
                        </div>
                        <hr class="w-full" />
                        <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                            <div class="flex flex-col gap-2 w-full">
                                <label class="text-sm">
                                    <span>وزن گزینه یک</span>
                                    <b class="text-red-500">*</b>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    v-model="major.options.opt1"
                                    class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                                />
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label class="text-sm">
                                    <span>وزن گزینه دو</span>
                                    <b class="text-red-500">*</b>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    v-model="major.options.opt2"
                                    class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                                />
                            </div>
                        </div>
                        <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                            <div class="flex flex-col gap-2 w-full">
                                <label class="text-sm">
                                    <span>وزن گزینه سه</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    v-model="major.options.opt3"
                                    class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                                />
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label class="text-sm">
                                    <span>وزن گزینه چهار</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    v-model="major.options.opt4"
                                    class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                                />
                            </div>
                        </div>
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
import Select from "~/components/forms/admin/Select.vue";

export default {
    layout: "admin",
    head() {
        return { title: "ایجاد سوال جدید - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,

            questionGroups: this.questionGroups || {},
            majors: this.majors || {},

            questionGroup: { name: "", value: "" },
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",

            errorMsg: "",
            errorTag: "",
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getQuestionGroups({ headers }), this.getMajors({ headers })]);
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async getQuestionGroups(data = {}) {
            let url = `/api/admin/roadmap-question-category?pp=50`;
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
                        this.questionGroups[record._id] = { name: record.name, value: record._id };
                    });
                })
                .catch((e) => {});
        },
        async getMajors(data = {}) {
            let url = `/api/admin/majors?pp=50`;
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
                        this.majors[record._id] = { _id: record._id, image: record.image, name: record.title, options: { opt1: 0, opt2: 0, opt3: 0, opt4: 0 } };
                    });
                })
                .catch((e) => {});
        },

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            const data = {
                majors: this.majors,
                questionGroup: this.questionGroup.value,
                question: this.question,
                option1: this.option1,
                option2: this.option2,
            };
            if (!!this.option3) data["option3"] = this.option3;
            if (!!this.option4) data["option4"] = this.option4;

            let url = encodeURI(`/api/admin/roadmap-questions`);
            await axios
                .post(url, data)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "سوال با موفقیت اضافه شد" });
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
