<style scoped>
.banner {
    position: relative;
    width: 100%;
    min-height: 4rem;
    margin-top: 4.35rem;
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
    letter-spacing: 2px;
}

@media (min-width: 1024px) {
    .banner {
        margin-top: 4rem;
    }
}
</style>

<template>
    <a :href="data.link ? data.link : `#`" class="banner flex flex-col items-center justify-center -mb-20 shadow-lg" :style="cssProps">
        <img class="w-full h-full max-h-14" :src="data.bgImage" v-if="!!data.bgImage && !!data.withImage" alt="" />
        <div class="flex flex-wrap items-center justify-center md:justify-between w-full max-w-2xl gap-4 md:gap-8 p-2" v-if="!!data.withText">
            <h4 class="kalameh_bold text-2xl" v-if="data.text">{{ data.text }}</h4>
            <p class="kalameh_bold text-xl" v-if="data.code">{{ data.code }}</p>
            <span
                class="banner_timer flex items-center gap-2 text-xl w-max max-w-md bg-white text-gray-700 rounded-xl p-1 px-2 text-center"
                v-html="timeRemainedFormated"
            ></span>
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
            const hours = Math.floor((totalSeconds / 3600) % 24);
            const days = Math.floor(totalSeconds / (3600 * 24)) + "<small class='-mr-2 opacity-75'>روز</small>";

            return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)} ${days}`;
        },
        pad(d) {
            return d < 10 ? "0" + d.toString() : d.toString();
        },
    },
};
</script>
