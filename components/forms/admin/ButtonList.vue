<style scoped>
.list {
    background-color: var(--select-list-bg-color);
    top: 2.5rem;
    inset-inline-end: 0;
    overflow: auto;
    border-radius: 1rem;
    width: max-content;
    max-height: 12rem;
    padding: 0.5rem;
    font-size: 0.85rem;
}
</style>

<template>
    <div class="btn relative flex flex-col" :class="{ open: open }" tabindex="0" @click="toggleMenu()" @blur="toggleMenu(false)">
        <div class="btn_icon cursor-pointer">
            <img src="/icons/admin/Link.svg" width="24" alt="Link" />
        </div>
        <transition name="slidedown" mode="out-in" appear>
            <ul ref="list" class="list absolute flex flex-col gap-1 shadow-md z-20" v-show="open">
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
            if (state == true) this.$refs.list.focus();
        },
    },
};
</script>
