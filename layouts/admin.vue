<style scoped>
body {
    margin: 0 auto;
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0;
    background-color: var(--body-bg-color);
}

.nuxt_main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    overflow: hidden;
}

.inner_main {
    min-height: calc(100vh - 6.5rem);
}

@media (min-width: 768px) {
    .inner_main {
        min-height: calc(100vh - 7rem);
    }
}
</style>

<template>
    <div class="nuxt_main p-4" dir="rtl" ref="body" id="app">
        <Header />

        <div class="inner_main relative flex gap-4 w-full mt-4">
            <SideMenu />
            <Nuxt class="w-full z-10" nuxt-child-key="admin" />
        </div>

        <img class="fixed right-0 bottom-0" draggable="false" src="/backgrounds/admin/Background.png" />

        <Toast />
    </div>
</template>

<script>
import Header from "~/components/admin/Header";
import Toast from "~/components/Toast.vue";
import SideMenu from "~/components/admin/SideMenu.vue";

export default {
    name: "Admin.layout",
    head() {
        return {
            title: "پنل ادمین - گروه آموزشی پرتقال",
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
