<style scoped>
.nuxt_main {
    background-color: #fafafa;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    /* overflow: hidden; */
}

header {
    background-color: #fafafa;
    color: #333;
}
</style>

<template>
    <div class="nuxt_main" dir="rtl" ref="body" id="app">
        <Banner :data="banner" v-if="!!banner && banner.status == 'active'" />

        <div class="sticky top-0 flex items-center justify-center py-2 w-full shadow-xl z-20 bg-truegray-50">
            <header class="flex items-center justify-between gap-8 px-4 md:px-8 w-full max-w-screen-2xl">
                <nuxt-link title="پرتقال" to="/" class="flex-shrink-0">
                    <img class="h-8" src="/logo_mark.svg" alt="پرتقال" />
                </nuxt-link>
                <Menu />
            </header>
        </div>

        <Nuxt class="z-10" nuxt-child-key="default" />

        <Footer />

        <Toast />
    </div>
</template>

<script>
import axios from "axios";
import Menu from "~/components/web/header2/Menu.vue";
import Newsletter from "~/components/web/footer/Newsletter.vue";
import Toast from "~/components/Toast.vue";
import Background from "~/components/web/Background.vue";
import Banner from "~/components/web/Banner.vue";
import Footer from "~/components/web/footer/Footer.vue";

export default {
    name: "Default.layout",
    head() {
        return {
            title: "گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "گروه آموزشی پرتقال" }],
        };
    },
    components: {
        Menu,
        Newsletter,
        Toast,
        Background,
        Banner,
        Footer,
    },
    data() {
        return {
            contact_info: this.contact_info || {},
            banner: this.banner || {},
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getBanner({ headers })]);
    },
    mounted() {
        if (process.client && window) {
            window.history.scrollRestoration = "auto";
        }

        // TODO : uncomment this
        // rayChat register
        // this.raychatInit();

        // load back cart list info
        let cartList = localStorage.getItem("cart");
        if (cartList) {
            try {
                cartList = JSON.parse(cartList);
                for (const item in cartList) this.$store.dispatch("cart/addItemToCart", { item: { ...cartList[item] } });
            } catch (e) {}
        }
    },
    methods: {
        async getBanner(data = {}) {
            let url = `/api/banner`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => (this.banner = results.data))
                .catch((e) => {});
        },

        raychatInit() {
            if (typeof window !== "undefined") {
                !(function () {
                    function t() {
                        var t = document.createElement("script");
                        (t.type = "text/javascript"),
                            (t.async = !0),
                            localStorage.getItem("rayToken")
                                ? (t.src = "https://app.raychat.io/scripts/js/" + o + "?rid=" + localStorage.getItem("rayToken") + "&href=" + window.location.href)
                                : (t.src = "https://app.raychat.io/scripts/js/" + o + "?href=" + window.location.href);
                        var e = document.getElementsByTagName("script")[0];
                        e.parentNode.insertBefore(t, e);
                    }
                    var e = document,
                        a = window,
                        o = "87076991-6e3c-4d73-a795-ce9cab0a21b2";
                    "complete" == e.readyState ? t() : a.attachEvent ? a.attachEvent("onload", t) : a.addEventListener("load", t, !1);
                })();
            }
        },
    },
};
</script>
