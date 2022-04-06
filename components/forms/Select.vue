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
    max-height: 3.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
    background-color: var(--select-input-bg-color);
    border: 2px solid #555;
}
.t_select .box::after {
    content: "";
    font-size: 1rem;
    background-image: url("~/static/icons/new/ArrowDown2.svg");
    background-repeat: no-repeat;
    background-size: 1.25rem;
    background-position: center;
    margin-top: -1px;
    width: 0.75rem;
    height: 0.75rem;
    padding: 0.25rem;
}
.t_select .list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background-color: var(--select-list-bg-color);
    position: absolute;
    top: 3.75rem;
    overflow: auto;
    border-radius: 1rem;
    width: inherit;
    min-width: max-content;
    max-height: 12rem;
    padding: 0.25rem;
    padding-top: 2.25rem;
    margin-inline-start: -0.35rem;
    margin-top: -2rem;
    margin-right: 1px;
}
.t_select .list.small {
    top: 2rem;
}

.t_select .list li {
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
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
    <div class="t_select flex flex-col flex-grow" :class="{ open: open }">
        <div class="t_select_input" :class="inputClass">
            <div
                class="box shadow-lg"
                :class="{ 'p-2 py-0 rounded-xl': !!small, 'p-4 rounded-2xl': !small }"
                tabindex="0"
                @click="toggleMenu()"
                @blur="toggleMenu(false)"
            >
                <span name="placeholder" class="opacity-50 ml-4" v-if="placeholder && !selectedOption.value">{{ placeholder }}</span>
                <span name="value text-sm" :class="{ 'ml-4': !small }" v-if="selectedOption.name && selectedOption.value">{{ selectedOption.name }}</span>
            </div>
            <transition name="slidedown" mode="out-in" appear>
                <ol class="list shadow-md" :class="{ small: !!small }" v-if="open">
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
