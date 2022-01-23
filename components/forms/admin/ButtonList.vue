<style scoped>
.list {
    background-color: var(--select-list-bg-color);
    top: 2.5rem;
    inset-inline-end: 0;
    overflow: auto;
    border-radius: 1rem;
    width: max-content;
    max-height: 12rem;
    padding: .5rem;
    font-size: 0.85rem;
}
</style>

<template>
    <div class="btn relative flex flex-col" :class="{ open: open }">
        <div class="btn_icon cursor-pointer" tabindex="0" @click="toggleMenu()" @blur="toggleMenu(false)">
            <img src="/icons/admin/Link.svg" width="24" alt="Link" />
        </div>
        <transition name="slidedown" mode="out-in" appear>
            <ul class="list absolute flex flex-col gap-1 shadow-md" v-show="open">
                <slot></slot>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    name: "ButtonList",
    props: [],
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
    },
};
</script>
