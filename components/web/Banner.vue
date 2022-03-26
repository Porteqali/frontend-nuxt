<style scoped>
.banner {
    position: relative;
    width: 100%;
    min-height: 4rem;
    background-color: var(--bannerBgColor);
    color: white;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 75%);
    overflow: hidden;
    z-index: 15;
}
.banner > * {
    /* mix-blend-mode: difference; */
}
.banner img {
    mix-blend-mode: initial;
    object-fit: cover;
    /* position: absolute; */
    /* inset: 0; */
}
.banner_timer {
    letter-spacing: 5px;
}
</style>

<template>
    <a :href="data.link ? data.link : `#`" class="banner flex flex-col items-center justify-between mt-16 lg:mt-20 -mb-20 shadow-lg" :style="cssProps">
        <img class="w-full h-full max-h-14" :src="data.bgImage" v-if="!!data.bgImage" alt="" />
        <div class="flex flex-wrap items-center justify-center md:justify-between w-full max-w-2xl gap-4 md:gap-8 p-2">
            <h4 class="kalameh_bold text-2xl" v-if="data.text">{{ data.text }}</h4>
            <p class="kalameh_bold text-xl" v-if="data.code">{{ data.code }}</p>
            <span class="banner_timer text-xl w-36 bg-white text-gray-700 rounded-xl p-1 px-2 text-center">{{ timeRemainedFormated }}</span>
        </div>
    </a>
</template>

<script>
export default {
    name: "Banner",
    props: ["data"],
    data() {
        return {
            timeRemained: 0,
            timeRemainedFormated: "00:00:00",
        };
    },
    mounted() {
        setInterval(() => {
            if (this.timeRemained) {
                this.timeRemained = Math.max(0, this.timeRemained - 1000);
                this.timeRemainedFormated = this.convert(this.timeRemained);
            }
        }, 1000);

        this.timeRemained = new Date(this.data.endDate).getTime() - Date.now();
        if (this.timeRemained < 0) this.timeRemained = 0;
    },
    computed: {
        cssProps() {
            return {
                "--bannerBgColor": this.data.bgColor,
                "--bannerBgImage": !!this.data.bgImage ? `url('${this.data.bgImage}')` : "url()",
            };
        },
    },
    methods: {
        convert(miliseconds) {
            const totalSeconds = miliseconds / 1000;

            const seconds = Math.floor(totalSeconds % 60);
            const minutes = Math.floor((totalSeconds / 60) % 60);
            const hours = Math.floor(totalSeconds / 3600);

            return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        },
        pad(d) {
            return d < 10 ? "0" + d.toString() : d.toString();
        },
    },
};
</script>
