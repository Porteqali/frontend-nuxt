<style scoped>
.banner {
    width: 100%;
    min-height: 4rem;
    background-color: var(--bannerBgColor);
    background-image: var(--bannerBgImage);
    color: white;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 75%);
    z-index: 2;
}
.banner > * {
    mix-blend-mode: difference;
}
.banner_timer {
    letter-spacing: 5px;
}
</style>

<template>
    <div class="banner flex flex-wrap items-center justify-evenly p-2 mt-4 -mb-4 rounded-3xl shadow-lg" :style="cssProps">
        <div class="flex flex-wrap items-center gap-4">
            <h4 class="text-2xl" v-if="data.text">{{ data.text }}</h4>
            <p class="shadow-md p-2 rounded-xl text-xl" v-if="data.code">{{ data.code }}</p>
        </div>
        <span class="banner_timer text-4xl w-36 text-center">{{ new Date(timeRemained * 1000).toISOString().substr(11, 8) }}</span>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: "Banner",
    props: ["data"],
    data() {
        return {
            timeRemained: 0,
        };
    },
    mounted() {
        setInterval(() => {
            if (this.timeRemained) this.timeRemained = Math.max(0, this.timeRemained - 1);
        }, 1000);

        let endDate = moment(this.data.endDate);
        let timeDiff = moment.duration(moment(Date.now()).diff(endDate));
        this.timeRemained = timeDiff.asSeconds();
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
    methods: {},
};
</script>
