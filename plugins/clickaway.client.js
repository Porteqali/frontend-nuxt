import Vue from "vue";

const onClick = (arg, event, element, func) => {
    if (!element) return;
    if (!event) return;

    if (arg && !element.contains(event.target)) {
        if (event.target.classList.value.includes(arg)) return;
    }
    if (!element.contains(event.target)) func();
};

Vue.directive("clickaway", {
    bind(el, { value, arg }) {
        if (typeof value !== "function") return;
        window.addEventListener("click", (e) => {
            onClick(arg, e, el, value);
        });
    },
    unbind() {
        window.removeEventListener("click", (e) => {
            onClick(arg, e, el, value);
        });
    },
});
