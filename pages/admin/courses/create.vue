<style scoped></style>

<template>
    <main class="dashboard_body flex flex-col gap-4 md:p-4 md:py-1">
        <div class="flex flex-wrap md:flex-nowrap items-center gap-2">
            <nuxt-link to="/admin"><img class="opacity-75" src="/icons/admin/Home.svg" width="20" /></nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <nuxt-link to="/admin/courses">لیست دوره ها</nuxt-link>
            <img src="/icons/Arrow.svg" width="12" style="transform: rotate(90deg)" />
            <h1 class="text-2xl"><b>دوره جدید</b></h1>
        </div>

        <hr class="w-full" />

        <section class="flex flex-col gap-4 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-lg flex-grow p-4">
            <form class="flex flex-col gap-4 p-1 flex-grow max-h-full overflow-auto">
                <div class="flex items-center gap-4">
                    <img class="w-28 h-28 bg-gray-300 rounded-3xl object-cover" :src="image || '/icons/Document.svg'" alt="" />
                    <div class="flex flex-col items-start gap-4">
                        <button type="button" class="orange_gradient_h p-2 px-4 rounded-xl shadow-md text-sm" @click="$refs.fileInput.click()" :disabled="saving">
                            آپلود عکس جدید
                        </button>
                        <button type="button" class="gray_gradient p-2 px-4 rounded-xl shadow-md text-sm" @click="deleteImage()" v-if="!!image">حذف</button>
                    </div>
                    <input class="w-0 h-0 opacity-0" ref="fileInput" type="file" accept=".jpg,.jpeg,.png,.gif" @change="selectFile()" />
                </div>

                <hr class="w-full" />

                <div class="flex flex-wrap md:flex-nowrap items-center gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>عنوان دوره</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <input type="text" v-model="name" dir="auto" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100" />
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
                    <div class="flex flex-col gap-2 w-max flex-shrink-0">
                        <div class="flex items-center gap-2 cursor-pointer select-none" @click="showInNew = !showInNew">
                            <transition name="check" mode="out-in" appear>
                                <img src="/icons/admin/TickSquare.svg" width="24" v-if="!!showInNew" />
                                <img src="/icons/admin/TickSquareBox.svg" width="24" v-else />
                            </transition>
                            <span class="text-sm opacity-75">نمایش در جدیدترین ها</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <label class="text-sm">
                        <span>توضیحات</span>
                        <b class="text-red-500">*</b>
                    </label>
                    <textarea v-model="description" dir="auto" rows="5" class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"></textarea>
                </div>

                <hr class="w-full" />

                <label for="">انتخاب استاد دوره</label>
                <div class="flex items-center gap-2 p-2 rounded-xl shadow-md flex-shrink-0 w-max" v-if="!!selectedTeacher.fullname">
                    <img class="w-14 shadow-md object-cover rounded-xl" v-if="!!selectedTeacher.image" :src="selectedTeacher.image" alt="" />
                    <span class="text-sm" v-if="selectedTeacher.fullname">{{ selectedTeacher.fullname }}</span>
                    <button class="flex-shrink-0" type="button" @click="selectTeacher({})"><img src="/icons/Cancel.svg" width="24" /></button>
                </div>
                <div class="relative flex flex-col w-full">
                    <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100 z-20">
                        <input
                            type="text"
                            v-model="teacherSearchQuery"
                            placeholder="جستجوی استاد"
                            class="w-full flex-grow bg-transparent"
                            @input="teacherSearchTimeoutCheck()"
                        />
                        <button type="button" @click="teacherSearchQuery = ''" v-if="!!teacherSearchQuery"><img src="/icons/Cancel.svg" width="24" /></button>
                    </div>
                    <ul
                        class="absolute top-10 flex flex-col gap-2 p-2 pt-4 rounded-xl w-full bg-white shadow-lg z-10 max-h-64 overflow-auto"
                        v-if="!!teacherSearchQuery"
                    >
                        <li
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 cursor-pointer"
                            v-for="(item, i) in teacherSearchResults"
                            :key="i"
                            @click="selectTeacher(item)"
                        >
                            <img class="w-14 shadow-md object-cover rounded-xl" v-if="item.image" :src="item.image" alt="" />
                            <span class="text-sm" v-if="item.fullname">{{ item.fullname }}</span>
                        </li>
                        <li v-if="!teacherSearchResults.length"><small class="text-rose-800">نتیجه ای پیدا نشد!</small></li>
                    </ul>
                </div>

                <hr class="w-full" />

                <label for="">گروه های دوره</label>
                <small class="text-xs opacity-75">اولین گروه به عنوان گروه اصلی در نظر گرفته میشود</small>
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

                <label for="">تگ ها</label>
                <ul class="flex flex-wrap items-center gap-4 px-1" v-if="!!tags.length">
                    <li class="flex items-center gap-1 p-2 rounded-xl shadow-md" v-for="(tag, i) in tags" :key="i">
                        <span class="text-sm mt-1">{{ tag }}</span>
                        <button type="button" @click="addTag($event, tag)"><img src="/icons/Cancel.svg" width="16" /></button>
                    </li>
                </ul>
                <input
                    type="text"
                    v-model="newTag"
                    @keyup="addTag($event)"
                    placeholder="تگ جدید"
                    class="p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100"
                />

                <hr class="w-full" />

                <div class="flex flex-wrap md:flex-nowrap items-end gap-4 w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>مبلغ دوره</span>
                            <b class="text-red-500">*</b>
                        </label>
                        <div class="flex items-center gap-2 p-3 w-full rounded-xl shadow-sm focus:shadow-md bg-coolgray-100">
                            <input type="text" v-model="price" v-money="{ decimal: '.', thousands: ',' }" dir="auto" class="w-full bg-transparent" />
                            <small class="font-bold">تومان</small>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-sm">
                            <span>کمیسیون</span>
                        </label>
                        <Select :selectedOption.sync="commission" :options="commissionOptions">
                            <template v-slot:option="{ option }">
                                <span :value="option.value">{{ option.name }}</span>
                            </template>
                        </Select>
                    </div>
                </div>

                <hr class="w-full" />

                <div class="flex flex-wrap items-center justify-between gap-2">
                    <label for="">فایل های تمرین</label>
                    <button
                        type="button"
                        class="border-2 border-solid border-emerald-400 hover:bg-emerald-50 text-xs p-1 px-2 rounded-lg"
                        @click="addExerciseFile()"
                    >
                        فایل تمرین جدید
                    </button>
                </div>
                <ul class="flex flex-wrap items-start gap-4">
                    <li class="flex flex-col gap-2 p-2 shadow-md rounded-xl w-full" v-for="(item, i) in exerciseFiles" :key="i" style="max-width: 240px">
                        <input type="text" v-model="item.name" placeholder="عنوان فایل" class="p-2 w-full text-sm rounded-xl focus:shadow-md bg-coolgray-100" />
                        <hr class="w-full" />
                        <div class="flex flex-wrap items-center gap-1" v-if="item.file">
                            <span>{{ item.file.split(/[\\/]/).pop() }}</span>
                            <span class="text-xs p-1 bg-gray-100 opacity-75 rounded-lg w-max" dir="ltr" v-if="item.size">
                                {{ `${new Intl.NumberFormat().format((item.size / 1048576).toFixed(2))} MB` }}
                            </span>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                class="darkblue_gradient p-1 px-2 rounded-lg shadow-md text-xs w-max"
                                @click="$refs[`exerciseFileInput-${i}`][0].click()"
                            >
                                انتخاب فایل
                            </button>
                            <button
                                type="button"
                                class="border-2 border-solid border-red-400 hover:bg-rose-50 p-0.5 px-2 rounded-lg text-xs w-max"
                                @click="removeExerciseFile(i)"
                            >
                                حذف
                            </button>
                        </div>
                        <input
                            class="w-0 h-0 opacity-0 -mt-2"
                            :ref="`exerciseFileInput-${i}`"
                            type="file"
                            @change="selectExerciseFile(`exerciseFileInput-${i}`, i)"
                        />
                    </li>
                </ul>

                <hr class="w-full" />
                <small class="opacity-75 w-max bg-amber-100 p-2 py-1 rounded-lg text-amber-900">*سرفصل های دوره پس از ایجاد دوره قابل افزودن و ویرایش میباشند</small>
            </form>
            <hr class="w-full" />
            <small class="flex items-center gap-2 bg-rose-100 text-red-800 text-sm p-2 rounded-lg w-max" v-if="errorMsg">
                <img src="/icons/admin/Danger.svg" width="20" />
                <span>{{ errorMsg }}</span>
            </small>
            <div class="flex items-center flex-wrap gap-2" v-show="saving">
                <small class="opacity-75">درحال آپلود فایل...</small>
                <div class="progress_bar bg-gray-50 w-40 h-max rounded-full shadow-inner shadow-md">
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
        return { title: "ایجاد دوره جدید - گروه آموزشی پرتقال" };
    },
    components: {
        Select,
    },
    data() {
        return {
            loading: false,
            saving: false,
            newTag: "",
            statusOptions: {
                active: { name: "فعال", value: "active" },
                deactive: { name: "غیرفعال", value: "deactive" },
            },
            groupsOptions: this.groupsOptions || {},
            commissionOptions: this.commissionOptions || {},
            teacherSearchQuery: "",
            teacherSearchTimeout: null,
            teacherSearchResults: [],
            selectedTeacher: {},

            image: "",
            name: "",
            description: "",
            price: "",
            groups: {},
            status: { name: "فعال", value: "active" },
            commission: { name: "", value: "" },
            tags: [],
            showInNew: false,
            exerciseFiles: [
                // { name: "فایل تمرین شماره 1", file: "/file/public/course_exercise_files/tt.zip", fileRaw: null, size: "140932" },
            ],

            errorMsg: "",
            errorTag: "",
            uploadingFilesPercentage: 0,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getCommissions({ headers }), this.getCourseGroups({ headers })]);
    },
    computed: {
        userPermissions() {
            return this.$store.state.user.info.permissions;
        },
    },
    methods: {
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
                    this.commissionOptions["empty"] = { name: "", value: "" };
                    response.data.records.forEach((record) => {
                        this.commissionOptions[record._id] = { name: record.name, value: record._id };
                    });
                })
                .catch((e) => {});
        },

        selectExerciseFile(ref, index) {
            if (this.$refs[ref][0].files[0]) {
                this.exerciseFiles[index].fileRaw = this.$refs[ref][0].files[0];
                this.exerciseFiles[index].file = this.$refs[ref][0].files[0].name;
                this.exerciseFiles[index].size = this.$refs[ref][0].files[0].size;
            }
        },
        removeExerciseFile(index) {
            this.exerciseFiles.splice(index, 1);
        },
        addExerciseFile() {
            this.exerciseFiles.push({ name: "", file: "", fileRaw: null, size: "" });
        },

        selectFile() {
            this.image = this.$refs.fileInput.files[0] ? URL.createObjectURL(this.$refs.fileInput.files[0]) : "";
        },
        deleteImage() {
            this.$refs.fileInput.files = undefined;
            this.image = "";
        },

        addTag(e, tag) {
            e.preventDefault();
            if (tag != "" && this.tags.indexOf(tag) > -1) {
                this.tags.splice(this.tags.indexOf(tag), 1);
                return;
            }
            if (e.keyCode == 13 && this.newTag != "") {
                if (this.tags.indexOf(this.newTag) > -1) this.tags.splice(this.tags.indexOf(this.newTag), 1);
                else this.tags.push(this.newTag);
                this.newTag = "";
            }
        },

        selectGroup(group) {
            if (typeof this.groups[group.value] === "undefined") this.groups[group.value] = group;
            else delete this.groups[group.value];
            this.groups = { ...this.groups };
        },

        // ==============================
        async teacherSearchTimeoutCheck() {
            if (this.teacherSearchTimeout) clearTimeout(this.teacherSearchTimeout);
            this.teacherSearchTimeout = setTimeout(async () => {
                await this.searchTeacher();
                this.teacherSearchTimeout = null;
            }, 2000);
        },
        async searchTeacher() {
            let url = `/api/admin/discounts/search/${this.teacherSearchQuery}?section=teacherCourses`;
            await axios
                .get(encodeURI(url))
                .then((results) => {
                    this.teacherSearchResults = results.data.records;
                    if (this.teacherSearchResults.length > 5) this.teacherSearchResults.length = 5;
                })
                .catch((e) => {});
        },
        selectTeacher(item) {
            this.selectedTeacher = { ...item };
        },
        // ==============================

        async save() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            const formData = new FormData();
            if (this.$refs.fileInput.files[0]) formData.append("files", this.$refs.fileInput.files[0]);

            const exerciseFilesDetails = [];
            for (let i = 0; i < this.exerciseFiles.length; i++) {
                if (this.exerciseFiles[i].name && this.exerciseFiles[i].fileRaw) {
                    formData.append("exerciseFiles", this.exerciseFiles[i].fileRaw);
                    exerciseFilesDetails.push({ name: this.exerciseFiles[i].name, size: this.exerciseFiles[i].size });
                }
            }
            formData.append("exerciseFilesDetails", JSON.stringify(exerciseFilesDetails));

            formData.append("name", this.name);
            formData.append("description", this.description);
            formData.append("teacher", this.selectedTeacher._id || "");
            formData.append("price", this.price.replaceAll(",", ""));
            formData.append("groups", Object.keys(this.groups).toString());
            formData.append("status", this.status.value);
            if (this.commission.value) formData.append("commission", this.commission.value);
            if (!!this.tags.length) formData.append("tags", JSON.stringify(this.tags));
            formData.append("showInNew", this.showInNew);

            let url = encodeURI(`/api/admin/courses`);
            await axios
                .post(url, formData, {
                    onUploadProgress: (e) => (this.uploadingFilesPercentage = parseInt(Math.round((e.loaded / e.total) * 100))),
                })
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "دوره با موفقیت اضافه شد" });
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
