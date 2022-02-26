<style scoped>
.card {
    background-color: var(--testimonial-section-card-bg-color);
    color: var(--testimonial-section-card-color);
    border: 1px solid #bebebe;
}
.container {
}

@media (min-width: 1024px) {
    .container {
        margin-right: -10vw;
    }
}
</style>

<template>
    <section class="relative flex flex-col gap-8 w-full" id="testimonials" v-if="!testimonialsLoading && testimonials.length > 0">
        <div class="flex flex-wrap justify-between gap-8 w-full">
            <h2 class="font-bold text-4xl">نظرات دانشجویان پرتقال</h2>
        </div>
        <div v-swiper="testimonialsSwiperOptions" class="container w-screen max-w-screen-4xl select-none overflow-hidden overflow-y-visible pb-16 -mb-8">
            <ul class="swiper-wrapper flex items-start">
                <li
                    class="swiper-slide blur card shadow-2xl flex flex-col items-center gap-8 p-16 rounded-3xl max-w-screen-2sm z-10 ml-10"
                    v-for="(testimonial, i) in testimonials"
                    :key="i"
                >
                    <img class="mr-auto" src="/misc/comma.svg" alt="comma" loading="lazy" width="34" />
                    <p class="">
                        {{ testimonial.comment }}
                    </p>
                    <div class="flex items-center gap-3">
                        <img
                            class="border-2 border-solid border-orange-500 rounded-full"
                            :src="testimonial.image"
                            :alt="testimonial.fullname"
                            loading="lazy"
                            width="78"
                            height="78"
                        />
                        <div class="flex flex-col gap-2">
                            <b class="text-xl">{{ testimonial.fullname }}</b>
                            <span class="text-pink-500 text-lg">{{ testimonial.title }}</span>
                        </div>
                    </div>
                </li>
            </ul>
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
                autoplay: false,
                slidesPerView: "auto",
                initialSlide: 0,
                // spaceBetween: 46,
                loop: true,
                freeMode: true,
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
