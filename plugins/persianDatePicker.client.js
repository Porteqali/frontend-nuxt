import Vue from "vue";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

Vue.use(VuePersianDatetimePicker, {
    name: "persian-date-picker",
    props: {
        inputFormat: "YYYY-MM-DD HH:mm:ss",
        format: "jYYYY-jMM-jDD HH:mm:ss",
        //   editable: false,
        inputClass: "",
        placeholder: "Please select a date",
        altFormat: "YYYY-MM-DD HH:mm",
        color: "#ff7952",
        autoSubmit: false,
    },
});
