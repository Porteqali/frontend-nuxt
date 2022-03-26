<style scoped>
.lime {
    animation: rotate 2s infinite ease-in-out;
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(720deg);
    }
}
</style>

<template>
    <strong class="bg-white p-1 flex items-center justify-center shadow-xl rounded-full">
        <img src="/misc/half.png" class="lime w-full h-full rounded-full object-contain" alt="orange" />
    </strong>
</template>

<script>
export default {
    name: "Loading",
};
</script>
