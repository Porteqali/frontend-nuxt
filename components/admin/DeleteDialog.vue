<style scoped></style>

<template>
    <Dialog :open="open" @update:open="updateOpenState">
        <div class="flex flex-col gap-2 w-full max-w-xs md:max-w-md">
            <!-- <Icon class="w-32 h-32 bg-rose-500" size="120px" folder="icons/admin" name="Danger" /> -->
            <span class="text-lg">
                آیا مطمئن به
                <b class="text-rose-600">حذف</b>
                رکورد "{{ recordName }}" هستید؟
            </span>
            <small class="opacity-50">این عملیات برگشت ناپذیر است!</small>
        </div>
        <hr class="border-solid my-4" />
        <div class="flex gap-2">
            <button class="p-6 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white" :disabled="deletingRecord" @click="deleteRecord()">
                <span>حذف</span>
            </button>
            <button class="p-6 py-2 rounded-xl border-2 border-solid border-gray-400 hover:bg-gray-200" @click="updateOpenState(false)">لغو</button>
        </div>
    </Dialog>
</template>

<script>
import axios from "axios";
import Dialog from "~/components/Dialog.vue";
import Icon from "~/components/Icon.vue";

export default {
    name: "DeleteDialog",
    props: ["open", "recordId", "recordName", "recordIndex", "tableData","url"],
    components: {
        Dialog,
        Icon,
    },
    data() {
        return {
            loading: false,
            deletingRecord: false,
        };
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },

        async deleteRecord() {
            if (this.deletingRecord) return;
            this.deletingRecord = true;

            let url = `${this.url}/${this.recordId}`;
            await axios
                .delete(url)
                .then((response) => {
                    this.$store.dispatch("toast/makeToast", { type: "success", title: "", message: "رکورد با موفقیت حذف شد" });
                    const tempTable = [...this.tableData];
                    tempTable.splice(this.recordIndex, 1);
                    this.$emit("update:tableData", tempTable);
                })
                .catch((e) => {
                    if (typeof e.response !== "undefined" && e.response.data && typeof e.response.data.message === "object") {
                        this.$store.dispatch("toast/makeToast", { type: "error", title: "خطا", message: e.response.data.message[0].errors[0] });
                    }
                })
                .finally(() => {
                    this.deletingRecord = false;
                    this.$emit("update:open", false);
                    this.$emit("update:recordId", "");
                    this.$emit("update:recordName", "");
                    this.$emit("update:recordIndex", "");
                });
        },
    },
};
</script>
