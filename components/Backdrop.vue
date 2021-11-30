<style scoped>
.backdrop {
    z-index: 100;
    background-color: #00000066;
}
</style>

<template>
    <div class="backdrop fixed inset-0" v-show="open" @click="clicked"></div>
</template>

<script>
export default {
    name: "Backdrop",
    props: ["open"],
    methods: {
        clicked() {
            console.log(2);
            window.dispatchEvent(new Event("backdrop:change", { state: false }));
        },
    },
};
</script>
