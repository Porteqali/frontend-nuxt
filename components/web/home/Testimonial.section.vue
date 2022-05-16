<style scoped>
.container {
    position: relative;
    background-color: #fdfdfd;
    color: #333;
    border-radius: 1.5rem;
}

.background {
    width: 110vw;
    /* background: linear-gradient(261.5deg, #ffa825 0%, rgba(255, 112, 215, 15%) 100%); */
    background-image: linear-gradient(261.5deg, #ffa825 0%, rgba(255, 112, 215, 15%) 100%), url("/pages/home/pattern.png");
    background-repeat: repeat;
    z-index: -1;
}
.background img {
    margin-right: 12%;
}
</style>

<template>
    <section
        class="flex flex-col lg:flex-row items-start justify-around gap-8 w-full px-4 md:px-8"
        id="testimonials"
        v-if="!testimonialsLoading && testimonials.length > 0"
    >
        <div class="flex flex-col items-start gap-4 md:mt-8 w-full">
            <h2 class="kalameh_bold title text-3xl md:text-5xl">نظرات دانشجویان پرتقال</h2>
            <p>بخش کوچکی از نظرات افرادی که به ما اعتماد کرده اند.</p>
        </div>
        <div
            v-swiper="testimonialsSwiperOptions"
            class="container flex flex-col items-center gap-8 p-16 mr-auto md:mr-0 shadow-xl max-w-xl select-none overflow-hidden"
        >
            <ul class="swiper-wrapper flex items-start w-full">
                <li class="swiper-slide flex flex-col items-start gap-4 w-screen max-w-full flex-shrink-0 z-10" v-for="(testimonial, i) in testimonials" :key="i">
                    <div class="flex items-center gap-4">
                        <img class="w-24 h-24 object-cover shadow-lg rounded-full" :src="testimonial.image" :alt="testimonial.fullname" loading="lazy" />
                        <div class="flex flex-col gap-2">
                            <b class="kalameh_bold text-2xl">{{ testimonial.fullname }}</b>
                            <span class="text-amber-500 text-sm">{{ testimonial.title }}</span>
                        </div>
                    </div>
                    <img class="mr-auto" src="/misc/comma.png" alt="comma" />
                    <p class="w-full max-w-lg">
                        {{ testimonial.comment }}
                    </p>
                </li>
            </ul>
            <div class="flex items-center justify-center gap-4 w-full p-4">
                <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-prev">
                    <img src="/icons/new/ArrowRight3.svg" width="24" />
                </button>
                <div class="flex items-center justify-center gap-2 swiper-pagination2 swiper-pagination-bullets"></div>
                <button class="flex items-center justify-center p-2 bg-white shadow-xl rounded-xl swiper-next">
                    <img src="/icons/new/ArrowLeft3.svg" width="24" />
                </button>
            </div>
        </div>
        <div class="background absolute right-0 flex items-center mt-32 h-72">
            <img class="h-64" src="/pages/home/hand_write.png" alt="hand_write" />
        </div>
    </section>
</template>

<script>
import axios from "axios";
export default {
    name: "TestimonialSection",
    data() {
        return {
            testimonialsLoading: false,
            testimonials: ["", "", "", "", "", "", ""],
            testimonialsSwiperOptions: {
                autoplay: 5000,
                slidesPerView: 1,
                initialSlide: 1,
                spaceBetween: 64,
                loop: true,
                // freeMode: true,
                pagination: ".swiper-pagination2",
                prevButton: ".swiper-prev",
                nextButton: ".swiper-next",
            },
        };
    },
    async fetch() {
        let headers = {};
        if (process.server) headers = this.$nuxt.context.req.headers;

        await Promise.all([this.getTestimonials({ headers })]);
    },
    methods: {
        async getTestimonials(data = {}) {
            if (this.testimonialsLoading) return;
            this.testimonialsLoading = true;

            let url = `/api/testimonials?showFor=user`;
            let headers = {};
            if (process.server) {
                url = `${process.env.BASE_URL}${url}`;
                headers = data.headers ? data.headers : {};
            }

            await axios
                .get(url, { headers })
                .then((results) => {
                    this.testimonials = results.data.records;
                })
                .catch((e) => {})
                .finally(() => (this.testimonialsLoading = false));
        },
    },
};
</script>
