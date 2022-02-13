<style>
/* .video-js {
    width: 100% !important;
    height: 100% !important;
} */
</style>

<template>
    <section class="flex flex-wrap items-start justify-evenly gap-8 lg:gap-20 w-full my-16" id="news" v-if="newsInfo.status == 'active'">
        <div class="flex flex-col gap-6" v-if="!loading">
            <h2 class="text-4xl font-bold">آخرین اخبار سایت</h2>
            <h3 class="text-2xl font-bold mt-6">{{ newsInfo.title }}</h3>
            <p class="max-w-screen-sm text-xl font-bold" style="line-height: 2.25rem">
                {{ newsInfo.text }}
            </p>
            <a :href="newsInfo.link" class="orange_gradient_h flex items-center gap-2 rounded-xl shadow-lg p-4 w-max">
                {{ newsInfo.link_text }}
            </a>
        </div>
        <div class="flex flex-col gap-6" v-else>
            <h2 class="text-3xl font-bold">آخرین اخبار سایت</h2>
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
        <div class="video-js relative rounded-3xl overflow-hidden w-full max-w-xl h-64 lg:h-80">
            <div class="vjs-big-play-button absolute cursor-pointer" v-show="videoPaused"></div>
            <video class="w-full h-full" controls @play="videoPaused = false" @pause="videoPaused = true" v-if="!loading">
                <source :src="playerOptions.sources[0].src" :type="playerOptions.sources[0].type" />
            </video>
        </div>
        <!-- <div
            class="video-player-box vjs-default-skin rounded-2xl overflow-hidden w-full max-w-xl h-64 lg:h-80"
            :playsinline="false"
            @statechanged="playerStateChanged($event)"
            v-video-player:myVideoPlayer="playerOptions"
        ></div> -->
    </section>
</template>

<script>
import axios from "axios";
export default {
    name: "NewsSection",
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
