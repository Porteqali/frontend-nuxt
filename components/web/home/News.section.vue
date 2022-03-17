<style scoped>
.video-js > img {
    z-index: -1;
}
</style>

<template>
    <section class="relative flex flex-col items-center gap-12 w-full max-w-screen-2xl pb-8 md:pb-20 px-4 md:px-8" id="news" v-if="newsInfo.status == 'active'">
        <img class="absolute -z-1 -right-56 top-12" src="/pages/home/path.svg" alt="path" />
        <img class="absolute -z-1 -left-40 top-1/4" src="/pages/home/path_gray.svg" alt="path_gray" />
        <div class="flex flex-col items-center gap-4 mb-2 w-full">
            <h2 class="kalameh_bold title2 text-4xl md:text-5xl font-bold">اخبار پرتقال</h2>
            <p class="kalameh_bold opacity-75">گوشه کنار پرتقال چی میگذره</p>
        </div>
        <div class="relative flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-between gap-8 w-full">
            <div class="flex flex-col gap-6 w-full max-w-xl" v-if="!loading">
                <div class="flex flex-col gap-2">
                    <h3 class="kalameh_bold text-3xl font-bold mt-6">{{ newsInfo.title }}</h3>
                    <div class="flex items-center gap-2">
                        <Icon class="w-6 h-6 bg-gray-800" size="24px" folder="icons/new" name="Calendar" />
                        <span>{{ new Date().toLocaleDateString("fa", { year: "numeric", month: "long", day: "numeric" }) }}</span>
                    </div>
                    <p class="text-lg mt-8">
                        {{ newsInfo.text }}
                    </p>
                </div>
                <a :href="newsInfo.link" class="orange_gradient_h flex items-center justify-center text-lg font-bold rounded-2xl shadow-lg p-6 mt-8 w-full">
                    {{ newsInfo.link_text }}
                </a>
            </div>
            <div class="flex flex-col gap-6 flex-grow" v-else>
                <div class="flex flex-col gap-2 w-96">
                    <span class="skeleton w-full h-4"></span>
                    <span class="skeleton w-full h-4"></span>
                    <span class="skeleton w-full h-4"></span>
                    <span class="skeleton w-4/12 h-4"></span>
                </div>
                <a href="#" class="orange_gradient_h flex items-center gap-2 rounded-xl shadow-lg mt-10 p-4 w-max">
                    <span class="skeleton w-12 h-2"></span>
                </a>
            </div>
            <div class="relative flex flex-col items-center p-4">
                <img class="absolute -mt-4" src="/pages/home/imac.png" loading="lazy" alt="imac" />
                <div class="video-js rounded-3xl overflow-hidden w-full max-w-2xl h-64 lg:h-96 flex-shrink-0">
                    <div class="vjs-big-play-button absolute cursor-pointer" v-show="videoPaused"></div>
                    <video class="w-full h-full" controls @play="videoPaused = false" @pause="videoPaused = true" v-if="!loading">
                        <source :src="playerOptions.sources[0].src" :type="playerOptions.sources[0].type" />
                    </video>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import Icon from "~/components/Icon.vue";

export default {
    name: "NewsSection",
    components: {
        Icon,
    },
    data() {
        return {
            loading: false,
            newsInfo: this.newsInfo || {},

            playerOptions: this.playerOptions || {
                muted: false,
                language: "en",
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                preload: true,
                sources: [
                    // {
                    //     type: "video/mp4",
                    //     src: "http://localhost:3000/file/private/4235ni432dbi324di2bjn423onf2.mp4",
                    // },
                ],
            },

            videoPaused: true,
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getLatestNews({ headers })]);
    },
    methods: {
        async getLatestNews(data = {}) {
            if (this.loading) return;
            this.loading = true;

            let url = `/api/latest-news`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.newsInfo = results.data;
                    this.playerOptions.sources = [
                        {
                            type: "video/mp4",
                            src: results.data.video,
                        },
                    ];
                })
                .catch((e) => {})
                .finally(() => (this.loading = false));
        },

        playPause() {
            if (this.$refs.videoPlayer.paused) this.$refs.videoPlayer.play();
            else this.$refs.videoPlayer.pause();
        },
    },
};
</script>
