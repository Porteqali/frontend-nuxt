<style>
body {
    /* font-family: "IranYekanRegular"; */
    /* max-width: 1680px; */
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0;
    background-color: var(--body-bg-color);
}

header {
    color: var(--header-nav-text-color);
}
</style>

<template>
    <div class="relative flex flex-col items-center h-screen overflow-x-hidden" dir="rtl">
        <header class="flex items-center justify-between gap-8 p-8 w-full max-w-screen-4xl z-10">
            <div class="flex-shrink-0">
                <img src="/logo_white.png" alt="پرتقال" />
            </div>
            <Menu />
        </header>

        <Nuxt nuxt-child-key="default" />

        <div>
            <footer></footer>
        </div>

        <!-- <Backdrop :open.sync="backdropState" /> -->
    </div>
</template>

<script>
import Menu from "~/components/header/Menu.vue";
// import Backdrop from "~/components/Backdrop.vue";

export default {
    name: "Default.layout",
    head: {
        title: "گروه آموزشی پرتقال",
        meta: [{ hid: "description", name: "description", content: "گروه آموزشی پرتقال" }],
    },
    components: {
        Menu,
        // Backdrop,
    },
    data() {
        return {
            // backdropState: false,
        };
    },
    mounted() {
        // window.addEventListener("backdrop:change", (e) => (this.backdropState = !!e.state));
    },
};
</script>
