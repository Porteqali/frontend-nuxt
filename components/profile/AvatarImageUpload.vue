<style scoped></style>

<template>
    <div>
        <div class="flex items-center gap-4">
            <img class="w-28 h-28 bg-gray-300 rounded-3xl object-cover" :src="user.info.image" />
            <div class="flex flex-col items-start gap-4">
                <button class="orange_gradient_h p-2 px-4 rounded-2xl shadow-md" @click="$refs.fileInput.click()" :disabled="uploading">آپلود عکس جدید</button>
                <button class="gray_gradient p-2 px-4 rounded-2xl shadow-md" @click="deleteImage()" :disabled="uploading">حذف</button>
            </div>
            <input class="w-0 h-0 opacity-0" ref="fileInput" type="file" accept=".jpg,.jpeg,.png,.gif" @change="selectFile()" />
        </div>
        <span
            class="p-2 rounded-lg text-sm"
            :class="{ 'bg-red-100 text-red-800': messageType == 'error', 'bg-emerald-100 text-emerald-800': messageType == 'success' }"
            v-if="!!message"
        >
            {{ message }}
        </span>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AvatarImageUpload",
    data() {
        return {
            image: "",

            uploading: false,
            messageType: "",
            message: "",
        };
    },
    mounted() {},
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async selectFile() {
            this.image = this.$refs.fileInput.files[0] ? URL.createObjectURL(this.$refs.fileInput.files[0]) : "";
            if (this.image) {
                await this.uploadImage();
            }
        },

        async uploadImage() {
            if (this.uploading) return;
            this.uploading = true;

            this.message = "";

            const formData = new FormData();
            if (this.$refs.fileInput.files[0]) formData.append("files", this.$refs.fileInput.files[0]);

            await axios
                .post(`/api/users/edit-avatar-image`, formData)
                .then((results) => {
                    this.message = "";
                    this.$store.commit("user/setInfo", { ...this.user.info, image: results.data.imageLink });
                })
                .catch((e) => {
                    this.messageType = "error";
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.message = e.response.data.message[0].errors[0];
                        }
                    }
                })
                .finally(() => {
                    this.uploading = false;
                    this.$refs.fileInput.files = undefined;
                });
        },

        async deleteImage() {
            if (this.uploading) return;
            this.uploading = true;

            this.message = "";

            await axios
                .delete(`/api/users/delete-avatar-image`)
                .then(() => {
                    this.message = "";
                    this.$store.commit("user/setInfo", { ...this.user.info, image: "" });
                })
                .catch((e) => {
                    this.messageType = "error";
                    if (typeof e.response !== "undefined" && e.response.data) {
                        if (typeof e.response.data.message === "object") {
                            this.message = e.response.data.message[0].errors[0];
                        }
                    }
                })
                .finally(() => (this.uploading = false));
        },
    },
};
</script>
