<style scoped>
.dialog {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    color: #3c3c3c;
    padding: 1rem;
}
.dialog .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 30%);
}
.dialog > .box {
    min-width: 22rem;
    margin: 0 1rem;
    z-index: 2;
    /* background-color: white; */
    /* background-color: var(--header-nav-container-bg-color); */
    background-color: #FFFFFFDD;
    /* background-color: var(--body-bg-color); */
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 25%);
}
</style>

<template>
    <transition name="fade" appear>
        <div class="dialog" :class="{ open: open }" v-show="open">
            <div class="backdrop" @click="close()"></div>
            <transition name="slidedown" appear>
                <div class="box blur p-6 rounded-2xl w-max max-h-full overflow-auto" :class="boxClass" v-show="open">
                    <div class="flex justify-between items-center gap-4 mb-4">
                        <b class="text-2xl" v-if="title">{{ title }}</b>
                        <button class="flex items-center justify-center bg-gray-100 w-10 h-10 rounded-full p-2" @click="close()">
                            <img src="/icons/Cancel.svg" width="24" height="24" alt="Cancel" />
                        </button>
                    </div>
                    <slot></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Dialog",
    props: ["open", "title", "boxClass"],
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        close() {
            this.$emit("update:open", false);
        },
    },
};
</script>
