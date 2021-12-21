<style scoped>
#top {
    color: var(--top-h1-color);
    font-weight: 900;
}

.error_text {
    font-size: 16rem;
    margin-top: 24rem;
}
@media (min-width: 1024px) {
    .error_text {
        font-size: 30rem;
        margin-top: 16rem;
    }
}
</style>

<template>
    <main role="main" class="flex flex-col items-center gap-16 max-w-screen-4xl w-full">
        <Background src="/backgrounds/Background.404.png" :topOffset="30" :rightOffset="20" :minWidth="2320" />
        <section class="relative flex flex-col justify-center items-center z-10" id="top">
            <div class="flex flex-col items-center gap-10 mt-28">
                <h1 class="flex flex-col gap-4 text-7xl">
                    <span class="kalameh_bold font-bold">اشتباه اومدی مهندس!</span>
                </h1>
                <p>اشکال نداره برو صفحه اصلی حتما پیداش میکنی</p>
                <nuxt-link to="/" class="orange_gradient_h flex items-center justify-center rounded-xl shadow-lg mt-10 p-4 w-full max-w-xs">صفحه اصلی</nuxt-link>
            </div>
        </section>
        <pre class="error_text absolute font-bold text-pink-500 mt-64">{{ error.statusCode }}</pre>
        <img class="relative z-10" src="/misc/Invest.png" alt="porteqali-team" style="max-height: 1920px" />
        <code>{{ error.message }}</code>
    </main>
</template>

<script>
import Background from "~/components/Background.vue";

export default {
    props: ["error"],
    // layout: "none",
    components: {
        Background,
    },
    mounted() {},
};
</script>
