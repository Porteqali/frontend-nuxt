<style scoped>
.nuxt_main {
    background-color: #fafafa;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    overflow: hidden;
}
</style>

<template>
    <div class="nuxt_main" dir="rtl" ref="body" id="app">
        <Banner :data="banner" v-if="!!banner && banner.status == 'active'" />

        <Header />

        <Nuxt class="z-10" nuxt-child-key="default" />

        <Footer />

        <Toast />
    </div>
</template>

<script>
import axios from "axios";
import Toast from "~/components/Toast.vue";
import Banner from "~/components/web/Banner.vue";
import Footer from "~/components/web/footer/Footer.vue";
import Header from "~/components/web/header/Header.vue";

export default {
    name: "Default.layout",
    head() {
        return {
            title: "گروه آموزشی پرتقال",
            meta: [{ hid: "description", name: "description", content: "گروه آموزشی پرتقال" }],
        };
    },
    components: {
        Toast,
        Banner,
        Footer,
        Header,
    },
    data() {
        return {
            banner: this.banner || {},
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getBanner({ headers })]);
    },
    mounted() {
        if (process.client && window) window.history.scrollRestoration = "auto";

        // this.raychatInit(); // rayChat register
        this.goftinoInit(); // goftino register
        this.yektanet(); // yektanet script
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

        goftinoInit() {
            if (typeof window !== "undefined") {
                !(function () {
                    var i = "fqST4e",
                        a = window,
                        d = document;
                    function g() {
                        var g = d.createElement("script"),
                            s = "https://www.goftino.com/widget/" + i,
                            l = localStorage.getItem("goftino_" + i);
                        (g.async = !0), (g.src = l ? s + "?o=" + l : s);
                        d.getElementsByTagName("head")[0].appendChild(g);
                    }
                    "complete" === d.readyState ? g() : a.attachEvent ? a.attachEvent("onload", g) : a.addEventListener("load", g, !1);
                })();
            }
        },

        yektanet() {
            if (typeof window !== "undefined") {
                !(function (t, e, n) {
                    (t.yektanetAnalyticsObject = n),
                        (t[n] =
                            t[n] ||
                            function () {
                                t[n].q.push(arguments);
                            }),
                        (t[n].q = t[n].q || []);
                    var a = new Date(),
                        r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(),
                        c = e.getElementsByTagName("script")[0],
                        s = e.createElement("script");
                    s.id = "ua-script-QMZzq9IG";
                    s.dataset.analyticsobject = n;
                    s.async = 1;
                    s.type = "text/javascript";
                    (s.src = "https://cdn.yektanet.com/rg_woebegone/scripts_v3/QMZzq9IG/rg.complete.js?v=" + r), c.parentNode.insertBefore(s, c);
                })(window, document, "yektanet");
            }
        },
    },
};
</script>
