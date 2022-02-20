<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>Importer</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 flex-grow max-h-full overflow-auto">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-wrap items-start gap-4">
                        <button type="button" class="orange_gradient_h p-2 px-4 rounded-xl shadow-md text-sm" @click="$refs.fileInput.click()" :disabled="importing">
                            آپلود فایل های Json
                        </button>
                        <input class="w-0 h-0 opacity-0" ref="fileInput" type="file" accept=".json" multiple @change="selectFiles()" />
                    </div>
                </div>
                <hr class="w-full" />
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>Collection</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <Select :selectedOption.sync="collection" :options="collectionOptions">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
                    </div>
                </div>
                <hr class="w-full" />
                <ul class="flex flex-col gap-4 w-full p-1">
                    <li class="flex items-center gap-2 shadow-md rounded-xl p-2" v-for="(JsonFile, i) in JsonFiles" :key="i">
                        <div class="flex flex-wrap items-center gap-2 flex-grow">
                            <Loading class="w-6 h-6 shadow-xl" v-if="!!JsonFile.importing" />
                            <div class="w-4 h-4 rounded-full bg-emerald-400" v-if="JsonFile.imported"></div>
                            <strong class="flex">{{ JsonFile.name }}</strong>
                            <i class="text-xs bg-rose-100 text-rose-900 p-1 px-2 rounded-lg" v-if="!!JsonFile.error">{{ JsonFile.error }}</i>
                        </div>
                        <button type="button" class="hover:bg-rose-50 p-1 rounded-lg flex-shrink-0" v-if="!importing && !JsonFile.imported" @click="removeFile(i)">
                            <img src="/icons/admin/Delete.svg" width="16" alt="" />
                        </button>
                    </li>
                </ul>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex flex-wrap items-center gap-4" v-if="checkPermissions(['admin.importer.import'], userPermissions)">
                <button class="orange_gradient_h p-4 py-2 rounded-xl" :class="{ 'opacity-75 cursor-wait': importing }" :disabled="importing" @click="StartImport()">
                    تایید و شروع
                </button>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import permissionCheck from "~/mixins/permissionCheck";
import Select from "~/components/forms/admin/Select.vue";
import Loading from "~/components/Loading.vue";

export default {
    layout: "admin",
    head() {
        return { title: "importer - گروه آموزشی پرتقال" };
    },
    mixins: [permissionCheck],
    components: {
        Select,
        Loading,
    },
    data() {
        return {
            loading: false,
            importing: false,
            collectionOptions: [
                { name: "انتخاب کالکشن", value: "---" },
                { name: "Contact Requests", value: "ContactRequests" },
                { name: "Collaborate Requests", value: "CollaborateRequests" },
                { name: "Course Groups", value: "CourseGroups" },
                { name: "Commissions", value: "Commissions" },
                { name: "Faqs", value: "Faqs" },
                { name: "Admins", value: "Admins" },
                { name: "Teachers", value: "Teachers" },
                { name: "Marketers", value: "Marketers" },
                { name: "Users", value: "Users" },
                { name: "Articles", value: "Articles" },
                { name: "Courses", value: "Courses" },
                { name: "Comments", value: "Comments" },
                { name: "Commission Payments", value: "CommissionPayments" },
                { name: "Course Rating", value: "CourseRating" },
                { name: "Marketer Courses", value: "MarketerCourses" },
                { name: "User Courses", value: "UserCourses" },
            ],

            JsonFiles: [
                // {
                //     name: "test",
                //     fileRaw: null,
                //     importing: true,
                //     imported: true,
                //     error: "test is not valid",
                // },
            ],
            collection: { name: "انتخاب کالکشن", value: "---" },

            errorMsg: "",
            errorTag: "",
        };
    },
    mounted() {},
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
        async selectFiles() {
            for (let i = 0; i < this.$refs.fileInput.files.length; i++) {
                this.JsonFiles.push({
                    name: this.$refs.fileInput.files[i].name,
                    fileRaw: this.$refs.fileInput.files[i],
                    importing: false,
                    error: "",
                });
            }
        },

        async removeFile(index) {
            this.JsonFiles.splice(index, 1);
        },

        async StartImport() {
            if (this.importing) return;
            this.importing = true;

            this.errorMsg = this.errorTag = "";

            for (let i = 0; i < this.JsonFiles.length; i++) await this.sendFile(i);

            this.importing = false;
        },

        async sendFile(index) {
            if (!this.JsonFiles[index]) return;

            if (this.JsonFiles[index].importing) return;
            this.JsonFiles[index].importing = true;

            await this.sleep(1000);

            const formData = new FormData();
            formData.append("files", this.JsonFiles[index].fileRaw);
            formData.append("collection", this.collection.value);

            let url = encodeURI(`/api/admin/importer`);
            await axios
                .post(url, formData)
                .then((response) => (this.JsonFiles[index].imported = true))
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.JsonFiles[index].error = e.response.data.message[0].errors[0];
                    } else {
                        console.log(e);
                    }
                })
                .finally(() => (this.JsonFiles[index].importing = false));
        },

        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
    },
};
</script>
