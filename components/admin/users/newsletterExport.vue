<style scoped></style>

<template>
    <button class="gray_gradient rounded-xl p-2 px-4 w-max hover:shadow-md" @click="getExport()" :disabled="saving">خروجی لیست خبرنامه</button>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: false,
            saving: false,

            baseUrl: "",

            errorMsg: "",
            errorTag: "",
        };
    },
    mounted() {
        this.baseUrl = window.location.origin;
    },
    methods: {
        async getExport() {
            if (this.saving) return;
            this.saving = true;

            this.errorMsg = this.errorTag = "";

            let url = `/api/admin/users/export-newsletter-subscribers?`;

            await axios
                .get(encodeURI(url))
                .then((response) => {
                    window.location.href = `${window.location.origin}/${response.data.link}`;
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                        this.errorMsg = e.response.data.message[0].errors[0];
                        this.errorTag = e.response.data.message[0].property;
                    }
                })
                .finally(() => (this.saving = false));
        },
    },
};
</script>
