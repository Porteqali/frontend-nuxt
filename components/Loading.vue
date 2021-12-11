<style scoped>
.lime {
    animation: rotate 2s infinite ease-out;
    transform-origin: 50%;
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

<template>
    <strong class="bg-white p-1 flex items-center justify-center shadow-xl rounded-full">
        <img src="/misc/lime.svg" class="lime w-full h-full rounded-full" alt="orange" />
    </strong>
</template>

<script>
export default {
    name: "Loading",
};
</script>
