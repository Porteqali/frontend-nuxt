<style scoped></style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-2xl w-full px-4 md:px-8 mt-24 md:mt-24" v-if="!loading">
        <pre class="text-6xl md:text-9xl font-bold text-pink-500">{{ error.statusCode }}</pre>
        <section class="relative flex flex-col justify-center items-center z-10">
            <div class="flex flex-col items-center gap-10">
                <h1 class="flex flex-col gap-4 text-5xl lg:text-7xl text-center text-bluegray-900">
                    <span class="kalameh_black font-bold text-gray-600">اشتباه اومدی مهندس!</span>
                </h1>
                <p class="text-gray-600">اشکال نداره برو صفحه اصلی حتما پیداش میکنی</p>
                <nuxt-link to="/" class="orange_gradient_h flex items-center justify-center rounded-2xl shadow-lg p-4 w-full max-w-xs">صفحه اصلی</nuxt-link>
            </div>
        </section>
        <code>{{ error.message }}</code>
    </main>
</template>

<script>
import axios from "axios";

export default {
    props: ["error"],
    // layout: "none",
    components: {},
    data() {
        return {
            loading: true,
        };
    },
    async mounted() {
        const code = this.getCleanCode();
        // if (this.error.statusCode == 404) {
        //     await this.checkMarketingCode(code);
        // }
        this.loading = false;
    },
    methods: {
        // async checkMarketingCode(code) {
        //     const url = `/set-marketer-code/${code}`;
        //     const isCookieSet = await axios
        //         .post(encodeURI(url), {})
        //         .then((response) => true)
        //         .catch((e) => false);
        //     if (!!isCookieSet) return this.$router.push("/");
        // },

        getCleanCode() {
            let code = this.$route.path || "";
            const strips = [
                "~",
                "`",
                "!",
                "@",
                "#",
                "$",
                "%",
                "^",
                "*",
                "(",
                ")",
                "+",
                "[",
                "{",
                "]",
                "}",
                "\\",
                "/",
                "|",
                ";",
                ":",
                '"',
                "'",
                "â€”",
                "â€“",
                ",",
                "<",
                ".",
                ">",
            ];
            strips.forEach((strip) => (code = code.replace(new RegExp(`\\${strip}`, "g"), "")));
            return code;
        },
    },
};
</script>
