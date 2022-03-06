<style scoped>
.video-js {
    min-height: 10rem;
}

@media (min-width: 768px) {
    .video-js {
        min-height: 20rem;
    }
}
</style>

<template>
    <div class="video-js relative rounded-3xl overflow-hidden w-full h-auto">
        <div class="vjs-big-play-button absolute cursor-pointer" v-show="videoPaused" @click="$refs.videoPlayer.play()"></div>
        <video ref="videoPlayer" class="w-full h-auto" controls @play="videoPaused = false" @pause="videoPaused = true" v-if="!loading">
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
            initial: this.initial || 1,
            loading: false,
            videoPaused: true,
        };
    },
    mounted() {},
    watch: {
        src(val) {
            try {
                this.$refs.videoPlayer.load();
                if (this.initial == 0) this.$refs.videoPlayer.play();
                if (this.initial == 1) this.initial = 0;
            } catch (e) {}
        },
    },
    methods: {},
};
</script>
