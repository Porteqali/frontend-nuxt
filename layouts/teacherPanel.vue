<style scoped>
.nuxt_main {
    background-color: #fafcfd;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    max-width: 1920px;
    margin: 0 auto;
    /* overflow: hidden; */
}

.inner_main {
    min-height: calc(100vh - 7rem);
}
</style>

<template>
    <div class="nuxt_main p-4" dir="rtl" ref="body" id="app">
        <Header />

        <div class="inner_main relative flex gap-4 w-full mt-4">
            <SideMenu class="flex-shrink-0" />
            <Nuxt class="w-full z-10" nuxt-child-key="teacher-panel" />
        </div>

        <img class="fixed right-0 bottom-0" draggable="false" src="/backgrounds/admin/Background2.png" />

        <Toast />
    </div>
</template>

<script>
import Header from "~/components/teacher-panel/Header.vue";
import Toast from "~/components/Toast.vue";
import SideMenu from "~/components/teacher-panel/SideMenu.vue";

export default {
    name: "TeacherPanel.layout",
    head() {
        return {
            title: "پنل اساتید - گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "گروه آموزشی پرتقال" }],
        };
    },
    components: {
        Header,
        Toast,
        SideMenu,
    },
    data() {
        return {};
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;
    },
    mounted() {},
    methods: {},
};
</script>
