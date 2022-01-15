<style scoped>
.top_img {
    margin-top: calc(-50% + var(--topOffset));
    margin-right: calc(-25% + var(--rightOffset));
    min-width: var(--minWidth);
}

@media (min-width: 320px) {
    .top_img {
        margin-top: calc(-220% + var(--topOffset));
        margin-right: calc(-25% + var(--rightOffset));
        min-width: calc(var(--minWidth) - 500px);
    }
}
@media (min-width: 480px) {
    .top_img {
        margin-top: calc(-130% + var(--topOffset));
        margin-right: calc(-25% + var(--rightOffset));
        min-width: calc(var(--minWidth) - 450px);
    }
}
@media (min-width: 640px) {
    .top_img {
        margin-top: calc(-110% + var(--topOffset));
        margin-right: calc(-25% + var(--rightOffset));
        min-width: calc(var(--minWidth) - 400px);
    }
}
@media (min-width: 768px) {
    .top_img {
        margin-top: calc(-90% + var(--topOffset));
        margin-right: calc(-25% + var(--rightOffset));
        min-width: calc(var(--minWidth) - 350px);
    }
}
@media (min-width: 1024px) {
    .top_img {
        margin-top: calc(-80% + var(--topOffset));
        margin-right: calc(-25% + var(--rightOffset));
        min-width: calc(var(--minWidth) - 300px);
    }
}
@media (min-width: 1280px) {
    .top_img {
        margin-top: calc(-70% + var(--topOffset));
        margin-right: calc(-25% + var(--rightOffset));
        min-width: calc(var(--minWidth) - 250px);
    }
}
@media (min-width: 1440px) {
    .top_img {
        margin-top: calc(-60% + var(--topOffset));
        margin-right: calc(-20% + var(--rightOffset));
        min-width: calc(var(--minWidth) - 200px);
    }
}
@media (min-width: 1536px) {
    .top_img {
        margin-top: calc(-50% + var(--topOffset));
        margin-right: calc(-15% + var(--rightOffset));
        min-width: var(--minWidth);
    }
}
</style>

<template>
    <img class="absolute top_img" :src="src" alt="porteqali-background" :style="cssProps" />
</template>

<script>
export default {
    name: "Background",
    props: ["src", "topOffset", "rightOffset", "minWidth"],
    computed: {
        cssProps() {
            return {
                "--topOffset": (this.topOffset || 0) + "%",
                "--rightOffset": (this.rightOffset || 0) + "%",
                "--minWidth": (this.minWidth || 2020) + "px",
            };
        },
    },
};
</script>
