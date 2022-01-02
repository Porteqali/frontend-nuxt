<style scoped>
.video-js {
    min-height: 20rem;
}

@media (min-width: 768px) {
    .video-js {
        min-height: 32rem;
    }
}
</style>

<template>
    <div class="video-js relative rounded-3xl overflow-hidden w-full">
        <div class="vjs-big-play-button absolute cursor-pointer" v-show="videoPaused"></div>
        <video ref="videoPlayer" class="w-full h-full" controls @play="videoPaused = false" @pause="videoPaused = true" v-if="!loading">
            <source :src="src" :type="type || 'video/mp4'" />
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
    watch: {
        src(val) {
            try {
                this.$refs.videoPlayer.load();
                this.$refs.videoPlayer.play();
            } catch (e) {
                console.log(e);
            }
        },
    },
    methods: {},
};
</script>
