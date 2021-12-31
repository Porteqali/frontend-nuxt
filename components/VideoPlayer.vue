<style scoped>
.video-js {
    min-height: 32rem;
}
</style>

<template>
    <div class="video-js relative rounded-3xl overflow-hidden w-full">
        <div class="vjs-big-play-button absolute cursor-pointer" v-show="videoPaused"></div>
        <video class="w-full h-full" controls @play="videoPaused = false" @pause="videoPaused = true" v-if="!loading">
            <source :src="src" :type="type" />
        </video>
    </div>
</template>

<script>
export default {
    name: "VideoPlayer",
    props: ["src", "type"],
    data() {
        return {
            loading: false,
            videoPaused: true,
        };
    },
    methods: {
        playPause() {
            if (this.$refs.videoPlayer.paused) this.$refs.videoPlayer.play();
            else this.$refs.videoPlayer.pause();
        },
    },
};
</script>
