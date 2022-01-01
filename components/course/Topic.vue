<style scoped>
.action_btn::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 50% /* calc(50% - .25rem) */;
    top: -50% /* calc(-50% + .25rem) */;
    background: #000;
}
.action_btn::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 50% /* calc(50% - .25rem) */;
    bottom: -50% /* calc(-50% + .25rem) */;
    background: red;
}
</style>

<template>
    <div class="flex items-center gap-4">
        <span class="action_btn relative flex items-center justify-center w-10 h-10 p-3 rounded-full bg-lime-400">
            <img src="/icons/Play.black.line.svg" width="16" height="16" alt="Play" />
        </span>
        <div class="flex items-center gap-2 border-b border-solid border-gray-200 p-4 pb-6 w-full">
            <h4 class="flex-grow">{{ data.name }}</h4>
            <small class="bg-indigo-100 text-indigo-800 py-1 p-2 rounded-md flex-shrink-0">
                {{ `${data.time.hours}:${data.time.minutes}:${data.time.seconds}` }}
            </small>
        </div>
    </div>
</template>

<script>
export default {
    name: "Topic",
    props: ["data"],
};
</script>
