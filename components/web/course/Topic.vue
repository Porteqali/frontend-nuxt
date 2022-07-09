<style scoped>
.action_btn {
    /* margin-right: -1rem; */
    margin-right: 0.5rem;
}
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
    background-color: #fff;
}
.action_btn.unplayable,
.action_btn.unplayable::after,
.action_btn.unplayable::before {
    background-color: #dfdfdf;
}

.action_btn.playable:hover {
    box-shadow: 0px 0px 0px 3px white, 0px 0px 0px 6px #0ab49e;
}
.action_btn.unplayable:hover {
    background-color: #d68f8f;
    box-shadow: 0px 0px 0px 3px white, 0px 0px 0px 6px #d68f8f;
}
.action_btn.unplayable:hover::after,
.action_btn.unplayable:hover::before {
    background-color: #d68f8f;
}
</style>

<template>
    <div class="flex items-center gap-1 bg-warmgray-100 rounded-2xl">
        <span
            class="action_btn flex items-center justify-center flex-shrink-0 w-10 h-10 p-2 rounded-full cursor-pointer"
            :class="{ first, last, playable: !!data.canPlay, unplayable: !data.canPlay }"
            @click="selectTopic(data)"
        >
            <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Play" v-if="!!data.canPlay" />
            <Icon class="w-6 h-6 bg-rose-800" size="24px" folder="icons/new" name="Lock" v-else />
        </span>
        <div class="flex items-center md:flex-nowrap gap-2 p-3 w-full" :title="data.name">
            <div class="flex flex-col gap-1 flex-grow" @click="selectTopic(data)">
                <h4 class="flex-grow cursor-pointer">{{ data.name }}</h4>
                <div class="flex flex-wrap items-center gap-4">
                    <small class="flex items-center gap-1 text-orange-800 rounded-md flex-shrink-0">
                        <Icon class="w-5 h-5 bg-orange-800" size="20px" folder="icons/new" name="TimeCircle" />
                        <span class="flex text-sm">{{ `${data.time.hours}:${data.time.minutes}:${data.time.seconds}` }}</span>
                    </small>
                    <small class="flex items-center gap-1 opacity-75 text-xs" v-if="!!data.isFreeForUsers">
                        <div class="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span>رایگان برای اعضا</span>
                    </small>
                </div>
            </div>

            <a class="bg-white p-1 rounded-lg hover:shadow-md flex-shrink-0" :href="data.file" :download="data.name" v-if="data.canPlay" :title="data.name">
                <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Download" />
            </a>
            <div class="bg-white p-1 rounded-lg opacity-30 cursor-not-allowed flex-shrink-0" v-else>
                <Icon class="w-6 h-6 bg-gray-700" size="24px" folder="icons/new" name="Download" />
            </div>
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
