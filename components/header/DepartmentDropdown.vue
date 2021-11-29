<style scoped>
.box {
    position: absolute;
    top: 3.25rem;
    background-color: var(--header-nav-container-bg-color);
    color: var(--header-nav-text-color);
}
ul li {
    border-bottom: 1px solid #ffffff22;
}
ul li:hover {
    transform: scale(1.05, 1.05);
}
</style>

<template>
    <transition class="" name="slideup" appear>
        <div class="box blur rounded-3xl shadow-lg" v-show="open">
            <ul class="flex flex-col p-6 w-full">
                <li class="p-3">امنیت شبکه</li>
                <li class="p-3">زبان های خارجی</li>
                <li class="p-3">طراحی گرافیک</li>
                <li class="p-3">دروس دانشگاهی</li>
                <li class="p-3">برنامه نویسی</li>
                <li class="p-3">کسب و کار</li>
                <li class="p-3">دوره های رایگان</li>
            </ul>
        </div>
    </transition>
</template>

<script>
export default {
    name: "DepartmentDropdown",
    props: ["open"],
    components: {},
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        updateOpenState(state) {
            this.$emit("update:open", state);
        },
    },
};
</script>
