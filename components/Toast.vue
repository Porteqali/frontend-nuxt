<style scoped>
.toast {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    border: 6px solid rgb(175, 175, 175);
    color: #fff;
}

@media (min-width: 1024px) {
    .toast {
        top: 2rem;
        right: 2rem;
    }
}
</style>

<template>
    <transition name="slideleft" mode="out-in" appear="">
        <div class="toast flex flex-col gap-4 rounded-3xl p-4 md:p-8 shadow-xl bg-warmgray-600" v-if="show">
            <span class="w-full h-1 rounded-full" :class="{ [bgColor]: 1 }" v-if="bgColor != ''"></span>
            <div class="flex items-center justify-between gap-8">
                <h4 v-if="toastOptions.title" class="flex items-center gap-4 text-xl max-w-xs">
                    <img v-if="toastOptions.icon" :src="toastOptions.icon" loading="lazy" width="20" height="20" />
                    <b class="kalameh_bold">{{ toastOptions.title }}</b>
                </h4>
                <button class="flex items-center justify-center bg-black bg-opacity-20 p-2 rounded-full" @click="close()" v-if="toastOptions.dismissible">
                    <img src="/icons/Cancel.white.svg" width="20" height="20" alt="Close" />
                </button>
            </div>
            <p v-if="toastOptions.message" class="text-sm max-w-xs text-gray-100">{{ toastOptions.message }}</p>

            <div class="w-full mt-3" v-if="toastOptions.btn && !!toastOptions.btn.link && toastOptions.btn.internal">
                <nuxt-link class="flex items-center justify-center w-full p-4 rounded-2xl bg-black bg-opacity-40" :to="toastOptions.btn.link">
                    {{ toastOptions.btn.text }}
                </nuxt-link>
            </div>
            <div class="w-full mt-3" v-if="toastOptions.btn && !!toastOptions.btn.link && !toastOptions.btn.internal">
                <a class="flex items-center justify-center w-full p-4 rounded-2xl bg-black bg-opacity-40" :href="toastOptions.btn.link">
                    {{ toastOptions.btn.text }}
                </a>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Toast",
    data() {
        return {
            show: false,
            bgColor: "",
        };
    },
    mounted() {},
    watch: {
        toastOptions: function (newOptions, oldOptions) {
            switch (newOptions.type) {
                case "success":
                    this.bgColor = "bg-emerald-500";
                    break;
                case "warning":
                    this.bgColor = "bg-amber-400";
                    break;
                case "error":
                    this.bgColor = "bg-rose-500";
                    break;
                default:
                    this.bgColor = "";
                    break;
            }

            this.show = true;
            setTimeout(() => (this.show = false), newOptions.delay);
        },
    },
    computed: {
        toastOptions() {
            return this.$store.state.toast.toastOptions;
        },
    },
    methods: {
        close() {
            this.show = false;
        },
    },
};
</script>
