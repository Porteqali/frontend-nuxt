<style scoped>
.t_select {
    color: var(--select-color);
    display: flex;
    flex-direction: column;
}
.t_select_input {
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 2;
    position: relative;
    transition: all 0.25s;
}
.t_select.open .t_select_input {
    z-index: 10;
}
.t_select .box {
    height: 3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
    border-radius: .75rem;
}
.t_select .box::after {
    content: "";
    font-size: 1rem;
    background-image: url("~/static/icons/ArrowDown.line.svg");
    background-repeat: no-repeat;
    background-size: 1.25rem;
    background-position: center;
    margin-top: -1px;
    width: .75rem;
    height: .75rem;
    padding: 0.25rem;
    margin-inline-start: auto;
}
.t_select .list {
    display: flex;
    flex-direction: column;
    inset-inline-start: 5px;
    gap: 0.25rem;
    background-color: var(--select-list-bg-color);
    position: absolute;
    top: 3rem;
    overflow: auto;
    border-radius: 1rem;
    width: calc(100% - 10px);
    min-width: max-content;
    max-height: 16rem;
    padding: 0.25rem;
    padding-top: 2.25rem;
    margin-top: -2rem;
}
.t_select .list li {
    padding: 0.5rem 0.5rem;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.1s;
}
.t_select .list li:hover {
    background-color: var(--select-list-li-hover-bg-color);
}
.t_select .list li.selected {
    background-color: var(--select-list-li-selected-bg-color);
}
</style>

<template>
    <div class="t_select flex flex-col flex-grow" :class="{ 'open z-30': open }">
        <div class="t_select_input" :class="inputClass">
            <div class="box p-4 bg-coolgray-100" :class="{ 'p-2': small }" tabindex="0" @click="toggleMenu()" @blur="toggleMenu(false)">
                <span name="placeholder" class="opacity-50 ml-4" v-if="placeholder && !selectedOption.value">{{ placeholder }}</span>
                <span name="value text-sm" :class="{ 'ml-4': !small }" v-if="selectedOption.name && selectedOption.value">{{ selectedOption.name }}</span>
            </div>
            <transition name="slidedown" mode="out-in" appear>
                <ol class="list shadow-md" v-if="open">
                    <li v-for="(option, i) in options" :key="i" :class="{ selected: option.value == selectedOption.value }" @mousedown="selectOption(option)">
                        <slot name="option" :option="option"></slot>
                    </li>
                </ol>
            </transition>
        </div>
        <div v-if="error" class="flex gap-1 items-center w-max rounded-full bg-red-100 text-red-700 p-1 mt-1 text-xs">
            <span>{{ error }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Select",
    props: ["selectedOption", "placeholder", "options", "error", "inputClass", "small"],
    data() {
        return {
            open: false,
        };
    },
    created() {},
    mounted() {},
    methods: {
        toggleMenu(state = null) {
            this.open = state != null ? state : !this.open;
        },

        selectOption(option) {
            this.$emit("update:selectedOption", option);
            this.toggleMenu(false);
        },
    },
};
</script>
