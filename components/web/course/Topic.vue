<style scoped>
.action_btn::before {
    content: "";
    position: absolute;
    width: 3px;
    height: calc(50% - 0.25rem);
    top: -1rem;
}
.action_btn.first::before {
    display: none;
}
.action_btn::after {
    content: "";
    position: absolute;
    width: 3px;
    height: calc(50% - 1rem);
    bottom: -4px;
}
.action_btn.last::after {
    display: none;
}

.action_btn.playable,
.action_btn.playable::after,
.action_btn.playable::before {
    background-color: #a2f07b;
}
.action_btn.unplayable,
.action_btn.unplayable::after,
.action_btn.unplayable::before {
    background-color: #dcdcdc;
}

.action_btn.playable:hover {
    box-shadow: 0px 0px 0px 3px white, 0px 0px 0px 6px #a2f07b;
}
.action_btn.unplayable:hover {
    background-color: #ff7474;
    box-shadow: 0px 0px 0px 3px white, 0px 0px 0px 6px #ff7474;
}
.action_btn.unplayable:hover::after,
.action_btn.unplayable:hover::before {
    background-color: #ff7474;
}
</style>

<template>
    <div class="flex items-center gap-4">
        <span
            class="action_btn flex items-center justify-center flex-shrink-0 w-10 h-10 p-3 rounded-full cursor-pointer"
            :class="{ first, last, playable: !!data.canPlay, unplayable: !data.canPlay }"
            @click="selectTopic(data)"
        >
            <img src="/icons/Play.black.line.svg" width="16" height="16" alt="Play" v-if="!!data.canPlay" />
            <img src="/icons/Lock.black.svg" width="16" height="16" alt="Lock" v-else />
        </span>
        <div class="flex items-center flex-wrap md:flex-nowrap gap-2 border-b border-solid border-gray-200 p-4 pb-6 w-full">
            <div class="flex flex-col gap-1 flex-grow">
                <h4 class="flex-grow cursor-pointer" @click="selectTopic(data)">{{ data.name }}</h4>
                <small class="opacity-75 text-xs" v-if="!!data.isFreeForUsers">رایگان برا اعضا</small>
            </div>
            <small class="bg-indigo-100 text-indigo-800 py-1 p-2 rounded-md flex-shrink-0">
                {{ `${data.time.hours}:${data.time.minutes}:${data.time.seconds}` }}
            </small>

            <a :href="data.file" :download="data.name" v-if="data.canPlay">
                <img src="/icons/Download.gray.svg" :alt="data.name" />
            </a>
            <img class="opacity-30 cursor-not-allowed" src="/icons/Download.gray.svg" :alt="data.name" v-else />
        </div>
    </div>
</template>

<script>
export default {
    name: "Topic",
    props: ["data", "first", "last"],
    data() {
        return {};
    },
    methods: {
        selectTopic(topic) {
            this.$emit("selectTopic", topic);
        },
    },
};
</script>
