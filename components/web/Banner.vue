<style scoped>
.banner {
    position: relative;
    width: 100%;
    min-height: 4rem;
    background-color: var(--bannerBgColor);
    color: white;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 75%);
    overflow: hidden;
    z-index: 2;
}
.banner > * {
    mix-blend-mode: difference;
}
.banner img {
    mix-blend-mode: initial;
    object-fit: cover;
    position: absolute;
    inset: 0;
}
.banner_timer {
    letter-spacing: 5px;
}
</style>

<template>
    <a :href="data.link ? data.link : `#`" class="banner flex flex-wrap items-center justify-between p-2 px-4 mt-4 -mb-4 rounded-3xl shadow-lg" :style="cssProps">
        <img class="w-full h-full" :src="data.bgImage" v-if="!!data.bgImage" alt="" />
        <div class="flex flex-wrap items-center gap-4">
            <h4 class="text-2xl" v-if="data.text">{{ data.text }}</h4>
            <p class="shadow-md p-2 rounded-xl text-xl" v-if="data.code">{{ data.code }}</p>
        </div>
        <span class="banner_timer text-2xl md:text-4xl w-52 text-center">{{ timeRemainedFormated }}</span>
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
